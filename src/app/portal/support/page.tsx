"use client";

import { useState, useCallback } from "react";
import {
  HelpCircle,
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
        <h1 className="text-2xl font-bold text-white/90">Support</h1>
        <p className="mt-1 text-[14px] text-white/50">
          Have a question or need help? Our team is here for you. Submit a request and we will get back to you promptly.
        </p>
      </div>

      {/* Support form */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
        <h2 className="mb-4 text-[15px] font-semibold text-white/70">
          Submit a Support Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/50">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your request"
                required
                className="h-9 w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/50">
                Category
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as "question" | "issue" | "request" | "feedback"
                  )
                }
                className="h-9 w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 text-[13px] text-white outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06] [&>option]:bg-[#0a0a1a] [&>option]:text-white"
              >
                <option value="question">Question</option>
                <option value="issue">Issue / Bug</option>
                <option value="request">Feature Request</option>
                <option value="feedback">General Feedback</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-white/50">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you need help with. Include any relevant details or context."
              rows={5}
              required
              className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/[0.15] focus:bg-white/[0.06] resize-none"
            />
          </div>

          {/* File upload placeholder */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-white/50">
              Attach a File (optional)
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
              disabled={submitting || !subject.trim() || !message.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
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
                Support request submitted — we will be in touch soon
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Past requests */}
      <div>
        <h2 className="mb-4 text-[15px] font-semibold text-white/70">
          Past Requests
        </h2>

        {requests.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                <MessageSquare className="h-6 w-6 text-white/20" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-white/60">
                  No support requests yet
                </p>
                <p className="mt-1 text-[12px] text-white/35">
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
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold text-white/90">
                        {req.subject}
                      </p>
                      <p className="mt-1 text-[12px] text-white/40 line-clamp-2">
                        {req.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/50">
                        {CATEGORY_LABELS[req.category]}
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
