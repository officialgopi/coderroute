// src/components/problems/ProblemItem.tsx
import React, { useState, memo, useRef, useEffect } from "react";
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
  const triggerRef = useRef<HTMLDivElement>(null);

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty.toUpperCase()) {
      case "EASY":
        return "text-emerald-500/90 dark:text-emerald-400 font-medium";
      case "MEDIUM":
        return "text-amber-500/90 dark:text-amber-400 font-medium";
      case "HARD":
        return "text-rose-500/90 dark:text-rose-400 font-medium";
      default:
        return "text-text-secondary";
    }
  };

  const isSavedInSheet = sheets?.some((sheet) =>
    sheet.problems?.some((p) => p.problemId === problem.id),
  );

  const isSolved = index % 3 === 0;

  // Global Outside-Click Interceptor to dismiss popovers cleanly
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    /* STACKING PRIORITY HARDENING:
      Dynamically applying relative positioning and 'z-30' when open. 
      This ensures this row's child layers paint over subsequent rows safely.
    */
    <div
      className={`grid grid-cols-12 px-4 sm:px-6 h-11 items-center text-xs border-b border-border-subtle group/row transition-all duration-150 last:border-none select-none ${
        open ? "bg-bg-secondary/50 relative z-30" : "bg-transparent z-auto"
      } hover:bg-bg-secondary/30`}
    >
      {/* COL 1: MINIMAL ACCENT STATUS INDICATOR */}
      <div className="col-span-1 flex items-center">
        {isSolved ? (
          <div
            className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
            title="Completed Track Vector"
          />
        ) : (
          <div
            className="size-1.5 rounded-full bg-border-subtle dark:bg-bg-surface"
            title="Todo Track Node"
          />
        )}
      </div>

      {/* COL 2: MONO INDEX & CONTRAST TITLE LAYER */}
      <div className="col-span-8 sm:col-span-9 flex items-center gap-2 sm:gap-4 min-w-0">
        <span className="font-mono text-[10px] tracking-tight text-text-muted opacity-40 select-none w-5 sm:w-6">
          {String(index + 1).padStart(3, "0")}
        </span>
        <Link
          to={`/problems/${problem.slug}`}
          className="font-medium text-text-primary hover:text-accent-gold transition-colors duration-150 truncate outline-hidden focus-visible:underline decoration-accent-gold/40 underline-offset-4 select-text"
        >
          {problem.title}
        </Link>
      </div>

      {/* COL 3: UTILITY RAIL ACTION HUB */}
      <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-3 sm:gap-5">
        <span
          className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase ${getDifficultyStyles(problem.difficulty)}`}
        >
          {problem.difficulty.toLowerCase()}
        </span>

        {/* CONTEXT POP-UP ANCHOR NODE */}
        <div ref={triggerRef} className="relative inline-flex items-center">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`p-1 rounded-md text-text-muted transition-all duration-150 cursor-pointer focus-visible:outline-hidden ${
              isSavedInSheet
                ? "text-accent-gold opacity-100"
                : "opacity-0 group-hover/row:opacity-100 focus-within:opacity-100 active:opacity-100 hover:text-text-primary hover:bg-bg-primary/60 border border-transparent hover:border-border-subtle"
            }`}
            title="Collect challenge into learning track matrix"
          >
            {isSavedInSheet ? (
              <Star size={12} className="fill-accent-gold text-accent-gold" />
            ) : (
              <FolderPlus size={12} className="stroke-[2.2]" />
            )}
          </button>

          {/* DECOUPLED FLOATING SELECTION DRAWER */}
          <ProblemListModal
            open={open}
            onClose={() => setOpen(false)}
            problemId={problem.id}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProblemItem);
