import { useEffect, useState } from "react";
import { useDiscussionStore } from "@/store/discussion.store";
import type { IDiscussion } from "@/types/types";
import { DiscussionAvatar } from "./DiscussionAvatar";
import { Loader2, ReplyIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { motion } from "framer-motion";

type Props = { discussion: IDiscussion };

const DiscussionDetailContentComponent = ({ discussion }: Props) => {
  const { user } = useAuthStore();
  const { getDiscussionReplies, createDiscussion } = useDiscussionStore();

  const [childReplies, setChildReplies] = useState<IDiscussion[] | null>(
    discussion.replies ?? null
  );
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [showChildren, setShowChildren] = useState(() => {
    return discussion._count?.replies === 0;
  });

  // reply form state:
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const hasChildren = (discussion._count?.replies ?? 0) > 0;

  const handleShowReplies = async () => {
    if (childReplies !== null) {
      setShowChildren((s) => !s);
      return;
    }
    setShowChildren(true);
    setIsRepliesLoading(true);
    const fetched = await getDiscussionReplies(discussion.id);
    setChildReplies(fetched);
    setIsRepliesLoading(false);
  };

  useEffect(() => {
    if (!discussion.parentId) {
      handleShowReplies();
    }
  }, []);

  const sendReply = async () => {
    if (!replyText.trim()) return;

    setIsSending(true);
    console.log(user);
    // Optimistic reply object
    const tempReply: IDiscussion = {
      id: "temp-" + Math.random(),
      content: replyText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: discussion.id,
      user: user!,
      replies: [],
    };

    setChildReplies((prev) => (prev ? [tempReply, ...prev] : [tempReply]));
    setReplyText("");

    try {
      await createDiscussion({
        content: tempReply.content,
        parentId: discussion.id,
      });

      const refreshed = await getDiscussionReplies(discussion.id);
      setChildReplies(refreshed);
    } catch (error) {
      setChildReplies(
        (prev) => prev?.filter((r) => r.id !== tempReply.id) ?? null
      );
      toast.error("Reply failed.");
    }

    setIsSending(false);
    setShowReplyBox(false);
  };

  return (
    <motion.div
      className="relative"
      key={discussion.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      {discussion?.parentId && (
        <ReplyIcon className="absolute top-[40px] left-[-15px] size-[17px] z-0 stroke-2 text-neutral-500/50 rotate-y-180 rotate-x-180" />
      )}

      <motion.div
        className="flex items-start gap-3 border rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        <DiscussionAvatar
          src={discussion.user.avatar}
          name={discussion.user.name}
        />

        <div className="flex-1">
          <div className="text-sm opacity-70">
            <span className="font-medium">{discussion.user.name}</span> •{" "}
            {new Date(discussion.createdAt).toLocaleString()}
          </div>

          <p className="text-sm mt-1 whitespace-pre-line">
            {discussion.content}
          </p>

          <div className="mt-2 flex items-center gap-4 text-xs opacity-70">
            <button
              onClick={() => setShowReplyBox(true)}
              className="hover:opacity-100"
            >
              Reply
            </button>

            {discussion.parentId
              ? hasChildren && (
                  <button
                    onClick={handleShowReplies}
                    className="hover:opacity-100"
                  >
                    {showChildren
                      ? "Hide Replies"
                      : `Show Replies (${discussion._count!.replies})`}
                  </button>
                )
              : `Replies (${discussion._count!.replies})`}
          </div>

          {showReplyBox && (
            <motion.div
              className="mt-2 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <textarea
                rows={2}
                className="w-full text-sm p-2 border rounded outline-none"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={sendReply}
                  disabled={isSending}
                  className="px-3 py-1 text-sm border rounded"
                >
                  {isSending ? (
                    <div className="flex items-center justify-center gap-1">
                      <Loader2 className="size-[16px] animate-spin" />{" "}
                      Sending...
                    </div>
                  ) : (
                    "Send"
                  )}
                </button>
                <button
                  onClick={() => setShowReplyBox(false)}
                  className="px-3 py-1 text-sm border rounded"
                  disabled={isSending}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {(!discussion.parentId || showChildren) && (
        <motion.div
          className="ml-10 pl-3 py-2 relative border-l-2 z-1 border-neutral-300 dark:border-neutral-700 space-y-2"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {isRepliesLoading ? (
            <RepliesSkeleton />
          ) : childReplies && childReplies.length > 0 ? (
            childReplies.map((reply) => (
              <DiscussionDetailContentComponent
                key={reply.id}
                discussion={reply}
              />
            ))
          ) : (
            <div className="text-sm opacity-60">No replies</div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

const RepliesSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 w-32 border rounded" />
    <div className="h-4 w-20 border rounded" />
  </div>
);

export default DiscussionDetailContentComponent;
