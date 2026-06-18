// src/components/shared/DiscussionsTab.tsx
import { useEffect, memo } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  ArrowRight,
  Calendar,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

// 💎 BIND CENTRALIZED STATE HOOK MATRIX FROM THE CORE STORE LAYER
import { useUserStore } from "@/store/user.store";

export const DiscussionsTab = () => {
  // Bind store variables and metric hydration hooks
  const { metrics, isMetricsLoading, getMetrics } = useUserStore();

  // Force structural background cache calibration when mounted
  useEffect(() => {
    getMetrics();
  }, [getMetrics]);

  // Derived user thread interaction score extracted out of point tokens
  const verifiedForumWeight = metrics?.points ?? 0;

  /* -------------------------------------------------------------------------- */
  /* LOADING LIFECYCLE SHIELD RESILIENCE GAP                                    */
  /* -------------------------------------------------------------------------- */
  if (isMetricsLoading && !metrics) {
    return (
      <div className="w-full h-48 border border-border-subtle/40 dark:border-zinc-900 bg-bg-secondary/10 rounded-2xl flex flex-col items-center justify-center font-mono text-[10px] text-text-muted opacity-60 select-none animate-pulse gap-2">
        <Loader2 size={14} className="animate-spin text-accent-gold" />
        <span>Parsing user discussion stream logs...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-3 font-sans text-text-primary antialiased"
    >
      <div className="flex items-center justify-between px-1 select-none">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40">
          Active Node Dispatches
        </h3>

        {verifiedForumWeight > 0 && (
          <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-accent-gold bg-accent-gold/5 px-2 py-0.5 rounded border border-accent-gold/10">
            <Sparkles size={9} className="animate-pulse" />
            <span>Activity Rank Score: {verifiedForumWeight}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {/* FALLBACK CONTROLLER SYSTEM OVERLAY (Fires if community metrics equal zero) */}
        {verifiedForumWeight === 0 ? (
          <div className="w-full p-12 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-[10px] text-text-muted/50 flex flex-col items-center justify-center gap-2 select-none bg-bg-secondary/5">
            <AlertCircle size={14} className="opacity-40 text-accent-gold" />
            <span>
              // No community broadcast thread dispatches recorded from this
              account framework.
            </span>
          </div>
        ) : (
          <>
            {/* Thread Node Alpha */}
            <div className="w-full p-4 rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/20 dark:bg-zinc-900/5 flex items-start justify-between gap-4 transition-all shadow-3xs group hover:border-border-intense dark:hover:border-zinc-800">
              <div className="space-y-1.5 min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-text-primary truncate max-w-2xl group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors cursor-pointer select-text">
                  Optimizing Matrix Exponentiation approaches for Dynamic
                  Programming queries
                </h4>
                <p className="text-[11px] text-text-secondary opacity-70 line-clamp-1 leading-relaxed select-text font-mono bg-black/5 dark:bg-black/20 p-2 rounded-lg">
                  I was exploring boundary limits when processing
                  multidimensional array sequence trees...
                </p>
                <div className="pt-1 flex items-center gap-3.5 font-mono text-[10px] text-text-secondary opacity-50 select-none">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare
                      size={11}
                      className="opacity-80 text-accent-gold"
                    />
                    <span>14 thread branches</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={10} className="opacity-70" />
                    <span>Trailing Sync Log</span>
                  </div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-md flex items-center justify-center shrink-0 border border-transparent group-hover:border-border-subtle dark:group-hover:border-zinc-800/80 group-hover:bg-neutral-50 dark:group-hover:bg-zinc-950/40 text-text-secondary opacity-30 group-hover:opacity-100 transition-all self-center select-none">
                <ArrowRight size={12} className="stroke-[2.5]" />
              </div>
            </div>

            {/* Thread Node Beta */}
            <div className="w-full p-4 rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/20 dark:bg-zinc-900/5 flex items-start justify-between gap-4 transition-all shadow-3xs group hover:border-border-intense dark:hover:border-zinc-800">
              <div className="space-y-1.5 min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-text-primary truncate max-w-2xl group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors cursor-pointer select-text">
                  Unexplained memory leak anomalies when calling Monaco hooks
                  inside strict react trees
                </h4>
                <p className="text-[11px] text-text-secondary opacity-70 line-clamp-1 leading-relaxed select-text font-mono bg-black/5 dark:bg-black/20 p-2 rounded-lg">
                  Every time the rendering grid alignment index changes tab
                  states, garbage bounds drop nodes...
                </p>
                <div className="pt-1 flex items-center gap-3.5 font-mono text-[10px] text-text-secondary opacity-50 select-none">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare
                      size={11}
                      className="opacity-80 text-accent-gold"
                    />
                    <span>3 thread branches</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={10} className="opacity-70" />
                    <span>Active Sync Log</span>
                  </div>
                </div>
              </div>
              <div className="h-6 w-6 rounded-md flex items-center justify-center shrink-0 border border-transparent group-hover:border-border-subtle dark:group-hover:border-zinc-800/80 group-hover:bg-neutral-50 dark:group-hover:bg-zinc-950/40 text-text-secondary opacity-30 group-hover:opacity-100 transition-all self-center select-none">
                <ArrowRight size={12} className="stroke-[2.5]" />
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default memo(DiscussionsTab);
