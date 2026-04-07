"use client";

import { useMemo, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  FileText,
  File,
  Palette,
  FolderOpen,
  CloudUpload,
  Video,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusiness } from "@/components/dashboard/business-provider";
import { hasVideoUploads } from "@/lib/tier";
import { TIERS } from "@/lib/constants";

interface CategoryDef {
  id: string;
  label: string;
  icon: typeof FolderOpen;
  /** If true, only available on plans where hasVideoUploads is true */
  videoTier?: boolean;
  description: string;
  accept: string;
}

const ALL_CATEGORIES: CategoryDef[] = [
  { id: "all", label: "All Files", icon: FolderOpen, description: "Everything you've uploaded so far.", accept: "*" },
  { id: "logos", label: "Logos", icon: Palette, description: "Vector or high-res logo files.", accept: "image/*,.svg,.ai,.eps,.pdf" },
  { id: "photos", label: "Photos", icon: ImageIcon, description: "Product, location, team, and lifestyle photos.", accept: "image/*" },
  { id: "documents", label: "Documents", icon: FileText, description: "Written copy, brand guidelines, briefs.", accept: ".pdf,.doc,.docx,.txt,.md" },
  { id: "brand", label: "Brand Files", icon: File, description: "Style guides, source files, design exports.", accept: "*" },
  { id: "videos", label: "Videos", icon: Video, videoTier: true, description: "Footage and reference clips for social automation.", accept: "video/*" },
  { id: "other", label: "Other", icon: File, description: "Anything else we should have.", accept: "*" },
];

export default function UploadsPage() {
  const { tier } = useBusiness();
  const videosAllowed = hasVideoUploads(tier);

  const categories = useMemo(
    () => ALL_CATEGORIES.filter((c) => !c.videoTier || videosAllowed),
    [videosAllowed]
  );

  const [activeCategory, setActiveCategory] = useState("all");
  const active = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-white/90 sm:text-2xl">Uploads</h1>
          <span className="rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a78bfa]">
            {TIERS[tier].shortName} plan
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-white/45 sm:text-[14px]">
          Share your logos, photos, brand files, {videosAllowed ? "videos, " : ""}and any other assets our team needs.
        </p>
      </div>

      {/* Upload area */}
      <div className="rounded-2xl border-2 border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-10 text-center transition-colors hover:border-white/[0.15] hover:bg-white/[0.03] sm:p-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed]/15 to-[#3b82f6]/15">
            <CloudUpload className="h-7 w-7 text-[#06b6d4]" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-white/80">
              Drag and drop {active.label.toLowerCase()} here
            </p>
            <p className="mt-1 text-[13px] text-white/40">
              or{" "}
              <span className="cursor-pointer font-medium text-[#06b6d4] hover:underline">
                browse your computer
              </span>
            </p>
          </div>
          <p className="text-[11px] text-white/30">
            {active.description}
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all",
                isActive
                  ? "bg-white/[0.1] text-white border border-white/[0.12]"
                  : "bg-white/[0.03] text-white/50 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/70"
              )}
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
              {cat.videoTier && (
                <Crown className="h-3 w-3 text-[#f59e0b]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 py-16 text-center sm:p-6 sm:py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
            <Upload className="h-6 w-6 text-white/30" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-white/50">No files uploaded yet</p>
            <p className="mt-1 text-[12px] text-white/35">
              Upload your assets above to get started.
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade nudge for non-video tiers */}
      {!videosAllowed && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10">
              <Video className="h-4 w-4 text-[#a78bfa]" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white/80">
                Want to upload video content?
              </p>
              <p className="mt-0.5 text-[12px] text-white/45">
                Video uploads are part of the Scale and Engine plans for clients running social automation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
