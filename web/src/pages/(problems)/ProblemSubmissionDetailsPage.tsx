import { lazy, Suspense, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProblemSubmissionDetails = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/ProblemSubmissionDetails"),
);

/* --- 💎 PREMIUM METRICS & EDITOR CANVAS SKELETON LOADER --- */
const SubmissionDetailsSkeleton = memo(() => (
  <div
    className="w-full space-y-5 animate-pulse select-none pointer-events-none pt-4"
    aria-hidden="true"
  >
    {/* Highlight Metric Grid Blocks Simulation */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      {[...Array(4)].map((_, i) => (
        <div
          key={`metric-stub-${i}`}
          className="h-[62px] w-full rounded-xl border border-border-subtle/30 dark:border-zinc-900/50 bg-neutral-100/50 dark:bg-zinc-950/20"
        />
      ))}
    </div>

    {/* Timestamp Marker Line Stub */}
    <div className="h-3 w-1/3 max-w-[210px] rounded bg-neutral-200 dark:bg-zinc-800 ml-1 opacity-60" />

    {/* Code Editor Window Shell Simulation */}
    <div className="space-y-2 pt-2">
      <div className="h-3 w-32 rounded bg-neutral-200 dark:bg-zinc-800 ml-0.5" />
      <div className="h-64 w-full rounded-xl border border-border-subtle/40 dark:border-zinc-900/60 bg-neutral-100/30 dark:bg-zinc-950/10" />
    </div>
  </div>
));

SubmissionDetailsSkeleton.displayName = "SubmissionDetailsSkeleton";

/* --- MAIN LAYOUT CONTEXT HUB --- */
export const ProblemSubmissionDetailsPage = () => {
  const { slug } = useParams();

  return (
    <div className="w-full h-full flex flex-col p-2 text-text-primary antialiased selection:bg-amber-500/20">
      {/* --- BACK NAVIGATION ROUTE HEADER BAR --- */}
      <div className="flex items-center gap-3 select-none pb-1">
        <Link
          to={`/problems/${slug}/submissions`}
          className="h-7 w-7 rounded-lg border border-border-subtle/60 dark:border-zinc-900/60 bg-zinc-50 dark:bg-zinc-900/20 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-800 flex items-center justify-center transition-all cursor-pointer outline-none shadow-3xs"
          aria-label="Return to historical compilation submissions list"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
        </Link>
      </div>

      {/* --- CONTENT WORKSPACE STREAM BOUNDARY --- */}
      <Suspense fallback={<SubmissionDetailsSkeleton />}>
        <ProblemSubmissionDetails />
      </Suspense>
    </div>
  );
};

export default memo(ProblemSubmissionDetailsPage);
