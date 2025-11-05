import { useDiscussionStore } from "@/store/discussion.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IDiscussion } from "@/types/types";

const DiscussionDetailPage = () => {
  const { discussions, getDiscussionById } = useDiscussionStore();
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
        }
      });
    }
  }, []);

  return <div className=""></div>;
};

export default DiscussionDetailPage;
