import { lazy, Suspense, memo } from "react";

const ProblemDescription = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/ProblemDescription"),
);

/* --- 💎 PREMIUM TYPOGRAPHY SKELETON LOADER --- */
const DescriptionSkeleton = memo(() => (
  <div
    className="space-y-5 max-w-4xl p-1 animate-pulse select-none pointer-events-none"
    aria-hidden="true"
  >
    {/* Problem Title Bone Track */}
    <div className="pb-3 border-b border-border-subtle/20 dark:border-zinc-900/40">
      <div className="h-6 w-2/5 rounded-md bg-neutral-200 dark:bg-zinc-800" />
    </div>

    {/* Content Skeleton Block Streams */}
    <div className="space-y-3 pt-2">
      <div className="h-4 w-11/12 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-full rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-4/5 rounded bg-neutral-200 dark:bg-zinc-800" />
    </div>

    <div className="space-y-3 pt-4">
      {/* Code Block Stub Emulation */}
      <div className="w-full h-24 rounded-xl bg-neutral-100 dark:bg-zinc-900/60 border border-border-subtle/30 dark:border-zinc-900/40" />
    </div>

    <div className="space-y-3 pt-2">
      <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-full rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-zinc-800" />
    </div>
  </div>
));

DescriptionSkeleton.displayName = "DescriptionSkeleton";

/* --- MAIN PAGE CONTEXT WRAPPER --- */
export const ProblemDescriptionPage = () => {
  return (
    <Suspense fallback={<DescriptionSkeleton />}>
      <ProblemDescription />
    </Suspense>
  );
};

export default memo(ProblemDescriptionPage);
