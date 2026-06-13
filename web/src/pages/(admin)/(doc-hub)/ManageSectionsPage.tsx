// src/pages/(admin)/doc-hub/ManageSectionsPage.tsx
import React, { useState, useEffect, useMemo, memo } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// 💎 BIND CENTRALIZED STATE HOOK MATRIX WITH INLINE UPDATE ENGINES
import { useLearnStore, type SectionType } from "@/store/learn.store";
import CommandModal from "@/components/ui/CommandModal";

export const ManageSectionsPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  // Bind reactive values and update/delete actions cleanly out of our centralized store
  const { topics, getTopicById, updateSection, deleteSection } =
    useLearnStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isPurging, setIsPurging] = useState(false);
  const [updatingSectionId, setUpdatingSectionId] = useState<string | null>(
    null,
  );
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);

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

  // 💎 INLINE TYPE TOGGLE ENGINE DISPATCH LOOP
  const handleToggleSectionType = async (
    sectionId: string,
    currentType: SectionType,
  ) => {
    if (!topicId) return;

    // Core array sequence rotation matching structural type variants
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

  return (
    <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased select-none relative max-w-5xl mx-auto px-4 py-4">
      {/* 1. HIGH-DENSITY NAVIGATION CRUMB HUD LINK RAILS */}
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

      {/* 2. FUTURISTIC HUD TOOL CENTER PANEL RAIL */}
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

      {/* 3. CORE DISPLAY SECTIONS MATRIX WORKSPACE */}
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
                {/* Visual Left Accent Identifier Cord */}
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

                    {/* 💎 INTERACTIVE INLINE TYPE MUTATOR BUTTON BADGE OVERLAY */}
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

                  {/* Monospaced Markdown Text preview row window */}
                  <div className="text-[11px] text-text-secondary leading-relaxed line-clamp-1 font-mono opacity-85 select-text bg-black/30 p-2.5 rounded-xl border border-border-subtle/30 truncate max-w-3xl">
                    {section.content?.value ||
                      (typeof section.content === "string"
                        ? section.content
                        : "// Character token data stream fully compiled.")}
                  </div>
                </div>

                <div className="flex items-center shrink-0 select-none">
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

      {/* 4. DISMISS BLOCK DESTRUCTIVE SAFETY SHIELD */}
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
