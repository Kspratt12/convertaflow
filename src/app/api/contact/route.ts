import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, newLeadEmail, contactConfirmationEmail, isEmailConfigured } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, businessType, interest, message, turnstileToken } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Verify Turnstile spam protection
    if (!turnstileToken || !(await verifyTurnstileToken(turnstileToken))) {
      return NextResponse.json(
        { error: "Spam check failed. Please try again." },
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

    if (isEmailConfigured()) {
      // Send notification email to business owner (only if recipient configured)
      if (process.env.NOTIFICATION_EMAIL) {
        try {
          await sendEmail({
            to: process.env.NOTIFICATION_EMAIL,
            ...newLeadEmail(name, email, message),
          });
        } catch (emailErr) {
          console.error("Notification email failed:", emailErr);
        }
      }

      // Send confirmation to the lead (independent of admin notification)
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
