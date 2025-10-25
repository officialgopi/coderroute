import React from "react";
import { FileText } from "lucide-react";
import type { IProblem } from "@/store/problem.store";
import { cn } from "@/lib/utils";

interface ProblemSearchResultProps {
  problem: IProblem;
  onSelect: (p: IProblem) => void;
}

export const ProblemSearchResult: React.FC<ProblemSearchResultProps> = ({
  problem,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(problem)}
      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm hover:bg-neutral-200/70 dark:hover:bg-neutral-900/70 transition-colors"
    >
      <FileText className="w-4 h-4 text-neutral-500" />
      <div>
        <p className=" font-medium">{problem.title}</p>
        <p
          className={cn(" text-xs", {
            "text-neutral-500": !problem.difficulty,
            "text-emerald-400": problem.difficulty === "EASY",
            "text-amber-400": problem.difficulty === "MEDIUM",
            "text-rose-400": problem.difficulty === "HARD",
          })}
        >
          {problem.difficulty.charAt(0) +
            problem.difficulty.slice(1).toLowerCase()}
        </p>
      </div>
    </button>
  );
};
