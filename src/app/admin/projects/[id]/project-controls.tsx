"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Send,
  Trash2,
  Plus,
  Loader2,
  CheckCircle2,
  Eye,
  Globe,
  LayoutDashboard,
  LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECT_STATUSES, type ProjectStatus } from "@/lib/project-status";

interface DeliveryLink {
  id: string;
  label: string;
  url: string;
  link_type: "preview" | "live" | "dashboard" | "other";
  notes: string | null;
  created_at: string;
}

interface ProjectControlsProps {
  businessId: string;
  currentStatus: string;
  currentNotes: string;
  deliveryLinks: DeliveryLink[];
}

const TYPE_ICONS = {
  preview: Eye,
  live: Globe,
  dashboard: LayoutDashboard,
  other: LinkIcon,
};

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20";

const selectClass = `${inputClass} [&>option]:bg-[#0a0a1a]`;

export function ProjectControls({
  businessId,
  currentStatus,
  currentNotes,
  deliveryLinks: initialLinks,
}: ProjectControlsProps) {
  const router = useRouter();

  // Status form
  const [status, setStatus] = useState<ProjectStatus>(currentStatus as ProjectStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [savingStatus, setSavingStatus] = useState(false);
  const [statusSaved, setStatusSaved] = useState(false);
  const [statusEmailFired, setStatusEmailFired] = useState(false);

  // Delivery links
  const [links, setLinks] = useState<DeliveryLink[]>(initialLinks);
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkType, setLinkType] = useState<DeliveryLink["link_type"]>("preview");
  const [linkNotes, setLinkNotes] = useState("");
  const [linkNotify, setLinkNotify] = useState(true);
  const [savingLink, setSavingLink] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  async function saveStatus(e: React.FormEvent) {
    e.preventDefault();
    setSavingStatus(true);
    setStatusSaved(false);
    setStatusEmailFired(false);
    try {
      const res = await fetch("/api/project/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, status, notes }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatusSaved(true);
        setStatusEmailFired(!!data.emailFired);
        router.refresh();
        setTimeout(() => setStatusSaved(false), 3000);
      }
    } finally {
      setSavingStatus(false);
    }
  }

  async function addLink(e: React.FormEvent) {
    e.preventDefault();
    if (!linkLabel.trim() || !linkUrl.trim()) return;
    setSavingLink(true);
    setLinkError(null);
    try {
      const res = await fetch("/api/admin/delivery-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          label: linkLabel,
          url: linkUrl,
          link_type: linkType,
          notes: linkNotes || null,
          notify: linkNotify,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLinkError(data.error || "Failed to add link");
      } else if (data.link) {
        setLinks((prev) => [data.link, ...prev]);
        setLinkLabel("");
        setLinkUrl("");
        setLinkNotes("");
        setLinkType("preview");
      }
    } finally {
      setSavingLink(false);
    }
  }

  async function deleteLink(id: string) {
    if (!confirm("Delete this delivery link?")) return;
    const res = await fetch(`/api/admin/delivery-links?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Status update */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#06b6d4]" />
          <h2 className="text-[14px] font-semibold text-white/90">Project Status</h2>
        </div>
        <p className="mt-1 text-[12px] text-white/45">
          Advancing the status auto-fires the matching email event to the client.
        </p>

        <form onSubmit={saveStatus} className="mt-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className={selectClass}
            >
              {PROJECT_STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} ({s.percent}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Update note (visible to client)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="What's the latest update? This shows on their portal project page and in any triggered email."
              className={`${inputClass} min-h-[80px] resize-none`}
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={savingStatus}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {savingStatus ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Update Status
                </>
              )}
            </button>
            {statusSaved && (
              <span className="inline-flex items-center gap-1 text-[12px] text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Saved{statusEmailFired ? " · email fired" : ""}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Delivery links */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-[#06b6d4]" />
          <h2 className="text-[14px] font-semibold text-white/90">Delivery Links</h2>
        </div>
        <p className="mt-1 text-[12px] text-white/45">
          Preview, live site, and dashboard URLs the client can access.
        </p>

        {/* Existing links */}
        {links.length > 0 && (
          <div className="mt-4 space-y-2">
            {links.map((link) => {
              const Icon = TYPE_ICONS[link.link_type];
              return (
                <div
                  key={link.id}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-white/85">
                      {link.label}
                    </p>
                    <p className="truncate text-[11px] text-white/35">{link.url}</p>
                  </div>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    aria-label="Delete link"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Add new link */}
        <form onSubmit={addLink} className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={linkLabel}
              onChange={(e) => setLinkLabel(e.target.value)}
              placeholder="Label (e.g. Live Site)"
              required
              className={inputClass}
            />
            <select
              value={linkType}
              onChange={(e) => setLinkType(e.target.value as DeliveryLink["link_type"])}
              className={selectClass}
            >
              <option value="preview">Preview</option>
              <option value="live">Live Site</option>
              <option value="dashboard">Dashboard</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://…"
            type="url"
            required
            className={inputClass}
          />
          <input
            value={linkNotes}
            onChange={(e) => setLinkNotes(e.target.value)}
            placeholder="Optional note"
            className={inputClass}
          />

          <label className="flex items-center gap-2 text-[12px] text-white/60">
            <input
              type="checkbox"
              checked={linkNotify}
              onChange={(e) => setLinkNotify(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/20 bg-white/10"
            />
            Email the client to notify them this link is ready
          </label>

          {linkError && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/[0.05] px-3 py-2 text-[12px] text-red-300">
              {linkError}
            </div>
          )}

          <button
            type="submit"
            disabled={savingLink || !linkLabel.trim() || !linkUrl.trim()}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            )}
          >
            {savingLink ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Adding…
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                Add Delivery Link
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
