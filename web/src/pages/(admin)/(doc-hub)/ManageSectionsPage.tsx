// src/pages/(admin)/doc-hub/ManageSectionsPage.tsx
import React, { useState, useEffect, useMemo, memo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  BookOpen,
  Terminal,
  HelpCircle,
  ChevronRight,
  Trash2,
  AlertCircle,
  Loader2,
  FileCode,
  Cpu,
  Sparkles,
  Hash,
  RefreshCw,
  Layers,
  Edit3,
  ChevronLeft,
  Eye,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Quote,
  List,
  ListOrdered,
  Table,
  Code,
  CornerDownRight,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// 💎 BIND CENTRALIZED STATE HOOK MATRIX WITH INLINE UPDATE ENGINES
import {
  useLearnStore,
  type SectionType,
  type ITopicSection,
} from "@/store/learn.store";
import CommandModal from "@/components/ui/CommandModal";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import MdxRenderer from "@/components/ui/MdxRenderer";

export const ManageSectionsPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  // Bind reactive values and update/delete actions cleanly out of our centralized store
  const { topics, getTopicById, updateSection, deleteSection } =
    useLearnStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [updatingSectionId, setUpdatingSectionId] = useState<string | null>(
    null,
  );
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);

  // 💎 WORKSPACE VIEW CONTROLLER STATE MATRICES
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<ITopicSection | null>(
    null,
  );
  const [editTitle, setEditTitle] = useState("");
  const [editOrder, setEditOrder] = useState(1);
  const [editBodyText, setEditBodyText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync state data engine map loops on component mount
  useEffect(() => {
    if (!topicId) return;
    const orchestrateDataHydration = async () => {
      try {
        setIsLoading(true);
        await getTopicById(topicId);
      } catch {
        toast.error("Failed to recover target element array sequences.");
      } finally {
        setIsLoading(false);
      }
    };
    orchestrateDataHydration();
  }, [topicId, getTopicById]);

  // REACTIVE DATA MATCHING: Extracts child slices from the active store topic map
  const activeTopic = useMemo(() => topics[topicId || ""], [topics, topicId]);

  const sectionsList = useMemo(() => {
    if (!activeTopic?.sections) return [];
    return [...activeTopic.sections].sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    );
  }, [activeTopic]);

  // INLINE TYPE TOGGLE ENGINE DISPATCH LOOP
  const handleToggleSectionType = async (
    sectionId: string,
    currentType: SectionType,
  ) => {
    if (!topicId) return;
    const navigate = useNavigate();
    const typeSequence: SectionType[] = [
      "THEORY",
      "EXAMPLE",
      "ANALOGY",
      "DIAGRAM",
      "INTERVIEW",
      "REVISION",
    ];
    const currentIndex = typeSequence.indexOf(currentType);
    const nextType =
      typeSequence[(currentIndex + 1) % typeSequence.length] || "THEORY";

    try {
      setUpdatingSectionId(sectionId);
      const success = await updateSection(topicId, sectionId, {
        type: nextType,
      });
      if (success) {
        toast.success(
          `Section layout shifted to ${nextType} format parameters.`,
        );
      } else {
        toast.error("Failed to compile layout modifications.");
      }
    } catch {
      toast.error("An unexpected execution block interruption occurred.");
    } finally {
      setUpdatingSectionId(null);
    }
  };

  // 💎 ROUTE TO SPLIT WORKSPACE CANVAS FOR UPDATE ACTIONS
  const handleStartEditing = (section: ITopicSection) => {
    setEditingSection(section);
    setEditTitle(section.title);
    setEditOrder(section.order ?? 1);
    setEditBodyText(
      section.content?.value ||
        (typeof section.content === "string" ? section.content : ""),
    );
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditingSection(null);
    setEditTitle("");
    setEditBodyText("");
  };

  // 💎 SUBMIT WORKSPACE MODIFICATIONS TO SERVERS DOWNSTREAM
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicId || !editingSection) return;
    if (!editTitle.trim())
      return toast.error("Please supply a block identifier subtitle.");
    if (!editBodyText.trim())
      return toast.error("Curriculum literature content cannot be empty.");

    try {
      setIsSubmitting(true);
      const success = await updateSection(topicId, editingSection.id, {
        title: editTitle.trim(),
        order: editOrder,
        content: { value: editBodyText },
      });

      if (success) {
        toast.success("Syllabus segment configurations committed cleanly.");
        handleCancelEditing();
      } else {
        toast.error("Server cluster rejected mutation block payload.");
      }
    } catch {
      toast.error("An unexpected execution pipeline interruption occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!topicId) return;
    try {
      setIsPurging(true);
      const success = await deleteSection(topicId, id);

      if (success) {
        toast.success(
          "Content block section dropped successfully from roadmap logs.",
        );
        setSectionToDelete(null);
      } else {
        toast.error(
          "Failed to drop segment data entries from database backend.",
        );
      }
    } catch {
      toast.error(
        "An unexpected transactional pipeline mutation error occurred.",
      );
    } finally {
      setIsPurging(false);
    }
  };

  // Snippet template insertion routine inside editor canvas
  const injectMdxSnippet = (snippet: string, label: string) => {
    const textarea = textareaRef.current || document.querySelector("textarea");
    if (!textarea) {
      setEditBodyText((prev) => `${prev}\n${snippet}\n`);
      return;
    }
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const currentText = textarea.value;

    const updatedText =
      currentText.substring(0, startPos) +
      snippet +
      currentText.substring(endPos, currentText.length);

    setEditBodyText(updatedText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startPos + snippet.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);

    toast.success(`${label} template inserted.`);
  };
  const navigate = useNavigate();
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

  const customMdxTokens = [
    {
      label: "Interview Box",
      icon: HelpCircle,
      color: "text-amber-400 border-amber-500/10 hover:bg-amber-500/5",
      snippet: `\n<mdxinterviewbox \n  prompt="Enter technical query prompt scenario here..." \n  expected="Detail specific validation metrics solution checking bounds..." \n/>\n`,
    },
    {
      label: "Analogy Card",
      icon: Sparkles,
      color: "text-blue-400 border-blue-500/10 hover:bg-blue-500/5",
      snippet: `\n<mdxanalogycard title="Enter Concept Title">\n  Describe a real-world relational analogy scenario cleanly here...\n</mdxanalogycard>\n`,
    },
    {
      label: "Callout Note",
      icon: AlertCircle,
      color: "text-emerald-400 border-emerald-500/10 hover:bg-emerald-500/5",
      snippet: `\n<mdxnote variant="warning">\n  <strong>Attention Guard:</strong> Insert system constraint parameter alerts here...\n</mdxnote>\n`,
    },
    {
      label: "Complexity Badge",
      icon: Cpu,
      color: "text-purple-400 border-purple-500/10 hover:bg-purple-500/5",
      snippet: `\n<mdxcomplexity time="O(N)" space="O(1)" stable="true" />\n`,
    },
  ];

  /* -------------------------------------------------------------------------- */
  /* DYNAMIC RENDER MODE BLOCK: WORKSPACE EDITOR PREVIEW OVERLAY INTERFACE       */
  /* -------------------------------------------------------------------------- */
  if (isEditing) {
    return (
      <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased select-none relative max-w-5xl mx-auto px-4 py-4">
        {/* HEADER BREADCRUMBS CONTROL CHANNELS */}
        <div className="flex items-center justify-between pl-0.5 select-none">
          <button
            type="button"
            onClick={handleCancelEditing}
            className="font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary hover:text-accent-gold transition-colors inline-flex items-center gap-1 cursor-pointer bg-transparent border-none outline-hidden"
          >
            <ChevronLeft size={11} />
            <span>Abort Modifications</span>
          </button>
        </div>

        {/* WORKSPACE DECK */}
        <div className="w-full border border-border-subtle bg-gradient-to-b from-bg-secondary/30 to-bg-secondary/5 rounded-2xl shadow-2xs backdrop-blur-md overflow-hidden">
          <form
            onSubmit={handleUpdateSubmit}
            className="divide-y divide-border-subtle/60"
          >
            {/* FIELDS ENTRY NODE GRIDS */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-text-muted font-sans text-[10px] font-bold uppercase tracking-wider block select-none">
                    Block Subtitle Header
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs focus:outline-hidden transition-all shadow-inner font-sans font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-text-muted font-sans text-[10px] font-bold uppercase tracking-wider block select-none">
                    Sequence Priority Index
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editOrder}
                    onChange={(e) => setEditOrder(Number(e.target.value))}
                    className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs focus:outline-hidden transition-all shadow-inner font-mono"
                  />
                </div>
              </div>
            </div>

            {/* HIGH DENSITY TOOLBAR */}
            <div className="px-6 py-4 bg-bg-secondary/20 border-b border-border-subtle/40 grid grid-cols-1 xl:grid-cols-5 gap-5 xl:divide-x divide-border-subtle/40 select-none">
              <div className="xl:col-span-2 space-y-2">
                <span className="font-mono text-[9px] font-black tracking-widest text-text-muted block uppercase opacity-80">
                  // Typography Templates
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
                          "h-7 px-2 border rounded-lg font-mono text-[9px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-3xs bg-bg-primary/50 active:scale-95 select-none",
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

              <div className="xl:col-span-3 xl:pl-5 space-y-2">
                <span className="font-mono text-[9px] font-black tracking-widest text-accent-gold block uppercase">
                  // Interactive Custom Components
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
                          "h-7 px-2.5 border rounded-lg font-mono text-[9px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-3xs bg-bg-primary/60 active:scale-95 select-none",
                          btn.color,
                        )}
                      >
                        <Plus size={8} className="opacity-40" />
                        <Icon size={11} />
                        <span>{btn.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CONTENT SPLIT CANVAS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-b divide-y lg:divide-y-0 lg:divide-x divide-border-subtle/60 h-auto lg:h-[35rem] bg-bg-primary/5">
              <div className="p-6 space-y-3 h-auto lg:h-full lg:overflow-hidden flex flex-col justify-start">
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest text-text-secondary uppercase select-none mb-1 shrink-0">
                  <Edit3 size={11} />
                  <span>Update Canvas Framework Workspace</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col min-h-0">
                  <label className="text-text-muted font-bold flex items-center gap-1.5 select-none font-sans text-[10px] uppercase tracking-wider shrink-0">
                    <BookOpen size={12} className="text-blue-400" /> Content
                    Data Input Strings
                  </label>
                  <div className="flex-1 min-h-0 border border-border-subtle bg-black/20 rounded-xl overflow-hidden shadow-inner">
                    <MarkdownEditor
                      value={editBodyText}
                      onChange={(md: string) => setEditBodyText(md)}
                      placeholder="Modify parameters abstract text..."
                      className="h-full w-full font-mono text-xs text-text-primary"
                      textareaRef={textareaRef}
                      hideInternalPreview={true}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-3 h-auto lg:h-full lg:overflow-hidden bg-bg-secondary/5 flex flex-col justify-start">
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest text-text-secondary uppercase select-none mb-1 shrink-0">
                  <Eye size={11} className="text-accent-gold animate-pulse" />
                  <span>Real-Time Ingestion Preview</span>
                </div>
                <div className="flex-1 min-h-0 h-full w-full max-w-full overflow-x-hidden overflow-y-auto custom-scrollbar bg-bg-primary/40 border border-border-subtle/50 rounded-xl p-5 shadow-inner select-text">
                  {editBodyText.trim() ? (
                    <div className="w-full max-w-full overflow-x-auto overflow-y-visible break-words clear-both">
                      <MdxRenderer content={editBodyText} />
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-mono text-[9px] tracking-widest text-text-muted/40 italic text-center py-12 select-none">
                      // Blank live runtime pipeline stream preview.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SAVE ACTION SUBMIT CONTROL FOOTER BAR */}
            <div className="p-5 bg-bg-secondary/10 flex items-center justify-between gap-4 font-mono text-[9px] select-none">
              <div className="text-text-muted/50 max-w-sm hidden sm:block tracking-wide">
                // Review tag structural formatting and indentation closures
                carefully on the deck before merging changes.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCancelEditing}
                  className="w-1/2 sm:w-auto h-9 px-4 rounded-xl border border-border-subtle text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 transition-all font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer active:scale-95 outline-hidden"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-1/2 sm:w-auto h-9 px-5 bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-700 disabled:text-neutral-400 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all pt-0.5 cursor-pointer border-none outline-hidden"
                >
                  {isSubmitting ? (
                    <Loader2 size={13} className="animate-spin text-black" />
                  ) : (
                    <>
                      <span>Save Modifications</span>
                      <Save size={12} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* DEFAULT DISPLAY MODE RENDER: LIST OVERVIEW GRID CONTROLS MATRIX           */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased select-none relative max-w-5xl mx-auto px-4 py-4">
      {/* HIGH-DENSITY NAVIGATION CRUMB HUD LINK RAILS */}
      <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary pl-0.5 select-none">
        <Link
          to="/admin-panel/dochub/subjects"
          className="hover:text-accent-gold transition-colors inline-flex items-center gap-1"
        >
          <Layers size={10} />
          <span>Subjects</span>
        </Link>
        <ChevronRight size={10} className="opacity-30" />
        <span className="text-text-secondary opacity-60">
          Topic context:{" "}
          <span className="text-text-primary font-medium select-text">
            {activeTopic?.title || topicId?.slice(0, 8)}
          </span>
        </span>
        <ChevronRight size={10} className="opacity-30" />
        <span className="text-accent-gold tracking-widest font-black">
          Content Blocks
        </span>
      </div>

      {/* FUTURISTIC HUD TOOL CENTER PANEL RAIL */}
      <div className="w-full p-5 rounded-2xl border border-border-subtle bg-gradient-to-r from-bg-secondary/40 via-bg-secondary/20 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-80" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center text-accent-gold shadow-md shadow-black/40 ring-1 ring-white/5">
            <Cpu size={16} className="animate-pulse" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest uppercase text-text-muted">
              <Sparkles size={9} className="text-accent-gold" />
              <span>Layout Content Matrices</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-text-primary tracking-tight uppercase font-mono">
              Polymorphic Article Core Blocks
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(`/admin-panel/dochub/topics/${topicId}/sections/create`)
          }
          className="h-9 px-5 bg-white text-black hover:bg-neutral-200 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 rounded-xl cursor-pointer shrink-0 border-none outline-hidden"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Add Block Section</span>
        </button>
      </div>

      {/* MATRIX DISPLAY BLOCK */}
      {isLoading ? (
        <div className="space-y-4 max-w-4xl">
          {[...Array(3)].map((_, i) => (
            <div
              key={`section-skeleton-${i}`}
              className="h-20 w-full bg-bg-secondary/10 border border-border-subtle rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : sectionsList.length === 0 ? (
        <div className="w-full py-24 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-text-muted opacity-50 bg-bg-secondary/5 tracking-wide">
          // No architectural block modules configured inside this lesson sheet
          track entry.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
          }}
          className="space-y-4 max-w-4xl"
        >
          {sectionsList.map((section) => {
            const isThisUpdating = updatingSectionId === section.id;

            return (
              <motion.div
                key={section.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ x: 4 }}
                className="w-full p-5 rounded-2xl border border-border-subtle bg-bg-secondary/10 hover:bg-bg-secondary/20 transition-all duration-200 flex items-center justify-between gap-6 shadow-2xs backdrop-blur-xs relative overflow-hidden group"
              >
                <div
                  className={cn(
                    "absolute top-0 left-0 bottom-0 w-[3px] bg-border-subtle transition-colors duration-300",
                    section.type === "THEORY" && "group-hover:bg-blue-500",
                    section.type === "EXAMPLE" && "group-hover:bg-purple-500",
                    section.type === "INTERVIEW" && "group-hover:bg-amber-500",
                  )}
                />

                <div className="space-y-2 min-w-0 flex-1 pl-1">
                  <div className="flex items-center gap-2.5 flex-wrap select-none">
                    {section.type === "THEORY" && (
                      <BookOpen size={13} className="text-blue-400" />
                    )}
                    {section.type === "EXAMPLE" && (
                      <Terminal size={13} className="text-purple-400" />
                    )}
                    {section.type === "INTERVIEW" && (
                      <HelpCircle size={13} className="text-amber-400" />
                    )}
                    {!["THEORY", "EXAMPLE", "INTERVIEW"].includes(
                      section.type,
                    ) && <FileCode size={13} className="text-cyan-400" />}

                    <h4 className="font-bold text-xs sm:text-sm tracking-tight text-text-primary truncate max-w-xs sm:max-w-md select-text">
                      {section.title}
                    </h4>

                    <button
                      type="button"
                      disabled={isThisUpdating}
                      onClick={() =>
                        handleToggleSectionType(section.id, section.type)
                      }
                      className={cn(
                        "h-5 px-2 rounded font-mono text-[7px] font-black tracking-widest uppercase flex items-center gap-1 border transition-all cursor-pointer bg-bg-primary/70 shadow-3xs select-none active:scale-95 disabled:opacity-40 shrink-0",
                        section.type === "THEORY" &&
                          "text-blue-400 border-blue-500/20 hover:bg-blue-500/5",
                        section.type === "EXAMPLE" &&
                          "text-purple-400 border-purple-500/20 hover:bg-purple-500/5",
                        section.type === "INTERVIEW" &&
                          "text-amber-400 border-amber-500/20 hover:bg-amber-500/5",
                        !["THEORY", "EXAMPLE", "INTERVIEW"].includes(
                          section.type,
                        ) &&
                          "text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/5",
                      )}
                      title="Click to cycle polymorphic layout matrix modules"
                    >
                      {isThisUpdating ? (
                        <Loader2
                          size={8}
                          className="animate-spin text-accent-gold"
                        />
                      ) : (
                        <RefreshCw size={6} className="opacity-50" />
                      )}
                      <span>{section.type}</span>
                    </button>

                    <span className="font-mono text-[8px] font-black tracking-wider opacity-40 text-text-muted shrink-0 ml-auto">
                      <Hash size={7} className="inline mr-0.5" />
                      NODE: {section.order}
                    </span>
                  </div>

                  <div className="text-[11px] text-text-secondary leading-relaxed line-clamp-1 font-mono opacity-85 select-text bg-black/30 p-2.5 rounded-xl border border-border-subtle/30 truncate max-w-3xl">
                    {section.content?.value ||
                      (typeof section.content === "string"
                        ? section.content
                        : "// Character token data stream fully compiled.")}
                  </div>
                </div>

                {/* CONTROLS HOVER DECK CONTAINER */}
                <div className="flex items-center gap-2 shrink-0 select-none">
                  <button
                    type="button"
                    onClick={() => handleStartEditing(section)}
                    className="h-7.5 w-7.5 rounded-xl border border-border-subtle bg-bg-primary text-text-secondary hover:text-accent-gold hover:border-accent-gold/20 transition-all flex items-center justify-center cursor-pointer shadow-3xs shrink-0 active:scale-95 outline-hidden"
                    title="Open workspace editor split panel"
                  >
                    <Edit3 size={11} />
                  </button>

                  <button
                    type="button"
                    disabled={isThisUpdating}
                    onClick={() => setSectionToDelete(section.id)}
                    className="h-7.5 w-7.5 rounded-xl border border-transparent hover:border-red-500/20 bg-bg-secondary/40 text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center cursor-pointer shadow-3xs shrink-0 disabled:opacity-40 active:scale-95 outline-hidden"
                    title="Purge layout section element"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* DISMISS SAFETY SHIELD MODAL */}
      <AnimatePresence>
        {sectionToDelete && (
          <CommandModal
            open={!!sectionToDelete}
            onClose={() => setSectionToDelete(null)}
          >
            <div className="p-6 space-y-4 w-full font-sans text-xs bg-bg-primary/95 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

              <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] font-bold uppercase border-b border-border-subtle/80 pb-3 select-none">
                <AlertCircle size={14} />
                <span>Security Checkpoint Exception</span>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed select-text font-medium">
                Are you completely sure you want to drop this dynamic section
                node? This action directly rewrites the active reader rendering
                sequence and public runtime logs.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-3 font-mono text-[10px] font-bold uppercase select-none">
                <button
                  type="button"
                  onClick={() => setSectionToDelete(null)}
                  className="h-8.5 px-4 rounded-xl border border-border-subtle text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 transition-all cursor-pointer active:scale-[0.97] outline-hidden"
                >
                  Abort
                </button>
                <button
                  type="button"
                  disabled={isPurging}
                  onClick={() =>
                    sectionToDelete && handleDeleteSection(sectionToDelete)
                  }
                  className="h-8.5 px-4 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors flex items-center justify-center min-w-[6.5rem] cursor-pointer shadow-sm shadow-red-900/20 active:scale-[0.97] outline-hidden border-none"
                >
                  {isPurging ? (
                    <Loader2 size={11} className="animate-spin text-white" />
                  ) : (
                    <span>Purge Element</span>
                  )}
                </button>
              </div>
            </div>
          </CommandModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ManageSectionsPage);
