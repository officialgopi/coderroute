import { memo } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface ProblemItem {
  id: string | number;
  title: string;
  difficulty: string;
  category?: string;
}

interface RecentSolvedProblemsProps {
  problems: ProblemItem[];
}

export const RecentSolvedProblems = ({
  problems,
}: RecentSolvedProblemsProps) => {
  return (
    <div className="w-full rounded-2xl border border-border-subtle/40 dark:border-zinc-900/60 bg-surface-card/10 dark:bg-zinc-950/10 overflow-hidden shadow-3xs">
      {/* --- TRACKER HEADER CONTAINER --- */}
      <div className="px-4 py-3 border-b border-border-subtle/30 dark:border-zinc-900/40 bg-neutral-50/50 dark:bg-zinc-900/10 flex items-center gap-2 select-none">
        <CheckCircle2 size={13} className="text-emerald-500 stroke-[2.5]" />
        <p className="text-xs font-bold tracking-tight text-text-primary">
          Recent Solutions Saved
        </p>
      </div>

      {/* --- STREAM COMPILED LIST FEED --- */}
      <ul className="divide-y divide-border-subtle/20 dark:divide-zinc-900/40">
        {problems.map((p) => {
          const normDifficulty = p.difficulty?.toUpperCase() || "EASY";

          return (
            <li
              key={`recent-p-${p.id}`}
              className="px-4 h-12 flex items-center justify-between gap-4 text-xs hover:bg-neutral-50 dark:hover:bg-zinc-900/20 transition-colors group"
            >
              {/* Left Side: Problem Label Indicator */}
              <div className="flex items-center gap-2 min-w-0">
                <ChevronRight
                  size={11}
                  className="text-text-secondary opacity-20 group-hover:opacity-50 group-hover:translate-x-[1px] transition-all"
                />
                <span className="font-medium text-text-primary truncate max-w-md select-text">
                  {p.title}
                </span>
              </div>

              {/* Right Side: Difficulty Tag Variant */}
              <span
                className={`font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border leading-none tracking-wide select-none shrink-0 ${
                  normDifficulty === "EASY"
                    ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                    : normDifficulty === "MEDIUM"
                      ? "bg-orange-500/5 text-orange-500 border-orange-500/20"
                      : "bg-rose-500/5 text-rose-500 border-rose-500/20"
                }`}
              >
                {p.difficulty}
              </span>
            </li>
          );
        })}

        {/* --- EMPTY STATE ARCHIVE GUARD --- */}
        {problems.length === 0 && (
          <div className="py-8 text-center select-none opacity-40">
            <p className="italic font-mono text-xs text-text-secondary">
              // No evaluation vectors found in this repository scope.
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default memo(RecentSolvedProblems);
