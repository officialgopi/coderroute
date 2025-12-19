type HeatmapProps = {
  activity: {
    date: string; // "2025-01-16"
    count: number; // submissions
  }[];
};

export function ActivityHeatmap({ activity }: HeatmapProps) {
  const getColor = (count: number) => {
    if (count === 0) return "bg-neutral-800";
    if (count <= 1) return "bg-emerald-900";
    if (count <= 3) return "bg-emerald-700";
    return "bg-emerald-500";
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-neutral-300">Submission Activity</p>
        <p className="text-xs text-neutral-500">Last 1 year</p>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-max gap-1">
          {activity.map((day, i) => (
            <div key={i} className="group relative">
              <div
                className={`w-3.5 h-3.5 rounded-md transition-all duration-200 
                hover:scale-125 hover:ring-2 hover:ring-emerald-400 
                ${getColor(day.count)}`}
              />

              {/* Tooltip */}
              <div
                className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 
                scale-0 group-hover:scale-100 transition-transform
                bg-black text-xs text-white px-2 py-1 rounded-md whitespace-nowrap shadow-lg"
              >
                {day.count} submissions
                <br />
                <span className="text-neutral-400">{day.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-neutral-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-neutral-800" />
          <div className="w-3 h-3 rounded bg-emerald-900" />
          <div className="w-3 h-3 rounded bg-emerald-700" />
          <div className="w-3 h-3 rounded bg-emerald-500" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
