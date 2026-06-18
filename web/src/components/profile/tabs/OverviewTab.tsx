// src/components/shared/OverviewTab.tsx
import { useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";

// 💎 BIND CENTRALIZED USER TRANSACTION STATE CORE HOOK MATRIX
import { useUserStore } from "@/store/user.store";

import { StatsCards } from "../elements/StatsCards";
import { ActivityHeatmap } from "../elements/ActivityHeatmap";
import { RecentSolvedProblems } from "../elements/RecentSolvedProblems";

export const OverviewTab = () => {
  // 1. Bind reactive values and data fetch lifecycles straight from your store layer
  const {
    metrics,
    solvedProblems,
    isProfileLoading,
    isMetricsLoading,
    isSolvedLoading,
    getProfile,
    getMetrics,
    getSolvedProblems,
  } = useUserStore();

  // 2. Synchronize store hydration pipelines safely on mounting loops
  useEffect(() => {
    const orchestrateDashboardHydration = async () => {
      // Parallelize network requests across system boundary lanes
      await Promise.all([getProfile(), getMetrics(), getSolvedProblems()]);
    };
    orchestrateDashboardHydration();
  }, [getProfile, getMetrics, getSolvedProblems]);

  // 3. Normalize metrics payload properties securely to map data safely to StatsCards
  const platformStatsPayload = useMemo(() => {
    const safeMetrics = metrics || {
      solvedProblemsCount: 0,
      currentStreak: 0,
      longestStreak: 0,
      points: 0,
    };

    // Fallback index tracking handles edge sequences where backend returns null records
    return {
      totalSolved: safeMetrics.solvedProblemsCount,
      globalRank: safeMetrics.rank ?? 0,
      discussionsPosted: safeMetrics.points, // maps out point weights for display indicators
      successRate:
        safeMetrics.currentStreak > 0
          ? `${safeMetrics.currentStreak} Day Streak`
          : "0 Day Streak",
    };
  }, [metrics]);

  // Combined Loading Lifecycles State Flag
  const isTabHydrating =
    isProfileLoading || isMetricsLoading || isSolvedLoading;

  /* -------------------------------------------------------------------------- */
  /* RENDER LIFE CYCLE GUARD: SHOW INTUATIVE SKELETON LOADING FRAME             */
  /* -------------------------------------------------------------------------- */
  if (isTabHydrating && !metrics) {
    return (
      <div className="w-full h-64 border border-border-subtle/40 dark:border-zinc-900 bg-bg-secondary/10 rounded-2xl flex flex-col items-center justify-center font-mono text-[10px] text-text-muted opacity-60 select-none animate-pulse gap-2">
        <Loader2 size={14} className="animate-spin text-accent-gold" />
        <span>Hydrating transactional core telemetry matrices...</span>
      </div>
    );
  }

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
        <ActivityHeatmap />
      </section>

      {/* --- LOWER ROW: RECENCY COMPILATION TRACKER LOGS --- */}
      <section className="w-full space-y-3">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none px-1">
          Recent Delta Compilation Activities
        </h3>

        {solvedProblems.length === 0 ? (
          <div className="w-full p-8 text-center border border-dashed border-border-subtle rounded-xl font-mono text-[10px] text-text-muted/60 flex items-center justify-center gap-2 select-none">
            <AlertCircle size={12} className="opacity-40" />
            <span>
              // No algorithmic node submittal activities recorded yet.
            </span>
          </div>
        ) : (
          <RecentSolvedProblems problems={solvedProblems} />
        )}
      </section>
    </motion.div>
  );
};

export default memo(OverviewTab);
