import { lazy, Suspense, memo } from "react";
import { useProblemStore } from "@/store/problem.store";

const ProblemSolution = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/ProblemSolution"),
);

/* --- 💎 PREMIUM TERMINAL SYNTAX SKELETON LOADER --- */
const SolutionSkeleton = memo(() => (
  <div
    className="space-y-5 max-w-4xl p-1 animate-pulse select-none pointer-events-none"
    aria-hidden="true"
  >
    {/* Low-Contrast Metadata Header Anchor Bone */}
    <div className="pb-3 border-b border-border-subtle/20 dark:border-zinc-900/40 flex items-center gap-2">
      <div className="h-3.5 w-3.5 rounded bg-neutral-200 dark:bg-zinc-800 shrink-0" />
      <div className="h-3 w-1/4 rounded bg-neutral-200 dark:bg-zinc-800" />
    </div>

    {/* Simulated Terminal Window Layout Block */}
    <div className="rounded-xl border border-border-subtle/30 dark:border-zinc-900/40 overflow-hidden bg-neutral-50 dark:bg-zinc-950/20">
      {/* Upper Action Bar Simulator */}
      <div className="h-8 px-4 flex items-center justify-between bg-neutral-100/60 dark:bg-zinc-900/20 border-b border-border-subtle/20 dark:border-zinc-900/30">
        <div className="h-3 w-1/3 max-w-[180px] rounded bg-neutral-200 dark:bg-zinc-800" />
        <div className="h-5 w-12 rounded bg-neutral-200 dark:bg-zinc-800" />
      </div>

      {/* Code Text Body Simulator Blocks */}
      <div className="p-4 space-y-2.5">
        <div className="h-3.5 w-2/3 rounded bg-neutral-200 dark:bg-zinc-800" />
        <div className="h-3.5 w-4/5 rounded bg-neutral-200 dark:bg-zinc-800 pl-4" />
        <div className="h-3.5 w-1/2 rounded bg-neutral-200 dark:bg-zinc-800 pl-8" />
        <div className="h-3.5 w-3/4 rounded bg-neutral-200 dark:bg-zinc-800 pl-4" />
        <div className="h-3.5 w-1/4 rounded bg-neutral-200 dark:bg-zinc-800" />
      </div>
    </div>
  </div>
));

SolutionSkeleton.displayName = "SolutionSkeleton";

/* --- MAIN SOLUTIONS PAGE PORTAL CONTEXT WRAPPER --- */
export const ProblemSolutionPage = () => {
  const { problemInCodeEditor } = useProblemStore();

  return (
    <Suspense fallback={<SolutionSkeleton />}>
      <ProblemSolution problem={problemInCodeEditor} />
    </Suspense>
  );
};

export default memo(ProblemSolutionPage);
