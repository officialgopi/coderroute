// src/pages/(admin)/dochub/ManageChaptersPage.tsx
import React, { useState, useEffect, useMemo, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  ChevronRight,
  ArrowRight,
  Trash2,
  Layers,
  Loader2,
  AlertCircle,
  Cpu,
  Sparkles,
  Hash,
  CornerDownRight,
  Edit3,
  BookOpen,
  Bookmark,
  FileCode,
} from "lucide-react";
import { toast } from "sonner";

import { useLearnStore } from "@/store/learn.store";
import CommandModal from "@/components/ui/CommandModal";

export const ManageChaptersPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  // Ingest reactive state structures and asynchronous dispatch action channels
  const {
    subjects,
    chapters: storeChapters,
    getSubjects,
    getSubjectById,
    createChapter,
    updateChapter,
    deleteChapter,
  } = useLearnStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState<string | null>(null);

  // ADMINISTRATIVE ACTIVE EDIT FRAME TRACKER TARGET
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);

  // Unified Form Entry state variables
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [order, setOrder] = useState(1);

  // Synchronize layout indices and fetch structural mapping boundaries on mount
  useEffect(() => {
    if (!subjectId) return;
    const orchestrateDataHydration = async () => {
      try {
        setIsLoading(true);
        await getSubjects();
        await getSubjectById(subjectId);
      } catch {
        toast.error("Failed to map target operational module indices.");
      } finally {
        setIsLoading(false);
      }
    };
    orchestrateDataHydration();
  }, [subjectId, getSubjects, getSubjectById]);

  // DATA RE-AGGREGATION LOOKUP: Flattens normalized map nodes to reactive sorted arrays
  const filteredChapters = useMemo(() => {
    if (!subjectId) return [];
    return Object.values(storeChapters || {})
      .filter((chapter) => chapter && chapter.subjectId === subjectId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [storeChapters, subjectId]);

  const activeSubjectName = useMemo(() => {
    return subjects[subjectId || ""]?.name || `ID: ${subjectId?.slice(0, 8)}`;
  }, [subjects, subjectId]);

  // HYDRATE BOUNDARIES ON TRIGGER EDIT WORKSPACE ACTION
  const handleOpenEditModal = (chapter: any) => {
    setEditingChapterId(chapter.id);
    setTitle(chapter.title);
    setSlug(chapter.slug);
    setOrder(chapter.order ?? 1);
    setIsModalOpen(true);
  };

  // CLEAN COMPONENT BUFFER WORKSPACE RESET FLOW
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChapterId(null);
    setTitle("");
    setSlug("");
    setOrder(filteredChapters.length + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !subjectId)
      return toast.error("Missing critical baseline configuration targets.");

    try {
      setIsSubmitting(true);
      let success = false;

      if (editingChapterId) {
        success = await updateChapter(editingChapterId, {
          title: title.trim(),
          slug: slug.trim(),
          order: Number(order),
        });
      } else {
        success = await createChapter(subjectId, {
          title: title.trim(),
          slug: slug.trim(),
          order: Number(order),
        });
      }

      if (success) {
        toast.success(
          editingChapterId
            ? "Chapter layout parameters successfully modified."
            : "Module chapter committed safely into tracking tree.",
        );
        handleCloseModal();
      } else {
        toast.error("Server cluster rejected mutation block schema payload.");
      }
    } catch {
      toast.error(
        "An unexpected transactional pipeline runtime exception occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChapter = async (id: string) => {
    try {
      setIsSubmitting(true);
      const success = await deleteChapter(id);

      if (success) {
        toast.success("Chapter unlinked successfully from roadmap node lines.");
        setChapterToDelete(null);
      } else {
        toast.error("Failed to drop database core chapter record array.");
      }
    } catch {
      toast.error(
        "Authorizing destructive purge sequence instructions rejected.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-8 font-sans text-xs text-text-primary antialiased select-none relative max-w-5xl mx-auto px-4 py-6">
      {/* 1. HIGH-DENSITY NAVIGATION CRUMB HUD LINK RAILS */}
      <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary pl-0.5 select-none">
        <Link
          to="/admin-panel/dochub/subjects"
          className="hover:text-accent-gold transition-colors inline-flex items-center gap-1"
        >
          <BookOpen size={10} />
          <span>Subjects</span>
        </Link>
        <ChevronRight size={10} className="opacity-30" />
        <span className="text-text-secondary opacity-60">
          Course:{" "}
          <span className="text-text-primary font-medium select-text">
            {activeSubjectName}
          </span>
        </span>
        <ChevronRight size={10} className="opacity-30" />
        <span className="text-accent-gold tracking-widest font-black">
          Modules Index
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
              <span>Syllabus Volumes Node</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-text-primary tracking-tight uppercase font-mono">
              Course Chapter Manifest
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-9 px-5 bg-white text-black hover:bg-neutral-200 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 rounded-xl cursor-pointer shrink-0 border-none outline-hidden"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Write Chapter Volume</span>
        </button>
      </div>

      {/* 3. PREMIUM GRID DATA CONTAINER LAYOUT (TEXTBOOK PRE-SET STYLING) */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={`chapter-skeleton-${i}`}
              className="h-20 w-full bg-bg-secondary/10 border border-border-subtle/60 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredChapters.length === 0 ? (
        <div className="w-full py-24 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-text-muted opacity-50 bg-bg-secondary/5 tracking-wide">
          // No chapter volume modules compiled inside this textbook matrix.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="space-y-4"
        >
          {filteredChapters.map((chapter) => (
            <motion.div
              key={chapter.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -1 }}
              className="p-5 rounded-2xl border border-border-subtle bg-gradient-to-b from-bg-secondary/20 to-bg-secondary/5 hover:border-accent-gold/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden group shadow-2xs backdrop-blur-xs "
            >
              {/* Textbook Vertical Spine Ribbon Accent */}
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-border-subtle group-hover:bg-accent-gold transition-colors duration-300" />

              <div className="flex items-center gap-4.5 min-w-0 flex-1 pl-1">
                {/* Book Spine Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-subtle flex flex-col items-center justify-center text-text-secondary group-hover:text-accent-gold group-hover:border-accent-gold/20 transition-all duration-300 shadow-3xs shrink-0 relative">
                  <Bookmark size={14} className="opacity-90 absolute top-1.5" />
                  <span className="font-mono text-[9px] font-black mt-3 select-none">
                    {(chapter.order ?? 1).toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="min-w-0 space-y-1.5 select-text">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-accent-gold uppercase px-1.5 py-0.5 rounded border border-accent-gold/10 bg-accent-gold/5 select-none">
                      Volume Block
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm tracking-tight text-text-primary truncate">
                      {chapter.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3.5 font-mono text-[9px] text-text-secondary opacity-60 flex-wrap">
                    <span className="flex items-center gap-1">
                      <FileCode size={11} className="opacity-70" />
                      <span>sys-slug:</span>
                      <span className="text-text-primary font-medium">
                        {chapter.slug}
                      </span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-0.5 font-semibold text-text-muted">
                      <Hash size={8} />
                      INDEX PRIORITY: {chapter.order ?? 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION PACK CONTROLS BRIDGE RAIL */}
              <div className="flex items-center gap-2.5 shrink-0 select-none border-t border-border-subtle/40 md:border-t-0 pt-3 md:pt-0 justify-end">
                <Link
                  to={`/admin-panel/dochub/chapters/${chapter.id}/topics`}
                  className="h-8 px-4 border border-border-subtle bg-bg-primary text-text-primary hover:text-white hover:border-text-primary rounded-xl font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer group/btn active:scale-[0.97] outline-hidden"
                >
                  <span>Topics Outline</span>
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenEditModal(chapter)}
                  className="h-8 w-8 rounded-xl border border-border-subtle bg-bg-primary text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 transition-all flex items-center justify-center cursor-pointer outline-hidden active:scale-[0.97]"
                  title="Modify chapter config"
                >
                  <Edit3 size={12} />
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setChapterToDelete(chapter.id)}
                  className="h-8 w-8 rounded-xl border border-transparent hover:border-red-500/20 bg-bg-secondary/40 text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 outline-hidden active:scale-[0.97]"
                  title="Purge volume segment"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 4. FORM CREATION SHEET INTERFACE DIALOG (DUAL MODE ENGINE) */}
      <AnimatePresence>
        {isModalOpen && (
          <CommandModal open={isModalOpen} onClose={handleCloseModal}>
            <div className="p-6 space-y-5 w-full bg-bg-primary/95 backdrop-blur-2xl rounded-2xl font-sans text-xs border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-text-secondary border-b border-border-subtle/80 pb-3 select-none">
                <Layers size={13} className="text-accent-gold" />
                <span>
                  {editingChapterId
                    ? "Modify Volume Configurations"
                    : "Append Chapter Node"}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4.5">
                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-accent-gold" />
                    <span>Chapter Structural Title</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingChapterId) {
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-"),
                        );
                      }
                    }}
                    placeholder="e.g., Thread Concurrency Synchronization"
                    className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs placeholder:text-text-muted/20 focus:outline-hidden transition-all shadow-inner font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-text-muted/40" />
                    <span>Slug Trace (Automatic)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full h-9.5 px-3 bg-bg-secondary/20 border border-border-subtle rounded-xl text-text-secondary focus:outline-hidden transition-all text-xs font-mono tracking-tight"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-text-muted/40" />
                    <span>Sequence Position Priority</span>
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs focus:outline-hidden transition-all shadow-inner font-mono"
                  />
                </div>

                <div className="pt-3">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full h-10 bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-700 disabled:text-neutral-400 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-lg active:scale-[0.98] transition-all pt-0.5 cursor-pointer outline-hidden border-none"
                  >
                    {isSubmitting ? (
                      <Loader2 size={13} className="animate-spin text-black" />
                    ) : (
                      <>
                        <span>
                          {editingChapterId
                            ? "Save Configurations"
                            : "Append Matrix Row"}
                        </span>
                        <ArrowRight size={11} strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </CommandModal>
        )}
      </AnimatePresence>

      {/* 5. DEFENSIVE SAFETY PURGE DIALOG BLOCK */}
      <AnimatePresence>
        {chapterToDelete && (
          <CommandModal
            open={!!chapterToDelete}
            onClose={() => setChapterToDelete(null)}
          >
            <div className="p-6 space-y-4 w-full font-sans text-xs bg-bg-primary/95 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

              <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] font-bold uppercase border-b border-border-subtle/80 pb-3 select-none">
                <AlertCircle size={14} />
                <span>Security Checkpoint Exception</span>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed select-text font-medium">
                Confirm processing unlinking command string metrics. This
                transaction drops all subordinate topics and article sub-blocks
                indexed within this module channel map.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-3 font-mono text-[10px] font-bold uppercase select-none">
                <button
                  type="button"
                  onClick={() => setChapterToDelete(null)}
                  className="h-8.5 px-4 rounded-xl border border-border-subtle text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 transition-all cursor-pointer active:scale-[0.97] outline-hidden"
                >
                  Abort
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() =>
                    chapterToDelete && handleDeleteChapter(chapterToDelete)
                  }
                  className="h-8.5 px-4 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors flex items-center justify-center min-w-[6.5rem] cursor-pointer shadow-sm shadow-red-900/20 active:scale-[0.97] outline-hidden border-none"
                >
                  {isSubmitting ? (
                    <Loader2 size={11} className="animate-spin text-white" />
                  ) : (
                    <span>Purge Row</span>
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

export default memo(ManageChaptersPage);
