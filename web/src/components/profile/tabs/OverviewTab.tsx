import { memo } from "react";
import { motion } from "framer-motion";
// import { useProblemStore } from "@/store/problem.store";
// import { useDiscussionStore } from "@/store/discussion.store";
import { StatsCards } from "../elements/StatsCards";
import { ActivityHeatmap } from "../elements/ActivityHeatmap";
import { RecentSolvedProblems } from "../elements/RecentSolvedProblems";

// Type definitions ensuring contract safety across store and fallback limits
// interface SolvedMetrics {
//   totalSolved: number;
//   successRate: string | number;
//   globalRank: number;
//   discussionsPosted?: number;
//}

export const OverviewTab = () => {
  // 1. Centralized Server/Store State Hooks Track
  // const {
  //   solvedMetrics: storeMetrics,
  //   activityLogs: storeActivity,
  //   recentProblemsIndex: storeProblems,
  // } = useProblemStore();
  // const { userThreadsCount: storeThreads } = useDiscussionStore();

  const storeMetrics = undefined; // Placeholder for actual store hook
  const storeActivity = undefined;
  const storeProblems = undefined;
  const storeThreads = undefined;

  // 2. Production Sandbox Fallback Data (Active if global state context hasn't hydrated)
  const DEMO_DATA = {
    userThreadsCount: 58,
    solvedMetrics: {
      totalSolved: 142,
      successRate: 74.2, // Float representation
      globalRank: 4210,
      discussionsPosted: 58,
    },
    activityLogs: [
      { date: "2024-06-01", count: 3 },
      { date: "2024-06-02", count: 5 },
      { date: "2024-06-03", count: 2 },
      { date: "2024-06-04", count: 4 },
      { date: "2024-06-05", count: 1 },
      { date: "2024-06-06", count: 0 },
      { date: "2024-06-07", count: 6 },
    ],
    recentProblemsIndex: [
      { id: 1, title: "Two Sum", difficulty: "Easy", solvedAt: "2024-06-07" },
      {
        id: 2,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        solvedAt: "2024-06-06",
      },
      {
        id: 3,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        solvedAt: "2024-06-05",
      },
    ],
  };

  // 3. Resolve active telemetry arrays
  const resolvedMetrics = storeMetrics ?? DEMO_DATA.solvedMetrics;
  const resolvedThreads = storeThreads ?? DEMO_DATA.userThreadsCount;
  const resolvedActivity = storeActivity ?? DEMO_DATA.activityLogs;
  const resolvedProblems = storeProblems ?? DEMO_DATA.recentProblemsIndex;

  // 4. Normalize metrics payload properties securely to protect structural interface rules
  const platformStatsPayload = {
    totalSolved: resolvedMetrics.totalSolved,
    globalRank: resolvedMetrics.globalRank,
    discussionsPosted: resolvedMetrics.discussionsPosted ?? resolvedThreads,
    // Dynamic serialization guarantees unit symbol strings won't crash text processors
    successRate:
      typeof resolvedMetrics.successRate === "number"
        ? `${resolvedMetrics.successRate}%`
        : resolvedMetrics.successRate,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-full space-y-6 font-sans text-text-primary antialiased"
    >
      {/* --- UPPER ROW: ANALYTICS HIGHLIGHT CLUSTERS --- */}
      <section className="w-full" aria-label="Core Performance Highlights">
        <StatsCards stats={platformStatsPayload} />
      </section>

      {/* --- MIDDLE ROW: CONTRIBUTION REPOSITORY HEATMAP GRID --- */}
      <section className="w-full border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/10 dark:bg-zinc-950/10 rounded-2xl p-4 lg:p-5 shadow-3xs">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none mb-4 px-1">
          Submission Frequency Matrix
        </h3>
        <ActivityHeatmap activity={resolvedActivity} />
      </section>

      {/* --- LOWER ROW: RECENCY COMPILATION TRACKER LOGS --- */}
      <section className="w-full space-y-3">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none px-1">
          Recent Delta Compilation Activities
        </h3>
        <RecentSolvedProblems problems={resolvedProblems} />
      </section>
    </motion.div>
  );
};

export default memo(OverviewTab);
