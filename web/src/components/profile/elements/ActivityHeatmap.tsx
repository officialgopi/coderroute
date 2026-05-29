import { memo } from "react";

type HeatmapProps = {
  activity: {
    date: string; // Formatting standard: "2026-01-16"
    count: number; // Quantitative telemetry count index
  }[];
};

export const ActivityHeatmap = ({ activity }: HeatmapProps) => {
  // Balanced color token mapping that handles light and dark mode scales seamlessly
  const getColorClass = (count: number) => {
    if (count === 0)
      return "bg-neutral-100 dark:bg-zinc-900 border border-black/5 dark:border-transparent";
    if (count <= 1)
      return "bg-emerald-500/20 dark:bg-emerald-950 text-emerald-400";
    if (count <= 3)
      return "bg-emerald-500/50 dark:bg-emerald-800 text-emerald-300";
    if (count <= 5) return "bg-emerald-500 dark:bg-emerald-600 text-white";
    return "bg-emerald-600 dark:bg-emerald-400 text-white";
  };

  // Safe fallback calculation to match the traditional 7-day grid tracking columns
  const chunkedWeeksArray = [];
  const itemsPerColumn = 7;

  for (let i = 0; i < activity.length; i += itemsPerColumn) {
    chunkedWeeksArray.push(activity.slice(i, i + itemsPerColumn));
  }

  // Common descriptive labels for layout grids
  const weekDayLabels = ["Sun", "", "Tue", "", "Thu", "", "Sat"];

  return (
    <div className="w-full flex flex-col font-sans text-text-primary select-none">
      {/* --- CORE DATA GRID TRACKS PANEL --- */}
      <div className="w-full overflow-x-auto scrollbar-none pb-2 flex gap-2 items-start">
        {/* Day of Week Structural Labels Column */}
        <div className="grid grid-rows-7 gap-[3px] pr-1.5 pt-0.5 select-none text-[9px] font-mono font-medium text-text-secondary opacity-40 h-[116px] justify-items-end">
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
                  {/* The interactive indicator pixel */}
                  <div
                    className={`w-3 h-3 rounded-[2px] transition-all duration-150 cursor-crosshair hover:scale-115 hover:z-20 ${getColorClass(day.count)}`}
                  />

                  {/* Enhanced Tooltip Bubble */}
                  <div
                    role="tooltip"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 mb-1 opacity-0 pointer-events-none group-hover/node:opacity-100 transition-opacity duration-150 bg-neutral-900 dark:bg-zinc-950 border border-border-subtle/60 dark:border-zinc-800/80 rounded-lg p-2 shadow-md z-50 text-left scale-95 group-hover/node:scale-100 origin-bottom transform-all"
                  >
                    <div className="font-mono text-[10px] font-bold text-white leading-tight whitespace-nowrap">
                      {day.count}{" "}
                      {day.count === 1 ? "submission" : "submissions"}
                    </div>
                    <div className="font-sans text-[9px] text-text-secondary opacity-60 whitespace-nowrap mt-0.5">
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
      <div className="flex items-center justify-end gap-1.5 mt-3 font-mono text-[10px] text-text-secondary opacity-50 select-none px-0.5">
        <span>Less</span>
        <div className="flex gap-[3px]">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-neutral-100 dark:bg-zinc-900 border border-black/5 dark:border-transparent" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/20 dark:bg-emerald-950" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/50 dark:bg-emerald-800" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-600" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default memo(ActivityHeatmap);
