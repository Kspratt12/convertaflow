"use client";

import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projectSteps = [
  { label: "Consultation complete", status: "done" },
  { label: "Brand assets received", status: "done" },
  { label: "Design in progress", status: "current" },
  { label: "Client review & revisions", status: "pending" },
  { label: "Development & build", status: "pending" },
  { label: "Testing & QA", status: "pending" },
  { label: "Launch", status: "pending" },
];

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Project Status</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">Track your website build progress.</p>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[14px] font-semibold">Build Timeline</CardTitle>
            <Badge className="text-[11px]">In Progress</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {projectSteps.map((step, i) => (
              <div key={step.label} className="flex items-start gap-3 relative">
                {/* Connector line */}
                {i < projectSteps.length - 1 && (
                  <div className={`absolute left-[9px] top-6 w-px h-full ${step.status === "done" ? "bg-primary/30" : "bg-border/50"}`} />
                )}
                {/* Icon */}
                <div className="relative z-10 mt-0.5 shrink-0">
                  {step.status === "done" ? (
                    <CheckCircle2 className="h-[18px] w-[18px] text-primary" />
                  ) : step.status === "current" ? (
                    <Clock className="h-[18px] w-[18px] text-amber-500" />
                  ) : (
                    <Circle className="h-[18px] w-[18px] text-muted-foreground/30" />
                  )}
                </div>
                {/* Label */}
                <div className="pb-6">
                  <p className={`text-[13px] font-medium ${step.status === "done" ? "text-foreground" : step.status === "current" ? "text-amber-600" : "text-muted-foreground/50"}`}>
                    {step.label}
                  </p>
                  {step.status === "current" && (
                    <p className="text-[11px] text-amber-500/70 mt-0.5">Estimated completion: 2 days</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Plan", value: "Website + Business Systems" },
            { label: "Delivery", value: "7–10 business days" },
            { label: "Revisions used", value: "1 of 5" },
            { label: "Started", value: "Apr 2, 2026" },
            { label: "Est. launch", value: "Apr 12, 2026" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium">Need to discuss something?</p>
            <p className="text-[12px] text-muted-foreground">Reach out to your project manager.</p>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5">
            Contact Support
            <ArrowRight className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
