// src/pages/(admin)/dochub/ManageSubjectsPage.tsx
import React, { useState, useEffect, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  BookOpen,
  ArrowRight,
  Layers,
  Loader2,
  Trash2,
  AlertCircle,
  Hash,
  Edit3,
  Cpu,
  CornerDownRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { useLearnStore } from "@/store/learn.store";
import CommandModal from "@/components/ui/CommandModal";

export const ManageSubjectsPage: React.FC = () => {
  const {
    subjects: storeSubjects,
    isSubjectsLoading,
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
  } = useLearnStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);

  // Form Fields State Matrices
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const sortedSubjectsList = useMemo(() => {
    return Object.values(storeSubjects || {}).sort((a, b) => {
      if ((a.order ?? 0) !== (b.order ?? 0)) {
        return (a.order ?? 0) - (b.order ?? 0);
      }
      return a.name.localeCompare(b.name);
    });
  }, [storeSubjects]);

  const handleOpenEditModal = (subject: any) => {
    setEditingSubjectId(subject.id);
    setName(subject.name);
    setSlug(subject.slug);
    setDescription(subject.description || "");
    setOrder(subject.order ?? 0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubjectId(null);
    setName("");
    setSlug("");
    setDescription("");
    setOrder(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim())
      return toast.error("Missing valid identifiers or namespace targets.");

    try {
      setIsSubmitting(true);
      let success = false;

      if (editingSubjectId) {
        success = await updateSubject(editingSubjectId, {
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim() || null,
          order: Number(order),
        });
      } else {
        success = await createSubject({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim() || null,
          order: Number(order),
        });
      }

      if (success) {
        toast.success(
          editingSubjectId
            ? "Subject directory records updated successfully."
            : "New educational core module matrix fully deployed.",
        );
        handleCloseModal();
      } else {
        toast.error("Failed to compile layout adjustments.");
      }
    } catch {
      toast.error("An unexpected execution channel interruption occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      setIsSubmitting(true);
      const success = await deleteSubject(id);

      if (success) {
        toast.success(
          "Subject node completely purged from local schema blocks.",
        );
        setSubjectToDelete(null);
      } else {
        toast.error("Server cluster rejected deletion transaction.");
      }
    } catch {
      toast.error("Failed to broadcast secure purge instruction sequence.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-8 font-sans text-xs text-text-primary antialiased select-none relative max-w-5xl mx-auto px-4 py-6">
      {/* 1. FUTURISTIC HUD CONTROL CENTER DECK */}
      <div className="w-full p-5 rounded-2xl border border-border-subtle bg-gradient-to-r from-bg-secondary/40 via-bg-secondary/20 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-80" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center text-accent-gold shadow-md shadow-black/40 ring-1 ring-white/5">
            <Cpu size={16} className="animate-pulse" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest uppercase text-text-muted">
              <Sparkles size={9} className="text-accent-gold" />
              <span>Core Registry Pipeline</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-text-primary tracking-tight uppercase font-mono">
              Syllabus Architecture Deck
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-9 px-5 bg-white text-black hover:bg-neutral-200 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 rounded-xl cursor-pointer shrink-0 border-none outline-hidden"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Deploy New Subject</span>
        </button>
      </div>

      {/* 2. PREMIUM DATAGRID ITERATIVE WORKSPACE */}
      {isSubjectsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={`skeleton-grid-${i}`}
              className="h-28 rounded-2xl bg-bg-secondary/10 border border-border-subtle/50 animate-pulse"
            />
          ))}
        </div>
      ) : sortedSubjectsList.length === 0 ? (
        <div className="w-full py-24 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-text-muted opacity-50 bg-bg-secondary/5 tracking-wide">
          // No live subject vectors currently tracking inside core cache maps.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4.5"
        >
          {sortedSubjectsList.map((subject) => (
            <motion.div
              key={subject.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="p-5 rounded-2xl border border-border-subtle bg-bg-secondary/10 hover:bg-bg-secondary/30 hover:border-accent-gold/40 transition-all duration-300 flex flex-col justify-between h-36 relative overflow-hidden group shadow-2xs shadow-black/10 backdrop-blur-xs"
            >
              {/* Dynamic Priority Watermark Indicator */}
              <div className="absolute -top-3 -right-3 text-bg-secondary/30 font-mono text-5xl font-black italic tracking-tighter pointer-events-none select-none group-hover:text-accent-gold/5 transition-colors duration-300">
                {(subject.order ?? 0).toString().padStart(2, "0")}
              </div>

              <div className="space-y-2 relative z-10 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-text-secondary group-hover:text-accent-gold group-hover:border-accent-gold/20 transition-all duration-300 shadow-3xs shrink-0">
                      <BookOpen size={12} />
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm tracking-tight text-text-primary truncate select-text">
                      {subject.name}
                    </h3>
                  </div>
                </div>

                <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed opacity-75 group-hover:opacity-95 transition-opacity pr-6 font-sans font-medium select-text">
                  {subject.description ||
                    "// No supplementary description documentation assigned."}
                </p>
              </div>

              {/* FLOATING ACTION CONTROL DOCK CONTAINER */}
              <div className="flex items-center justify-between gap-4 border-t border-border-subtle/40 pt-3 mt-2 font-mono text-[9px] relative z-10 select-none">
                <div className="flex items-center gap-1.5 opacity-50 group-hover:opacity-90 transition-opacity">
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border-subtle bg-bg-primary font-bold text-[8px] tracking-widest text-accent-gold">
                    <Hash size={7} />
                    IDX: {subject.order ?? 0}
                  </span>
                  <span className="text-[9px] text-text-muted truncate hidden sm:inline max-w-[5.5rem]">
                    /{subject.slug}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin-panel/dochub/subjects/${subject.id}/chapters`}
                    className="h-7 px-3 border border-border-subtle bg-bg-primary text-text-secondary hover:text-white hover:border-text-primary rounded-xl font-bold flex items-center gap-1 transition-all group/btn outline-hidden active:scale-95"
                  >
                    <span>Chapters</span>
                    <ArrowRight
                      size={11}
                      className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(subject)}
                    className="h-7 w-7 rounded-xl border border-border-subtle bg-bg-primary text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 transition-all flex items-center justify-center cursor-pointer outline-hidden active:scale-95"
                    title="Modify parameters"
                  >
                    <Edit3 size={11} />
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setSubjectToDelete(subject.id)}
                    className="h-7 w-7 rounded-xl border border-transparent hover:border-red-500/20 bg-bg-secondary/40 text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 outline-hidden active:scale-95"
                    title="Purge subject entry"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 3. CORE SUBMISSION/EDIT CONTROL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <CommandModal open={isModalOpen} onClose={handleCloseModal}>
            <div className="p-6 space-y-6 w-full bg-bg-primary/95 backdrop-blur-2xl rounded-2xl font-sans text-xs border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary border-b border-border-subtle/80 pb-3 select-none">
                <Layers
                  size={13}
                  className="text-accent-gold animate-spin-slow"
                />
                <span>
                  {editingSubjectId
                    ? "Update System Vector Node"
                    : "Register Schema Entity"}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4.5">
                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-accent-gold" />
                    <span>Subject Display Label</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!editingSubjectId) {
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-"),
                        );
                      }
                    }}
                    placeholder="e.g., Database Internals"
                    className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs placeholder:text-text-muted/20 focus:outline-hidden transition-all shadow-inner font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-text-muted/40" />
                    <span>Slug Target Routing Namespace</span>
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
                    <CornerDownRight size={10} className="text-accent-gold" />
                    <span>Overview Matrix Summary</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs placeholder:text-text-muted/20 focus:outline-hidden transition-all resize-none leading-relaxed shadow-inner font-sans font-medium"
                    placeholder="Provide deep architectural overview details, hardware design properties, or abstract summaries..."
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
                          {editingSubjectId
                            ? "Save Configurations"
                            : "Deploy Component"}
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

      {/* 4. DEFENSIVE PURGE CHECKPOINT DIALOG SHIELD */}
      <AnimatePresence>
        {subjectToDelete && (
          <CommandModal
            open={!!subjectToDelete}
            onClose={() => setSubjectToDelete(null)}
          >
            <div className="p-6 space-y-4 w-full font-sans text-xs bg-bg-primary/95 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

              <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] font-bold uppercase border-b border-border-subtle/80 pb-3 select-none">
                <AlertCircle size={14} />
                <span>Security Checkpoint Exception</span>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed select-text font-medium">
                Are you completely sure you want to drop this subject vector?
                This cascading cycle will purge all subordinate chapters,
                topics, and code sections instantly.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-3 font-mono text-[10px] font-bold uppercase select-none">
                <button
                  type="button"
                  onClick={() => setSubjectToDelete(null)}
                  className="h-8.5 px-4 rounded-xl border border-border-subtle text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 transition-all cursor-pointer active:scale-[0.97] outline-hidden"
                >
                  Abort
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() =>
                    subjectToDelete && handleDeleteSubject(subjectToDelete)
                  }
                  className="h-8.5 px-4 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors flex items-center justify-center min-w-[6.5rem] cursor-pointer shadow-sm shadow-red-900/20 active:scale-[0.97] outline-hidden border-none"
                >
                  {isSubmitting ? (
                    <Loader2 size={11} className="animate-spin text-white" />
                  ) : (
                    <span>Purge Matrix</span>
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

export default memo(ManageSubjectsPage);
