import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, newLeadEmail, contactConfirmationEmail, isEmailConfigured } from "@/lib/email";

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

    // Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        business_type: businessType || null,
        interest: interest || null,
        message: message || null,
      });

    if (dbError) {
      console.error("Failed to save contact submission:", dbError);
      // Don't fail the request — email notification still valuable
    }

    // Send notification email to business owner
    if (isEmailConfigured() && process.env.NOTIFICATION_EMAIL) {
      try {
        await sendEmail({
          to: process.env.NOTIFICATION_EMAIL,
          ...newLeadEmail(name, email, message),
        });
      } catch (emailErr) {
        console.error("Notification email failed:", emailErr);
      }

      // Send confirmation to the lead
      try {
        await sendEmail({
          to: email,
          ...contactConfirmationEmail(name),
        });
      } catch (emailErr) {
        console.error("Confirmation email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
