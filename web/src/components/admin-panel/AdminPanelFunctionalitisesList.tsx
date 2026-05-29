import { memo } from "react";
import { Link } from "react-router-dom";
import { Plus, SlidersHorizontal, BarChart3, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "./AdminFunctionalityCard";

interface AdminActionNode {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
}

export const AdminPanelFunctionalitiesList = () => {
  // Balanced management schema mapping consistent monochrome Lucide icon keys
  const functionalities: AdminActionNode[] = [
    {
      title: "Create New Problem",
      description:
        "Draft and append an evaluation sandbox vector to the repository index.",
      icon: Plus,
      href: "/admin-panel/create-problem",
    },
    {
      title: "Manage Problems",
      description:
        "Edit, audit parameters, or deprecate stale challenges from the platform.",
      icon: SlidersHorizontal,
      href: "/admin-panel/manage-problems",
    },
    {
      title: "View System Metrics",
      description:
        "Monitor compilation logs and analyze telemetry runtime profiles.",
      icon: BarChart3,
      href: "/admin-panel/view-metrics",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2 font-sans select-none">
      {functionalities.map((func) => {
        const IconComponent = func.icon;

        return (
          <Link
            to={func.href}
            key={`admin-route-${func.title}`}
            className="group block outline-none focus:ring-0"
          >
            <Card className="h-32 w-full rounded-2xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/40 dark:bg-zinc-950/20 p-4 flex flex-col justify-between hover:border-border-intense dark:hover:border-zinc-800 hover:bg-neutral-50/50 dark:hover:bg-zinc-950/60 transition-all duration-200 shadow-3xs group relative overflow-hidden">
              <div className="space-y-1.5 w-full">
                {/* Upper strip heading block */}
                <CardHeader className="p-0 flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-6 w-6 rounded-lg border border-border-subtle/40 dark:border-zinc-800/80 bg-neutral-100 dark:bg-zinc-900/60 flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:border-border-intense transition-colors shrink-0">
                      <IconComponent size={13} className="stroke-[2.5]" />
                    </div>
                    <h3 className="text-xs font-bold font-sans tracking-tight text-text-primary truncate">
                      {func.title}
                    </h3>
                  </div>
                </CardHeader>

                {/* Secondary data snippet layout block */}
                <CardContent className="p-0 text-[11px] leading-relaxed text-text-secondary opacity-70 select-text max-w-xs">
                  {func.description}
                </CardContent>
              </div>

              {/* Action directional accent link text */}
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-text-secondary opacity-40 group-hover:opacity-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-all self-end pointer-events-none">
                <span>Launch Console</span>
                <ArrowUpRight
                  size={10}
                  className="stroke-[2.5] group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform"
                />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default memo(AdminPanelFunctionalitiesList);
