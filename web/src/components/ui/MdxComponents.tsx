// src/components/ui/MdxComponents.tsx
import React, { memo } from "react";
import {
  HelpCircle,
  Lightbulb,
  AlertCircle,
  Terminal,
  ClipboardCheck,
  Clock,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

// BLOCK A: INTERVIEW DIAGNOSTIC BOX
interface MdxInterviewBoxProps {
  prompt: string;
  expected: string;
}
export const MdxInterviewBox: React.FC<MdxInterviewBoxProps> = memo(
  ({ prompt, expected }) => (
    /* 💡 FIXED: Converted outer wrapper from a nested block into a structural HTML section element 
     to bypass structural HTML <p> container hydration collisions smoothly */
    <section className="w-full p-5 rounded-xl border border-border-subtle bg-gradient-to-b from-bg-secondary/40 to-bg-secondary/10 space-y-3.5 shadow-3xs my-6 normal-case text-left block">
      <div className="text-xs md:text-sm font-semibold text-text-primary flex items-start gap-2.5 leading-relaxed">
        <div className="p-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-accent-gold shrink-0 mt-0.5">
          <HelpCircle size={13} />
        </div>
        <div className="space-y-0.5">
          <span className="text-accent-gold font-mono uppercase font-bold text-[9px] tracking-widest block select-none">
            [System Design Interview Context]
          </span>
          {/* 💡 FIXED: Swapped out inner nested <p> for an inline-safe <span> wrapper */}
          <span className="font-sans text-text-primary/95 block">{prompt}</span>
        </div>
      </div>

      <div className="pt-3.5 border-t border-border-subtle/40 font-mono text-[11px] text-text-secondary leading-relaxed bg-bg-primary/40 p-4 rounded-xl border border-dashed shadow-inner block">
        <div className="flex items-center gap-1.5 text-text-muted/70 font-bold text-[9px] uppercase tracking-widest mb-1.5 select-none">
          <ClipboardCheck size={11} className="text-emerald-500/80" />
          <span>Evaluation Criteria Checklist</span>
        </div>
        <span className="font-sans text-xs text-text-secondary/90 text-justify whitespace-pre-line block">
          {expected}
        </span>
      </div>
    </section>
  ),
);
MdxInterviewBox.displayName = "MdxInterviewBox";

// BLOCK B: ANALOGY CARD
interface MdxAnalogyCardProps {
  title: string;
  children: React.ReactNode;
}
export const MdxAnalogyCard: React.FC<MdxAnalogyCardProps> = memo(
  ({ title, children }) => (
    <section className="w-full p-4.5 rounded-xl border border-blue-500/10 bg-gradient-to-r from-blue-500/[0.03] to-transparent text-text-primary/95 my-5 flex items-start gap-3.5 shadow-3xs font-sans text-xs normal-case text-left block">
      <div className="p-1.5 rounded-lg bg-bg-secondary border border-blue-500/20 text-blue-400 shrink-0 shadow-2xs select-none">
        <Lightbulb size={13} />
      </div>
      <div className="space-y-1 min-w-0 flex-1">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-blue-400/90 block select-none">
          // Real-World Analogy: {title}
        </span>
        <div className="leading-relaxed text-text-secondary/95 text-justify font-sans text-xs md:text-[13px] block">
          {children}
        </div>
      </div>
    </section>
  ),
);
MdxAnalogyCard.displayName = "MdxAnalogyCard";

// BLOCK C: COMPONENT NOTE CALLOUT
// src/components/ui/MdxComponents.tsx

interface MdxNoteProps {
  variant?: "info" | "warning" | "danger";
  children: React.ReactNode;
}
export const MdxNote: React.FC<MdxNoteProps> = memo(
  ({ variant = "info", children }) => {
    // 💎 FIXED: Defensive lookup dictionary mapping with safe fallback bindings
    const styleMap = {
      info: {
        bg: "from-blue-500/[0.02]",
        border: "border-blue-500/10",
        text: "text-blue-400",
        icon: Lightbulb,
      },
      warning: {
        bg: "from-amber-500/[0.02]",
        border: "border-amber-500/10",
        text: "text-amber-400",
        icon: AlertCircle,
      },
      danger: {
        bg: "from-red-500/[0.02]",
        border: "border-red-500/10",
        text: "text-red-400",
        icon: Terminal,
      },
    };

    // Normalize variant input string to block syntax mismatches gracefully
    const selectedVariant =
      (variant?.toLowerCase() as "info" | "warning" | "danger") || "info";
    const styles = styleMap[selectedVariant] || styleMap.info;
    const Icon = styles.icon;

    return (
      <section
        className={cn(
          "w-full p-4 rounded-xl border bg-gradient-to-r to-transparent flex gap-3 my-5 text-left text-xs normal-case block",
          styles.bg,
          styles.border,
        )}
      >
        <Icon size={14} className={cn("shrink-0 mt-0.5", styles.text)} />
        <div className="flex-1 font-sans text-text-secondary leading-relaxed block">
          {children}
        </div>
      </section>
    );
  },
);
MdxNote.displayName = "MdxNote";
// BLOCK D: COMPLEXITY BAR
interface MdxComplexityProps {
  time: string;
  space: string;
  stable?: "true" | "false";
}
export const MdxComplexity: React.FC<MdxComplexityProps> = memo(
  ({ time, space, stable = "true" }) => (
    <div className="my-5 w-full max-w-md border border-border-subtle bg-bg-secondary/40 rounded-xl p-3 flex items-center justify-between font-mono text-[11px] text-text-secondary select-none shadow-3xs normal-case">
      <div className="flex items-center gap-4 pl-1">
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-blue-400" />
          <span className="text-text-muted/60">Time:</span>
          <span className="text-text-primary font-bold">{time}</span>
        </div>
        <div className="w-[1px] h-3.5 bg-border-subtle/60" />
        <div className="flex items-center gap-1.5">
          <Layers size={12} className="text-purple-400" />
          <span className="text-text-muted/60">Space:</span>
          <span className="text-text-primary font-bold">{space}</span>
        </div>
      </div>
      <span
        className={cn(
          "px-2 py-0.5 rounded-md border text-[9px] uppercase font-bold tracking-widest",
          stable === "true"
            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
            : "bg-red-500/5 border-red-500/20 text-red-400",
        )}
      >
        {stable === "true" ? "Stable" : "Unstable"}
      </span>
    </div>
  ),
);
MdxComplexity.displayName = "MdxComplexity";

// BLOCK E: PARADIGM COMPARE TRACKS
interface MdxCompareProps {
  leftTitle: string;
  rightTitle: string;
  leftLines: string;
  rightLines: string;
}
export const MdxCompare: React.FC<MdxCompareProps> = memo(
  ({ leftTitle, rightTitle, leftLines = "", rightLines = "" }) => {
    // 💡 FIXED: Added safety fallbacks (|| "") to defend against hot-reload split operations tracking undefined strings
    const parseLines = (str: string) =>
      (str || "")
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-6 normal-case text-left text-xs block">
        <div className="border border-border-subtle bg-bg-secondary/20 rounded-xl p-4 space-y-2.5 shadow-3xs block">
          <span className="font-mono text-[9px] font-bold text-blue-400 tracking-wider block uppercase">
            // Paradigm A: {leftTitle}
          </span>
          <ul className="space-y-1.5 text-text-secondary block list-none pl-0">
            {parseLines(leftLines).map((line, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 leading-relaxed block"
              >
                <span className="text-blue-400 shrink-0">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-border-subtle bg-bg-secondary/20 rounded-xl p-4 space-y-2.5 shadow-3xs block">
          <span className="font-mono text-[9px] font-bold text-purple-400 tracking-wider block uppercase">
            // Paradigm B: {rightTitle}
          </span>
          <ul className="space-y-1.5 text-text-secondary block list-none pl-0">
            {parseLines(rightLines).map((line, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 leading-relaxed block"
              >
                <span className="text-purple-400 shrink-0">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
MdxCompare.displayName = "MdxCompare";

// BLOCK F: ARCHITECTURAL STEP NODE
interface MdxStepProps {
  index: string;
  label: string;
  children: React.ReactNode;
}
export const MdxStep: React.FC<MdxStepProps> = memo(
  ({ index, label, children }) => (
    <div className="w-full flex gap-4 my-4 normal-case text-left text-xs group block">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-6 h-6 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center font-mono text-[10px] font-bold text-text-primary shadow-3xs select-none">
          {index}
        </div>
        <div className="w-[1px] flex-1 bg-border-subtle/40 group-last:hidden mt-2 min-h-[1.5rem]" />
      </div>
      <div className="flex-1 pt-0.5 pb-2 space-y-1 block">
        <h4 className="font-sans font-semibold text-text-primary text-sm tracking-tight">
          {label}
        </h4>
        <div className="text-text-secondary leading-relaxed text-justify font-sans block">
          {children}
        </div>
      </div>
    </div>
  ),
);
MdxStep.displayName = "MdxStep";

// BLOCK G: RUNTIME METRIC CARD
interface MdxMetricProps {
  label: string;
  value: string;
  status: "optimal" | "warning" | "critical";
  desc: string;
}
export const MdxMetric: React.FC<MdxMetricProps> = memo(
  ({ label, value, status, desc }) => {
    const colorMap = {
      optimal: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
      warning: "text-amber-400 bg-amber-500/5 border-amber-500/20",
      critical: "text-red-400 bg-red-500/5 border-red-500/20",
    }[status || "optimal"];

    return (
      <div className="w-full max-w-sm p-4 rounded-xl border border-border-subtle bg-gradient-to-b from-bg-secondary/40 to-bg-secondary/10 flex items-center justify-between gap-4 my-5 normal-case text-left shadow-3xs block">
        <div className="space-y-0.5 min-w-0 block">
          <span className="font-mono text-[9px] text-text-muted/60 uppercase font-bold tracking-widest block select-none">
            Runtime Metric
          </span>
          <h4 className="font-sans font-semibold text-text-primary text-xs truncate">
            {label}
          </h4>
          <p className="font-sans text-[11px] text-text-secondary opacity-60 truncate">
            {desc}
          </p>
        </div>
        <div
          className={cn(
            "px-3 py-1.5 rounded-lg border font-mono text-xs font-bold text-center shrink-0 min-w-[4.5rem] shadow-2xs",
            colorMap,
          )}
        >
          {value}
        </div>
      </div>
    );
  },
);
MdxMetric.displayName = "MdxMetric";
