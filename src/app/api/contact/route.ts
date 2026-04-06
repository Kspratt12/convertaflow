import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, businessType, interest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // TODO: Save to Supabase contact_submissions table
    // const supabase = await createClient();
    // await supabase.from("contact_submissions").insert({
    //   name, email, business_type: businessType, interest, message,
    // });

    // TODO: Send notification email via Resend
    // await sendEmail({
    //   to: process.env.NOTIFICATION_EMAIL!,
    //   ...newLeadEmail(name, email, message),
    // });

    // TODO: Send confirmation email to the lead
    // await sendEmail({
    //   to: email,
    //   ...contactConfirmationEmail(name),
    // });

    console.log("Contact submission:", { name, email, businessType, interest, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
