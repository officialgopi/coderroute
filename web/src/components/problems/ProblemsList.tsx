// src/components/problems/editor-page-layout-components/ProblemsList.tsx
import { useEffect, useRef, useCallback, memo } from "react";
import { useProblemStore } from "@/store/problem.store";
import { motion } from "framer-motion";
import { ProblemItem } from "./ProblemItem";
import { Code2, Inbox, RefreshCw, Loader2 } from "lucide-react";

// Performance Optimization: Prevent runtime garbage collection overhead
const SKELETON_ROWS = Array.from({ length: 5 });

/* --- PREMIUM TYPOGRAPHY SKELETON LOADER --- */
const ProblemListSkeleton = memo(() => (
  <div className="w-full divide-y divide-border-subtle/40 animate-pulse">
    {SKELETON_ROWS.map((_, i) => (
      <div
        key={`problem-skeleton-${i}`}
        className="grid grid-cols-12 px-6 h-11 items-center bg-bg-secondary/10"
      >
        {/* COL 1: STATUS SPOT */}
        <div className="col-span-1 flex items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-bg-secondary" />
        </div>

        {/* COL 2: TEXT STRIPS */}
        <div className="col-span-11 sm:col-span-9 lg:col-span-9 flex items-center gap-4">
          <div className="h-3 bg-bg-secondary rounded w-8 font-mono shrink-0" />
          <div className="h-3 bg-bg-secondary rounded w-1/3" />
        </div>

        {/* COL 3: ALIGNED DIFFICULTY SPACE */}
        <div className="hidden sm:flex col-span-2 justify-end items-center">
          <div className="h-3.5 bg-bg-secondary rounded w-12" />
        </div>
      </div>
    ))}
  </div>
));
ProblemListSkeleton.displayName = "ProblemListSkeleton";

/* --- CLEAN FALLBACK INVENTORY VACANCY PANEL --- */
const EmptyState = memo(() => (
  <div className="text-center py-16 px-4 flex flex-col items-center bg-bg-secondary/5 border border-dashed border-border-subtle rounded-xl">
    <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-secondary mb-4 shadow-3xs">
      <Inbox size={18} className="text-text-secondary opacity-60" />
    </div>
    <h3 className="text-sm font-semibold text-text-primary">
      No challenges found
    </h3>
    <p className="text-xs text-text-secondary max-w-xs mt-1 leading-relaxed opacity-80">
      We couldn't find any challenges matching your filters. Try adjusting your
      search query parameters.
    </p>
  </div>
));
EmptyState.displayName = "EmptyState";

/* --- MAIN INFINITE-SCROLL CATALOG GRID --- */
export const ProblemsList = () => {
  const { isProblemsLoading, problems, getProblems, hasMore } =
    useProblemStore();
  const observerAnchorRef = useRef<HTMLDivElement | null>(null);

  /* --- 💎 FIXED INITIALIZATION MOUNT LOOP --- */
  useEffect(() => {
    // Only execute initial fetch if the active inventory array is empty
    if (problems.length === 0) {
      getProblems({ resetPagination: true });
    }
  }, [getProblems]);

  /* --- 💎 VIEWPORT INTERSECTION INTERCEPTOR --- */
  const handleScrollIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const targetAnchor = entries[0];

      // Safety gate prevents intersection tracking from racing against page 1 setups
      if (
        targetAnchor.isIntersecting &&
        hasMore &&
        !isProblemsLoading &&
        problems.length > 0
      ) {
        getProblems();
      }
    },
    [getProblems, hasMore, isProblemsLoading, problems.length],
  );

  useEffect(() => {
    const observerElement = observerAnchorRef.current;
    if (!observerElement) return;

    const scrollObserver = new IntersectionObserver(handleScrollIntersection, {
      root: null, // Monitors window root viewport boundaries cleanly
      rootMargin: "240px", // Pre-fetch upcoming challenges early to keep scrolling fluid
      threshold: 0.1,
    });

    scrollObserver.observe(observerElement);

    return () => {
      scrollObserver.disconnect();
    };
  }, [handleScrollIntersection]);

  // View Rule: Present full skeleton during primary initialization fetch
  if (isProblemsLoading && problems.length === 0) {
    return (
      <div className="w-full border border-border-subtle rounded-xl bg-bg-secondary/20 shadow-3xs">
        <div className="px-5 py-4 bg-bg-secondary/40 border-b border-border-subtle flex items-center gap-2">
          <Code2 size={14} className="text-text-secondary animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary opacity-70">
            Loading problem indices...
          </span>
        </div>
        <ProblemListSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full border border-border-subtle rounded-xl bg-bg-secondary/10 backdrop-blur-md shadow-3xs relative flex flex-col overflow-hidden">
      {/* Datagrid Table Header Layout Column Guides */}
      <div className="hidden sm:grid grid-cols-12 px-6 py-3.5 bg-bg-secondary/40 border-b border-border-subtle text-[11px] font-mono font-bold tracking-wider uppercase text-text-secondary opacity-60 select-none">
        <div className="col-span-1">Status</div>
        <div className="col-span-9 lg:col-span-9">Problem Title</div>
        <div className="col-span-2 text-right">Difficulty</div>
      </div>

      {/* Main Stream Evaluation Content Blocks */}
      {problems.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.015 },
              },
            }}
            className="divide-y divide-border-subtle/30"
          >
            {problems.map((p, i) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <ProblemItem problem={p} index={i} />
              </motion.div>
            ))}
          </motion.div>

          {/* 💎 LINEAR SCROLL TRIGGER DETECTOR ANCHOR */}
          <div
            ref={observerAnchorRef}
            className="w-full h-14 flex items-center justify-center select-none pointer-events-none border-t border-border-subtle/5"
            aria-hidden="true"
          >
            {isProblemsLoading && hasMore && (
              <div className="flex items-center gap-2 text-text-muted/60 font-mono text-[10px] tracking-tight">
                <Loader2 size={11} className="animate-spin text-accent-gold" />
                <span>Hydrating operational challenge layers...</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Background Re-validation Sync Indicator */}
      {isProblemsLoading && problems.length > 0 && !hasMore && (
        <div className="absolute top-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-secondary border border-border-subtle shadow-3xs animate-fade-in select-none">
          <RefreshCw size={11} className="text-accent-gold animate-spin" />
          <span className="text-[10px] font-mono font-semibold text-text-secondary opacity-70">
            Syncing
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ProblemsList);
