import { memo } from "react";
import { CheckCircle, BarChart3, Globe, MessagesSquare } from "lucide-react";

interface StatsPayload {
  totalSolved: number;
  successRate: string | number;
  globalRank: number;
  discussionsPosted: number;
}

interface StatsCardsProps {
  stats: StatsPayload;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  // Balanced analytics schema mapping appropriate theme icon components
  const metricsItems = [
    {
      label: "Total Solved",
      value: stats.totalSolved ?? 0,
      icon: CheckCircle,
      accentClass: "text-amber-500",
    },
    {
      label: "Accuracy Rate",
      value: stats.successRate ?? "0%",
      icon: BarChart3,
      accentClass: "text-emerald-500",
    },
    {
      label: "Global Rank",
      value: stats.globalRank ? stats.globalRank.toLocaleString() : "—",
      icon: Globe,
      accentClass: "text-blue-500",
    },
    {
      label: "Discussions",
      value: stats.discussionsPosted ?? 0,
      icon: MessagesSquare,
      accentClass: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 select-none">
      {metricsItems.map((item) => {
        const IconComponent = item.icon;

        return (
          <div
            key={`stat-card-${item.label}`}
            className="rounded-2xl border border-border-subtle/40 dark:border-zinc-900/60 bg-surface-card/30 dark:bg-zinc-950/20 p-4 flex flex-col justify-between h-22 shadow-3xs hover:border-border-intense dark:hover:border-zinc-800 transition-all duration-200"
          >
            {/* Upper row identifier block metadata */}
            <div className="flex items-center justify-between w-full opacity-50">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                {item.label}
              </span>
              <IconComponent
                size={12}
                className="text-text-secondary stroke-[2.2]"
              />
            </div>

            {/* Lower row value readout tier */}
            <span
              className={`text-xl font-bold tracking-tight font-mono ${item.accentClass}`}
            >
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default memo(StatsCards);
