import { memo } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, TrendingUp, Calendar } from "lucide-react";

// Mock competitive analytics data payload
const CONTESTS_MOCK = {
  metrics: {
    rating: 1842,
    globalRank: "Top 4.2%",
    attended: 28,
    bestRank: 114,
  },
  history: [
    {
      id: "c1",
      title: "Weekly Competitive Arena 84",
      rank: "242 / 8500",
      ratingDelta: "+34",
      isPositive: true,
      date: "May 24, 2026",
    },
    {
      id: "c2",
      title: "Bi-Weekly Speed Sprint 41",
      rank: "512 / 6200",
      ratingDelta: "-12",
      isPositive: false,
      date: "May 10, 2026",
    },
    {
      id: "c3",
      title: "Global Grandmaster Open 2026",
      rank: "114 / 12400",
      ratingDelta: "+58",
      isPositive: true,
      date: "Apr 26, 2026",
    },
  ],
};

export const ContestsTab = () => {
  const { metrics, history } = CONTESTS_MOCK;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-6 font-sans text-text-primary"
    >
      {/* --- RATING & PLACEMENT CONSOLE METRICS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 select-none">
        {[
          {
            label: "Platform Rating",
            val: metrics.rating,
            color: "text-amber-500",
            icon: Trophy,
          },
          {
            label: "Global Percentile",
            val: metrics.globalRank,
            color: "text-text-primary",
            icon: Award,
          },
          {
            label: "Contests Attended",
            val: metrics.attended,
            color: "text-text-primary",
            icon: Calendar,
          },
          {
            label: "Personal Best Rank",
            val: `#${metrics.bestRank}`,
            color: "text-emerald-500",
            icon: TrendingUp,
          },
        ].map((block, i) => {
          const Icon = block.icon;
          return (
            <div
              key={`contest-metric-${i}`}
              className="p-4 rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/30 dark:bg-zinc-950/20 flex flex-col justify-between h-20 shadow-3xs"
            >
              <div className="flex items-center justify-between w-full opacity-50">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  {block.label}
                </span>
                <Icon size={11} className="text-text-secondary stroke-[2.2]" />
              </div>
              <span
                className={`text-xl font-bold tracking-tight font-mono ${block.color}`}
              >
                {block.val}
              </span>
            </div>
          );
        })}
      </div>

      {/* --- CONTEST TIMELINE LEDGER --- */}
      <div className="space-y-2">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none px-1">
          Performance History Compilations
        </h3>

        <div className="flex flex-col gap-2.5">
          {history.map((node) => (
            <div
              key={node.id}
              className="w-full rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/20 dark:bg-zinc-900/5 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors shadow-3xs group hover:border-border-intense dark:hover:border-zinc-800"
            >
              {/* Left Details Block */}
              <div className="min-w-0 space-y-0.5">
                <h4 className="text-xs font-semibold text-text-primary truncate max-w-xl group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {node.title}
                </h4>
                <div className="flex items-center gap-2 font-mono text-[10px] text-text-secondary opacity-50">
                  <span className="font-sans font-medium text-text-primary opacity-80">
                    Rank: {node.rank}
                  </span>
                  <span>•</span>
                  <span>{node.date}</span>
                </div>
              </div>

              {/* Right Rating Adjustment Badge */}
              <div className="flex items-center sm:justify-end shrink-0 select-none">
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded border leading-none tracking-tight ${
                    node.isPositive
                      ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                      : "bg-rose-500/5 text-rose-500 border-rose-500/20"
                  }`}
                >
                  {node.ratingDelta} Delta
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ContestsTab);
