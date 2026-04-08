"use client";

import { useState, useCallback } from "react";
import {
  Send,
  Upload,
  Check,
  Clock,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SupportRequest {
  id: string;
  subject: string;
  message: string;
  category: "question" | "issue" | "request" | "feedback";
  status: "open" | "in_progress" | "resolved";
  created_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  question: "Question",
  issue: "Issue",
  request: "Request",
  feedback: "Feedback",
};

const STATUS_CONFIG = {
  open: { label: "Open", icon: Clock, style: "bg-amber-500/10 text-amber-400" },
  in_progress: { label: "In Progress", icon: AlertCircle, style: "bg-blue-500/10 text-blue-400" },
  resolved: { label: "Resolved", icon: Check, style: "bg-emerald-500/10 text-emerald-400" },
};

const inputClasses =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors";

const selectClasses =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-[14px] text-slate-900 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20 transition-colors [&>option]:bg-[#0a0a1a] [&>option]:text-slate-900";

export default function SupportPage() {
  const [requests] = useState<SupportRequest[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<"question" | "issue" | "request" | "feedback">("question");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!subject.trim() || !message.trim()) return;
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 600));
      setSubmitting(false);
      setSubmitted(true);
      setSubject("");
      setMessage("");
      setCategory("question");
      setTimeout(() => setSubmitted(false), 3000);
    },
    [subject, message]
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Support</h1>
        <p className="mt-1 text-[13px] text-slate-900/45 sm:text-[14px]">
          Have a question or need help? Our team is here for you. Submit a request and we will get back to you promptly.
        </p>
      </div>

      {/* Support form */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="mb-5 text-[15px] font-semibold text-slate-700">
          Submit a Support Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-400 sm:text-[12px]">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your request"
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-400 sm:text-[12px]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as "question" | "issue" | "request" | "feedback"
                  )
                }
                className={selectClasses}
              >
                <option value="question">Question</option>
                <option value="issue">Issue / Bug</option>
                <option value="request">Feature Request</option>
                <option value="feedback">General Feedback</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-400 sm:text-[12px]">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you need help with. Include any relevant details or context."
              rows={5}
              required
              className={cn(inputClasses, "min-h-[100px] resize-none")}
            />
          </div>

          {/* File upload */}
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-400 sm:text-[12px]">
              Attach a File (optional)
            </label>
            <div className="flex items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-slate-50 px-4 py-6 text-center transition-colors hover:border-white/[0.15] hover:bg-slate-50">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-5 w-5 text-slate-300" />
                <p className="text-[13px] text-slate-500">
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
              disabled={submitting || !subject.trim() || !message.trim()}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] border-0 px-6 text-[13px] font-semibold text-slate-900 transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send Request
                </>
              )}
            </button>
            {submitted && (
              <span className="text-[12px] text-emerald-400">
                Sent. We&apos;ll respond within one business day
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Past requests */}
      <div>
        <h2 className="mb-4 text-[15px] font-semibold text-slate-700">
          Past Requests
        </h2>

        {requests.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 py-14 text-center sm:p-6 sm:py-14">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <MessageSquare className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-slate-500">
                  No support requests yet
                </p>
                <p className="mt-1 text-[12px] text-slate-900/35">
                  When you reach out, your conversation history will appear here.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => {
              const statusConfig = STATUS_CONFIG[req.status];
              return (
                <div
                  key={req.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-slate-900">
                        {req.subject}
                      </p>
                      <p className="mt-1 text-[12px] text-slate-500 line-clamp-2">
                        {req.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                        {CATEGORY_LABELS[req.category]}
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
