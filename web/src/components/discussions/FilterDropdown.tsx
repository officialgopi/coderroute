import { useState, useRef, useEffect, memo } from "react";
import { ChevronDown, Filter, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FilterDropdown = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = ["Solved", "Unsolved", "Hot", "Following"];

  const toggleFilter = (opt: string) => {
    setFilters((prev) =>
      prev.includes(opt) ? prev.filter((f) => f !== opt) : [...prev, opt],
    );
  };

  // Safe outside-click event navigation listener for menu dismissal
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left font-sans"
    >
      {/* --- TRIGGER BUTTON CONTROL REFACTOR --- */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center justify-between gap-2 h-8 px-3 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer outline-none select-none shadow-3xs ${
          open || filters.length > 0
            ? "bg-surface-panel border-border-intense text-text-primary"
            : "border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/20 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Filter size={10} className="opacity-60 stroke-[2.2]" />
          <span>Filters</span>
          {filters.length > 0 && (
            <span className="flex items-center justify-center h-4 px-1.5 min-w-4 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono text-[9px] font-bold select-none leading-none">
              {filters.length}
            </span>
          )}
        </div>
        <ChevronDown
          size={11}
          className={`opacity-40 transition-transform duration-200 ease-out shrink-0 stroke-[2.5] ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* --- FLOATING DROPDOWN LISTBOX CANVAS --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute left-0 mt-1.5 w-44 rounded-xl border border-border-subtle/60 dark:border-zinc-900/80 bg-surface-card dark:bg-zinc-950 p-1 shadow-md z-50 overflow-hidden focus:outline-none"
          >
            {options.map((opt) => {
              const isChecked = filters.includes(opt);

              return (
                <button
                  key={`filter-opt-${opt}`}
                  type="button"
                  onClick={() => toggleFilter(opt)}
                  className={`w-full flex items-center gap-2.5 h-7.5 px-2 rounded-md font-sans text-xs transition-colors cursor-pointer outline-none text-left ${
                    isChecked
                      ? "bg-surface-panel/60 dark:bg-zinc-900/40 text-text-primary font-medium"
                      : "text-text-secondary hover:bg-neutral-100 dark:hover:bg-zinc-900/50 hover:text-text-primary"
                  }`}
                >
                  {/* Custom Minimal Design System Checkbox Element */}
                  <div
                    className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                      isChecked
                        ? "bg-amber-500 border-amber-500 text-white dark:text-zinc-950"
                        : "border-border-subtle dark:border-zinc-800 bg-transparent"
                    }`}
                  >
                    {isChecked && <Check size={10} className="stroke-[3.5]" />}
                  </div>

                  <span className="flex-1 truncate">{opt}</span>
                </button>
              );
            })}

            {/* Conditional Clear-All Utility Accent Button */}
            {filters.length > 0 && (
              <div className="border-t border-border-subtle/40 dark:border-zinc-900/60 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => setFilters([])}
                  className="w-full h-6 rounded-md font-mono text-[10px] font-bold text-center text-text-secondary hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/5 transition-colors cursor-pointer outline-none uppercase tracking-wide"
                >
                  Clear Active Filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(FilterDropdown);
