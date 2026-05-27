import { lazy, Suspense, memo } from "react";
import { useProblemStore } from "@/store/problem.store";

const ProblemEditorial = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/ProblemEditorial"),
);

/* --- 💎 PREMIUM DOCUMENTATION SKELETON LOADER --- */
const EditorialSkeleton = memo(() => (
  <div
    className="space-y-5 max-w-4xl p-1 animate-pulse select-none pointer-events-none"
    aria-hidden="true"
  >
    {/* Low-Contrast Metadata Header Anchor Bone */}
    <div className="pb-3 border-b border-border-subtle/20 dark:border-zinc-900/40 flex items-center gap-2">
      <div className="h-3.5 w-3.5 rounded bg-neutral-200 dark:bg-zinc-800 shrink-0" />
      <div className="h-3 w-1/4 rounded bg-neutral-200 dark:bg-zinc-800" />
    </div>

    {/* Document Paragraph Line Arrays */}
    <div className="space-y-3 pt-1">
      <div className="h-4 w-full rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-11/12 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-zinc-800" />
    </div>

    {/* Section Break / Title Bone Placeholder */}
    <div className="pt-4">
      <div className="h-5 w-1/3 rounded-md bg-neutral-200 dark:bg-zinc-800" />
    </div>

    <div className="space-y-3">
      <div className="h-4 w-full rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-zinc-800" />
    </div>
  </div>
));

EditorialSkeleton.displayName = "EditorialSkeleton";

/* --- MAIN PAGE CONTEXT WRAPPER --- */
export const ProblemEditorialPage = () => {
  const { problemInCodeEditor } = useProblemStore();

  return (
    <Suspense fallback={<EditorialSkeleton />}>
      <ProblemEditorial problem={problemInCodeEditor} />
    </Suspense>
  );
};

export default memo(ProblemEditorialPage);
