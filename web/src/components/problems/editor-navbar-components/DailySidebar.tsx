import { useProblemStore } from "@/store/problem.store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowRight, FolderCode } from "lucide-react";
import { useEffect, memo } from "react";
import { Link } from "react-router-dom";

interface DailySidebarProps {
  open: boolean;
  onClose: () => void;
}

export const DailySidebar = ({ open, onClose }: DailySidebarProps) => {
  const { problems, getProblems } = useProblemStore();

  useEffect(() => {
    if (open) {
      getProblems();
    }
  }, [open, getProblems]);

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "text-emerald-500 dark:text-emerald-400";
      case "MEDIUM":
        return "text-amber-500 dark:text-amber-400";
      case "HARD":
        return "text-rose-500 dark:text-rose-400";
      default:
        return "text-text-secondary";
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP DIMMING MASK LAYER: Locks interactions outside the modal frame */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/50 backdrop-blur-xs z-50 cursor-pointer"
          />

          {/* LAYER PANEL CORE VIEWPORT: Ultra-smooth, fluid layout navigation slide drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 left-0 h-full w-80 bg-surface-panel dark:bg-zinc-950 border-r border-border-subtle dark:border-zinc-900 shadow-2xl z-50 flex flex-col select-none"
          >
            {/* PANEL INNER HEADER MODULE */}
            <div className="flex justify-between items-center px-4 h-11 border-b border-border-subtle dark:border-zinc-900/60 bg-surface-card/40 dark:bg-zinc-950/20">
              <div className="flex items-center gap-2">
                <Calendar
                  size={13}
                  className="text-amber-500 opacity-80 stroke-[2.2]"
                />
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary dark:text-zinc-200">
                  Daily Challenge Index
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-text-secondary hover:text-text-primary dark:hover:text-zinc-200 hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/30"
                title="Dismiss panel view"
              >
                <X size={14} className="stroke-[2.2]" />
              </button>
            </div>

            {/* DYNAMIC SCROLL CONTAINER MODULE */}
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-1">
              {problems.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <FolderCode
                    size={18}
                    className="text-text-secondary opacity-30 mb-2"
                  />
                  <p className="text-xs font-medium text-text-secondary">
                    No matching tasks indexed
                  </p>
                </div>
              ) : (
                <nav
                  className="space-y-1.5"
                  aria-label="Daily challenge shortcuts navigation track"
                >
                  {problems.map((problem, idx) => (
                    <Link
                      to={`/problems/${problem.slug}`}
                      key={`daily-task-${problem.slug}-${idx}`}
                      onClick={onClose}
                      className="block group outline-none"
                    >
                      <div className="px-3.5 py-2.5 rounded-lg border border-border-subtle/40 dark:border-zinc-900/40 bg-surface-card/30 dark:bg-zinc-900/10 hover:bg-surface-card dark:hover:bg-zinc-900/20 hover:border-border-intense dark:hover:border-zinc-800 flex items-center justify-between gap-3 transition-all duration-150 shadow-xs">
                        <div className="min-w-0 space-y-0.5">
                          <h3 className="text-xs font-medium text-text-primary dark:text-zinc-200 truncate group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                            {problem.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-tight text-text-secondary opacity-60">
                            <span>Difficulty:</span>
                            <span
                              className={getDifficultyStyles(
                                problem.difficulty,
                              )}
                            >
                              {problem.difficulty?.toLowerCase()}
                            </span>
                          </div>
                        </div>
                        <ArrowRight
                          size={12}
                          className="text-text-secondary opacity-0 -translate-x-1 group-hover:opacity-80 group-hover:translate-x-0 transition-all duration-150 shrink-0 stroke-[2.2]"
                        />
                      </div>
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            {/* PANEL FOOTER CONSOLE SIGNATURE */}
            <div className="px-4 h-8 border-t border-border-subtle dark:border-zinc-900 flex items-center justify-between bg-surface-card/20 text-[10px] font-mono text-text-secondary select-none opacity-40">
              <span>Sync Status: Verified</span>
              <span>v4.0</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(DailySidebar);
