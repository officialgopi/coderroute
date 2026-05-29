import { memo } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, Calendar } from "lucide-react";

const DISCUSSIONS_MOCK = [
  {
    id: "d1",
    title:
      "Optimizing Matrix Exponentiation approaches for Dynamic Programming queries",
    snippet:
      "I was exploring the boundary thresholds when computing complex arrays...",
    replies: 14,
    date: "May 24, 2026",
  },
  {
    id: "d2",
    title:
      "Unexplained memory leak anomalies when calling Monaco hooks inside strict react trees",
    snippet:
      "Every time the problem view tree changes tab alignment indexes, structural memory spaces overflow...",
    replies: 3,
    date: "May 18, 2026",
  },
];

export const DiscussionsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-3 font-sans text-text-primary"
    >
      <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none px-1">
        Active Node Dispatches
      </h3>

      <div className="flex flex-col gap-2.5">
        {DISCUSSIONS_MOCK.map((thread) => (
          <div
            key={thread.id}
            className="w-full p-4 rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/20 dark:bg-zinc-900/5 flex items-start justify-between gap-4 transition-all shadow-3xs group hover:border-border-intense dark:hover:border-zinc-800"
          >
            <div className="space-y-1.5 min-w-0 flex-1">
              {/* Heading Link Label Node */}
              <h4 className="text-xs font-semibold text-text-primary truncate max-w-2xl group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors cursor-pointer">
                {thread.title}
              </h4>

              {/* Informational Snippet preview */}
              <p className="text-[11px] text-text-secondary opacity-70 line-clamp-1 leading-relaxed select-text">
                {thread.snippet}
              </p>

              {/* Lower Informational Strip Context */}
              <div className="pt-1 flex items-center gap-3.5 font-mono text-[10px] text-text-secondary opacity-50 select-none">
                <div className="flex items-center gap-1.5">
                  <MessageSquare size={11} className="opacity-80" />
                  <span>
                    {thread.replies}{" "}
                    {thread.replies === 1 ? "thread branch" : "thread branches"}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar size={10} className="opacity-70" />
                  <span>{thread.date}</span>
                </div>
              </div>
            </div>

            {/* Micro Forward Arrow Icon Anchor */}
            <div className="h-6 w-6 rounded-md flex items-center justify-center shrink-0 border border-transparent group-hover:border-border-subtle dark:group-hover:border-zinc-800/80 group-hover:bg-neutral-50 dark:group-hover:bg-zinc-950/40 text-text-secondary opacity-30 group-hover:opacity-100 transition-all self-center">
              <ArrowRight size={12} className="stroke-[2.5]" />
            </div>
          </div>
        ))}

        {DISCUSSIONS_MOCK.length === 0 && (
          <div className="py-12 text-center opacity-40 select-none">
            <p className="italic font-mono text-xs text-text-secondary">
              // No active network message nodes verified.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(DiscussionsTab);
