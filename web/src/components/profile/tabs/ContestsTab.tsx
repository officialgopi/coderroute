// src/components/shared/ContestsTab.tsx
import { useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Wrench, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";

// 💎 BIND CENTRALIZED STATE HOOK MATRIX FROM THE CORE STORE LAYER
import { useUserStore } from "@/store/user.store";

export const ContestsTab = () => {
  // Bind store variables and metrics hydration triggers safely
  const { metrics, getMetrics } = useUserStore();

  // Force store data alignment cleanly on component mounting loops
  useEffect(() => {
    getMetrics();
  }, [getMetrics]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-6 font-sans text-text-primary antialiased select-none"
    >
      {/* --- PREMIUM HUD HEADER NOTIFICATION MODULE --- */}
      <div className="w-full p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.04] via-transparent to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs backdrop-blur-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.01] rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-bg-secondary border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-md shadow-black/20 ring-1 ring-white/5">
            <Wrench size={14} className="animate-pulse" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[9px] font-black tracking-widest uppercase text-amber-500">
              <ShieldAlert size={10} />
              <span>System Layer Exception</span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold text-text-primary tracking-tight uppercase font-mono">
              Competitive Engine Under Maintenance
            </h1>
          </div>
        </div>

        {metrics?.points && (
          <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-text-muted bg-bg-secondary border border-border-subtle px-2 py-1 rounded-lg shadow-inner">
            <Sparkles size={9} className="text-accent-gold" />
            <span>XP Tracker Index: {metrics.points}</span>
          </div>
        )}
      </div>

      {/* --- CINEMATIC DISPATCH SKELETON REPOS PANEL --- */}
      <div className="w-full py-16 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-text-muted/40 bg-bg-secondary/5 flex flex-col items-center justify-center gap-2.5 px-6">
        <AlertCircle size={16} className="opacity-30 text-amber-500/60" />
        <div className="space-y-1">
          <p className="text-[10px] tracking-wide max-w-sm leading-relaxed">
            // Arena rating tracking bounds and leaderboard delta pipelines are
            currently undergoing structural optimizations.
          </p>
          <p className="text-[9px] text-text-muted/30 uppercase font-bold tracking-widest pt-1">
            Expected System Sync: Trailing Deployment Lifecycle
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ContestsTab);
