import { useState } from "react";
import { SortAsc } from "lucide-react";

export const SortDropdown = () => {
  const [selected, setSelected] = useState("Latest");
  const [open, setOpen] = useState(false);

  const options = ["Latest", "Most Liked", "Most Viewed", "Most Commented"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm  transition-colors px-3 py-2 rounded-xl border border-neutral-500/50"
      >
        <SortAsc className="w-4 h-4" /> {selected}
      </button>

      {open && (
        <div className="absolute mt-2 w-40  border border-neutral-500/50 overflow-hidden bg-neutral-300 dark:bg-neutral-900  rounded-xl shadow-xl z-10">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm  transition-colors ${
                selected === opt
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
