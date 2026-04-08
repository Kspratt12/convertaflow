"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Check,
  Building2,
  Palette,
  Target,
  FileText,
  Globe,
  ImageIcon,
  Zap,
  CalendarDays,
  Upload,
  Video,
  Share2,
  Send,
  Loader2,
  Wrench,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusiness } from "@/components/dashboard/business-provider";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

interface OnboardingSection {
  id: string;
  title: string;
  description: string;
  icon: typeof Building2;
  fields: FieldConfig[];
  /** Tiers this section applies to. If undefined, applies to all. */
  tiers?: TierId[];
}

type FieldConfig =
  | { type: "text"; name: string; label: string; placeholder: string }
  | { type: "textarea"; name: string; label: string; placeholder: string }
  | { type: "checkboxes"; name: string; label: string; options: string[] }
  | { type: "select"; name: string; label: string; options: string[] }
  | { type: "file"; name: string; label: string };

const SECTIONS: OnboardingSection[] = [
  {
    id: "business_basics",
    title: "Business Basics",
    description: "Tell us about your business so we can tailor everything to your brand.",
    icon: Building2,
    fields: [
      { type: "text", name: "business_name", label: "Business Name", placeholder: "e.g. Elevate Dental Studio" },
      { type: "text", name: "contact_name", label: "Primary Contact Name", placeholder: "Your full name" },
      { type: "text", name: "contact_email", label: "Contact Email", placeholder: "you@business.com" },
      { type: "text", name: "contact_phone", label: "Phone Number", placeholder: "(555) 000-0000" },
      { type: "text", name: "industry", label: "Industry", placeholder: "e.g. Dental, Real Estate, Consulting" },
      { type: "textarea", name: "description", label: "Brief Business Description", placeholder: "What does your business do? Who do you serve?" },
    ],
  },
  {
    id: "brand_direction",
    title: "Brand Direction",
    description: "Help us capture your visual identity and design preferences.",
    icon: Palette,
    tiers: ["starter", "growth", "scale", "system_upgrade", "scale_single"],
    fields: [
      { type: "select", name: "style", label: "Preferred Design Style", options: ["Modern & Minimal", "Bold & Vibrant", "Elegant & Luxurious", "Warm & Friendly", "Corporate & Professional", "Creative & Artistic"] },
      { type: "text", name: "primary_color", label: "Primary Brand Color (hex or description)", placeholder: "e.g. #7c3aed or deep purple" },
      { type: "text", name: "secondary_color", label: "Secondary Brand Color", placeholder: "e.g. #06b6d4 or teal" },
      { type: "textarea", name: "inspiration_sites", label: "Inspiration Websites", placeholder: "List 2-3 websites you love the look of, and what you like about them" },
      { type: "file", name: "logo", label: "Upload Your Logo" },
    ],
  },
  {
    id: "website_goals",
    title: "Website Goals",
    description: "What should your new website accomplish for your business?",
    icon: Target,
    fields: [
      { type: "checkboxes", name: "goals", label: "Primary Goals (select all that apply)", options: ["Generate leads / inquiries", "Allow clients to book appointments", "Build trust and credibility", "Showcase portfolio / past work", "Display services and pricing", "Other"] },
      { type: "textarea", name: "goals_detail", label: "Any additional details about your goals?", placeholder: "Tell us more about what success looks like for this project" },
    ],
  },
  {
    id: "pages_needed",
    title: "Pages Needed",
    description: "Select which pages you need for your website.",
    icon: FileText,
    // Bundle plans only — singles plug into an existing site
    tiers: ["starter", "growth", "scale"],
    fields: [
      { type: "checkboxes", name: "pages", label: "Pages to Include", options: ["Home", "About", "Services", "Gallery / Portfolio", "Contact", "FAQ", "Booking / Schedule", "Blog", "Custom Page (describe below)"] },
      { type: "textarea", name: "custom_pages", label: "Custom Page Details", placeholder: "Describe any custom pages or special sections you need" },
    ],
  },
  {
    id: "existing_site_integration",
    title: "Existing Site Integration",
    description: "Tell us about the website we'll be plugging our system into.",
    icon: Zap,
    // Single plans only
    tiers: ["system_upgrade", "scale_single"],
    fields: [
      { type: "text", name: "current_site_url", label: "Your Current Website URL", placeholder: "https://yourbusiness.com" },
      { type: "select", name: "site_platform", label: "What platform is it built on?", options: ["WordPress", "Squarespace", "Wix", "Shopify", "Webflow", "Custom / Not sure", "Other"] },
      { type: "select", name: "admin_access", label: "Can you give us admin access to make changes?", options: ["Yes", "No, but I can install scripts you provide", "Not sure"] },
      { type: "textarea", name: "integration_notes", label: "Anything we should know about your current setup?", placeholder: "Existing forms, booking tools, CRM, email lists, etc." },
    ],
  },
  {
    id: "domain_existing",
    title: "Domain & Existing Site",
    description: "Let us know about your current web presence.",
    icon: Globe,
    // Bundle plans only — singles already have a site
    tiers: ["starter", "growth", "scale"],
    fields: [
      { type: "select", name: "has_domain", label: "Do you have a domain name?", options: ["Yes, I own a domain", "No, I need to purchase one", "Not sure"] },
      { type: "text", name: "current_url", label: "Current Website URL (if any)", placeholder: "https://yourbusiness.com" },
      { type: "text", name: "registrar", label: "Domain Registrar (if known)", placeholder: "e.g. GoDaddy, Namecheap, Google Domains" },
      { type: "select", name: "need_domain_help", label: "Do you need help with domain setup?", options: ["Yes, please help", "No, I can handle it", "Not sure yet"] },
    ],
  },
  {
    id: "assets_content",
    title: "Assets & Content",
    description: "Tell us what materials you have ready, and what you need help with.",
    icon: ImageIcon,
    fields: [
      { type: "checkboxes", name: "existing_assets", label: "What do you have ready?", options: ["Professional photos", "Product / service photos", "Video content", "Customer testimonials", "Written copy / text", "Brand guidelines"] },
      { type: "select", name: "need_copywriting", label: "Do you need copywriting help?", options: ["Yes, write everything for me", "Partial, I have some content", "No, I will provide all copy"] },
      { type: "file", name: "assets_upload", label: "Upload Any Assets" },
    ],
  },
  {
    id: "feature_needs",
    title: "Feature Needs",
    description: "Select which features and integrations matter to your business.",
    icon: Zap,
    // Any plan with the systems layer (everything except starter)
    tiers: ["growth", "scale", "system_upgrade", "scale_single"],
    fields: [
      { type: "checkboxes", name: "features", label: "Features Needed", options: ["Online booking / scheduling", "Contact forms", "Google Analytics", "Review collection / display", "Email automation", "Social media integration", "Live chat widget", "Payment processing", "Custom forms"] },
      { type: "textarea", name: "feature_notes", label: "Additional feature requests or notes", placeholder: "Any specific tools or integrations you currently use?" },
    ],
  },
  {
    id: "tools_to_set_up",
    title: "Tools To Set Up For You",
    description: "Confirm the tools that come with your plan, and tell us about anything extra you want.",
    icon: Wrench,
    // Growth + Scale: anyone with the systems layer
    tiers: ["growth", "scale", "system_upgrade", "scale_single"],
    fields: [
      {
        type: "checkboxes",
        name: "included_tools_confirm",
        label: "Confirm the tools we'll set up (all included with your plan)",
        options: [
          "Google Reviews automation (auto-request after every job, branded review requests)",
          "Lead capture with instant email alerts (you get notified the moment someone reaches out)",
          "Email follow-up sequences (we write and run nurture emails for you)",
        ],
      },
      {
        type: "checkboxes",
        name: "extras_requested",
        label: "Anything extra you'd like us to build or wire up? (we'll quote anything beyond the basics)",
        options: [
          "Online booking / calendar integration",
          "Custom contact form with conditional fields",
          "Newsletter signup with welcome email",
          "Customer testimonial / review display widget",
          "FAQ section with search",
          "Social media post scheduling",
          "Other (describe below)",
        ],
      },
      {
        type: "textarea",
        name: "extras_notes",
        label: "Tell us more about anything specific you need",
        placeholder: "Describe any specific tools, workflows, or integrations you want. The more detail, the better the quote.",
      },
    ],
  },
  {
    id: "custom_build_request",
    title: "Tell Us What To Build For You",
    description: "Your plan includes a custom build catered to your business. Plumber, yoga instructor, dentist, real estate, lawyer, hair stylist. We meet you where you are. Tell us what you need.",
    icon: Sparkles,
    // Scale tier only — the 'we build whatever you need' tier
    tiers: ["scale", "scale_single"],
    fields: [
      {
        type: "textarea",
        name: "custom_build_overview",
        label: "What do you want us to build?",
        placeholder:
          "Describe what you need in your own words. Examples: 'A booking system that lets clients pick a stylist by name', 'A patient intake form with insurance verification', 'A listing showcase that captures leads per property', 'A custom CRM that tracks every job from inquiry to invoice.' Whatever it is, tell us.",
      },
      {
        type: "textarea",
        name: "custom_build_problem",
        label: "What problem will this solve for your business?",
        placeholder:
          "Example: 'Right now I lose half my booking inquiries because the form is generic. I need each one to route to the right stylist automatically.'",
      },
      {
        type: "checkboxes",
        name: "phone_features",
        label: "Want any phone-based features? (optional, $29/mo each, we handle the setup)",
        options: [
          "Missed-call rescue (auto-text customers when you miss their call)",
          "SMS appointment reminders (text customers the day before)",
          "Inquiry-to-text alerts (form submissions text your phone in 5 seconds)",
          "Two-way SMS conversations (customers text your business number, we route to your team)",
        ],
      },
      {
        type: "textarea",
        name: "custom_build_inspiration",
        label: "Any examples or inspiration? (links, screenshots, or descriptions)",
        placeholder:
          "Show us what you have in mind. Links to other websites, apps you like, or just a description of what it should feel like.",
      },
      {
        type: "select",
        name: "custom_build_priority",
        label: "How important is this vs the rest of the build?",
        options: [
          "Critical, this is the main reason I bought this plan",
          "Important, but not the only thing I need",
          "Nice to have, would be great but not blocking",
        ],
      },
      {
        type: "textarea",
        name: "custom_build_timeline",
        label: "Any timeline pressure?",
        placeholder:
          "Example: 'I need this live before my busy season starts in May' or 'No rush, take the time to do it right.'",
      },
    ],
  },
  {
    id: "social_automation",
    title: "Social & Automation",
    description: "Tell us about the channels and workflows we'll wire up for you.",
    icon: Share2,
    tiers: ["scale", "scale_single"],
    fields: [
      { type: "checkboxes", name: "social_channels", label: "Active channels", options: ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "X / Twitter", "None yet"] },
      { type: "select", name: "posting_cadence", label: "Desired posting cadence", options: ["Daily", "3-5x per week", "Weekly", "A few times per month", "Not sure"] },
      { type: "checkboxes", name: "automation_goals", label: "What should the automations do?", options: ["Auto-DM new followers", "Capture leads from comments", "Route inquiries to email", "Run review request flows", "Cross-post content", "Custom workflow"] },
      { type: "textarea", name: "automation_notes", label: "Anything specific to set up?", placeholder: "ManyChat flows, Instagram lead forms, content pillars, brand voice, etc." },
    ],
  },
  {
    id: "video_content",
    title: "Video Content",
    description: "Upload videos and reference content for your social automation.",
    icon: Video,
    tiers: ["scale", "scale_single"],
    fields: [
      { type: "select", name: "video_style", label: "Preferred video style", options: ["Talking-head / personal", "B-roll over voiceover", "Tutorial / educational", "Behind the scenes", "Customer testimonials", "Product showcase", "Mixed"] },
      { type: "textarea", name: "video_topics", label: "Topics & themes to cover", placeholder: "What kind of content should we be deploying for you?" },
      { type: "file", name: "video_upload", label: "Upload videos or references" },
      { type: "textarea", name: "video_notes", label: "Anything else we should know?", placeholder: "Existing footage, brand voice, do's and don'ts" },
    ],
  },
  {
    id: "timeline",
    title: "Timeline & Launch",
    description: "Help us plan around your schedule and key dates.",
    icon: CalendarDays,
    fields: [
      { type: "text", name: "desired_launch", label: "Desired Launch Date", placeholder: "e.g. April 30, 2026" },
      { type: "textarea", name: "deadlines", label: "Any Hard Deadlines?", placeholder: "Events, campaigns, or dates we should know about" },
      { type: "textarea", name: "important_dates", label: "Important Dates or Notes", placeholder: "Anything else about timing that would be helpful" },
    ],
  },
];

const inputClasses =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors";

const selectClasses =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-[14px] text-slate-900 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors [&>option]:bg-[#0a0a1a] [&>option]:text-slate-900";

export default function OnboardingPage() {
  const { businessName, tier } = useBusiness();
  const visibleSections = SECTIONS.filter(
    (s) => !s.tiers || s.tiers.includes(tier)
  );
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["business_basics"])
  );
  const [sectionData, setSectionData] = useState<Record<string, Record<string, unknown>>>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load existing submissions
  useEffect(() => {
    let cancelled = false;
    fetch("/api/onboarding")
      .then((r) => r.json())
      .then((res) => {
        if (cancelled || !res.submissions) return;
        const dataMap: Record<string, Record<string, unknown>> = {};
        const done = new Set<string>();
        type Sub = { section: string; data: Record<string, unknown>; completed: boolean };
        (res.submissions as Sub[]).forEach((sub) => {
          dataMap[sub.section] = sub.data || {};
          if (sub.completed) done.add(sub.section);
        });
        setSectionData(dataMap);
        setCompletedSections(done);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const updateField = useCallback(
    (sectionId: string, fieldName: string, value: unknown) => {
      setSectionData((prev) => ({
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [fieldName]: value,
        },
      }));
    },
    []
  );

  const toggleCheckbox = useCallback(
    (sectionId: string, fieldName: string, option: string) => {
      setSectionData((prev) => {
        const current = (prev[sectionId]?.[fieldName] as string[]) || [];
        const next = current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option];
        return {
          ...prev,
          [sectionId]: {
            ...(prev[sectionId] || {}),
            [fieldName]: next,
          },
        };
      });
    },
    []
  );

  const saveSection = useCallback(
    async (sectionId: string) => {
      setSavingSection(sectionId);
      try {
        await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            section: sectionId,
            data: sectionData[sectionId] || {},
            completed: true,
          }),
        });
      } catch (err) {
        console.error("Save failed:", err);
      }
      setCompletedSections((prev) => new Set(prev).add(sectionId));
      setSavingSection(null);
      setSavedSection(sectionId);
      setTimeout(() => setSavedSection(null), 2000);
    },
    [sectionData]
  );

  const completedCount = completedSections.size;
  const totalCount = visibleSections.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const allComplete = totalCount > 0 && completedCount === totalCount;

  const submitForReview = useCallback(async () => {
    setSubmitting(true);
    try {
      await fetch("/api/onboarding/submit", { method: "POST" });
      setSubmitted(true);
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Project Onboarding</h1>
          <span className="rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa]">
            {TIERS[tier].shortName} plan
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-slate-900/45 sm:text-[14px]">
          Tailored to your <span className="text-slate-900/65">{TIERS[tier].name}</span> build for {businessName}.
          Save as you go. No need to finish everything at once.
        </p>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-medium text-slate-700">
            {completedCount} of {totalCount} sections completed
          </span>
          <span className="text-slate-500">{progressPercent}%</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full rounded-full bg-white">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {visibleSections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const isCompleted = completedSections.has(section.id);
          const isSaving = savingSection === section.id;
          const justSaved = savedSection === section.id;
          const data = sectionData[section.id] || {};

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-slate-50 sm:p-6"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                    isCompleted
                      ? "bg-emerald-500/10"
                      : "bg-white"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <section.icon className="h-5 w-5 text-[#06b6d4]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-slate-900">
                    {section.title}
                  </p>
                  <p className="text-[12px] text-slate-500">{section.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {isCompleted && (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                      Complete
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Section body */}
              {isExpanded && (
                <div className="space-y-4 border-t border-slate-200 px-4 pb-5 pt-5 sm:px-6 sm:pb-6">
                  {section.fields.map((field) => (
                    <div key={field.name}>
                      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-400 sm:text-[12px]">
                        {field.label}
                      </label>

                      {field.type === "text" && (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={(data[field.name] as string) || ""}
                          onChange={(e) =>
                            updateField(section.id, field.name, e.target.value)
                          }
                          className={inputClasses}
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          placeholder={field.placeholder}
                          rows={3}
                          value={(data[field.name] as string) || ""}
                          onChange={(e) =>
                            updateField(section.id, field.name, e.target.value)
                          }
                          className={cn(inputClasses, "min-h-[100px] resize-none")}
                        />
                      )}

                      {field.type === "select" && (
                        <select
                          value={(data[field.name] as string) || ""}
                          onChange={(e) =>
                            updateField(section.id, field.name, e.target.value)
                          }
                          className={selectClasses}
                        >
                          <option value="">Select an option</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.type === "checkboxes" && (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {field.options.map((option) => {
                            const checked = (
                              (data[field.name] as string[]) || []
                            ).includes(option);
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  toggleCheckbox(section.id, field.name, option)
                                }
                                className={cn(
                                  "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-[13px] transition-all",
                                  checked
                                    ? "border-[#7c3aed]/40 bg-[#7c3aed]/10 text-slate-900"
                                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                                )}
                              >
                                <div
                                  className={cn(
                                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                    checked
                                      ? "border-[#7c3aed] bg-[#7c3aed]"
                                      : "border-white/[0.15] bg-transparent"
                                  )}
                                >
                                  {checked && (
                                    <Check className="h-3 w-3 text-slate-900" />
                                  )}
                                </div>
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {field.type === "file" && (
                        <div className="flex items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-slate-50 px-4 py-8 text-center transition-colors hover:border-white/[0.15] hover:bg-slate-50">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-6 w-6 text-slate-300" />
                            <p className="text-[13px] text-slate-500">
                              Drag and drop files here, or{" "}
                              <span className="cursor-pointer font-medium text-[#06b6d4]">
                                browse
                              </span>
                            </p>
                            <p className="text-[11px] text-slate-400">
                              PNG, JPG, SVG, PDF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Save button */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => saveSection(section.id)}
                      disabled={isSaving}
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] border-0 px-6 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Save Section
                        </>
                      )}
                    </button>
                    {justSaved && (
                      <span className="text-[12px] text-emerald-400">
                        Saved successfully
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit for review */}
      {submitted ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] to-[#06b6d4]/[0.05] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
                <Check className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-slate-900">
                  Onboarding submitted. One step left.
                </p>
                <p className="mt-1 text-[13px] text-slate-700">
                  Pay your 50% deposit and your build is officially queued. Refundable in the first 48 hours, plus a 7-day satisfaction guarantee.
                </p>
              </div>
            </div>
            <a
              href="/portal/deposit"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Continue to deposit
            </a>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "rounded-2xl border p-5 sm:p-6 transition-colors",
            allComplete
              ? "border-[#7c3aed]/30 bg-gradient-to-br from-[#7c3aed]/[0.08] to-[#3b82f6]/[0.04]"
              : "border-slate-200 bg-slate-50"
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-slate-900 sm:text-[15px]">
                {allComplete ? "Ready to submit" : "Almost there"}
              </p>
              <p className="mt-1 text-[12.5px] text-slate-500 sm:text-[13px]">
                {allComplete
                  ? "Send your onboarding to our team to kick off planning."
                  : `Finish ${totalCount - completedCount} more section${totalCount - completedCount === 1 ? "" : "s"} to submit your onboarding for review.`}
              </p>
            </div>
            <button
              onClick={submitForReview}
              disabled={!allComplete || submitting}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Submit for Review
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
