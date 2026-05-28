import { lazy, Suspense, memo } from "react";
import { MessageSquare, Heart, Eye } from "lucide-react";

const DiscussionList = lazy(
  () => import("@/components/discussions/DiscussionList"),
);

/* --- 💎 PREMIUM FORUM CHAT STREAM SKELETON LOADER --- */
const DiscussionSkeleton = memo(() => (
  <div
    className="w-full space-y-4 animate-pulse select-none pointer-events-none p-1"
    aria-hidden="true"
  >
    {/* Discussion Header Section Stub */}
    <div className="pb-3 border-b border-border-subtle/30 dark:border-zinc-900/40 flex items-center justify-between">
      <div className="h-4 w-1/4 max-w-[140px] rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-8 w-24 rounded-lg bg-neutral-100 dark:bg-zinc-900 border border-border-subtle/40 dark:border-zinc-900" />
    </div>

    {/* Thread Rows Simulation Feed Loop */}
    {[...Array(5)].map((_, i) => (
      <div
        key={`forum-row-bone-${i}`}
        className="px-4 py-3.5 rounded-xl border border-border-subtle/40 dark:border-zinc-900/50 bg-surface-panel/20 dark:bg-zinc-950/20 flex items-start gap-4 justify-between"
      >
        <div className="min-w-0 flex gap-3 items-start flex-1">
          {/* User Avatar Circle Spot */}
          <div className="h-7 w-7 rounded-full bg-neutral-200 dark:bg-zinc-800 shrink-0 mt-0.5" />

          <div className="space-y-2 flex-1 min-w-0">
            {/* Thread Title Header Bar Line */}
            <div className="h-3.5 w-11/12 max-w-[540px] rounded bg-neutral-200 dark:bg-zinc-800" />

            {/* Thread Meta Subtext String Row */}
            <div className="flex items-center gap-2 text-[10px] opacity-50">
              <div className="h-2.5 w-16 rounded bg-neutral-200 dark:bg-zinc-800" />
              <span>•</span>
              <div className="h-2.5 w-24 rounded bg-neutral-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Counter Metadata Badges Block Tracks */}
        <div className="flex items-center gap-3 shrink-0 pt-1 text-neutral-300 dark:text-zinc-800">
          <div className="flex items-center gap-1">
            <Heart size={11} className="opacity-40" />
            <div className="h-3 w-4 rounded bg-neutral-200 dark:bg-zinc-800" />
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={11} className="opacity-40" />
            <div className="h-3 w-4 rounded bg-neutral-200 dark:bg-zinc-800" />
          </div>
          <div className="flex items-center gap-1">
            <Eye size={11} className="opacity-40" />
            <div className="h-3 w-5 rounded bg-neutral-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    ))}
  </div>
));

DiscussionSkeleton.displayName = "DiscussionSkeleton";

/* --- MAIN DISCUSSIONS WORKSPACE ROOT CONTAINER --- */
export const DiscussionsPage = () => {
  return (
    <div className="w-full h-full flex flex-col p-2 text-text-primary antialiased">
      <Suspense fallback={<DiscussionSkeleton />}>
        <DiscussionList />
      </Suspense>
    </div>
  );
};

export default memo(DiscussionsPage);
