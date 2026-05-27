import { memo } from "react";
import { FileText, BookOpen, Code, History } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { IProblem } from "@/store/problem.store";

// Refactored tab collection metadata profiles with cleaner developer terminology
const tabs = [
  { path: "description", label: "Description", icon: FileText },
  { path: "editorial", label: "Editorial", icon: BookOpen },
  { path: "solutions", label: "Solutions", icon: Code },
  { path: "submissions", label: "Submissions", icon: History },
];

interface LeftSidebarProps {
  problemDetails: IProblem | undefined;
  isProblemDetailsLoading: boolean;
}

export const LeftSidebar = ({
  isProblemDetailsLoading,
  problemDetails,
}: LeftSidebarProps) => {
  return (
    // Clean high-density sub-header block container (No margins, matches parent headers seamlessly)
    <div className="w-full flex items-center bg-transparent select-none overflow-x-auto overflow-y-hidden custom-scrollbar">
      <nav
        className="flex items-center gap-1.5 h-7 w-full"
        aria-label="Challenge workspace context selector navigation"
      >
        {!isProblemDetailsLoading &&
          problemDetails &&
          tabs.map((tab) => (
            <NavLink
              to={`/problems/${problemDetails.slug}/${tab.path}`}
              key={`workspace-tab-${tab.path}`}
              className={({ isActive }) => `
                relative inline-flex items-center justify-center h-full px-3 rounded-md
                text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-150 outline-none
                hover:bg-surface-card/60 dark:hover:bg-zinc-900/20 group
                ${
                  isActive
                    ? "text-text-primary dark:text-zinc-100 bg-surface-card dark:bg-zinc-900/30 font-semibold border border-border-subtle dark:border-zinc-800"
                    : "text-text-secondary opacity-70 hover:opacity-100 border border-transparent"
                }
              `}
            >
              <tab.icon
                size={12}
                className="mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity stroke-[2.2]"
              />
              <span>{tab.label}</span>
            </NavLink>
          ))}

        {/* --- BALANCED SKELETON PLACEHOLDERS LOADING TRACK --- */}
        {isProblemDetailsLoading && (
          <div className="flex items-center gap-2 h-full w-full animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={`tab-skeleton-${i}`}
                className="h-full w-24 rounded-md bg-surface-card/60 dark:bg-zinc-900/40 border border-border-subtle/40 dark:border-zinc-900"
              />
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default memo(LeftSidebar);
