// src/pages/(doc-hub)/DocHubSubjectDetailsPage.tsx
import React, { useState, useEffect, useMemo, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronDown,
  Clock,
  BookmarkCheck,
  Play,
  Loader2,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLearnStore } from "@/store/learn.store";

export const DocHubSubjectDetailsPage: React.FC = () => {
  const { subjectSlug } = useParams<{ subjectSlug: string }>();

  // Ingest global cache buckets alongside flat tracking map slices
  const {
    subjects,
    topics: storeTopics,
    progress,
    getSubjects,
    getSubjectById,
    getChapterById,
    getProgress,
  } = useLearnStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chapterLoadingId, setChapterLoadingId] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});

  // Scan root subjects map to isolate the active target subject
  const targetSubject = useMemo(() => {
    return Object.values(subjects).find((sub) => sub.slug === subjectSlug);
  }, [subjects, subjectSlug]);

  // DATA-MERGER PATTERN: Combines raw subject schemas with lazy-loaded store topics dynamically
  const hydratedChapters = useMemo(() => {
    if (!targetSubject?.chapters) return [];

    return targetSubject.chapters.map((chapter) => {
      const cachedStoreTopics = Object.values(storeTopics || {}).filter(
        (topic) => {
          return (
            topic &&
            (topic.chapterId === chapter.id ||
              (topic as any).chapter_id === chapter.id)
          );
        },
      );

      const baselineTopics = chapter.topics || [];

      const unifiedMap = new Map();
      [...baselineTopics, ...cachedStoreTopics].forEach((t) => {
        if (t && t.id) unifiedMap.set(t.id, t);
      });

      const finalizedTopics = Array.from(unifiedMap.values()).sort(
        (a, b) => (a.order || 0) - (b.order || 0),
      );

      return {
        ...chapter,
        topics: finalizedTopics,
      };
    });
  }, [targetSubject?.chapters, storeTopics]);

  useEffect(() => {
    const orchestrateDataHydration = async () => {
      try {
        setIsLoading(true);
        await getSubjects();
        await getProgress();

        if (targetSubject) {
          const subjectData = await getSubjectById(targetSubject.id);

          // Lazy-load the first chapter by default on initial mount
          if (subjectData?.chapters?.[0]) {
            const firstChId = subjectData.chapters[0].id;
            setChapterLoadingId(firstChId);
            await getChapterById(firstChId);
            setExpandedChapters({ [firstChId]: true });
          }
        }
      } catch (error) {
        console.error("Failed to map course roadmap tree matrices:", error);
      } finally {
        setIsLoading(false);
        setChapterLoadingId(null);
      }
    };

    orchestrateDataHydration();
  }, [
    subjectSlug,
    targetSubject?.id,
    getSubjects,
    getSubjectById,
    getChapterById,
    getProgress,
  ]);

  const handleChapterToggle = async (chapterId: string) => {
    const isOpening = !expandedChapters[chapterId];

    if (isOpening) {
      try {
        setChapterLoadingId(chapterId);
        await getChapterById(chapterId);
      } catch (error) {
        console.error(
          "Failed to fetch topics for selected chapter node:",
          error,
        );
      } finally {
        setChapterLoadingId(null);
      }
    }

    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: isOpening,
    }));
  };

  // Telemetry computation gauges derived from our newly hydrated data block structure
  const progressionMetrics = useMemo(() => {
    if (!hydratedChapters || hydratedChapters.length === 0)
      return { completed: 0, total: 0, percent: 0 };

    let total = 0;
    let completed = 0;

    // 💎 FIXED: Safe fallback dictionary instantiation to protect loops from early execution crashes
    const safeProgress = progress || {};

    hydratedChapters.forEach((ch) => {
      if (ch && ch.topics) {
        ch.topics.forEach((tp) => {
          if (tp && tp.id) {
            total++;
            if (safeProgress[tp.id]?.completed) completed++;
          }
        });
      }
    });

    return {
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [hydratedChapters, progress]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-bg-primary flex items-center justify-center font-mono text-xs text-text-muted select-none">
        <Loader2 size={13} className="animate-spin text-accent-gold mr-2" />
        <span>Resolving structural roadmap nodes from state registry...</span>
      </div>
    );
  }

  if (!targetSubject) {
    return (
      <div className="w-full min-h-screen bg-bg-primary flex items-center justify-center font-mono text-xs text-text-muted select-none">
        // Subject curriculum configuration parameters not verified or indexed.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary px-4 py-8 md:px-8 max-w-4xl mx-auto font-sans antialiased flex flex-col gap-6 select-none">
      {/* HEADER HUD METRICS BANNER MODULE */}
      <div className="space-y-4 border-b border-border-subtle pb-6">
        <Link
          to="/learn"
          className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary hover:text-accent-gold transition-colors w-max"
        >
          <ChevronLeft size={10} />
          <span>Return To Academy</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary select-text">
              {targetSubject.name}
            </h1>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-2xl opacity-85 select-text font-sans">
              {targetSubject.description}
            </p>
          </div>

          <div className="px-4 py-3 rounded-xl border border-border-subtle bg-bg-secondary/30 flex items-center gap-3 shadow-3xs shrink-0 self-start font-mono text-[10px]">
            <Award size={14} className="text-accent-gold" />
            <div className="space-y-0.5">
              <span className="text-text-muted block text-[9px] uppercase font-bold tracking-tight">
                Track Progression
              </span>
              <span className="text-text-primary font-bold">
                {progressionMetrics.completed} / {progressionMetrics.total}{" "}
                Mapped ({progressionMetrics.percent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SYLLABUS HIGH-FIDELITY ACCORDION SECTION */}
      <div className="space-y-3.5">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 pl-0.5">
          // Syllabus Framework Structure
        </h3>

        {hydratedChapters.map((chapter) => {
          const isExpanded = !!expandedChapters[chapter.id];
          const isChapterFetching = chapterLoadingId === chapter.id;

          return (
            <div
              key={chapter.id}
              className="rounded-xl border border-border-subtle bg-bg-secondary/10 overflow-hidden shadow-3xs"
            >
              {/* HEADER TRIGGER BAR */}
              <button
                type="button"
                disabled={isChapterFetching}
                onClick={() => handleChapterToggle(chapter.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 bg-bg-secondary/20 hover:bg-bg-secondary/40 disabled:hover:bg-bg-secondary/20 transition-colors border-b border-border-subtle/30 text-left cursor-pointer focus:outline-hidden"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h4 className="font-semibold text-xs md:text-sm tracking-tight text-text-primary truncate select-text">
                    {chapter.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary truncate opacity-70 font-sans select-text">
                    {chapter.description}
                  </p>
                </div>

                <div className="text-text-muted p-1 rounded-md shrink-0 flex items-center justify-center min-w-[1.5rem]">
                  {isChapterFetching ? (
                    <Loader2
                      size={12}
                      className="animate-spin text-accent-gold"
                    />
                  ) : (
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown size={14} />
                    </motion.div>
                  )}
                </div>
              </button>

              {/* ACCORDION EXPANSION DRAWER LAYER */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 bg-bg-primary/10 divide-y divide-border-subtle/30">
                      {chapter.topics && chapter.topics.length > 0 ? (
                        chapter.topics.map((topic) => {
                          // 💎 FIXED: Safe progress fallback object assignment mapping inline
                          const isTopicCompleted = !!(progress || {})[topic.id]
                            ?.completed;

                          return (
                            <div
                              key={topic.id}
                              className="p-3 sm:px-4 flex items-center justify-between gap-6 hover:bg-bg-secondary/20 rounded-lg transition-colors group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="shrink-0 flex items-center justify-center select-none">
                                  {isTopicCompleted ? (
                                    <BookmarkCheck
                                      size={14}
                                      className="text-emerald-400 stroke-[2.5]"
                                    />
                                  ) : (
                                    <div className="h-3.5 w-3.5 rounded-full border border-border-subtle bg-bg-primary" />
                                  )}
                                </div>

                                <div className="min-w-0 space-y-0.5">
                                  <h5 className="font-medium text-xs text-text-primary group-hover:text-accent-gold transition-colors truncate select-text">
                                    {topic.title}
                                  </h5>
                                  <p className="text-[11px] text-text-secondary leading-normal line-clamp-1 opacity-70 font-sans select-text">
                                    {topic.summary}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 font-mono text-[10px]">
                                <span className="text-text-muted/50 hidden sm:inline-flex items-center gap-1 select-none">
                                  <Clock size={11} />{" "}
                                  {topic.estimatedTime || 15}m
                                </span>
                                <Link
                                  to={`/learn/${targetSubject.slug}/${topic.id}`}
                                >
                                  <Button className="h-7 px-2.5 bg-bg-secondary border border-border-subtle hover:border-accent-gold/20 text-text-secondary group-hover:text-accent-gold font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-3xs pt-0.5">
                                    <span>Launch</span>
                                    <Play
                                      size={8}
                                      className="fill-current stroke-none mt-[-1px]"
                                    />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center font-mono text-[10px] text-text-muted/60 italic select-none">
                          // No active topics mapped to this block yet.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(DocHubSubjectDetailsPage);
