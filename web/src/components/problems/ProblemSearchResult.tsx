import React, { memo } from "react";
import { Terminal } from "lucide-react";
import type { IProblem } from "@/store/problem.store";

interface ProblemSearchResultProps {
  problem: IProblem;
  onSelect: (p: IProblem) => void;
}

export const ProblemSearchResult: React.FC<ProblemSearchResultProps> = ({
  problem,
  onSelect,
}) => {
  // Premium Muted Difficulty Scales (Matching row items typography standard)
  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "text-emerald-500/90 dark:text-emerald-400";
      case "MEDIUM":
        return "text-amber-500/90 dark:text-amber-400";
      case "HARD":
        return "text-rose-500/90 dark:text-rose-400";
      default:
        return "text-text-secondary";
    }
  };

  return (
    <button
      onClick={() => onSelect(problem)}
      className="flex items-center gap-3 w-full px-3.5 h-11 rounded-lg text-left bg-transparent hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 transition-colors cursor-pointer group outline-none focus-visible:bg-surface-card/40 dark:focus-visible:bg-zinc-900/15"
      role="option"
    >
      {/* Icon frame matches standard command palette design layouts */}
      <div className="w-6 h-6 rounded-md bg-surface-panel/40 dark:bg-zinc-900/30 border border-border-subtle/50 dark:border-zinc-800 flex items-center justify-center text-text-secondary opacity-60 group-hover:opacity-100 transition-opacity shrink-0">
        <Terminal size={12} strokeWidth={2.2} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <span className="text-xs font-medium text-text-primary dark:text-zinc-200 truncate group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
          {problem.title}
        </span>

        <span
          className={`font-mono text-[10px] uppercase tracking-wide mt-0.5 select-none ${getDifficultyStyles(problem.difficulty)}`}
        >
          {problem.difficulty?.toLowerCase() || "unknown"}
        </span>
      </div>
    </button>
  );
};

export default memo(ProblemSearchResult);
