import { useEffect, useState } from "react";
import { CommandModal } from "../ui/CommandModal";
import { ProblemSearchResult } from "./ProblemSearchResult";
import { useProblemStore, type IProblem } from "@/store/problem.store";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProblemSearchModal = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchedProblems, setSearchedProblems] = useState<IProblem[]>([]);
  const [page, setPage] = useState(0);
  const { problems, getProblems } = useProblemStore();

  const navigate = useNavigate();

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
    navigate(`/problems/${problem.slug}`);
    setOpen(false);
  };

  const handleSearch = async (isLoadMore = false) => {
    if (query.trim() === "") {
      setSearchedProblems(problems);
      return;
    }
    if (isLoadMore) {
      const newSearchedProblems = await getProblems({
        searchText: query,
        isSearch: true,
        page: page + 1,
      });

      if (newSearchedProblems?.length! > 0) {
        const updatedSearchedProblems = searchedProblems.filter(
          (sp) => !newSearchedProblems!.some((np: IProblem) => np.id === sp.id)
        );
        setSearchedProblems(() => [
          ...updatedSearchedProblems,
          ...newSearchedProblems!,
        ]);
        setPage((prev) => prev + 1);
      }
    } else {
      const newSearchedProblems = await getProblems({
        searchText: query,
        isSearch: true,
        page: 1,
      });

      if (newSearchedProblems?.length! > 0) {
        setSearchedProblems(newSearchedProblems!);
        setPage(1);
      }
    }
  };

  useEffect(() => {
    if (searchedProblems.length === 0) {
      setSearchedProblems(problems);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

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
