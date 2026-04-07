import { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Convertaflow collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90">Privacy Policy</h1>
        <p className="mt-2 text-[13px] text-white/40">Last updated: April 2026</p>

        <div className="mt-8 space-y-8 text-[14px] leading-relaxed text-white/60">
          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Information We Collect</h2>
            <p>When you use Convertaflow, we may collect information you provide directly, including your name, email address, phone number, business name, and any messages you send through our contact forms. We also collect usage data such as pages visited, time on site, and device information through analytics tools.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">How We Use Your Information</h2>
            <p>We use your information to provide and improve our services, communicate with you about your account or inquiries, send relevant updates about your projects, process payments, and analyze how our platform is used to improve the experience.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Data Storage & Security</h2>
            <p>Your data is stored securely using industry-standard encryption. We use Supabase for database services and Resend for email delivery. We do not sell, trade, or rent your personal information to third parties. Access to your data is restricted to authorized team members only.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Cookies & Analytics</h2>
            <p>We use essential cookies to keep our platform functional and analytics cookies (Google Analytics) to understand how visitors use our site. You can disable cookies in your browser settings, though some features may not work properly.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Third-Party Services</h2>
            <p>We integrate with third-party services to provide our platform, including Supabase (database), Resend (email), Stripe (payments), and Google Analytics (tracking). Each service has its own privacy policy governing its use of your data.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time. You can request a copy of your data or ask us to remove it by contacting us at privacy@convertaflow.com. We will respond to all requests within 30 days.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date above.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at privacy@convertaflow.com.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
