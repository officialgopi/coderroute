import { useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DiscussionHeader } from "./DiscussionHeader";
import { DiscussionAvatar } from "./DiscussionAvatar";
import { DiscussionStats } from "./DiscussionStats";
import { useDiscussionStore } from "@/store/discussion.store";

export const DiscussionList = () => {
  const { discussions, isDiscussionsLoading, getDiscussions } =
    useDiscussionStore();

  useEffect(() => {
    getDiscussions();
  }, [getDiscussions]);

  return (
    <div className="w-full mx-auto select-none">
      {/* Dynamic Actions & Filter Header Component */}
      <DiscussionHeader />

      <div className="flex flex-col gap-2.5">
        {discussions.map((d, index) => {
          if (!d?.id) return null;

          return (
            <Link
              to={d.id}
              key={`discussion-link-${d.id}`}
              className="block cursor-pointer outline-none group"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.16,
                  delay: Math.min(index * 0.03, 0.24),
                  ease: "easeOut",
                }}
                className="flex items-start justify-between border border-border-subtle/50 dark:border-zinc-900 bg-surface-card/30 dark:bg-zinc-900/5 hover:border-border-intense dark:hover:border-zinc-800/80 hover:bg-neutral-50 dark:hover:bg-zinc-950/40 rounded-xl p-4 transition-all shadow-3xs"
              >
                <div className="flex gap-3.5 min-w-0 flex-1">
                  {/* User Profile Avatar Frame */}
                  <div className="shrink-0 pt-0.5">
                    <DiscussionAvatar
                      src={d?.user?.avatar}
                      name={d?.user?.name}
                    />
                  </div>

                  {/* Thread Context Space */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-text-secondary opacity-60">
                      <span className="font-semibold text-text-primary opacity-90">
                        {d?.user?.name || "Anonymous"}
                      </span>
                      <span className="select-none">•</span>
                      <span className="font-mono text-[10px]">
                        {new Date(d.createdAt).toLocaleDateString()} at{" "}
                        {new Date(d.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Clamped Text Body Block */}
                    <p className="text-xs text-text-secondary dark:text-zinc-300 line-clamp-2 leading-relaxed max-w-3xl select-text">
                      {d?.content}
                    </p>

                    {/* Core Counters Metrics Strip */}
                    <div className="pt-1.5">
                      <DiscussionStats replies={d?._count?.replies || 0} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}

        {/* --- EMPTY RESULT FALLBACK LAYER --- */}
        {!isDiscussionsLoading && discussions.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center select-none opacity-40">
            <p className="italic font-mono text-xs text-text-secondary">
              // No active discussion threads matched your repository filter
              index.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DiscussionList);
