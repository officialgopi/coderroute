// src/features/discussions/components/DiscussionDetailContent.tsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Reply, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useDiscussionStore } from "@/store/discussion.store";
import { useAuthStore } from "@/store/auth.store";
import type { IDiscussion, IUser } from "@/types/types";

const DiscussionAvatar = ({ src, name }: { src?: string; name: string }) => (
  <div className="w-5 h-5 rounded-full bg-bg-surface border border-border-subtle  flex items-center justify-center font-mono font-bold text-[9px] text-text-secondary select-none shrink-0 overflow-hidden">
    {src ? (
      <img src={src} alt={name} className="w-full h-full object-cover" />
    ) : (
      name.substring(0, 2).toUpperCase()
    )}
  </div>
);

type Props = {
  discussion: IDiscussion;
  nestingLevel?: number;
};

export const DiscussionDetailContentComponent: React.FC<Props> = ({
  discussion,
  nestingLevel = 0,
}) => {
  const { user } = useAuthStore();
  const { getDiscussionReplies, createDiscussion } = useDiscussionStore();

  const [childReplies, setChildReplies] = useState<IDiscussion[] | null>(
    discussion.replies ?? null,
  );
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [showChildren, setShowChildren] = useState<boolean>(
    () => discussion._count?.replies === 0,
  );

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const hasChildren = (discussion._count?.replies ?? 0) > 0;
  const isRoot = nestingLevel === 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleToggleReplies = async () => {
    if (showChildren) {
      setShowChildren(false);
      return;
    }
    if (hasFetched) {
      setShowChildren(true);
      return;
    }
    setShowChildren(true);
    setIsRepliesLoading(true);
    try {
      const fetched = await getDiscussionReplies(discussion.id);
      setChildReplies(fetched);
      setHasFetched(true);
    } catch {
      toast.error("Could not sync discussion branches.");
      setShowChildren(false);
    } finally {
      setIsRepliesLoading(false);
    }
  };

  useEffect(() => {
    if (!discussion.parentId && !hasFetched) {
      setIsRepliesLoading(true);
      getDiscussionReplies(discussion.id)
        .then((fetched) => {
          setChildReplies(fetched);
          setHasFetched(true);
        })
        .catch(() => console.error("Telemetry link loss."))
        .finally(() => setIsRepliesLoading(false));
    }
  }, [discussion.id, discussion.parentId]);

  const sendReply = async () => {
    if (!replyText.trim() || isSending) return;
    setIsSending(true);

    const tempReply: IDiscussion = {
      id: "temp-" + Math.random(),
      content: replyText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: discussion.id,
      user: user || ({ name: "Anonymous Developer", avatar: "" } as IUser),
      replies: [],
    };

    setChildReplies((prev) => (prev ? [tempReply, ...prev] : [tempReply]));
    setReplyText("");
    setShowReplyBox(false);
    setShowChildren(true);

    try {
      await createDiscussion({
        content: tempReply.content,
        parentId: discussion.id,
      });
      const refreshed = await getDiscussionReplies(discussion.id);
      setChildReplies(refreshed);
      setHasFetched(true);
    } catch {
      setChildReplies(
        (prev) => prev?.filter((r) => r.id !== tempReply.id) ?? null,
      );
      toast.error("Reply rejected.");
      setShowReplyBox(true);
      setReplyText(tempReply.content);
    } finally {
      setIsSending(false);
    }
  };

  // Professional Keyboard Navigation Engine
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.altKey || e.shiftKey) {
        // Alt+Enter / Shift+Enter: Explicitly insert new line token at cursor pos
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const currentVal = el.value;

        const nextValue =
          currentVal.substring(0, start) + "\n" + currentVal.substring(end);
        setReplyText(nextValue);

        // Sync cursor focus position on next state flush execution macro
        setTimeout(() => {
          el.selectionStart = el.selectionEnd = start + 1;
        }, 0);
      } else {
        // Plain Enter: Execute programmatic comment dispatch
        e.preventDefault();
        sendReply();
      }
    }
  };

  useEffect(() => {
    if (showReplyBox && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showReplyBox]);

  return (
    <motion.div
      className="relative w-full group/thread flex flex-col items-start"
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12 }}
    >
      {/* Premium Minimal Layout Item */}
      <div className="w-full flex items-start gap-2.5 py-1.5 transition-all duration-150 rounded-md">
        <DiscussionAvatar
          src={discussion.user?.avatar}
          name={discussion.user?.name || "Dev"}
        />

        <div className="flex-1 min-w-0 space-y-0.5">
          {/* Metadata String Meta Header Row */}
          <div className="flex items-center gap-1.5 text-[11px] font-sans text-text-muted">
            <span className="font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
              {discussion.user?.name}
            </span>
            {isRoot && (
              <span className="px-1 py-0.2 rounded bg-bg-tertiary border border-border-subtle  text-[9px] font-mono text-text-muted scale-95 origin-left">
                OP
              </span>
            )}
            <span className="opacity-30">•</span>
            <span className="font-mono text-[10px] opacity-70">
              {new Date(discussion.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Clean Sub-text Description Paragraph */}
          <p className="text-sm text-text-primary leading-relaxed tracking-tight select-text whitespace-pre-line">
            {discussion.content}
          </p>

          {/* Bottom Interactive Trigger Rails */}
          <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-text-muted/60">
            <button
              onClick={() => setShowReplyBox((prev) => !prev)}
              className="hover:text-accent-gold flex items-center gap-1 transition-colors cursor-pointer font-medium"
            >
              <Reply size={9} className="opacity-70" />
              <span>Reply</span>
            </button>

            {hasChildren && (
              <button
                onClick={handleToggleReplies}
                className="hover:text-text-secondary flex items-center gap-1 transition-colors cursor-pointer font-medium"
              >
                <MessageSquare size={9} className="opacity-70" />
                <span>
                  {showChildren && hasFetched
                    ? "Collapse"
                    : `${discussion._count?.replies} branch${discussion._count?.replies !== 1 ? "es" : ""}`}
                </span>
              </button>
            )}
          </div>

          {/* INTEGRATED EDITING BOX INPUT */}
          <AnimatePresence>
            {showReplyBox && (
              <motion.div
                className="mt-3 max-w-xl w-full border border-border-subtle  bg-bg-primary rounded-lg overflow-hidden focus-within:border-accent-gold/40 transition-all duration-150 shadow-2xs"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.12 }}
              >
                <textarea
                  ref={textareaRef}
                  rows={2}
                  onKeyDown={handleKeyDown}
                  className="w-full text-xs p-2.5 bg-transparent text-text-primary border-0 outline-hidden focus:ring-0 font-sans resize-none leading-normal placeholder:text-text-muted/40"
                  placeholder="Reply to thread... (Enter to commit, ⌥↵ or ⇧↵ for new line)"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={isSending}
                />
                <div className="h-7 px-2.5 bg-bg-secondary border-t border-border-subtle  flex items-center justify-between text-[9px] font-mono text-text-muted  select-none">
                  <span>↵ to commit | ⌥↵ next line</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowReplyBox(false)}
                      className="hover:text-text-secondary cursor-pointer transition-colors"
                      disabled={isSending}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={sendReply}
                      disabled={isSending || !replyText.trim()}
                      className="h-5 px-2 bg-accent-gold text-bg-primary font-bold rounded text-[9px] hover:bg-accent-primary transition-colors disabled:opacity-30 cursor-pointer flex items-center gap-1"
                    >
                      {isSending && (
                        <Loader2 size={8} className="animate-spin" />
                      )}
                      <span>Commit</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RECURSIVE CONVERSATION BRANCH CHANNELS */}
      <AnimatePresence>
        {showChildren && childReplies && (
          <motion.div
            className="w-full relative mt-0.5 ml-2 sm:ml-2.5 pl-4 sm:pl-4.5 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Ultra-faint Guide Track Line - Turns Amber Gold on Hover */}
            <div className="absolute left-0 top-0 bottom-2 w-[1px] bg-neutral-200 dark:bg-neutral-800/80 group-hover/thread:bg-accent-gold  transition-colors duration-200 pointer-events-none" />

            {isRepliesLoading ? (
              <RepliesSkeleton />
            ) : childReplies.length > 0 ? (
              childReplies.map((reply) => (
                <DiscussionDetailContentComponent
                  key={reply.id}
                  discussion={reply}
                  nestingLevel={nestingLevel + 1}
                />
              ))
            ) : (
              <div className="text-[9px] font-mono text-text-muted/30 pl-1 py-1">
                // Leaf cluster
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RepliesSkeleton = () => (
  <div className="space-y-1.5 animate-pulse py-1 pl-1 w-1/2">
    <div className="h-3 bg-bg-surface  rounded-sm w-3/4" />
    <div className="h-2 bg-bg-surface/30 rounded-sm w-1/2" />
  </div>
);

export default DiscussionDetailContentComponent;
