"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  FileText,
  File,
  Palette,
  FolderOpen,
  CloudUpload,
  Video,
  Crown,
  Trash2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusiness } from "@/components/dashboard/business-provider";
import { hasVideoUploads } from "@/lib/tier";
import { TIERS } from "@/lib/constants";

interface UploadRow {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  category: string;
  file_kind: string;
  created_at: string;
  signed_url: string | null;
}

interface CategoryDef {
  id: string;
  label: string;
  icon: typeof FolderOpen;
  videoTier?: boolean;
  description: string;
  accept: string;
}

const ALL_CATEGORIES: CategoryDef[] = [
  { id: "all", label: "All Files", icon: FolderOpen, description: "Everything you've uploaded so far.", accept: "*" },
  { id: "logos", label: "Logos", icon: Palette, description: "Vector or high-res logo files.", accept: "image/*,.svg,.ai,.eps,.pdf" },
  { id: "photos", label: "Photos", icon: ImageIcon, description: "Product, location, team, and lifestyle photos.", accept: "image/*" },
  { id: "documents", label: "Documents", icon: FileText, description: "Written copy, brand guidelines, briefs.", accept: ".pdf,.doc,.docx,.txt,.md" },
  { id: "brand", label: "Brand Files", icon: File, description: "Style guides, source files, design exports.", accept: "*" },
  { id: "videos", label: "Videos", icon: Video, videoTier: true, description: "Footage and reference clips for social automation.", accept: "video/*" },
  { id: "other", label: "Other", icon: File, description: "Anything else we should have.", accept: "*" },
];

function formatBytes(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

export default function UploadsPage() {
  const { tier } = useBusiness();
  const videosAllowed = hasVideoUploads(tier);

  const categories = useMemo(
    () => ALL_CATEGORIES.filter((c) => !c.videoTier || videosAllowed),
    [videosAllowed]
  );

  const [activeCategory, setActiveCategory] = useState("all");
  const active = categories.find((c) => c.id === activeCategory) || categories[0];

  const [uploads, setUploads] = useState<UploadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingNames, setUploadingNames] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUploads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/uploads");
      const data = await res.json();
      setUploads(data.uploads || []);
    } catch (err) {
      console.error("Fetch uploads failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (list.length === 0) return;

      setError(null);
      const targetCategory = activeCategory === "all" ? "other" : activeCategory;

      for (const file of list) {
        setUploadingNames((prev) => new Set(prev).add(file.name));
        const fd = new FormData();
        fd.append("file", file);
        fd.append("category", targetCategory);

        try {
          const res = await fetch("/api/uploads", { method: "POST", body: fd });
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || `Failed to upload ${file.name}`);
          }
        } catch {
          setError(`Failed to upload ${file.name}`);
        } finally {
          setUploadingNames((prev) => {
            const next = new Set(prev);
            next.delete(file.name);
            return next;
          });
        }
      }

      await fetchUploads();
    },
    [activeCategory, fetchUploads]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Delete this file?")) return;
      try {
        await fetch(`/api/uploads?id=${id}`, { method: "DELETE" });
        setUploads((prev) => prev.filter((u) => u.id !== id));
      } catch {
        setError("Failed to delete file");
      }
    },
    []
  );

  const visibleUploads =
    activeCategory === "all"
      ? uploads
      : uploads.filter((u) => u.category === activeCategory);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-white/90 sm:text-2xl">Uploads</h1>
          <span className="rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa]">
            {TIERS[tier].shortName} plan
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-white/45 sm:text-[14px]">
          Share your logos, photos, brand files, {videosAllowed ? "videos, " : ""}and any other assets our team needs.
        </p>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors sm:p-10",
          dragOver
            ? "border-[#7c3aed]/50 bg-[#7c3aed]/[0.04]"
            : "border-white/[0.1] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.03]"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={active.accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed]/15 to-[#3b82f6]/15">
            <CloudUpload className="h-7 w-7 text-[#06b6d4]" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-white/80">
              Drag and drop {active.label.toLowerCase()} here
            </p>
            <p className="mt-1 text-[13px] text-white/40">
              or{" "}
              <span className="font-medium text-[#06b6d4] hover:underline">
                browse your computer
              </span>
            </p>
          </div>
          <p className="text-[11px] text-white/30">{active.description}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-[12.5px] text-red-300">
          {error}
        </div>
      )}

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all",
                isActive
                  ? "border border-white/[0.12] bg-white/[0.1] text-white"
                  : "border border-white/[0.06] bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/70"
              )}
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
              {cat.videoTier && <Crown className="h-3 w-3 text-[#f59e0b]" />}
            </button>
          );
        })}
      </div>

      {/* In-flight uploads */}
      {uploadingNames.size > 0 && (
        <div className="space-y-2">
          {Array.from(uploadingNames).map((name) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
            >
              <Loader2 className="h-4 w-4 animate-spin text-[#06b6d4]" />
              <span className="truncate text-[13px] text-white/70">{name}</span>
              <span className="ml-auto text-[11px] text-white/35">Uploading…</span>
            </div>
          ))}
        </div>
      )}

      {/* Upload list */}
      {loading ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 py-16 text-center sm:p-6 sm:py-16">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-white/30" />
        </div>
      ) : visibleUploads.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 py-16 text-center sm:p-6 sm:py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
              <Upload className="h-6 w-6 text-white/30" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-white/50">No files uploaded yet</p>
              <p className="mt-1 text-[12px] text-white/35">
                Upload your assets above to get started.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {visibleUploads.map((u) => {
            const cat = ALL_CATEGORIES.find((c) => c.id === u.category) || ALL_CATEGORIES[0];
            const Icon = cat.icon;
            return (
              <div
                key={u.id}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                  <Icon className="h-4 w-4 text-[#06b6d4]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-white/85">{u.file_name}</p>
                  <p className="text-[11px] text-white/35">
                    {cat.label} · {formatBytes(u.file_size)}
                  </p>
                </div>
                {u.signed_url && (
                  <a
                    href={u.signed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
                    aria-label="Open file"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  onClick={() => handleDelete(u.id)}
                  className="rounded-lg p-2 text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  aria-label="Delete file"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Upgrade nudge for non-video tiers */}
      {!videosAllowed && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10">
              <Video className="h-4 w-4 text-[#a78bfa]" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white/80">
                Want to upload video content?
              </p>
              <p className="mt-0.5 text-[12px] text-white/45">
                Video uploads are part of the Scale and Engine plans for clients running social automation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
