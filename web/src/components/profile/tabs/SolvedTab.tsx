// src/components/shared/SolvedTab.tsx
import { useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Code2, Loader2, AlertCircle } from "lucide-react";

// 💎 BIND CENTRALIZED STATE MATRIX FROM THE CORE STORE LAYER
import { useUserStore } from "@/store/user.store";

export const SolvedTab = () => {
  // Bind store hooks for reactive telemetry updates
  const { solvedProblems, isSolvedLoading, getSolvedProblems } = useUserStore();

  // Trigger network pipeline data ingestion on component mount
  useEffect(() => {
    getSolvedProblems();
  }, [getSolvedProblems]);

  // 💎 COMPUTATION: Dynamic Reduction Matrix computing problem category summaries
  const solvedSummaryMatrix = useMemo(() => {
    const summary = { total: 0, easy: 0, medium: 0, hard: 0 };

    if (!solvedProblems) return summary;

    summary.total = solvedProblems.length;
    solvedProblems.forEach((problem) => {
      const difficulty = problem.difficulty?.toUpperCase();
      if (difficulty === "EASY") summary.easy += 1;
      else if (difficulty === "MEDIUM") summary.medium += 1;
      else if (difficulty === "HARD") summary.hard += 1;
    });

    return summary;
  }, [solvedProblems]);

  /* -------------------------------------------------------------------------- */
  /* LIFECYCLE GATE LOADING SHIELD RESILIENCE                                   */
  /* -------------------------------------------------------------------------- */
  if (isSolvedLoading && solvedProblems.length === 0) {
    return (
      <div className="w-full h-48 border border-border-subtle/40 dark:border-zinc-900 bg-bg-secondary/10 rounded-2xl flex flex-col items-center justify-center font-mono text-[10px] text-text-muted opacity-60 select-none animate-pulse gap-2">
        <Loader2 size={14} className="animate-spin text-accent-gold" />
        <span>Parsing compiled algorithmic node sequences...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-6 font-sans text-text-primary antialiased"
    >
      {/* --- STATS HIGHLIGHT COMPACT GRID --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 select-none">
        {[
          {
            label: "Total Solved",
            val: solvedSummaryMatrix.total,
            color: "text-amber-500",
            bg: "bg-amber-500/5 border-amber-500/20",
          },
          {
            label: "Easy Class",
            val: solvedSummaryMatrix.easy,
            color: "text-emerald-500",
            bg: "bg-emerald-500/5 border-emerald-500/10",
          },
          {
            label: "Medium Metric",
            val: solvedSummaryMatrix.medium,
            color: "text-orange-500",
            bg: "bg-orange-500/5 border-orange-500/10",
          },
          {
            label: "Hard Objective",
            val: solvedSummaryMatrix.hard,
            color: "text-rose-500",
            bg: "bg-rose-500/5 border-rose-500/10",
          },
        ].map((block, i) => (
          <div
            key={`stat-${i}`}
            className={`p-4 rounded-xl border bg-surface-card/40 dark:bg-zinc-950/20 flex flex-col justify-between h-20 transition-colors duration-200 ${block.bg}`}
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

        {solvedProblems.length === 0 ? (
          <div className="w-full p-12 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-[10px] text-text-muted/50 flex flex-col items-center justify-center gap-2 select-none bg-bg-secondary/5">
            <AlertCircle size={14} className="opacity-40 text-accent-gold" />
            <span>
              // No validated platform solution records discovered inside
              current index layers.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {solvedProblems.map((item) => {
              const diffNormalized = item.difficulty?.toUpperCase();

              return (
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
                      <h4 className="text-xs font-semibold text-text-primary truncate max-w-md group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors select-text">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-text-secondary opacity-50 select-none">
                        <span>{item.slug || "Algorithmic Deck"}</span>
                        <span>•</span>
                        <span>
                          {item.solvedAt
                            ? new Date(item.solvedAt).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "Compiled Reference Logs"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 select-none">
                    <span
                      className={`font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border leading-none tracking-wide ${
                        diffNormalized === "EASY"
                          ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                          : diffNormalized === "MEDIUM"
                            ? "bg-orange-500/5 text-orange-500 border-orange-500/20"
                            : "bg-rose-500/5 text-rose-500 border-rose-500/20"
                      }`}
                    >
                      {item.difficulty || "MEDIUM"}
                    </span>
                    <Code2
                      size={13}
                      className="text-text-secondary opacity-30 group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(SolvedTab);
