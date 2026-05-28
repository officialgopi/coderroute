import { lazy, Suspense, useEffect, useState, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useDiscussionStore } from "@/store/discussion.store";
import type { IDiscussion } from "@/types/types";

const DiscussionDetailContentComponent = lazy(
  () => import("@/components/discussions/DiscussionDetailContentComponent"),
);

/* --- 💎 PREMIUM THREAD DOCUMENT SKELETON LOADER --- */
const ThreadDetailSkeleton = memo(() => (
  <div
    className="w-full space-y-5 animate-pulse select-none pointer-events-none p-1 pt-2"
    aria-hidden="true"
  >
    {/* Author Info Block Section Skeleton */}
    <div className="flex items-center gap-3">
      <div className="h-7 w-7 rounded-full bg-neutral-200 dark:bg-zinc-800 shrink-0" />
      <div className="space-y-1.5 flex-1">
        <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-zinc-800" />
        <div className="h-2 w-32 rounded bg-neutral-200 dark:bg-zinc-800 opacity-60" />
      </div>
    </div>

    {/* Primary Rich Content Document Block lines */}
    <div className="space-y-3 pt-2">
      <div className="h-4 w-full rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-11/12 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-4/5 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-zinc-800 text-left" />
    </div>

    {/* Decorative Bottom Actions Tray Spacer */}
    <div className="pt-2 flex items-center gap-4 border-t border-border-subtle/20">
      <div className="h-4 w-12 rounded bg-neutral-100 dark:bg-zinc-900" />
      <div className="h-4 w-12 rounded bg-neutral-100 dark:bg-zinc-900" />
    </div>
  </div>
));

ThreadDetailSkeleton.displayName = "ThreadDetailSkeleton";

/* --- MAIN LAYOUT CORE HUB WRAPPER --- */
export const DiscussionDetailPage = () => {
  const { discussions, getDiscussionById, isDiscussionDetailsLoading } =
    useDiscussionStore();
  const { discussionId } = useParams<{ discussionId: string }>();

  const [discussion, setDiscussion] = useState<IDiscussion | null>(() => {
    if (!discussionId) return null;
    return discussions.find((d) => d.id === discussionId) ?? null;
  });

  useEffect(() => {
    if (!discussion && discussionId) {
      getDiscussionById(discussionId)
        .then((fetchedDiscussion) => {
          if (fetchedDiscussion) {
            setDiscussion(fetchedDiscussion);
          } else {
            toast.error("Discussion not found.");
          }
        })
        .catch(() => {
          toast.error("Failed to retrieve conversation logs.");
        });
    }
  }, [discussion, discussionId, getDiscussionById]);

  // Combined evaluation path simplifies markup logic trees
  const GlobalLoadingState =
    isDiscussionDetailsLoading || (!discussion && discussionId);

  return (
    <div className="w-full flex flex-col gap-4 text-text-primary antialiased select-none">
      {/* --- BACK NAVIGATION ROUTE HEADER BAR --- */}
      <div className="flex items-center select-none pb-1">
        <Link
          to="/discussions"
          className="h-7 w-7 rounded-lg border border-border-subtle/20 dark:border-border-subtle/20 bg-zinc-50 dark:bg-zinc-900/20 text-text-secondary hover:text-text-primary hover:border-border-subtle/20 dark:hover:border-border-subtle/20 flex items-center justify-center transition-all cursor-pointer outline-none shadow-3xs"
          aria-label="Return to full historical index discussion feed list"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
        </Link>
      </div>

      {/* --- UNIFIED CONTEXT DISPATCH TRACK --- */}
      <div className="w-full flex flex-col gap-4">
        {GlobalLoadingState ? (
          <ThreadDetailSkeleton />
        ) : discussion ? (
          <Suspense fallback={<ThreadDetailSkeleton />}>
            <DiscussionDetailContentComponent discussion={discussion} />
          </Suspense>
        ) : (
          <div className="py-12 text-center select-none opacity-40">
            <p className="italic font-mono text-xs text-text-secondary">
              // The conversation thread requested could not be resolved in the
              store index.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DiscussionDetailPage);
