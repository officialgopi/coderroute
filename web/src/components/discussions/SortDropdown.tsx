import { useState, useRef, useEffect, memo } from "react";
import { ChevronDown, SlidersHorizontal, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SortDropdown = () => {
  const [selected, setSelected] = useState("Latest");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = ["Latest", "Most Liked", "Most Viewed", "Most Commented"];

  // Handle defensive outside navigation click dismissal sequences safely
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
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center justify-between gap-2 h-8 px-3 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer outline-none select-none shadow-3xs ${
          open
            ? "bg-surface-panel border-border-intense text-text-primary"
            : "border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/20 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal size={10} className="opacity-60 stroke-[2.2]" />
          <span className="text-text-secondary font-sans font-normal opacity-50 select-none">
            Sort:
          </span>
          <span>{selected}</span>
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
            role="listbox"
            className="absolute left-0 mt-1.5 w-44 rounded-xl border border-border-subtle/60 dark:border-zinc-900/80 bg-surface-card dark:bg-zinc-950 p-1 shadow-md z-50 overflow-hidden focus:outline-none"
          >
            {options.map((opt) => {
              const isSelected = selected === opt;

              return (
                <button
                  key={`sort-opt-${opt}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelected(opt);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between h-7.5 px-2.5 rounded-md font-sans text-xs transition-colors cursor-pointer outline-none text-left ${
                    isSelected
                      ? "bg-surface-panel dark:bg-zinc-900 text-text-primary font-medium"
                      : "text-text-secondary hover:bg-neutral-100 dark:hover:bg-zinc-900/50 hover:text-text-primary"
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <Check
                      size={11}
                      className="text-amber-500 dark:text-amber-400 stroke-[2.5]"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(SortDropdown);
