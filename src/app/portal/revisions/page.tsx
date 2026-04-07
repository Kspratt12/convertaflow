"use client";

import { useState, useCallback } from "react";
import {
  Edit3,
  Send,
  Check,
  Clock,
  AlertCircle,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusiness } from "@/components/dashboard/business-provider";
import { TIERS } from "@/lib/constants";

interface RevisionRequest {
  id: string;
  title: string;
  description: string;
  page_or_section: string;
  priority: "low" | "normal" | "high";
  status: "pending" | "in_progress" | "completed";
  created_at: string;
}

const PRIORITY_STYLES = {
  low: "bg-blue-500/10 text-blue-400",
  normal: "bg-white/[0.06] text-white/60",
  high: "bg-amber-500/10 text-amber-400",
};

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, style: "bg-amber-500/10 text-amber-400" },
  in_progress: { label: "In Progress", icon: AlertCircle, style: "bg-blue-500/10 text-blue-400" },
  completed: { label: "Completed", icon: Check, style: "bg-emerald-500/10 text-emerald-400" },
};

const inputClasses =
  "w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors";

const selectClasses =
  "w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-[14px] text-white focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors [&>option]:bg-[#0a0a1a] [&>option]:text-white";

export default function RevisionsPage() {
  const { tier } = useBusiness();
  const tierConfig = TIERS[tier];
  const revisionsAvailable = tierConfig.revisions;

  const [revisions] = useState<RevisionRequest[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pageOrSection, setPageOrSection] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !description.trim()) return;
      setSubmitting(true);
      // Simulate API call
      await new Promise((r) => setTimeout(r, 600));
      setSubmitting(false);
      setSubmitted(true);
      setTitle("");
      setDescription("");
      setPageOrSection("");
      setPriority("normal");
      setTimeout(() => setSubmitted(false), 3000);
    },
    [title, description]
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-white/90 sm:text-2xl">Revisions</h1>
          <span className="rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa]">
            {tierConfig.shortName} plan
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-white/45 sm:text-[14px]">
          Request changes to your design. You have <span className="text-white/65">{revisionsAvailable} revisions</span> included with your plan.
        </p>
      </div>

      {/* Revision form */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <h2 className="mb-5 text-[15px] font-semibold text-white/70">
          Submit a Revision Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/30 sm:text-[12px]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Update hero section headline"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/30 sm:text-[12px]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the change you'd like in detail. The more specific, the faster we can deliver."
              rows={4}
              required
              className={cn(inputClasses, "min-h-[100px] resize-none")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/30 sm:text-[12px]">
                Page or Section
              </label>
              <input
                type="text"
                value={pageOrSection}
                onChange={(e) => setPageOrSection(e.target.value)}
                placeholder="e.g. Home page, About section"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/30 sm:text-[12px]">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "normal" | "high")
                }
                className={selectClasses}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* File upload */}
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/30 sm:text-[12px]">
              Attach a Screenshot (optional)
            </label>
            <div className="flex items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] px-4 py-6 text-center transition-colors hover:border-white/[0.15] hover:bg-white/[0.03]">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-5 w-5 text-white/20" />
                <p className="text-[13px] text-white/40">
                  Drag and drop or{" "}
                  <span className="cursor-pointer font-medium text-[#06b6d4]">
                    browse
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting || !title.trim() || !description.trim()}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] border-0 px-6 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Submit Revision
                </>
              )}
            </button>
            {submitted && (
              <span className="text-[12px] text-emerald-400">
                Submitted — we&apos;ll start on this shortly
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Past revisions */}
      <div>
        <h2 className="mb-4 text-[15px] font-semibold text-white/70">
          Past Requests
        </h2>

        {revisions.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 py-14 text-center sm:p-6 sm:py-14">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                <Edit3 className="h-6 w-6 text-white/30" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-white/50">
                  No revision requests yet
                </p>
                <p className="mt-1 text-[12px] text-white/35">
                  Once your design is in progress, you can submit revision requests here.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {revisions.map((rev) => {
              const statusConfig = STATUS_CONFIG[rev.status];
              return (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-white/90">
                        {rev.title}
                      </p>
                      <p className="mt-1 text-[12px] text-white/40">
                        {rev.description}
                      </p>
                      {rev.page_or_section && (
                        <p className="mt-1 text-[11px] text-white/30">
                          Section: {rev.page_or_section}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
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
