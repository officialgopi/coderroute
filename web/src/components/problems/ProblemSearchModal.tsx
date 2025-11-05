import React, { useEffect, useState } from "react";
import { CommandModal } from "../ui/CommandModal";
import { ProblemSearchResult } from "./ProblemSearchResult";
import type { IProblem } from "@/store/problem.store";
import { Search } from "lucide-react";

const ProblemSearchModal: React.FC<{ problems: IProblem[] }> = ({
  problems,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const filtered = problems.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (problem: IProblem) => {
    window.location.href = `/problems/${problem.id}`;
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-200 dark:bg-neutral-900 border border-neutral-500/50 text-sm text-neutral-700 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200 transition-all"
      >
        <Search className="w-4 h-4" />
        <span>Search problems...</span>
        <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-neutral-400 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-500">
          Ctrl + K
        </kbd>
      </button>

      {/* Modal */}
      <CommandModal open={open} onClose={() => setOpen(false)}>
        <div className="p-3 border-b border-neutral-800 flex items-center gap-2">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you searching for?"
            className="flex-1 bg-transparent outline-none text-sm text-neutral-950 dark:text-neutral-100 placeholder-neutral-500"
          />
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((problem) => (
              <ProblemSearchResult
                key={problem.id}
                problem={problem}
                onSelect={handleSelect}
              />
            ))
          ) : (
            <div className="p-4 text-neutral-500 text-sm text-center">
              No results found.
            </div>
          )}
        </div>
      </CommandModal>
    </>
  );
};

export default ProblemSearchModal;
