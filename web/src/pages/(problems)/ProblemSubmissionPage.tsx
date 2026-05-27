import { lazy, Suspense, memo } from "react";

const ProblemSubmission = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/ProblemSubmission"),
);

/* --- 💎 PREMIUM TIMELINE STREAM SKELETON LOADER --- */
const TimelineStreamSkeleton = memo(() => (
  <div
    className="w-full space-y-5 animate-pulse select-none pointer-events-none"
    aria-hidden="true"
  >
    {/* Low-Contrast Metadata Header Anchor Bone */}
    <div className="pb-2.5 border-b border-border-subtle/20 dark:border-zinc-900/40 flex items-center gap-2">
      <div className="h-3.5 w-3.5 rounded bg-neutral-200 dark:bg-zinc-800 shrink-0" />
      <div className="h-3 w-1/4 rounded bg-neutral-200 dark:bg-zinc-800" />
    </div>

    {/* Simulated Interactive Timeline Node Stack */}
    <div className="relative pl-4 space-y-4">
      {/* Decorative vertical timeline rail mimic line */}
      <div className="absolute left-1.5 top-2 bottom-2 w-[1px] bg-neutral-200/60 dark:bg-zinc-900/60" />

      {[...Array(4)].map((_, i) => (
        <div
          key={`timeline-bone-node-${i}`}
          className="relative flex items-center justify-between gap-4"
        >
          {/* Node dot point ring shadow stub */}
          <div className="absolute -left-[14px] h-2 w-2 rounded-full bg-neutral-300 dark:bg-zinc-700 ring-4 ring-neutral-100 dark:ring-zinc-950" />

          {/* Core Horizontal Execution Row Box Bone */}
          <div className="w-full h-14 rounded-xl border border-border-subtle/40 dark:border-zinc-900/50 bg-surface-panel/20 dark:bg-zinc-950/20 px-4 flex items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              {/* Acceptance Title Text Row Spot */}
              <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-zinc-800" />
              {/* Calendar Timestamp Detail Line Spot */}
              <div className="h-2.5 w-32 rounded bg-neutral-200 dark:bg-zinc-800 opacity-60" />
            </div>
            {/* Language Tag Identifier Badge Spot */}
            <div className="h-5 w-12 rounded bg-neutral-200 dark:bg-zinc-800 shrink-0" />
          </div>
        </div>
      ))}
    </div>
  </div>
));

TimelineStreamSkeleton.displayName = "TimelineStreamSkeleton";

/* --- MAIN PAGE CONTEXT WRAPPER --- */
export const ProblemSubmissionPage = () => {
  return (
    <div className="w-full h-full flex flex-col p-2 text-text-primary antialiased">
      <Suspense fallback={<TimelineStreamSkeleton />}>
        <ProblemSubmission />
      </Suspense>
    </div>
  );
};

export default memo(ProblemSubmissionPage);
