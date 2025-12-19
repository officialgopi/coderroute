export function StatsCards({ stats }: { stats: any }) {
  const items = [
    { label: "Solved", value: stats.problemsSolved },
    { label: "Accuracy", value: `${stats.accuracy.toFixed(1)}%` },
    { label: "Easy", value: stats.easySolved },
    { label: "Medium", value: stats.mediumSolved },
    { label: "Hard", value: stats.hardSolved },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center"
        >
          <p className="text-xs text-neutral-400">{item.label}</p>
          <p className="text-xl font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
