import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Code2 } from "lucide-react";

// Mock payload schema representing real user metrics maps
const SOLVED_MOCK = {
  summary: { total: 142, easy: 64, medium: 58, hard: 20 },
  items: [
    {
      id: "p1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      date: "2026-05-12",
    },
    {
      id: "p2",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "Strings",
      date: "2026-05-10",
    },
    {
      id: "p3",
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      category: "Linked Lists",
      date: "2026-04-28",
    },
  ],
};

export const SolvedTab = () => {
  const { summary, items } = SOLVED_MOCK;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-6 font-sans text-text-primary"
    >
      {/* --- STATS HIGHLIGHT COMPACT GRID --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 select-none">
        {[
          {
            label: "Total Solved",
            val: summary.total,
            color: "text-amber-500",
            bg: "bg-amber-500/5 border-amber-500/20",
          },
          {
            label: "Easy Class",
            val: summary.easy,
            color: "text-emerald-500",
            bg: "bg-emerald-500/5 border-emerald-500/10",
          },
          {
            label: "Medium Metric",
            val: summary.medium,
            color: "text-orange-500",
            bg: "bg-orange-500/5 border-orange-500/10",
          },
          {
            label: "Hard Objective",
            val: summary.hard,
            color: "text-rose-500",
            bg: "bg-rose-500/5 border-rose-500/10",
          },
        ].map((block, i) => (
          <div
            key={`stat-${i}`}
            className={`p-4 rounded-xl border bg-surface-card/40 dark:bg-zinc-950/20 flex flex-col justify-between h-20 ${block.bg}`}
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50">
              {block.label}
            </span>
            <span
              className={`text-xl font-bold tracking-tight font-mono ${block.color}`}
            >
              {block.val}
            </span>
          </div>
        ))}
      </div>

      {/* --- PROBLEMS RESOLVED ARCHIVE FEED --- */}
      <div className="space-y-2">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none px-1">
          Recent Solutions Compiled
        </h3>

        <div className="flex flex-col gap-2">
          {items.map((item, _index) => (
            <div
              key={item.id}
              className="w-full h-14 rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/20 dark:bg-zinc-900/10 hover:border-border-intense dark:hover:border-zinc-800 px-4 flex items-center justify-between gap-4 transition-all shadow-3xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <CheckCircle2
                  size={14}
                  className="text-emerald-500 shrink-0 stroke-[2.5]"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-text-primary truncate max-w-md group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-text-secondary opacity-50">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border leading-none tracking-wide select-none ${
                    item.difficulty === "Easy"
                      ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                      : item.difficulty === "Medium"
                        ? "bg-orange-500/5 text-orange-500 border-orange-500/20"
                        : "bg-rose-500/5 text-rose-500 border-rose-500/20"
                  }`}
                >
                  {item.difficulty}
                </span>
                <Code2
                  size={13}
                  className="text-text-secondary opacity-30 group-hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(SolvedTab);
