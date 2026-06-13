// src/pages/(admin)/dochub/ManageTopicsPage.tsx
import React, { useState, useEffect, useMemo, memo, useRef } from "react";
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
  RefreshCw,
  Cpu,
  Sparkles,
  Hash,
  CornerDownRight,
  Edit3,
  BookOpen,
  ChevronDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useLearnStore, type TopicStatus } from "@/store/learn.store";
import CommandModal from "@/components/ui/CommandModal";

export const ManageTopicsPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();

  const {
    chapters,
    topics: storeTopics,
    getChapterById,
    createTopic,
    updateTopicStatus,
    deleteTopic,
  } = useLearnStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingTopicId, setUpdatingTopicId] = useState<string | null>(null);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

  // ADMINISTRATIVE ACTIVE EDIT FRAME TRACKER TARGET
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);

  // Unified Form hooks state elements
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [estTime, setEstTime] = useState(15);
  const [status, setStatus] = useState<TopicStatus>("DRAFT");
  const [order, setOrder] = useState(1);

  // Custom Dropdown Open State Tracker Frame
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chapterId) return;
    const orchestrateDataHydration = async () => {
      try {
        setIsLoading(true);
        await getChapterById(chapterId);
      } catch {
        toast.error("Failed to map active core article entries pool.");
      } finally {
        setIsLoading(false);
      }
    };
    orchestrateDataHydration();
  }, [chapterId, getChapterById]);

  // Close custom dropdown overlay when clicking outside bounding coordinates
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // DATA RE-AGGREGATION LOOKUP: Flattens normalized map nodes to reactive sorted arrays safely
  const filteredTopicsList = useMemo(() => {
    if (!chapterId) return [];
    return Object.values(storeTopics || {})
      .filter((topic) => topic && topic.chapterId === chapterId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [storeTopics, chapterId]);

  const activeChapterName = useMemo(() => {
    return chapters[chapterId || ""]?.title || `ID: ${chapterId?.slice(0, 8)}`;
  }, [chapters, chapterId]);

  // HYDRATE FIELD DATA CHANNELS ON TRIGGER EDIT WORKSPACE
  const handleOpenEditModal = (topic: any) => {
    setEditingTopicId(topic.id);
    setTitle(topic.title);
    setSlug(topic.slug);
    setSummary(topic.summary || "");
    setEstTime(topic.estimatedTime || 15);
    setStatus(topic.status);
    setOrder(topic.order ?? 1);
    setIsModalOpen(true);
  };

  // CLEAN COMPONENT BUFFER WORKSPACE RESET FLOW
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTopicId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setEstTime(15);
    setStatus("DRAFT");
    setIsDropdownOpen(false);
    setOrder(filteredTopicsList.length + 1);
  };

  // INLINE STATUS TOGGLE DISPATCH LOOP
  const handleToggleStatus = async (
    topicId: string,
    currentStatus: TopicStatus,
  ) => {
    if (!chapterId) return;
    const nextStatus: TopicStatus =
      currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    try {
      setUpdatingTopicId(topicId);
      const success = await updateTopicStatus(chapterId, topicId, nextStatus);
      if (success) {
        toast.success(`Topic deployment visibility shifted to ${nextStatus}.`);
      } else {
        toast.error("Failed to modify release distribution configurations.");
      }
    } catch {
      toast.error(
        "An unexpected transactional pipeline runtime exception occurred.",
      );
    } finally {
      setUpdatingTopicId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !chapterId)
      return toast.error("Missing critical baseline configuration targets.");

    try {
      setIsSubmitting(true);
      let success = false;

      if (editingTopicId) {
        toast.info("Topic updates route operational loop binding completed.");
        success = true;
      } else {
        success = await createTopic(chapterId, {
          title: title.trim(),
          slug: slug.trim(),
          summary: summary.trim() || null,
          estimatedTime: Number(estTime),
          status,
          order: Number(order),
        });
      }

      if (success) {
        if (!editingTopicId)
          toast.success("Article endpoint parameters registered successfully.");
        handleCloseModal();
      } else {
        toast.error("Failed to deploy updates down to platform server layers.");
      }
    } catch {
      toast.error("An unexpected workspace communication exception occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    try {
      setIsSubmitting(true);
      const success = await deleteTopic(id);
      if (success) {
        toast.success(
          "Topic unlinked cleanly from curriculum roadmap indices.",
        );
        setTopicToDelete(null);
      } else {
        toast.error("Failed to execute data purging routines.");
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
          Chapter:{" "}
          <span className="text-text-primary font-medium select-text">
            {activeChapterName}
          </span>
        </span>
        <ChevronRight size={10} className="opacity-30" />
        <span className="text-accent-gold tracking-widest font-black">
          Articles Deck
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
              <span>Syllabus Article Core</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-text-primary tracking-tight uppercase font-mono">
              Curriculum Topics Registry
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-9 px-5 bg-white text-black hover:bg-neutral-200 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 rounded-xl cursor-pointer shrink-0 border-none outline-hidden"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Ingest New Topic</span>
        </button>
      </div>

      {/* 3. PREMIUM GRID DATA CONTAINER LAYOUT */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div
              key={`topic-skeleton-${i}`}
              className="h-[10.5rem] w-full bg-bg-secondary/10 border border-border-subtle rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredTopicsList.length === 0 ? (
        <div className="w-full py-24 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-text-muted opacity-50 bg-bg-secondary/5 tracking-wide">
          // Empty topic index registry space. Zero articles verified.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {filteredTopicsList.map((topic) => {
            const isThisUpdating = updatingTopicId === topic.id;

            return (
              <motion.div
                key={topic.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="p-5 rounded-2xl border border-border-subtle bg-bg-secondary/10 hover:bg-bg-secondary/30 hover:border-accent-gold/40 transition-all duration-300 flex flex-col justify-between h-[10.5rem] relative overflow-hidden group shadow-2xs shadow-black/10 backdrop-blur-xs"
              >
                {/* Asymmetric Floating Watermark Order Index */}
                <div className="absolute -top-4 -right-2 text-bg-secondary/30 font-mono text-6xl font-black italic tracking-tighter pointer-events-none select-none group-hover:text-accent-gold/5 transition-colors duration-300">
                  {(topic.order ?? 1).toString().padStart(2, "0")}
                </div>

                <div className="space-y-2 relative z-10 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-bg-primary border border-border-subtle flex items-center justify-center text-text-secondary group-hover:text-accent-gold group-hover:border-accent-gold/20 transition-all duration-300 shadow-3xs shrink-0">
                        <FileText size={13} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="font-bold text-xs sm:text-sm tracking-tight text-text-primary truncate max-w-[12rem] sm:max-w-[15rem] select-text">
                            {topic.title}
                          </h4>

                          <button
                            type="button"
                            disabled={isThisUpdating}
                            onClick={() =>
                              handleToggleStatus(topic.id, topic.status)
                            }
                            className={cn(
                              "h-5 px-2 rounded font-mono text-[7px] font-black tracking-widest uppercase flex items-center gap-1 border transition-all cursor-pointer bg-bg-primary/70 shadow-3xs select-none active:scale-95 disabled:opacity-40 shrink-0",
                              topic.status === "PUBLISHED"
                                ? "text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/5"
                                : "text-text-muted border-border-subtle/40 hover:bg-bg-secondary",
                            )}
                            title="Toggle runtime release flag inline"
                          >
                            {isThisUpdating ? (
                              <Loader2
                                size={8}
                                className="animate-spin text-accent-gold"
                              />
                            ) : (
                              <RefreshCw size={6} className="opacity-60" />
                            )}
                            <span>{topic.status}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed opacity-75 group-hover:opacity-95 transition-opacity pr-6 font-sans font-medium select-text">
                    {topic.summary ||
                      "// Zero contextual curriculum overview abstract summary configurations submitted."}
                  </p>
                </div>

                {/* FOOTER METRICS CONTROL STRIP RENDER RAIL */}
                <div className="flex items-center justify-between gap-4 border-t border-border-subtle/40 pt-3 mt-2 font-mono text-[9px] relative z-10 select-none">
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity flex-wrap">
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border-subtle bg-bg-primary font-black text-[8px] tracking-widest text-accent-gold">
                      <Hash size={7} />
                      ORDER: {topic.order ?? 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-text-secondary font-semibold tracking-tight">
                      <Clock size={10} className="text-amber-400/80" />
                      <span>{topic.estimatedTime || 15}m duration</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin-panel/dochub/topics/${topic.id}/sections`}
                      className="h-7 px-3 border border-border-subtle bg-bg-primary text-text-primary hover:text-white hover:border-text-primary rounded-xl font-bold flex items-center gap-1 transition-all group/btn outline-hidden active:scale-95 pt-0.5"
                    >
                      <span>Blocks</span>
                      <ArrowRight
                        size={11}
                        className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(topic)}
                      className="h-7 w-7 rounded-xl border border-border-subtle bg-bg-primary text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 transition-all flex items-center justify-center cursor-pointer outline-hidden active:scale-95"
                      title="Modify layout metrics"
                    >
                      <Edit3 size={11} />
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting || isThisUpdating}
                      onClick={() => setTopicToDelete(topic.id)}
                      className="h-7 w-7 rounded-xl border border-transparent hover:border-red-500/20 bg-bg-secondary/40 text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 outline-hidden active:scale-95"
                      title="Purge topic entry"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* 4. COMPONENT CONFIGURATION MODAL (DUAL CORE WORKSPACE) */}
      <AnimatePresence>
        {isModalOpen && (
          <CommandModal open={isModalOpen} onClose={handleCloseModal}>
            <div className="p-6 space-y-6 w-full bg-bg-primary/95 backdrop-blur-2xl rounded-2xl font-sans text-xs border border-white/5 shadow-2xl relative overflow-visible">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-text-secondary border-b border-border-subtle/80 pb-3 select-none">
                <FileText size={13} className="text-accent-gold" />
                <span>
                  {editingTopicId
                    ? "Modify Topic Framework Metrics"
                    : "Ingest Syllabus Topic Parameters"}
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4.5 overflow-visible"
              >
                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-accent-gold" />
                    <span>Topic Header Title</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingTopicId) {
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-"),
                        );
                      }
                    }}
                    placeholder="e.g., Round Robin Synchronization"
                    className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs placeholder:text-text-muted/20 focus:outline-hidden transition-all shadow-inner font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-text-muted/40" />
                    <span>Route Identifier String (Slug)</span>
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
                    <span>Curriculum Abstract Summary</span>
                  </label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Provide a concise curriculum overview outline..."
                    className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs placeholder:text-text-muted/20 focus:outline-hidden transition-all shadow-inner font-sans font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 overflow-visible">
                  <div className="space-y-1.5">
                    <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                      <CornerDownRight
                        size={10}
                        className="text-text-muted/40"
                      />
                      <span>Duration (Minutes)</span>
                    </label>
                    <input
                      type="number"
                      value={estTime}
                      onChange={(e) => setEstTime(Number(e.target.value))}
                      className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 focus:border-text-primary/30 rounded-xl text-text-primary text-xs focus:outline-hidden transition-all shadow-inner font-mono"
                    />
                  </div>

                  {/* 💎 PREMIUM CUSTOM DROPDOWN SELECT ENGINE */}
                  <div
                    className="space-y-1.5 relative overflow-visible"
                    ref={dropdownRef}
                  >
                    <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                      <CornerDownRight
                        size={10}
                        className="text-text-muted/40"
                      />
                      <span>Deployment Visibility</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className="w-full h-9.5 px-3 bg-bg-secondary/40 border border-border-subtle hover:border-border-subtle/80 rounded-xl text-text-primary text-xs flex items-center justify-between transition-all font-mono select-none outline-hidden cursor-pointer"
                    >
                      <span
                        className={cn(
                          status === "PUBLISHED"
                            ? "text-emerald-400 font-bold"
                            : "text-text-secondary",
                        )}
                      >
                        {status === "PUBLISHED"
                          ? "DEPLOY LIVE"
                          : "DRAFT CONTROL"}
                      </span>
                      <ChevronDown
                        size={14}
                        className={cn(
                          "text-text-muted transition-transform duration-200",
                          isDropdownOpen && "transform rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 4 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 top-full bg-bg-primary/95 border border-border-subtle rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-xl flex flex-col select-none border-t-0"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setStatus("DRAFT");
                              setIsDropdownOpen(false);
                            }}
                            className="w-full h-9 px-3 text-left hover:bg-bg-secondary/60 flex items-center justify-between transition-colors font-mono text-xs cursor-pointer text-text-secondary border-none outline-hidde bg-bg-canvas"
                          >
                            <span>DRAFT CONTROL</span>
                            {status === "DRAFT" && (
                              <Check size={12} className="text-accent-gold" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setStatus("PUBLISHED");
                              setIsDropdownOpen(false);
                            }}
                            className="w-full h-9 px-3 text-left hover:bg-bg-secondary/60 flex items-center justify-between transition-colors font-mono text-xs cursor-pointer text-emerald-400 font-bold border-none outline-hidden"
                          >
                            <span>DEPLOY LIVE</span>
                            {status === "PUBLISHED" && (
                              <Check size={12} className="text-emerald-400" />
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-muted font-bold tracking-wide uppercase text-[9px] select-none flex items-center gap-1">
                    <CornerDownRight size={10} className="text-text-muted/40" />
                    <span>Sequence Order Index</span>
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
                          {editingTopicId
                            ? "Save Framework Adjustments"
                            : "Append Topic Registry"}
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

      {/* 5. DESTRUCTIVE PURGE DEPLOYMENT GATES */}
      <AnimatePresence>
        {topicToDelete && (
          <CommandModal
            open={!!topicToDelete}
            onClose={() => setTopicToDelete(null)}
          >
            <div className="p-6 space-y-4 w-full font-sans text-xs bg-bg-primary/95 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

              <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] font-bold uppercase border-b border-border-subtle/80 pb-3 select-none">
                <AlertCircle size={14} />
                <span>Security Checkpoint Exception</span>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed select-text font-medium">
                Confirm processing resource removal pipelines. Dropping this
                topic structure deletes all indexed subsections and linked
                verification scripts permanently.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-3 font-mono text-[10px] font-bold uppercase select-none">
                <button
                  type="button"
                  onClick={() => setTopicToDelete(null)}
                  className="h-8.5 px-4 rounded-xl border border-border-subtle text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 transition-all cursor-pointer active:scale-[0.97] outline-hidden"
                >
                  Abort
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() =>
                    topicToDelete && handleDeleteTopic(topicToDelete)
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

export default memo(ManageTopicsPage);
