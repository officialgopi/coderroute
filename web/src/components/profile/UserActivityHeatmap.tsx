// components/ActivityHeatmap.tsx
export function ActivityHeatmap({ activity }: { activity: number[] }) {
  return (
    <div className="p-4 rounded-xl border  backdrop-blur-sm">
      <div className="grid grid-cols-50 gap-[2px]">
        {activity.map((lvl, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm bg-green-500"
            style={{ opacity: 0.2 + lvl * 0.18 }}
          />
        ))}
      </div>
    </div>
  );
}
