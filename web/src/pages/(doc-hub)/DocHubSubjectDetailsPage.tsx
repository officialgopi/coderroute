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
import { toast } from "sonner";

// High-fidelity atomic elements matching your workspace design language
import { Button } from "@/components/ui/button";

interface ITopicNode {
  id: string;
  title: string;
  slug: string;
  estimatedTime: number;
  isCompleted: boolean;
  summary: string;
}

interface IChapterNode {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: ITopicNode[];
}

interface ISubjectDetails {
  name: string;
  slug: string;
  description: string;
  chapters: IChapterNode[];
}

export const DocHubSubjectDetailsPage: React.FC = () => {
  const { subjectSlug } = useParams<{ subjectSlug: string }>();
  const [subject, setSubject] = useState<ISubjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Track open state array coordinates for accordion lanes natively
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const hydrateSyllabusOverview = async () => {
      try {
        setIsLoading(true);
        // Simulating matching query payload: GET {{baseUrl}}/learn/subjects/{{subjectSlug}}
        await new Promise((r) => setTimeout(r, 400));

        const mockData: ISubjectDetails = {
          name: "Operating Systems",
          slug: "operating-systems",
          description:
            "Master thread process synchronization, scheduling kernels, virtualization schemes, memory segmentation, and dynamic disk file management loops.",
          chapters: [
            {
              id: "ch-cpu",
              title: "01. CPU Scheduling Architecture",
              description:
                "Explore the low-level structures handling multi-threaded hardware thread queues.",
              order: 1,
              topics: [
                {
                  id: "tp-rr",
                  title: "Round Robin Process Matrix",
                  slug: "round-robin",
                  estimatedTime: 15,
                  isCompleted: true,
                  summary:
                    "Preemptive processing loop patterns utilizing context quantum switches.",
                },
                {
                  id: "tp-srtf",
                  title: "Shortest Remaining Time Vector",
                  slug: "srtf-scheduling",
                  estimatedTime: 20,
                  isCompleted: false,
                  summary:
                    "Optimal priority boundary calculations for burst runtime arrays.",
                },
              ],
            },
            {
              id: "ch-sync",
              title: "02. Core Process Concurrency",
              description:
                "Demystify concurrent race conditions, instruction traps, and memory access blocks.",
              order: 2,
              topics: [
                {
                  id: "tp-mutex",
                  title: "Mutex & Semaphores Mappings",
                  slug: "mutex-semaphores",
                  estimatedTime: 25,
                  isCompleted: false,
                  summary:
                    "Atomic hardware flags blocking read/write overlapping data corruption loops.",
                },
                {
                  id: "tp-phil",
                  title: "Dining Philosophers Paradox",
                  slug: "dining-philosophers",
                  estimatedTime: 18,
                  isCompleted: false,
                  summary:
                    "Classic deadlock scenario state evaluation mapping resource graphs.",
                },
              ],
            },
          ],
        };

        setSubject(mockData);

        // Open the first chapter layout section by default on mount initialization
        if (mockData.chapters[0]) {
          setExpandedChapters({ [mockData.chapters[0].id]: true });
        }
      } catch {
        toast.error("Failed to map course roadmap tree matrices.");
      } finally {
        setIsLoading(false);
      }
    };
    hydrateSyllabusOverview();
  }, [subjectSlug]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Compute aggregate percentage coordinates locally
  const progressionMetrics = useMemo(() => {
    if (!subject) return { completed: 0, total: 0, percent: 0 };
    let total = 0;
    let completed = 0;
    subject.chapters.forEach((ch) => {
      ch.topics.forEach((tp) => {
        total++;
        if (tp.isCompleted) completed++;
      });
    });
    return {
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [subject]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-bg-primary flex items-center justify-center font-mono text-xs text-text-muted select-none">
        <Loader2 size={13} className="animate-spin text-accent-gold mr-2" />
        <span>Resolving structural roadmap nodes...</span>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="w-full min-h-screen bg-bg-primary flex items-center justify-center font-mono text-xs text-text-muted select-none">
        // Subject curriculum configuration parameters not verified.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary px-4 py-8 md:px-8 max-w-4xl mx-auto font-sans antialiased flex flex-col gap-6 select-none">
      {/* HEADER NAVIGATION & METRIC HUD OVERVIEW */}
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
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
              {subject.name}
            </h1>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-2xl opacity-85 select-text">
              {subject.description}
            </p>
          </div>

          {/* PROGRESS CIRCLE GAUGE BADGE CONTAINER */}
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

      {/* SYLLABUS HIGH-FIDELITY ACCORDION WRAPPER TRACKS */}
      <div className="space-y-3.5">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 pl-0.5">
          // Syllabus Framework Structure
        </h3>

        {subject.chapters.map((chapter) => {
          const isExpanded = !!expandedChapters[chapter.id];
          return (
            <div
              key={chapter.id}
              className="rounded-xl border border-border-subtle bg-bg-secondary/10 overflow-hidden shadow-3xs"
            >
              {/* ACCORDION BAR HEADER TRIGGER */}
              <button
                type="button"
                onClick={() => toggleChapter(chapter.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 bg-bg-secondary/20 hover:bg-bg-secondary/40 transition-colors border-b border-border-subtle/30 text-left cursor-pointer focus:outline-hidden"
              >
                <div className="space-y-0.5 min-w-0">
                  <h4 className="font-semibold text-xs md:text-sm tracking-tight text-text-primary truncate">
                    {chapter.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary truncate opacity-70 font-sans">
                    {chapter.description}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-text-muted p-1 rounded-md shrink-0 border border-transparent"
                >
                  <ChevronDown size={14} />
                </motion.div>
              </button>

              {/* DYNAMIC CHILD LANE DRAWER PANEL */}
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
                      {chapter.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="p-3 sm:px-4 flex items-center justify-between gap-6 hover:bg-bg-secondary/20 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* MARKER VERIFICATION FLAG METERS */}
                            <div className="shrink-0 flex items-center justify-center">
                              {topic.isCompleted ? (
                                <BookmarkCheck
                                  size={14}
                                  className="text-emerald-400 stroke-[2.5]"
                                />
                              ) : (
                                <div className="h-3.5 w-3.5 rounded-full border border-border-subtle bg-bg-primary" />
                              )}
                            </div>

                            <div className="min-w-0 space-y-0.5 select-text">
                              <h5 className="font-medium text-xs text-text-primary group-hover:text-accent-gold transition-colors truncate">
                                {topic.title}
                              </h5>
                              <p className="text-[11px] text-text-secondary leading-normal line-clamp-1 opacity-70 font-sans">
                                {topic.summary}
                              </p>
                            </div>
                          </div>

                          {/* ACTION LAUNCH LAUNCHER TRIGGER */}
                          <div className="flex items-center gap-3 shrink-0 font-mono text-[10px]">
                            <span className="text-text-muted/50 hidden sm:inline-flex items-center gap-1">
                              <Clock size={11} /> {topic.estimatedTime}m
                            </span>
                            <Link
                              /* 💎 DEEP LINKS ROUTED TO WORKSPACE VIEW: `/learn/:subjectSlug/:topicId` */
                              to={`/learn/${subject.slug}/${topic.id}`}
                            >
                              <Button className="h-7 px-2.5 bg-bg-secondary border border-border-subtle hover:border-accent-gold/20 text-text-secondary group-hover:text-accent-gold font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-3xs">
                                <span>Launch</span>
                                <Play
                                  size={8}
                                  className="fill-current stroke-none"
                                />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
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
