// src/pages/(admin)/dochub/ManageSubjectsPage.tsx
import React, { useState, useEffect, memo } from "react";
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
} from "lucide-react";
import { toast } from "sonner";

// High-fidelity UI Components synced with your modular design language
import { Button } from "@/components/ui/button";
import { CommandModal } from "@/components/ui/CommandModal";

interface ISubject {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
}

export const ManageSubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructive Action Guard Tracking States
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  // Form State Elements
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        // Simulation mirroring GET {{baseUrl}}/learn/subjects pipeline execution
        await new Promise((r) => setTimeout(r, 400));
        setSubjects([
          {
            id: "sub-os",
            name: "Operating Systems",
            slug: "operating-system",
            description: "Learn processes, memory mapping, and kernels.",
            order: 1,
          },
          {
            id: "sub-db",
            name: "Database Internals",
            slug: "database-internals",
            description:
              "Explore B-Trees, transaction isolation, and engine designs.",
            order: 2,
          },
        ]);
      } catch {
        toast.error("Failed to recover course subject registries.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug)
      return toast.error("Please supply name and slug namespace data keys.");

    try {
      setIsSubmitting(true);
      // Simulation mirroring POST {{baseUrl}}/admin/subjects pipeline execution
      await new Promise((r) => setTimeout(r, 500));

      const newSub: ISubject = {
        id: `sub-${Date.now()}`,
        name,
        slug,
        description: description || null,
        order: Number(order),
      };
      setSubjects((prev) =>
        [...prev, newSub].sort((a, b) => a.order - b.order),
      );
      toast.success("Learning subject vector integrated successfully.");
      setIsModalOpen(false);

      // Wipe Form Buffer Inputs
      setName("");
      setSlug("");
      setDescription("");
      setOrder(0);
    } catch {
      toast.error("Failed to commit subject payload.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      // Simulation mirroring DELETE {{baseUrl}}/admin/subjects/:id pipeline execution
      await new Promise((r) => setTimeout(r, 350));
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      toast.success("Subject vector unlinked from global syllabus.");
      setSubjectToDelete(null);
    } catch {
      toast.error("Failed to purge target system node registry.");
    }
  };

  return (
    <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased select-none relative">
      {/* 1. HIGH-DENSITY ACTION CONTROLS RAIL HEADER */}
      <div className="w-full p-4 rounded-xl border border-border-subtle bg-bg-secondary/40 flex items-center justify-between gap-4 shadow-3xs backdrop-blur-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] text-text-secondary opacity-70">
            // Core Repository Node
          </span>
          <span className="text-[11px] font-medium text-text-muted">
            Syllabus Framework Modules Manager
          </span>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-8 px-3.5 bg-text-primary text-bg-primary rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-3xs transition-transform duration-150 active:scale-98"
        >
          <Plus size={12} strokeWidth={2.5} />
          <span>Add Subject</span>
        </Button>
      </div>

      {/* 2. MAIN DATAGRID ITERATIVE WORKSPACE RENDER CHANNELS */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={`skeleton-node-${i}`}
              className="h-16 rounded-xl bg-bg-secondary/20 border border-border-subtle animate-pulse"
            />
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <div className="w-full py-16 text-center border border-dashed border-border-subtle rounded-xl font-mono text-text-muted opacity-60">
          // Empty system cache matrix. Zero subject vectors tracking.
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
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ x: 2 }}
              className="p-4 flex items-center justify-between gap-6 hover:bg-bg-secondary/20 transition-all duration-150"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-text-secondary shrink-0 shadow-3xs group-hover:border-accent-gold/20 transition-colors">
                  <BookOpen size={13} className="opacity-80" />
                </div>
                <div className="min-w-0 space-y-0.5 select-text">
                  <h3 className="font-semibold text-sm tracking-tight text-text-primary truncate">
                    {subject.name}
                  </h3>
                  <p className="text-text-secondary font-mono text-[10px] opacity-50 truncate">
                    slug: {subject.slug} • Priority:{" "}
                    <span className="text-accent-gold font-bold">
                      {subject.order}
                    </span>
                  </p>
                </div>
              </div>

              {/* ACTION CHANNEL BAR LIST CONTROLS */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin-panel/dochub/subjects/${subject.id}/chapters`}
                  className="h-7.5 px-3 border border-border-subtle bg-bg-primary text-text-secondary hover:text-accent-gold hover:border-accent-gold/20 rounded-md font-mono text-[10px] flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer group"
                >
                  <span>Chapters</span>
                  <ArrowRight
                    size={11}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setSubjectToDelete(subject.id)}
                  className="h-7.5 w-7.5 rounded-md border border-transparent hover:border-accent-crimson/20 bg-bg-primary/20 text-text-muted hover:text-accent-crimson hover:bg-accent-crimson/5 transition-all duration-150 flex items-center justify-center cursor-pointer shadow-3xs"
                  title="Purge subject entry"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 3. MUTATION DIALOG MODAL LAYOUT CHANNELS */}
      <AnimatePresence>
        {isModalOpen && (
          <CommandModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            {/* 💎 FIX: DEFENSIVE INNER VIEWPORT PADDING INJECTION */}
            <div className="p-5 sm:p-6 space-y-4 w-full">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-text-secondary border-b border-border-subtle pb-2.5">
                <Layers size={12} className="text-accent-gold" />
                <span>Initialize Subject Registry</span>
              </div>

              <form
                onSubmit={handleCreateSubject}
                className="space-y-3.5 font-mono text-[11px]"
              >
                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Subject Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-"),
                      );
                    }}
                    placeholder="e.g., Computer Networks"
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary placeholder:text-text-muted/30 focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Slug Namespace (Automatic)
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary focus:outline-hidden focus:border-accent-gold/30 transition-colors text-text-secondary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Overview Matrix Summary
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full p-2 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary placeholder:text-text-muted/30 focus:outline-hidden focus:border-accent-gold/30 transition-colors resize-none leading-relaxed"
                    placeholder="Provide description abstract..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Sequence Order Priority Index
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full h-8.5 bg-text-primary text-bg-primary rounded-md font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-3xs pt-0.5"
                  >
                    {isSubmitting ? (
                      <Loader2
                        size={12}
                        className="animate-spin text-bg-primary"
                      />
                    ) : (
                      <span>Commit Entry Node</span>
                    )}
                  </Button>
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
            {/* 💎 FIX: DEFENSIVE INNER VIEWPORT PADDING INJECTION */}
            <div className="p-5 sm:p-6 space-y-4 w-full font-sans text-xs">
              <div className="flex items-center gap-2 text-accent-crimson font-mono text-[10px] font-bold uppercase border-b border-border-subtle pb-2.5">
                <AlertCircle size={13} />
                <span>Security Checkpoint Exception</span>
              </div>

              <p className="text-text-secondary leading-relaxed">
                Are you completely sure you want to drop this subject vector?
                This cascading cycle will purge all subordinate chapters,
                topics, and code sections instantly.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 font-mono text-[10px] font-bold uppercase">
                <button
                  type="button"
                  onClick={() => setSubjectToDelete(null)}
                  className="h-8 px-3.5 rounded-lg border border-border-subtle text-text-secondary bg-bg-secondary/40 hover:text-text-primary transition-colors cursor-pointer"
                >
                  Abort
                </button>
                <button
                  type="button"
                  onClick={() =>
                    subjectToDelete && handleDeleteSubject(subjectToDelete)
                  }
                  className="h-8 px-3.5 rounded-lg bg-accent-crimson text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Purge Matrix
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
