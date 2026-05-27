import { useEffect, useState, useMemo, useCallback } from "react";
import { CommandModal } from "../ui/CommandModal";
import { ProblemSearchResult } from "./ProblemSearchResult";
import { useProblemStore, type IProblem } from "@/store/problem.store";
import { Search, CornerDownLeft, Command, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProblemSearchModal = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchedProblems, setSearchedProblems] = useState<IProblem[]>([]);
  const [_page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const { problems, getProblems } = useProblemStore();
  const navigate = useNavigate();

  // OS Detection System for platform shortcut styling accuracy (Mac uses ⌘, Windows uses Ctrl)
  const isMac = useMemo(
    () =>
      typeof window !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform),
    [],
  );

  // Intercept hotkey registration layers cleanly across layout input boundaries
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        // Prevent default browser URL address bar hijacking execution loops
        e.preventDefault();

        // Block action if cursor focuses inside text fields or editable structures
        const target = e.target as HTMLElement;
        if (target.matches("input, textarea, [contenteditable]")) return;

        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Performance Optimization: Fall back safely to global cache indices if query inputs are blank
  // Fixes the bug where server paginated data arrays were ignored in the mapping block
  const displaysList = useMemo(() => {
    if (query.trim() === "") return problems;
    return searchedProblems;
  }, [query, problems, searchedProblems]);

  const handleSelect = useCallback(
    (problem: IProblem) => {
      navigate(`/problems/${problem.slug}`);
      setOpen(false);
      setQuery("");
    },
    [navigate],
  );

  // Server Data Orchestrator Block
  const syncServerIndices = async (searchText: string, targetPage: number) => {
    if (searchText.trim() === "") return;

    try {
      setIsSearching(true);
      const incoming = await getProblems({
        searchText,
        isSearch: true,
        page: targetPage,
      });

      if (incoming && incoming.length > 0) {
        setSearchedProblems((prev) => {
          if (targetPage === 1) return incoming;
          // Unify entries while shielding local index caches from key identification collisons
          const filteredPrev = prev.filter(
            (sp) => !incoming.some((np) => np.id === sp.id),
          );
          return [...filteredPrev, ...incoming];
        });
        setPage(targetPage);
      } else if (targetPage === 1) {
        setSearchedProblems([]);
      }
    } catch (err) {
      console.error("Command palette synchronization error dropped: ", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Automated layout debounce loop handling API requests cleanly
  useEffect(() => {
    if (query.trim() === "") {
      setSearchedProblems([]);
      return;
    }

    const taskScheduler = setTimeout(() => {
      syncServerIndices(query, 1);
    }, 250);

    return () => clearTimeout(taskScheduler);
  }, [query]);

  return (
    <>
      {/* --- MINIMAL TRIGGER COMMAND PALETTE BUTTON --- */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 h-9 px-3 rounded-lg bg-surface-card/40 dark:bg-zinc-950/20 border border-border-subtle dark:border-border-subtle/50 text-xs text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700 transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
        aria-label="Open index search command utility panel"
      >
        <Search size={13} className="opacity-70 text-text-secondary" />
        <span className="font-medium pr-8">Search challenges...</span>

        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wide border border-border-subtle dark:border-zinc-800 bg-bg-canvas dark:bg-zinc-900 text-text-secondary select-none opacity-70">
          {isMac ? <Command size={10} className="stroke-[2.5]" /> : "Ctrl"} + K
        </kbd>
      </button>

      {/* --- HIGH-DENSITY COMMAND MENUS PLATFORM MODAL --- */}
      <CommandModal open={open} onClose={() => setOpen(false)}>
        {/* Input Layer Block */}
        <div className="p-4 border-b border-border-subtle dark:border-zinc-900 flex items-center gap-3 bg-surface-card/10">
          <Search size={15} className="text-text-secondary opacity-50" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems by keywords, tags, or IDs..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary dark:text-zinc-100 placeholder-text-secondary/50 font-sans"
            aria-label="Keyword text filter entry field"
          />
          {isSearching && (
            <div className="w-3.5 h-3.5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          )}
        </div>

        {/* Dynamic Matrix Stream List Layout */}
        <div className="max-h-[320px] overflow-y-auto divide-y divide-border-subtle/40 dark:divide-zinc-900/40 custom-scrollbar p-2">
          {displaysList.length > 0 ? (
            displaysList.map((problem) => (
              <ProblemSearchResult
                key={`cmd-search-${problem.id}`}
                problem={problem}
                onSelect={handleSelect}
              />
            ))
          ) : (
            <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
              <AlertCircle
                size={18}
                className="text-text-secondary opacity-30 mb-2"
              />
              <p className="text-xs font-semibold text-text-primary">
                No results found
              </p>
              <p className="text-[11px] text-text-secondary max-w-xs mt-0.5 opacity-70">
                No indexed parameters match "{query}". Refine terms or check
                spelling.
              </p>
            </div>
          )}
        </div>

        {/* --- UTILITIES SHORTCUT INTERFACE LEGEND FOOTER --- */}
        <div className="hidden sm:flex px-4 h-9 items-center justify-between border-t border-border-subtle dark:border-zinc-900 bg-surface-card/20 text-[10px] font-mono text-text-secondary select-none opacity-60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="p-0.5 rounded border border-border-subtle bg-bg-canvas px-1">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="p-0.5 rounded border border-border-subtle bg-bg-canvas px-1 flex items-center">
                <CornerDownLeft size={8} />
              </kbd>{" "}
              Select
            </span>
          </div>
          <span>CoderRoute Command Deck v4</span>
        </div>
      </CommandModal>
    </>
  );
};

export default ProblemSearchModal;
