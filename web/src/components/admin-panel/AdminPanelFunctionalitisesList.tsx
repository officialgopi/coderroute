// src/components/admin/AdminPanelFunctionalitiesList.tsx
import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  SlidersHorizontal,
  BarChart3,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "./AdminFunctionalityCard";

interface AdminActionNode {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
}

export const AdminPanelFunctionalitiesList = () => {
  // Core Sandbox Problem Action Items
  const sandboxFunctionalities: AdminActionNode[] = [
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

  /* 💎 NEW: DOCHUB ACADEMY SYLLABUS CURRICULUM MANAGEMENT NODE */
  const docHubFunctionalities: AdminActionNode[] = [
    {
      title: "Manage DocHub Subjects",
      description:
        "Configure core subjects, curate structural module chapters, and write dynamic blog markdown sections.",
      icon: GraduationCap,
      href: "/admin-panel/dochub/subjects",
    },
  ];

  const renderActionCards = (items: AdminActionNode[]) => (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans select-none">
      {items.map((func) => {
        const IconComponent = func.icon;

        return (
          <Link
            to={func.href}
            key={`admin-route-${func.title}`}
            className="group block outline-none focus:ring-0"
          >
            <Card className="h-32 w-full rounded-2xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/40 dark:bg-zinc-950/20 p-4 flex flex-col justify-between hover:border-border-intense dark:hover:border-zinc-800 hover:bg-neutral-50/50 dark:hover:bg-zinc-950/60 transition-all duration-200 group relative overflow-hidden shadow-3xs">
              <div className="space-y-1.5 w-full">
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

                <CardContent className="p-0 text-[11px] leading-relaxed text-text-secondary opacity-70 select-text max-w-xs">
                  {func.description}
                </CardContent>
              </div>

              <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-text-secondary opacity-40 group-hover:opacity-100 group-hover:text-accent-gold transition-all self-end pointer-events-none">
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

  return (
    <div className="w-full space-y-6 py-2">
      {/* SECTION 1: SANDBOX RUNTIME PROBLEMS MANAGEMENT */}
      <div className="space-y-2.5">
        <h2 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 pl-0.5">
          // Sandbox Engine Repositories
        </h2>
        {renderActionCards(sandboxFunctionalities)}
      </div>

      {/* SECTION 2: DOCHUB ACADEMY SUBJECT MANAGEMENT */}
      <div className="space-y-2.5">
        <h2 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 pl-0.5">
          // Academy Curriculum Engineering
        </h2>
        {renderActionCards(docHubFunctionalities)}
      </div>
    </div>
  );
};

export default memo(AdminPanelFunctionalitiesList);
