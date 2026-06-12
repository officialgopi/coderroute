// src/pages/(admin)/doc-hub/CreateSectionPage.tsx
import React, { useState, memo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  Loader2,
  BookOpen,
  ChevronRight,
  Eye,
  Edit3,
  HelpCircle as InterviewIcon,
  Lightbulb as AnalogyIcon,
  AlertTriangle as NoteIcon,
  Clock as ComplexityIcon,
  Columns as CompareIcon,
  Milestone as StepIcon,
  Activity as MetricIcon,
  Plus,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Quote,
  List,
  ListOrdered,
  Table,
  Code,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import MdxRenderer from "@/components/ui/MdxRenderer";

export const CreateSectionPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Core administrative control properties
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [bodyText, setBodyText] = useState("");

  // DOM node tracking loop anchor for code/tag quick-injections
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Text insertion compiler engine
  const injectMdxSnippet = (snippet: string, label: string) => {
    const textarea = textareaRef.current || document.querySelector("textarea");
    if (!textarea) {
      setBodyText((prev) => `${prev}\n${snippet}\n`);
      return;
    }

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const currentText = textarea.value;

    const updatedText =
      currentText.substring(0, startPos) +
      snippet +
      currentText.substring(endPos, currentText.length);

    setBodyText(updatedText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startPos + snippet.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);

    toast.success(`${label} template inserted.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim())
      return toast.error("Please supply a block identifier subtitle.");
    if (!bodyText.trim())
      return toast.error("Curriculum literature content cannot be empty.");

    try {
      setIsSubmitting(true);
      // Simulate pipeline cluster stream execution: POST {{baseUrl}}/admin/sections
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Content payload committed and deployed successfully.");
      navigate(`/admin-panel/dochub/topics/${topicId}/sections`);
    } catch {
      toast.error("Failed to commit curriculum structure additions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Standard Markdown elements mapping tokens array
  const standardTokens = [
    {
      label: "H1",
      icon: Heading1,
      color: "text-text-primary border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\n# Heading 1\n",
    },
    {
      label: "H2",
      icon: Heading2,
      color: "text-text-primary border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\n## Heading 2\n",
    },
    {
      label: "H3",
      icon: Heading3,
      color: "text-text-primary border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\n### Heading 3\n",
    },
    {
      label: "Paragraph",
      icon: Type,
      color:
        "text-text-secondary border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\nWrite standard context paragraph details here...\n",
    },
    {
      label: "Blockquote",
      icon: Quote,
      color: "text-amber-500/80 border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\n> Insert structured reference blockquote lines here...\n",
    },
    {
      label: "Code Block",
      icon: Code,
      color: "text-purple-400 border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\n```c\n// Enter raw execution kernels here\n```\n",
    },
    {
      label: "Unordered List",
      icon: List,
      color: "text-blue-400 border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\n* List item alpha\n* List item beta\n",
    },
    {
      label: "Ordered List",
      icon: ListOrdered,
      color: "text-cyan-400 border-border-subtle hover:bg-bg-secondary/40",
      snippet: "\n1. Step priority alpha\n2. Step priority beta\n",
    },
    {
      label: "Table Matrix",
      icon: Table,
      color: "text-pink-400 border-border-subtle hover:bg-bg-secondary/40",
      snippet:
        "\n| System Parameter | Bounds Value | Operational Status |\n| :--- | :--- | :--- |\n| Memory Page Frame | 4096 Bytes | Optimal |\n",
    },
  ];

  // Custom CoderRoute premium presentation platform component tokens array
  const customMdxTokens = [
    {
      label: "Interview Box",
      icon: InterviewIcon,
      color: "text-amber-400 border-amber-500/10 hover:bg-amber-500/5",
      snippet: `\n<mdxinterviewbox \n  prompt="Enter technical query prompt scenario here..." \n  expected="Detail specific validation metrics solution checking bounds..." \n/>\n`,
    },
    {
      label: "Analogy Card",
      icon: AnalogyIcon,
      color: "text-blue-400 border-blue-500/10 hover:bg-blue-500/5",
      snippet: `\n<mdxanalogycard title="Enter Concept Title">\n  Describe a real-world relational analogy scenario cleanly here...\n</mdxanalogycard>\n`,
    },
    {
      label: "Callout Note",
      icon: NoteIcon,
      color: "text-emerald-400 border-emerald-500/10 hover:bg-emerald-500/5",
      snippet: `\n<mdxnote variant="warning">\n  <strong>Attention Guard:</strong> Insert system constraint parameter alerts here...\n</mdxnote>\n`,
    },
    {
      label: "Complexity Badge",
      icon: ComplexityIcon,
      color: "text-purple-400 border-purple-500/10 hover:bg-purple-500/5",
      snippet: `\n<mdxcomplexity time="O(N)" space="O(1)" stable="true" />\n`,
    },
    {
      label: "Paradigm Matrix",
      icon: CompareIcon,
      color: "text-pink-400 border-pink-500/10 hover:bg-pink-500/5",
      snippet: `\n<mdxcompare \n  leftTitle="Paradigm Alpha" \n  leftLines="Attribute Line One | Attribute Line Two" \n  rightTitle="Paradigm Beta" \n  rightLines="Counterpoint Parameter One | Counterpoint Parameter Two" \n/>\n`,
    },
    {
      label: "System Step",
      icon: StepIcon,
      color: "text-cyan-400 border-cyan-500/10 hover:bg-cyan-500/5",
      snippet: `\n<mdxstep index="1" label="Initialization Phase">\n  Detail the system tracing blueprint layer processing here...\n</mdxstep>\n`,
    },
    {
      label: "Telemetry Metric",
      icon: MetricIcon,
      color: "text-indigo-400 border-indigo-500/10 hover:bg-indigo-500/5",
      snippet: `\n<mdxmetric \n  label="Thread Allocation Rate" \n  value="87.4%" \n  status="optimal" \n  desc="Monitors runtime load balances across current hardware stacks" \n/>\n`,
    },
  ];

  return (
    <div className="w-full mx-auto space-y-6 font-sans text-xs text-text-primary antialiased select-none pb-12">
      {/* HEADER TRACK HIERARCHY NAVIGATION CRUMBS */}
      <div className="flex items-center justify-between pl-0.5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary">
          <Link
            to={`/admin-panel/dochub/topics/${topicId}/sections`}
            className="hover:text-accent-gold transition-colors inline-flex items-center gap-1 group"
          >
            <ChevronLeft
              size={11}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>Return to Blocks</span>
          </Link>
          <ChevronRight size={10} className="opacity-40" />
          <span className="text-accent-gold font-bold">
            Write Section Block
          </span>
        </div>
      </div>

      {/* CORE FORM WRAPPER BOX */}
      <div className="w-full border border-border-subtle bg-gradient-to-b from-bg-secondary/30 to-bg-secondary/5 rounded-2xl shadow-3xs backdrop-blur-md overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="divide-y divide-border-subtle/60"
        >
          {/* ADMINISTRATIVE SCHEMATIC CONFIG FIELDS */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-text-muted font-mono text-[10px] font-medium uppercase tracking-wider block">
                  Block Subtitle Header
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Core Context Loops & Thread Execution Priorities"
                  className="w-full h-9 px-3 bg-bg-primary/40 border border-border-subtle rounded-xl text-text-primary text-[11px] font-mono focus:outline-hidden focus:border-text-primary/30 transition-all shadow-3xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-text-muted font-mono text-[10px] font-medium uppercase tracking-wider block">
                  Sequence Priority Index
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full h-9 px-3 bg-bg-primary/40 border border-border-subtle rounded-xl text-text-primary text-[11px] font-mono focus:outline-hidden focus:border-text-primary/30 transition-all shadow-3xs"
                />
              </div>
            </div>
          </div>

          {/* DUAL-AXIS INJECTION TOOLBAR SECTION */}
          <div className="px-6 py-4 bg-bg-secondary/20 border-b border-border-subtle/40 grid grid-cols-1 xl:grid-cols-5 gap-4 xl:divide-x divide-border-subtle/40 select-none">
            {/* Left Column: Markdown Elements */}
            <div className="xl:col-span-2 space-y-2">
              <span className="font-mono text-[9px] font-bold tracking-widest text-text-muted block uppercase">
                // Core Typography Elements
              </span>
              <div className="flex flex-wrap gap-1.5">
                {standardTokens.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => injectMdxSnippet(btn.snippet, btn.label)}
                      className={cn(
                        "h-7 px-2 border rounded-lg font-mono text-[10px] flex items-center gap-1 transition-all duration-150 cursor-pointer shadow-3xs bg-bg-primary/40",
                        btn.color,
                      )}
                    >
                      <Icon size={11} />
                      <span>{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Platform Custom Components */}
            <div className="xl:col-span-3 xl:pl-4 space-y-2">
              <span className="font-mono text-[9px] font-bold tracking-widest text-accent-gold/80 block uppercase">
                // Platform Interactive Blocks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {customMdxTokens.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => injectMdxSnippet(btn.snippet, btn.label)}
                      className={cn(
                        "h-7 px-2.5 border rounded-lg font-mono text-[10px] flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-3xs bg-bg-primary/50",
                        btn.color,
                      )}
                    >
                      <Plus size={9} className="opacity-40" />
                      <Icon size={11} />
                      <span>{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SPLIT WORKSPACE: UNIFIED TEXT EDITOR PANELS AND REAL-TIME COMPILER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b divide-y lg:divide-y-0 lg:divide-x divide-border-subtle/60 h-auto lg:h-[34rem] bg-bg-primary/10">
            {/* LEFT INPUT BLOCK PANEL: EXCLUSIVE CORE TEXTAREA WORKSPACE */}
            <div className="p-6 space-y-3 h-auto lg:h-full lg:overflow-hidden flex flex-col justify-start">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary font-bold uppercase tracking-wider select-none mb-1 shrink-0">
                <Edit3 size={12} />
                <span>Workspace Canvas Input</span>
              </div>

              <div className="space-y-2 flex-1 flex flex-col min-h-0">
                <label className="text-text-muted font-medium flex items-center gap-1.5 select-none font-mono shrink-0">
                  <BookOpen size={12} className="text-blue-400" /> Technical
                  Text Streams Engine
                </label>
                <MarkdownEditor
                  value={bodyText}
                  onChange={(md: string) => setBodyText(md)}
                  placeholder="Utilize standard markdown formatting tokens combined with platform tags instantly..."
                  className="flex-1 min-h-0"
                  textareaRef={textareaRef}
                  hideInternalPreview={true}
                />
              </div>
            </div>

            {/* RIGHT COMPILER PANEL BLOCK: LIVE ISOLATED PREVIEW DECK */}
            <div className="p-6 space-y-4 h-auto lg:h-full lg:overflow-hidden bg-bg-secondary/5 flex flex-col justify-start">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary font-bold uppercase tracking-wider select-none mb-1 shrink-0">
                <Eye size={12} className="text-accent-gold animate-pulse" />
                <span>Real-Time Ingestion Preview</span>
              </div>

              <div className="flex-1 min-h-0 h-full w-full max-w-full overflow-x-hidden overflow-y-auto custom-scrollbar bg-bg-primary/40 border border-border-subtle/50 rounded-xl p-5 shadow-inner select-text">
                {bodyText.trim() ? (
                  <div className="w-full max-w-full overflow-x-auto overflow-y-visible break-words clear-both">
                    <MdxRenderer content={bodyText} />
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center font-mono text-[10px] text-text-muted/40 italic text-center py-12 select-none">
                    // Blank live runtime pipeline stream. Start typing or
                    inject templates to review output.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* WORKSPACE ACTION SUBMIT FOOTER BAR */}
          <div className="p-6 bg-bg-secondary/20 flex items-center justify-between gap-4 font-mono text-[10px]">
            <div className="text-text-muted/60 max-w-sm hidden sm:block">
              // Verify code block traces and tag indentation bounds on the
              execution deck before deploying.
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full sm:w-auto h-9 px-6 bg-text-primary text-bg-primary rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-3xs active:scale-[0.97] transition-transform pt-0.5"
            >
              {isSubmitting ? (
                <Loader2 size={12} className="animate-spin text-bg-primary" />
              ) : (
                <>
                  <span>Commit Content Payload</span>
                  <ChevronRight size={11} strokeWidth={2.5} />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateSectionPage);
