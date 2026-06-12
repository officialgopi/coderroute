// src/pages/(admin)/dochub/ManageChaptersPage.tsx
import React, { useState, useEffect, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  FolderTree,
  ChevronRight,
  ArrowRight,
  Trash2,
  Layers,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CommandModal } from "@/components/ui/CommandModal";

interface IChapter {
  id: string;
  subjectId: string;
  title: string;
  slug: string;
  order: number;
}

export const ManageChaptersPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [order, setOrder] = useState(1);

  useEffect(() => {
    if (!subjectId) return;
    const fetchChapters = async () => {
      try {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 400));
        setChapters([
          {
            id: "ch-cpu",
            subjectId,
            title: "CPU Scheduling Architecture",
            slug: "cpu-scheduling",
            order: 1,
          },
          {
            id: "ch-mem",
            subjectId,
            title: "Virtual Memory Virtualization",
            slug: "virtual-memory",
            order: 2,
          },
        ]);
      } catch {
        toast.error("Failed to map target operational module indices.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChapters();
  }, [subjectId]);

  const handleCreateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !subjectId)
      return toast.error("Missing critical template parameters.");

    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 500));

      const newCh: IChapter = {
        id: `ch-${Date.now()}`,
        subjectId,
        title,
        slug,
        order: Number(order),
      };
      setChapters((prev) => [...prev, newCh].sort((a, b) => a.order - b.order));
      toast.success("Module chapter committed safely.");
      setIsModalOpen(false);
      setTitle("");
      setSlug("");
      setOrder((prev) => prev + 1);
    } catch {
      toast.error("Failed to compile layout parameters.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChapter = async (id: string) => {
    try {
      await new Promise((r) => setTimeout(r, 350));
      setChapters((prev) => prev.filter((ch) => ch.id !== id));
      toast.success("Chapter unlinked successfully.");
      setChapterToDelete(null);
    } catch {
      toast.error("Failed to purge chapter record.");
    }
  };

  return (
    <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased select-none">
      {/* BREADCRUMB COMPONENT BAR */}
      <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary pl-0.5">
        <Link
          to="/admin-panel/dochub/subjects"
          className="hover:text-accent-gold transition-colors"
        >
          Subjects
        </Link>
        <ChevronRight size={10} className="opacity-40" />
        <span className="text-text-secondary opacity-70">
          Subject Context: {subjectId?.slice(0, 8)}
        </span>
        <ChevronRight size={10} className="opacity-40" />
        <span className="text-accent-gold font-bold">Chapters</span>
      </div>

      {/* INTERACTIVE TRACK TOOL STRIP */}
      <div className="w-full p-4 rounded-xl border border-border-subtle bg-bg-secondary/40 flex items-center justify-between gap-4 shadow-3xs backdrop-blur-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] text-text-secondary opacity-70">
            // Child Modules Hierarchy
          </span>
          <span className="text-[11px] font-medium text-text-muted">
            Module Chapter Outlines
          </span>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-8 px-3.5 bg-text-primary text-bg-primary rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-3xs transition-transform active:scale-98"
        >
          <Plus size={12} strokeWidth={2.5} />
          <span>Add Chapter</span>
        </Button>
      </div>

      {/* MODULE LIST DATA CONTAINER */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-bg-secondary/20 rounded-xl border border-border-subtle animate-pulse"
            />
          ))}
        </div>
      ) : chapters.length === 0 ? (
        <div className="w-full py-16 text-center border border-dashed border-border-subtle rounded-xl font-mono text-text-muted opacity-60">
          // No chapter structures mapped yet inside this index.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}
          className="rounded-xl border border-border-subtle bg-bg-secondary/10 overflow-hidden divide-y divide-border-subtle shadow-3xs"
        >
          {chapters.map((chapter) => (
            <motion.div
              key={chapter.id}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ x: 2 }}
              className="p-4 flex items-center justify-between gap-6 hover:bg-bg-secondary/20 transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-text-secondary shrink-0 shadow-3xs">
                  <FolderTree size={13} className="opacity-80" />
                </div>
                <div className="min-w-0 space-y-0.5 select-text">
                  <h4 className="font-semibold text-sm tracking-tight text-text-primary truncate">
                    {chapter.title}
                  </h4>
                  <p className="text-text-secondary font-mono text-[10px] opacity-50">
                    slug: {chapter.slug} • Priority:{" "}
                    <span className="text-accent-gold font-bold">
                      {chapter.order}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin-panel/dochub/chapters/${chapter.id}/topics`}
                  className="h-7.5 px-3 border border-border-subtle bg-bg-primary text-text-secondary hover:text-accent-gold hover:border-accent-gold/20 rounded-md font-mono text-[10px] flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer group"
                >
                  <span>Topics</span>
                  <ArrowRight
                    size={11}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setChapterToDelete(chapter.id)}
                  className="h-7.5 w-7.5 rounded-md border border-transparent hover:border-accent-crimson/20 bg-bg-primary/20 text-text-muted hover:text-accent-crimson hover:bg-accent-crimson/5 transition-all flex items-center justify-center cursor-pointer shadow-3xs"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* FORM DIALOG SHEET MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <CommandModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            {/* 💎 INTERNAL LAYOUT PADDING ENFORCED */}
            <div className="p-5 space-y-4 w-full">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-text-secondary border-b border-border-subtle pb-2.5">
                <Layers size={12} className="text-accent-gold" />
                <span>Append Chapter Node</span>
              </div>

              <form
                onSubmit={handleCreateChapter}
                className="space-y-3.5 font-mono text-[11px]"
              >
                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Chapter Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-"),
                      );
                    }}
                    placeholder="e.g., Thread Concurrency Sync"
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary placeholder:text-text-muted/30 focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Slug Trace (Automatic)
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-secondary focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Sequence Priority
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                  />
                </div>

                <div className="pt-1">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full h-8.5 bg-text-primary text-bg-primary rounded-md font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-3xs pt-0.5"
                  >
                    {isSubmitting ? (
                      <Loader2
                        size={12}
                        className="animate-spin text-bg-primary"
                      />
                    ) : (
                      <span>Append Matrix Row</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CommandModal>
        )}
      </AnimatePresence>

      {/* DEFENSIVE SAFETY PURGE DIALOG */}
      <AnimatePresence>
        {chapterToDelete && (
          <CommandModal
            open={!!chapterToDelete}
            onClose={() => setChapterToDelete(null)}
          >
            <div className="p-5 space-y-4 w-full font-sans text-xs">
              <div className="flex items-center gap-2 text-accent-crimson font-mono text-[10px] font-bold uppercase border-b border-border-subtle pb-2.5">
                <AlertCircle size={13} />
                <span>Security Checkpoint Exception</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Confirm processing unlinking command string metrics. This
                transaction drops all topics and sub-blocks indexed within this
                module channel map.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 font-mono text-[10px] font-bold uppercase">
                <button
                  type="button"
                  onClick={() => setChapterToDelete(null)}
                  className="h-8 px-3.5 rounded-lg border border-border-subtle text-text-secondary bg-bg-secondary/40 hover:text-text-primary transition-colors cursor-pointer"
                >
                  Abort
                </button>
                <button
                  type="button"
                  onClick={() =>
                    chapterToDelete && handleDeleteChapter(chapterToDelete)
                  }
                  className="h-8 px-3.5 rounded-lg bg-accent-crimson text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Purge Row
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
