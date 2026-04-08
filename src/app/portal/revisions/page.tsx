"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Edit3,
  Send,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusiness } from "@/components/dashboard/business-provider";
import { TIERS } from "@/lib/constants";

interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  page_or_section: string | null;
  priority: "low" | "normal" | "high";
  status: "pending" | "in_progress" | "completed";
  created_at: string;
}

const PRIORITY_STYLES = {
  low: "bg-blue-500/10 text-blue-600",
  normal: "bg-slate-100 text-slate-600",
  high: "bg-amber-500/10 text-amber-600",
};

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, style: "bg-amber-500/10 text-amber-600" },
  in_progress: { label: "In Progress", icon: AlertCircle, style: "bg-blue-500/10 text-blue-600" },
  completed: { label: "Completed", icon: Check, style: "bg-emerald-500/10 text-emerald-600" },
};

const inputClasses =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors";

const selectClasses =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-[14px] text-slate-900 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ChangeRequestsPage() {
  const { tier } = useBusiness();
  const tierConfig = TIERS[tier];

  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pageOrSection, setPageOrSection] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");
  const [changeSize, setChangeSize] = useState<"small" | "medium" | "large">("small");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/revisions", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setRequests(data.requests ?? []);
    } catch {
      // silent — empty state will show
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !description.trim()) return;

      setSubmitting(true);
      setError("");

      try {
        const res = await fetch("/api/revisions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            pageOrSection: pageOrSection.trim(),
            priority,
            changeSize,
          }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setError(data.error || "Couldn't submit your request. Please try again.");
          setSubmitting(false);
          return;
        }

        setTitle("");
        setDescription("");
        setPageOrSection("");
        setPriority("normal");
        setChangeSize("small");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        await refresh();
      } catch {
        setError("Connection issue. Please check your internet and try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [title, description, pageOrSection, priority, changeSize, refresh]
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Request a Change</h1>
          <span className="rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7c3aed]">
            {tierConfig.shortName} plan
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-slate-500 sm:text-[14px]">
          Need to update your hours, swap a photo, add a holiday banner, or
          tweak some text? Submit a request below and we&apos;ll handle it{" "}
          <span className="font-semibold text-slate-700">{tierConfig.sla.toLowerCase()}</span>.
        </p>
      </div>

      {/* Three sizes of changes — set expectations up front */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-emerald-700">
            Small change
          </p>
          <p className="mt-1.5 text-[13px] font-semibold text-slate-900">
            Included with your plan
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
            Text edits, image swaps, hours, contact info, holiday banners. Anything under 30 min of work.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-blue-700">
            Medium change
          </p>
          <p className="mt-1.5 text-[13px] font-semibold text-slate-900">
            We&apos;ll quote it back to you
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
            New buttons, new sections, video swaps, layout tweaks. Usually $50 to $150. We&apos;ll confirm before any work.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-amber-700">
            Larger change
          </p>
          <p className="mt-1.5 text-[13px] font-semibold text-slate-900">
            Quoted separately
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
            New pages, full redesigns, new integrations. Starting at $200. Tell us what you want and we&apos;ll send a quote.
          </p>
        </div>
      </div>

      {/* Request form */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="mb-5 text-[15px] font-semibold text-slate-700">
          Submit a Change Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-[12px]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Update holiday hours, Add Black Friday banner"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-[12px]">
              How big is this change?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["small", "medium", "large"] as const).map((size) => {
                const active = changeSize === size;
                const labels = {
                  small: { title: "Small", sub: "Included" },
                  medium: { title: "Medium", sub: "Quoted" },
                  large: { title: "Larger", sub: "Quoted" },
                };
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setChangeSize(size)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition-colors",
                      active
                        ? "border-[#7c3aed] bg-[#7c3aed]/5"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <p className={cn("text-[13px] font-semibold", active ? "text-[#7c3aed]" : "text-slate-900")}>
                      {labels[size].title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{labels[size].sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-[12px]">
              What would you like changed?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the change in detail. The more specific, the faster we can deliver. Example: 'Change our hours on the Contact page to Mon-Fri 9-6, closed weekends.'"
              rows={5}
              required
              className={cn(inputClasses, "min-h-[120px] resize-none")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-[12px]">
                Where is it?
              </label>
              <input
                type="text"
                value={pageOrSection}
                onChange={(e) => setPageOrSection(e.target.value)}
                placeholder="e.g. Home page, Contact page"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:text-[12px]">
                How urgent?
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "normal" | "high")
                }
                className={selectClasses}
              >
                <option value="low">Low, whenever you can</option>
                <option value="normal">Normal, within SLA</option>
                <option value="high">High, time-sensitive</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting || !title.trim() || !description.trim()}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] border-0 px-6 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Submit Request
                </>
              )}
            </button>
            {submitted && (
              <span className="text-[12px] font-medium text-emerald-600">
                ✓ Got it. We&apos;ll get back to you {tierConfig.sla.toLowerCase()}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Past requests */}
      <div>
        <h2 className="mb-4 text-[15px] font-semibold text-slate-700">
          Your past requests
        </h2>

        {loadingList ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-[13px] text-slate-500">Loading…</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 py-14 text-center sm:p-6 sm:py-14">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Edit3 className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-slate-700">
                  No change requests yet
                </p>
                <p className="mt-1 text-[12px] text-slate-500">
                  Anything you submit above will show up here so you can track its status.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((rev) => {
              const statusConfig = STATUS_CONFIG[rev.status];
              return (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-slate-900">
                        {rev.title}
                      </p>
                      <p className="mt-1 text-[12px] text-slate-600 whitespace-pre-wrap">
                        {rev.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                        {rev.page_or_section && (
                          <span>📍 {rev.page_or_section}</span>
                        )}
                        <span>🕐 {formatDate(rev.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize",
                          PRIORITY_STYLES[rev.priority]
                        )}
                      >
                        {rev.priority}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                          statusConfig.style
                        )}
                      >
                        <statusConfig.icon className="h-3 w-3" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
