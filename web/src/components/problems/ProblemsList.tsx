import { useEffect, memo } from "react";
import { useProblemStore } from "@/store/problem.store";
import { motion } from "motion/react";
import { ProblemItem } from "./ProblemItem";
import { Code2, Inbox, RefreshCw } from "lucide-react";

// Performance Optimization: Prevent runtime garbage collection overhead by extracting the static array
const SKELETON_ROWS = Array.from({ length: 5 });

const ProblemListSkeleton = () => (
  <div className="w-full divide-y divide-border-subtle dark:divide-border-subtle/60 animate-pulse">
    {SKELETON_ROWS.map((_, i) => (
      <div
        key={`problem-skeleton-${i}`}
        className="p-5 flex items-center justify-between bg-surface-panel/40"
      >
        <div className="space-y-2.5 w-1/3">
          <div className="h-4 bg-surface-card dark:bg-zinc-800 rounded-md w-3/4" />
          <div className="h-3 bg-surface-card/60 dark:bg-zinc-800/60 rounded-md w-1/2" />
        </div>
        <div className="flex gap-6 items-center w-1/4 justify-end">
          <div className="h-4 bg-surface-card dark:bg-zinc-800 rounded-md w-12" />
          <div className="h-5 bg-surface-card dark:bg-zinc-800 rounded-full w-16" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16 px-4 flex flex-col items-center bg-surface-panel/10">
    <div className="w-12 h-12 rounded-xl bg-surface-card dark:bg-zinc-900 border border-border-subtle dark:border-zinc-800 flex items-center justify-center text-text-secondary mb-4 shadow-xs">
      <Inbox size={18} className="text-text-secondary opacity-60" />
    </div>
    <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary">
      No challenges found
    </h3>
    <p className="text-xs text-text-secondary dark:text-text-secondary max-w-xs mt-1 leading-relaxed opacity-80">
      We couldn't find any challenges matching your filters. Try adjusting your
      search query.
    </p>
  </div>
);

export const ProblemsList = () => {
  const { isProblemsLoading, problems, getProblems } = useProblemStore();

  useEffect(() => {
    getProblems();
  }, [getProblems]);

  // View Rule: Present full layout placeholder skeleton during primary initialization fetch
  if (isProblemsLoading && problems.length === 0) {
    return (
      <div className="w-full border border-border-subtle dark:border-border-subtle rounded-xl bg-surface-panel/30 overflow-hidden shadow-xs">
        <div className="px-5 py-4 bg-bg-canvas dark:bg-zinc-950/40 border-b border-border-subtle dark:border-border-subtle flex items-center gap-2">
          <Code2
            size={14}
            className="text-text-secondary dark:text-text-secondary animate-pulse"
          />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary opacity-70">
            Loading problem indices...
          </span>
        </div>
        <ProblemListSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full border border-border-subtle dark:border-border-subtle rounded-xl bg-surface-panel/30 backdrop-blur-md overflow-hidden shadow-xs relative">
      {/* Datagrid Table Header Layout Column Guides */}
      <div className="hidden sm:grid grid-cols-12 px-6 py-3.5 bg-surface-card/30 dark:bg-zinc-950/20 border-b border-border-subtle dark:border-border-subtle text-[11px] font-mono font-bold tracking-wider uppercase text-text-secondary dark:text-text-secondary opacity-60 select-none">
        <div className="col-span-1">Status</div>
        <div className="col-span-6 lg:col-span-7">Problem Title</div>
        <div className="col-span-3 lg:col-span-2 text-center">Acceptance</div>
        <div className="col-span-2 text-right">Difficulty</div>
      </div>

      {/* Main Stream Evaluation Content Blocks */}
      {problems.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.03 },
            },
          }}
          className="divide-y divide-border-subtle dark:divide-border-subtle/60"
        >
          {problems.map((p, i) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <ProblemItem problem={p} index={i} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Background Re-validation Sync Indicator (Protects layout flow from shifting) */}
      {isProblemsLoading && problems.length > 0 && (
        <div className="absolute top-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-panel dark:bg-zinc-900 border border-border-subtle dark:border-zinc-800 shadow-xs animate-fade-in">
          <RefreshCw
            size={11}
            className="text-amber-500 animate-spin duration-2000"
          />
          <span className="text-[10px] font-mono font-semibold text-text-secondary dark:text-text-secondary opacity-70">
            Syncing
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ProblemsList);
