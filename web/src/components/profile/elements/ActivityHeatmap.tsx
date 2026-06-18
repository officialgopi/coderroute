// src/components/shared/ActivityHeatmap.tsx
import { useEffect, useMemo, memo } from "react";
import { Loader2, Flame, Sparkles } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { cn } from "@/lib/utils";

export const ActivityHeatmap = () => {
  // Bind your centralized state variables directly out of the user store hook matrix
  const { heatmap, isHeatmapLoading, getActivityHeatmap } = useUserStore();

  // Hydrate activity map tracking coordinates instantly on layout mounting layers
  useEffect(() => {
    getActivityHeatmap();
  }, [getActivityHeatmap]);

  // 💎 COMPUTATION: Generate full trailing 365 calendar tracking nodes array sequence
  const compiledActivityTimeline = useMemo(() => {
    const activityArray: { date: string; count: number }[] = [];
    const safeHeatmap = heatmap || {};

    // Set baseline target parameters relative to current system runtime context (2026)
    const targetDateCursor = new Date();

    // Loop backward chronologically across 365 consecutive frame indexes
    for (let i = 364; i >= 0; i--) {
      const processingDate = new Date(targetDateCursor);
      processingDate.setDate(targetDateCursor.getDate() - i);

      // ISO Format Slice Extraction: "YYYY-MM-DD"
      const dateStringKey = processingDate.toISOString().split("T")[0];

      activityArray.push({
        date: dateStringKey,
        count: safeHeatmap[dateStringKey] || 0,
      });
    }
    return activityArray;
  }, [heatmap]);

  // Balanced color token mapping handling interface style shifts cleanly
  const getColorClass = (count: number) => {
    if (count === 0)
      return "bg-neutral-100 dark:bg-zinc-900 border border-black/5 dark:border-transparent";
    if (count <= 1)
      return "bg-emerald-500/20 dark:bg-emerald-950/60 text-emerald-400 border border-emerald-500/10";
    if (count <= 3)
      return "bg-emerald-500/50 dark:bg-emerald-800 text-emerald-300";
    if (count <= 5) return "bg-emerald-500 dark:bg-emerald-600 text-white";
    return "bg-emerald-600 dark:bg-emerald-400 text-white shadow-2xs shadow-emerald-500/20";
  };

  // Safe split mapping partition algorithm matching traditional 7-day layout tracking columns
  const chunkedWeeksArray = useMemo(() => {
    const weeks = [];
    const itemsPerColumn = 7;
    for (let i = 0; i < compiledActivityTimeline.length; i += itemsPerColumn) {
      weeks.push(compiledActivityTimeline.slice(i, i + itemsPerColumn));
    }
    return weeks;
  }, [compiledActivityTimeline]);

  const totalSubmissionsYear = useMemo(() => {
    return compiledActivityTimeline.reduce((acc, curr) => acc + curr.count, 0);
  }, [compiledActivityTimeline]);

  const weekDayLabels = ["Sun", "", "Tue", "", "Thu", "", "Sat"];

  /* -------------------------------------------------------------------------- */
  /* LOAD RESILIENCE GATE: RENDER SKELETON ENGINE DURING BACKEND QUERIES        */
  /* -------------------------------------------------------------------------- */
  if (isHeatmapLoading && !heatmap) {
    return (
      <div className="w-full h-36 border border-border-subtle bg-bg-secondary/10 rounded-2xl flex items-center justify-center font-mono text-[10px] text-text-muted opacity-60 select-none animate-pulse">
        <Loader2 size={13} className="animate-spin text-accent-gold mr-2" />
        <span>Syncing Git-style telemetry logs...</span>
      </div>
    );
  }

  return (
    <div className="w-full p-5 rounded-2xl border border-border-subtle bg-bg-secondary/10 flex flex-col font-sans text-text-primary select-none relative overflow-hidden group">
      {/* HUD HEADER METRIC STRIP */}
      <div className="flex items-center justify-between gap-4 border-b border-border-subtle/40 pb-3.5 mb-4 select-none">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-accent-gold shadow-3xs">
            <Flame size={12} className="animate-pulse" />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted">
            Submission Activity Pipeline
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-text-primary bg-bg-primary/50 px-2 py-0.5 rounded border border-border-subtle/60">
          <Sparkles size={9} className="text-accent-gold" />
          <span>{totalSubmissionsYear} Commits / Trailing Year</span>
        </div>
      </div>

      {/* --- CORE DATA GRID TRACKS PANEL --- */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-2 flex gap-2 items-start">
        {/* Day of Week Structural Labels Column */}
        <div className="grid grid-rows-7 gap-[3px] pr-1 pt-0.5 select-none text-[9px] font-mono font-bold text-text-muted opacity-40 h-[105px] justify-items-end">
          {weekDayLabels.map((label, idx) => (
            <span
              key={`day-lbl-${idx}`}
              className="h-3 flex items-center leading-none"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Dynamic Multi-Column Matrix Blocks Wrapper */}
        <div className="flex gap-[3px] min-w-max pb-1">
          {chunkedWeeksArray.map((week, weekIdx) => (
            <div
              key={`heatmap-wk-${weekIdx}`}
              className="grid grid-rows-7 gap-[3px]"
            >
              {week.map((day, dayIdx) => (
                <div
                  key={`day-node-${weekIdx}-${dayIdx}`}
                  className="relative group/node"
                >
                  {/* The Interactive Indicator Pixel */}
                  <div
                    className={cn(
                      "w-3 h-3 rounded-[2.5px] transition-all duration-150 cursor-crosshair hover:scale-125 hover:z-20",
                      getColorClass(day.count),
                    )}
                  />

                  {/* Enhanced Premium Tooltip Bubble */}
                  <div
                    role="tooltip"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 mb-1 opacity-0 pointer-events-none group-hover/node:opacity-100 transition-all duration-150 bg-neutral-900 dark:bg-zinc-950 border border-border-subtle/80 dark:border-zinc-800/90 rounded-xl p-2.5 shadow-xl z-50 text-left scale-95 group-hover/node:scale-100 origin-bottom transform"
                  >
                    <div className="font-mono text-[10px] font-bold text-white leading-tight whitespace-nowrap">
                      {day.count}{" "}
                      {day.count === 1 ? "submission" : "submissions"}
                    </div>
                    <div className="font-sans text-[9px] text-text-secondary opacity-50 whitespace-nowrap mt-0.5 font-medium">
                      {new Date(day.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* --- LOWER CONTROLS / LEGEND DISPLAY MATRIX --- */}
      <div className="flex items-center justify-end gap-1.5 mt-2.5 font-mono text-[9px] font-bold text-text-muted opacity-50 select-none px-0.5">
        <span>Less</span>
        <div className="flex gap-[3px]">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-neutral-100 dark:bg-zinc-900 border border-black/5 dark:border-transparent" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/20 dark:bg-emerald-950/60" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/50 dark:bg-emerald-800" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-600" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default memo(ActivityHeatmap);
