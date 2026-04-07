import { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Convertaflow services.",
};

export default function TermsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90">Terms of Service</h1>
        <p className="mt-2 text-[13px] text-white/40">Last updated: April 2026</p>

        <div className="mt-8 space-y-8 text-[14px] leading-relaxed text-white/60">
          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Agreement to Terms</h2>
            <p>By accessing or using Convertaflow&apos;s services, you agree to be bound by these terms. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and clients of our platform.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Services</h2>
            <p>Convertaflow provides custom website design, development, lead capture systems, review management, email automation, and related growth tools for businesses. The specific features and deliverables depend on the tier selected at the time of purchase.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Payments & Billing</h2>
            <p>All pricing is listed on our pricing page. One-time setup fees are due upon project kickoff. Monthly subscription fees are billed on the same date each month. You may cancel your monthly subscription at any time. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial months.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Deliverables & Revisions</h2>
            <p>Each tier includes a specified number of revisions. Additional revisions beyond your tier&apos;s allocation may incur additional fees. We aim to deliver all projects within the timeframes listed for each tier. Delays caused by client feedback timelines do not count against our delivery estimates.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Intellectual Property</h2>
            <p>Upon full payment, you own the custom website design and content created for your project. Convertaflow retains the right to showcase the work in our portfolio unless otherwise agreed. Third-party assets (fonts, stock images, icons) remain subject to their respective licenses.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Account Responsibilities</h2>
            <p>You are responsible for maintaining the security of your account credentials. You agree not to share access with unauthorized parties. You are responsible for all activity that occurs under your account. Notify us immediately of any unauthorized access.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Limitation of Liability</h2>
            <p>Convertaflow is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question. We do not guarantee specific business results, lead volumes, or revenue increases.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Termination</h2>
            <p>Either party may terminate the relationship at any time. Upon cancellation of monthly services, you retain access until the end of your current billing period. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms. We will notify you of any material changes via email or through our platform.</p>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold text-white/80 mb-2">Contact</h2>
            <p>Questions about these terms? Contact us at support@convertaflow.co.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
