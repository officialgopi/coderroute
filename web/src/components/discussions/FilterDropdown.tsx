import { useState } from "react";
import { Filter } from "lucide-react";

export const FilterDropdown = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  const options = ["Solved", "Unsolved", "Hot", "Following"];

  const toggleFilter = (opt: string) => {
    setFilters((prev) =>
      prev.includes(opt) ? prev.filter((f) => f !== opt) : [...prev, opt]
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm  transition-colors px-3 py-2 rounded-xl border border-neutral-500/50"
      >
        <Filter className="w-4 h-4" /> Filter
      </button>

      {open && (
        <div className="absolute mt-2 w-40  border border-neutral-500/50 overflow-hidden bg-neutral-300 dark:bg-neutral-900  rounded-xl shadow-xl z-10">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleFilter(opt)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                filters.includes(opt)
                  ? "bg-neutral-200 dark:bg-neutral-800"
                  : "dark:hover:bg-neutral-800 hover:bg-neutral-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
