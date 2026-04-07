"use client";

import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  FileText,
  File,
  Palette,
  FolderOpen,
  CloudUpload,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Files", icon: FolderOpen },
  { id: "logos", label: "Logos", icon: Palette },
  { id: "photos", label: "Photos", icon: ImageIcon },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "brand", label: "Brand Files", icon: File },
  { id: "other", label: "Other", icon: File },
];

export default function UploadsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white/90">Uploads</h1>
        <p className="mt-1 text-[14px] text-white/50">
          Share your logos, photos, brand files, and any other assets our team needs to bring your project to life.
        </p>
      </div>

      {/* Upload area */}
      <div className="rounded-2xl border-2 border-dashed border-white/[0.1] bg-white/[0.02] p-10 text-center transition-colors hover:border-white/[0.15] hover:bg-white/[0.03]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed]/15 to-[#3b82f6]/15">
            <CloudUpload className="h-7 w-7 text-[#06b6d4]" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-white/80">
              Drag and drop files here
            </p>
            <p className="mt-1 text-[13px] text-white/40">
              or{" "}
              <span className="cursor-pointer font-medium text-[#06b6d4] hover:underline">
                browse your computer
              </span>
            </p>
          </div>
          <p className="text-[11px] text-white/30">
            Supports PNG, JPG, SVG, PDF, AI, PSD, ZIP up to 50MB per file
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all",
              activeCategory === cat.id
                ? "bg-white/[0.1] text-white border border-white/[0.12]"
                : "bg-white/[0.03] text-white/50 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/70"
            )}
          >
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
            <Upload className="h-6 w-6 text-white/20" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-white/60">No files uploaded yet</p>
            <p className="mt-1 text-[12px] text-white/35">
              Upload your brand assets, photos, and documents above to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
