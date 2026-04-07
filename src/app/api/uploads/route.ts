import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";

const BUCKET = "client-uploads";
const MAX_BYTES = 500 * 1024 * 1024; // 500 MB

const ALLOWED_KINDS = ["file", "image", "document", "video", "logo", "brand"] as const;
type FileKind = typeof ALLOWED_KINDS[number];

function inferKind(mime: string, category: string): FileKind {
  if (category === "logos") return "logo";
  if (category === "brand") return "brand";
  if (category === "videos") return "video";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("image/")) return "image";
  if (
    mime === "application/pdf" ||
    mime === "application/msword" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mime === "text/plain"
  ) {
    return "document";
  }
  return "file";
}

/**
 * GET — list uploads for the signed-in user.
 * Returns rows from client_uploads + a signed URL for each.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("client_uploads")
    .select("*")
    .eq("business_id", session.profile.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Generate fresh signed URLs (valid 1 hour) for each file
  const withUrls = await Promise.all(
    (rows || []).map(async (row) => {
      const { data: signed } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(row.file_url, 3600);
      return { ...row, signed_url: signed?.signedUrl || null };
    })
  );

  return NextResponse.json({ uploads: withUrls });
}

/**
 * POST — multipart upload to Supabase Storage.
 * Body: FormData with `file` (File) and optional `category` field.
 * Stores at: {business_id}/{category}/{timestamp}-{filename}
 * Inserts a client_uploads row.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const category = String(formData.get("category") || "other");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
      { status: 413 }
    );
  }

  const businessId = session.profile.id;
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${businessId}/${category}/${Date.now()}-${safeName}`;

  const supabase = await createClient();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload failed:", uploadError);
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const fileKind = inferKind(file.type || "", category);

  const { data: row, error: rowError } = await supabase
    .from("client_uploads")
    .insert({
      business_id: businessId,
      file_name: file.name,
      file_url: path, // store the storage path; we sign on read
      file_type: file.type || null,
      file_size: file.size,
      category,
      file_kind: fileKind,
    })
    .select()
    .single();

  if (rowError) {
    // Rollback storage upload if DB insert failed
    await supabase.storage.from(BUCKET).remove([path]);
    return NextResponse.json({ error: rowError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, upload: row });
}

/**
 * DELETE — remove a file by id (must belong to the signed-in user).
 */
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();

  // Look up the row to make sure it belongs to this user (RLS enforces too)
  const { data: row, error: fetchError } = await supabase
    .from("client_uploads")
    .select("file_url, business_id")
    .eq("id", id)
    .single();

  if (fetchError || !row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (row.business_id !== session.profile.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Remove from storage
  await supabase.storage.from(BUCKET).remove([row.file_url]);

  // Remove the DB row
  await supabase.from("client_uploads").delete().eq("id", id);

  return NextResponse.json({ success: true });
}
