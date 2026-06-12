// src/components/ui/MarkdownEditor.tsx
import React, { useState, memo } from "react";
import {
  Eye,
  Code2,
  HelpCircle,
  Terminal,
  HelpCircle as InterviewIcon,
  Lightbulb,
  AlertTriangle,
  Clock,
  Columns,
  Milestone,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MdxRenderer from "./MdxRenderer";

interface MarkdownEditorProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  textareaRef?:
    | React.RefObject<HTMLTextAreaElement | null>
    | React.MutableRefObject<HTMLTextAreaElement | null>;
  hideInternalPreview?: boolean;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  placeholder,
  value,
  onChange,
  className,
  textareaRef,
  hideInternalPreview = false,
}) => {
  const [activeTab, setActiveTab] = useState<"WRITE" | "PREVIEW">("WRITE");

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-border-subtle bg-bg-secondary/10 overflow-hidden flex flex-col h-full min-h-0 relative",
        className,
      )}
    >
      {/* 💎 UNIFIED HEADER CONTROL STRIP */}
      <div className="h-10 px-3 bg-bg-secondary/40 border-b border-border-subtle/60 flex items-center justify-between select-none shrink-0 w-full">
        {/* Left Side: Editorial Navigation Tabs (Only if not hidden) */}
        <div className="flex items-center gap-1">
          {!hideInternalPreview ? (
            <>
              <button
                type="button"
                onClick={() => setActiveTab("WRITE")}
                className={cn(
                  "h-7 px-2.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer",
                  activeTab === "WRITE"
                    ? "bg-bg-primary text-accent-gold border border-border-subtle"
                    : "text-text-secondary",
                )}
              >
                <Code2 size={11} />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("PREVIEW")}
                className={cn(
                  "h-7 px-2.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer",
                  activeTab === "PREVIEW"
                    ? "bg-bg-primary text-accent-gold border border-border-subtle"
                    : "text-text-secondary",
                )}
              >
                <Eye size={11} />
                <span>Preview</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary font-bold uppercase tracking-wider pl-1 select-none">
              <Terminal size={11} className="text-text-muted" />
              <span>Workspace Input Buffer</span>
            </div>
          )}
        </div>

        {/* 💎 RIGHT SIDE: INTERACTIVE HOVER CHEATSHEET INFO PORTAL */}
        <div className="relative group/help">
          <button
            type="button"
            className="h-7 px-2.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all text-text-muted hover:text-text-primary bg-bg-primary/40 border border-border-subtle/60 hover:border-border-subtle cursor-help"
          >
            <HelpCircle
              size={12}
              className="text-accent-gold group-hover/help:rotate-12 transition-transform"
            />
            <span>MDX Guide</span>
          </button>

          {/* FLOATING HOVER WINDOW CANVAS */}
          <div className="absolute right-0 top-8 w-[24rem] sm:w-[28rem] bg-bg-canvas border border-border-subtle rounded-xl p-4 shadow-xl pointer-events-none opacity-0 scale-95 group-hover/help:pointer-events-auto group-hover/help:opacity-100 group-hover/help:scale-100 transition-all duration-200 z-50 font-sans text-left normal-case">
            <div className="border-b border-border-subtle pb-2 mb-3">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-gold">
                // Platform MDX Components Guide
              </h4>
              <p className="text-[11px] text-text-secondary opacity-60 mt-0.5">
                Copy/paste these tags directly into the text streams canvas
                engine.
              </p>
            </div>

            <div className="space-y-3.5 max-h-[22rem] overflow-y-auto custom-scrollbar pr-1">
              {/* Token 1: Interview Box */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-amber-400">
                  <InterviewIcon size={11} />{" "}
                  <span>&lt;mdxinterviewbox /&gt;</span>
                </div>
                <pre className="p-2 bg-bg-primary/60 border border-border-subtle/50 rounded-lg text-[9px] font-mono text-text-secondary/80 select-all overflow-x-auto">
                  {`<mdxinterviewbox 
  prompt="Enter technical query prompt scenario..." 
  expected="Detail specific validation metrics..." 
/>`}
                </pre>
              </div>

              {/* Token 2: Analogy Card */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-blue-400">
                  <Lightbulb size={11} /> <span>&lt;mdxanalogycard /&gt;</span>
                </div>
                <pre className="p-2 bg-bg-primary/60 border border-border-subtle/50 rounded-lg text-[9px] font-mono text-text-secondary/80 select-all overflow-x-auto">
                  {`<mdxanalogycard title="Concept Title">
  Describe a real-world analogy cleanly here...
</mdxanalogycard>`}
                </pre>
              </div>

              {/* Token 3: Callout Note */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-400">
                  <AlertTriangle size={11} /> <span>&lt;mdxnote /&gt;</span>
                </div>
                <pre className="p-2 bg-bg-primary/60 border border-border-subtle/50 rounded-lg text-[9px] font-mono text-text-secondary/80 select-all overflow-x-auto">
                  {`<mdxnote variant="warning">
  <strong>Attention Guard:</strong> Insert system constraint parameter alerts...
</mdxnote>`}
                </pre>
                <span className="text-[9px] font-mono text-text-muted/60 block pl-0.5">
                  Variants supported: "info" | "warning" | "danger"
                </span>
              </div>

              {/* Token 4: Complexity Badge */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-purple-400">
                  <Clock size={11} /> <span>&lt;mdxcomplexity /&gt;</span>
                </div>
                <pre className="p-2 bg-bg-primary/60 border border-border-subtle/50 rounded-lg text-[9px] font-mono text-text-secondary/80 select-all overflow-x-auto">
                  {`<mdxcomplexity time="O(N)" space="O(1)" stable="true" />`}
                </pre>
              </div>

              {/* Token 5: Paradigm Compare Matrix */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-pink-400">
                  <Columns size={11} /> <span>&lt;mdxcompare /&gt;</span>
                </div>
                <pre className="p-2 bg-bg-primary/60 border border-border-subtle/50 rounded-lg text-[9px] font-mono text-text-secondary/80 select-all overflow-x-auto">
                  {`<mdxcompare 
  leftTitle="Paradigm Alpha" leftLines="Line One | Line Two" 
  rightTitle="Paradigm Beta" rightLines="Counter One | Counter Two" 
/>`}
                </pre>
                <span className="text-[9px] font-mono text-text-muted/60 block pl-0.5">
                  Separate attributes using pipe lines symbol ("|")
                </span>
              </div>

              {/* Token 6: System Step */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-cyan-400">
                  <Milestone size={11} /> <span>&lt;mdxstep /&gt;</span>
                </div>
                <pre className="p-2 bg-bg-primary/60 border border-border-subtle/50 rounded-lg text-[9px] font-mono text-text-secondary/80 select-all overflow-x-auto">
                  {`<mdxstep index="1" label="Phase Name">
  Detail the system tracing layer processing here...
</mdxstep>`}
                </pre>
              </div>

              {/* Token 7: Telemetry Metric */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-indigo-400">
                  <Activity size={11} /> <span>&lt;mdxmetric /&gt;</span>
                </div>
                <pre className="p-2 bg-bg-primary/60 border border-border-subtle/50 rounded-lg text-[9px] font-mono text-text-secondary/80 select-all overflow-x-auto">
                  {`<mdxmetric 
  label="Thread Allocation Rate" value="87.4%" 
  status="optimal" desc="Monitors runtime load balances..." 
/>`}
                </pre>
                <span className="text-[9px] font-mono text-text-muted/60 block pl-0.5">
                  Status values supported: "optimal" | "warning" | "critical"
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE INPUT STREAMS VIEWPORT */}
      <div className="w-full flex-1 flex flex-col bg-bg-primary/20 min-h-0">
        {activeTab === "WRITE" || hideInternalPreview ? (
          <textarea
            ref={textareaRef as any}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full flex-1 p-4 bg-transparent font-mono text-xs text-text-primary placeholder:text-text-muted/30 focus:outline-hidden leading-relaxed resize-none h-full min-h-0"
          />
        ) : (
          <div className="w-full flex-1 p-5 bg-bg-primary/5 overflow-y-auto select-text max-h-full custom-scrollbar">
            <MdxRenderer content={value} />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MarkdownEditor);
