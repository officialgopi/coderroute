import React, { useState, memo } from "react";
import { Star, FolderPlus } from "lucide-react";
import type { IProblem } from "@/store/problem.store";
import { Link } from "react-router-dom";
import { ProblemListModal } from "./ProblemListModal";
import { useSheetStore } from "@/store/sheet.store";

interface ProblemItemProps {
  problem: IProblem;
  index: number;
}

export const ProblemItem: React.FC<ProblemItemProps> = ({ problem, index }) => {
  const [open, setOpen] = useState(false);
  const { sheets } = useSheetStore();

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty.toUpperCase()) {
      case "EASY":
        return "text-emerald-500/90 dark:text-emerald-400 font-semibold";
      case "MEDIUM":
        return "text-amber-500/90 dark:text-amber-400 font-semibold";
      case "HARD":
        return "text-rose-500/90 dark:text-rose-400 font-semibold";
      default:
        return "text-text-secondary";
    }
  };

  const isSavedInSheet = sheets?.some((sheet) =>
    sheet.problems?.some((p) => p.problemId === problem.id),
  );

  const isSolved = index % 3 === 0;

  return (
    <>
      {/* High-Density Developer Datagrid Row Wrapper */}
      <div className="grid grid-cols-12 px-4 sm:px-6 h-11 items-center text-xs bg-transparent hover:bg-surface-card/20 dark:hover:bg-zinc-900/15 border-b border-border-subtle/30 dark:border-zinc-900/40 group/row transition-colors duration-150 last:border-none">
        {/* COL 1: MINIMAL STATUS INDICATOR */}
        <div className="col-span-1 flex items-center select-none">
          {isSolved ? (
            <div
              className="w-[5px] h-[5px] rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
              title="Solved"
            />
          ) : (
            <div
              className="w-[5px] h-[5px] rounded-full bg-border-intense/30 dark:bg-zinc-800"
              title="Todo"
            />
          )}
        </div>

        {/* COL 2: MONO INDEX & HIGH-CONTRAST TITLE LINK 
          Changed from col-span-11 to col-span-8 on base mobile screens to reserve grid tracks for actions
        */}
        <div className="col-span-8 sm:col-span-9 lg:col-span-9 flex items-center gap-2 sm:gap-4 overflow-hidden">
          <span className="font-mono text-[10px] tracking-tight text-text-secondary opacity-35 select-none w-5 sm:w-6">
            {String(index + 1).padStart(3, "0")}
          </span>
          <Link
            to={`/problems/${problem.slug}`}
            className="font-medium text-text-primary dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors truncate outline-none select-text focus-visible:underline decoration-amber-500/40 underline-offset-4"
          >
            {problem.title}
          </Link>
        </div>

        {/* COL 3: COMPACT ACTION TRACKER CONSOLE 
          Changed from col-span-12 to col-span-3 on mobile to lock elements onto a single horizontal row line.
          Removed mt-2 layout breakers.
        */}
        <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-3 sm:gap-5">
          <span
            className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase select-none ${getDifficultyStyles(problem.difficulty)}`}
          >
            {problem.difficulty.toLowerCase()}
          </span>

          {/* Minimalist Action Toolbar Link */}
          <button
            onClick={() => setOpen(true)}
            className={`p-1 rounded text-text-secondary opacity-40 hover:text-text-primary dark:hover:text-zinc-100
              transition-all duration-150 cursor-pointer focus-visible:outline-none ${
                isSavedInSheet
                  ? "text-amber-500! opacity-100"
                  : "opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 active:opacity-100"
              }`}
            title="Collect challenge into curated learning tracks"
          >
            {isSavedInSheet ? (
              <Star size={12} className="fill-amber-500 text-amber-500" />
            ) : (
              <FolderPlus size={12} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      {/* Decoupled State Anchor Portal Panel */}
      <ProblemListModal
        open={open}
        onClose={() => setOpen(false)}
        problemId={problem.id}
      />
    </>
  );
};

export default memo(ProblemItem);
