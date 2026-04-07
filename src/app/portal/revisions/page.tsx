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
        <h1 className="text-2xl font-bold text-white/90">Revisions</h1>
        <p className="mt-1 text-[14px] text-white/50">
          Request changes to your design. You have {revisionsAvailable} revisions included with your plan.
        </p>
      </div>

      {/* Revision form */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
        <h2 className="mb-4 text-[15px] font-semibold text-white/70">
          Submit a Revision Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-white/50">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Update hero section headline"
              required
              className="h-9 w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-white/50">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the change you'd like in detail. The more specific, the faster we can deliver."
              rows={4}
              required
              className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06] resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/50">
                Page or Section
              </label>
              <input
                type="text"
                value={pageOrSection}
                onChange={(e) => setPageOrSection(e.target.value)}
                placeholder="e.g. Home page, About section"
                className="h-9 w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/50">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "normal" | "high")
                }
                className="h-9 w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 text-[13px] text-white outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06] [&>option]:bg-[#0a0a1a] [&>option]:text-white"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* File upload placeholder */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-white/50">
              Attach a Screenshot (optional)
            </label>
            <div className="flex items-center justify-center rounded-lg border border-dashed border-white/[0.1] bg-white/[0.02] px-4 py-4 text-center">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-white/30" />
                <p className="text-[12px] text-white/40">
                  Drag and drop or{" "}
                  <span className="font-medium text-[#06b6d4] cursor-pointer">
                    browse
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={submitting || !title.trim() || !description.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
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
                Revision request submitted successfully
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
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                <Edit3 className="h-6 w-6 text-white/20" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-white/60">
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
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
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
                          "rounded-full px-2.5 py-1 text-[11px] font-medium",
                          PRIORITY_STYLES[rev.priority]
                        )}
                      >
                        {rev.priority}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
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
