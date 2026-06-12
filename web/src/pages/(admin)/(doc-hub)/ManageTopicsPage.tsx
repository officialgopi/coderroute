// src/pages/(admin)/dochub/ManageTopicsPage.tsx
import React, { useState, useEffect, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  FileText,
  ChevronRight,
  ArrowRight,
  Loader2,
  Clock,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CommandModal } from "@/components/ui/CommandModal";

interface ITopic {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  estimatedTime: number;
  status: "DRAFT" | "PUBLISHED";
  order: number;
}

export const ManageTopicsPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

  // Form Hooks
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [estTime, setEstTime] = useState(15);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [order, setOrder] = useState(1);

  useEffect(() => {
    if (!chapterId) return;
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 450));
        setTopics([
          {
            id: "tp-rr",
            title: "Round Robin Scheduling Parity",
            slug: "round-robin",
            summary: "Preemptive processing loop patterns.",
            estimatedTime: 15,
            status: "PUBLISHED",
            order: 1,
          },
          {
            id: "tp-srtf",
            title: "Shortest Remaining Time Vector",
            slug: "srtf-scheduling",
            summary: "Optimal thread execution boundary analysis.",
            estimatedTime: 20,
            status: "DRAFT",
            order: 2,
          },
        ]);
      } catch {
        toast.error("Failed to map active core article entries pool.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, [chapterId]);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !chapterId)
      return toast.error("Missing critical baseline parameters.");

    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 500));

      const newTopic: ITopic = {
        id: `tp-${Date.now()}`,
        title,
        slug,
        summary: summary || null,
        estimatedTime: Number(estTime),
        status,
        order: Number(order),
      };
      setTopics((prev) =>
        [...prev, newTopic].sort((a, b) => a.order - b.order),
      );
      toast.success("Article endpoint parameters registered successfully.");
      setIsModalOpen(false);
      setTitle("");
      setSlug("");
      setSummary("");
      setEstTime(15);
      setOrder((prev) => prev + 1);
    } catch {
      toast.error("Failed to deploy updates down to platform server layers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    try {
      await new Promise((r) => setTimeout(r, 350));
      setTopics((prev) => prev.filter((tp) => tp.id !== id));
      toast.success("Topic unlinked cleanly.");
      setTopicToDelete(null);
    } catch {
      toast.error("Failed to execute data purging routines.");
    }
  };

  return (
    <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased select-none">
      {/* BREADCRUMB TRACE */}
      <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary pl-0.5">
        <Link
          to="/admin-panel/dochub/subjects"
          className="hover:text-accent-gold transition-colors"
        >
          Subjects
        </Link>
        <ChevronRight size={10} className="opacity-40" />
        <span className="text-text-secondary opacity-70">
          Chapter Core: {chapterId?.slice(0, 8)}
        </span>
        <ChevronRight size={10} className="opacity-40" />
        <span className="text-accent-gold font-bold">Topics Index</span>
      </div>

      {/* TOP STRIP BAR CONTROLS */}
      <div className="w-full p-4 rounded-xl border border-border-subtle bg-bg-secondary/40 flex items-center justify-between gap-4 shadow-3xs backdrop-blur-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] text-text-secondary opacity-70">
            // Educational Resource Registers
          </span>
          <span className="text-[11px] font-medium text-text-muted">
            Core Article Content Ingestion
          </span>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-8 px-3.5 bg-text-primary text-bg-primary rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-3xs transition-transform active:scale-98"
        >
          <Plus size={12} strokeWidth={2.5} />
          <span>Create Topic</span>
        </Button>
      </div>

      {/* TOPICS DATA BOARD MATRIX */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-bg-secondary/20 border border-border-subtle rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : topics.length === 0 ? (
        <div className="w-full py-16 text-center border border-dashed border-border-subtle rounded-xl font-mono text-text-muted opacity-60">
          // Empty topic index registry space. Zero articles verified.
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
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
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
                  <FileText size={13} className="opacity-80" />
                </div>
                <div className="min-w-0 space-y-1 select-text">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm tracking-tight text-text-primary truncate">
                      {topic.title}
                    </h4>
                    <span
                      className={cn(
                        "font-mono text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-xs border",
                        topic.status === "PUBLISHED"
                          ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                          : "bg-bg-secondary text-text-muted border-border-subtle/40",
                      )}
                    >
                      {topic.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-text-secondary opacity-50">
                    <span>slug: {topic.slug}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock size={10} /> {topic.estimatedTime}m reading weight
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin-panel/dochub/topics/${topic.id}/sections`}
                  className="h-7.5 px-3 border border-border-subtle bg-bg-primary text-text-secondary hover:text-accent-gold hover:border-accent-gold/20 rounded-md font-mono text-[10px] flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer group"
                >
                  <span>Sections</span>
                  <ArrowRight
                    size={11}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setTopicToDelete(topic.id)}
                  className="h-7.5 w-7.5 rounded-md border border-transparent hover:border-accent-crimson/20 bg-bg-primary/20 text-text-muted hover:text-accent-crimson hover:bg-accent-crimson/5 transition-all flex items-center justify-center cursor-pointer shadow-3xs"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* COMPONENT MODAL LAYOUT */}
      <AnimatePresence>
        {isModalOpen && (
          <CommandModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            {/* 💎 INTERNAL LAYOUT PADDING ENFORCED */}
            <div className="p-5 space-y-4 w-full">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-text-secondary border-b border-border-subtle pb-2.5">
                <FileText size={12} className="text-accent-gold" />
                <span>Configure Topic Properties</span>
              </div>

              <form
                onSubmit={handleCreateTopic}
                className="space-y-3.5 font-mono text-[11px]"
              >
                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Topic Header Title
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
                    placeholder="e.g., Round Robin Synchronization"
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary placeholder:text-text-muted/30 focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Route Identifier String (Slug)
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
                    Curriculum Abstract Summary
                  </label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Provide summary outline..."
                    className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary placeholder:text-text-muted/30 focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-text-muted font-medium">
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      value={estTime}
                      onChange={(e) => setEstTime(Number(e.target.value))}
                      className="w-full h-8 px-3 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-primary focus:outline-hidden focus:border-accent-gold/30 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-text-muted font-medium">
                      Release Deployment Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full h-8 px-2 bg-bg-secondary/50 border border-border-subtle rounded-md text-text-secondary focus:outline-hidden focus:border-accent-gold/30 cursor-pointer"
                    >
                      <option value="DRAFT">DRAFT CONTROL</option>
                      <option value="PUBLISHED">DEPLOY LIVE</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-medium">
                    Sequence Order Index
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
                      <span>Append Topic Registry</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CommandModal>
        )}
      </AnimatePresence>

      {/* REJECT PURGE DESTRUCTIVE CONTROL GATE */}
      <AnimatePresence>
        {topicToDelete && (
          <CommandModal
            open={!!topicToDelete}
            onClose={() => setTopicToDelete(null)}
          >
            <div className="p-5 space-y-4 w-full font-sans text-xs">
              <div className="flex items-center gap-2 text-accent-crimson font-mono text-[10px] font-bold uppercase border-b border-border-subtle pb-2.5">
                <AlertCircle size={13} />
                <span>Security Checkpoint Exception</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Confirm processing resource removal pipelines. Dropping this
                topic structure deletes all indexed subsections and linked
                verification scripts permanently.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 font-mono text-[10px] font-bold uppercase">
                <button
                  type="button"
                  onClick={() => setTopicToDelete(null)}
                  className="h-8 px-3.5 rounded-lg border border-border-subtle text-text-secondary bg-bg-secondary/40 hover:text-text-primary transition-colors cursor-pointer"
                >
                  Abort
                </button>
                <button
                  type="button"
                  onClick={() =>
                    topicToDelete && handleDeleteTopic(topicToDelete)
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

export default memo(ManageTopicsPage);
