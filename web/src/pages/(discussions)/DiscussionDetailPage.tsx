import { useDiscussionStore } from "@/store/discussion.store";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IDiscussion } from "@/types/types";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const DiscussionDetailContentComponent = lazy(
  () => import("@/components/discussions/DiscussionDetailContentComponent")
);

const DiscussionDetailPage = () => {
  const { discussions, getDiscussionById, isDiscussionDetailsLoading } =
    useDiscussionStore();
  const { discussionId } = useParams<{ discussionId: string }>();

  const [discussion, setDiscussion] = useState<IDiscussion | null>(() => {
    const discussion = discussions.find(
      (discussion) => discussion.id === discussionId
    );
    return discussion ?? null;
  });

  useEffect(() => {
    if (!discussion && discussionId) {
      getDiscussionById(discussionId).then((fetchedDiscussion) => {
        if (fetchedDiscussion) {
          setDiscussion(fetchedDiscussion);
        } else {
          toast.error("Discussion not found.");
        }
      });
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full items-center">
        <Link to="/discussions">
          <ArrowLeft className="cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-bold">Discussion Detail</h1>
      </div>
      <div className="w-full flex flex-col gap-4">
        {!isDiscussionDetailsLoading && discussion ? (
          <Suspense
            fallback={
              <div className="w-full flex justify-center py-10 bg-neutral-500/10 animate-pulse rounded-md" />
            }
          >
            <DiscussionDetailContentComponent discussion={discussion} />
          </Suspense>
        ) : !isDiscussionDetailsLoading && !discussion ? (
          <div>No discussion found.</div>
        ) : (
          <div className="w-full flex justify-center py-10 bg-neutral-500/10 animate-pulse rounded-md" />
        )}
      </div>
    </div>
  );
};

export default DiscussionDetailPage;
