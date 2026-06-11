// src/features/admin/pages/ManageProblemsPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProblemStore } from "@/store/problem.store";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  Filter,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Structural data format matching your backend schemas
interface IAdminProblemSummary {
  id: string;
  slug: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  createdAt: string;
  isActive?: boolean;
}

export const ManageProblemsPage: React.FC = () => {
  // Pulling base inventory retrieval from your store. Mutations are isolated to local state below.
  const { problems, getProblems } = useProblemStore();

  // Interface State Control Matrix
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Local Mutable State Cache for Dummy Interactions
  const [localProblems, setLocalProblems] = useState<IAdminProblemSummary[]>(
    [],
  );

  // Row-Isolated Async Lifecycle Locks
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [updatingSlug, setUpdatingSlug] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 10;

  // Sync state tracking from store to local mutable copy for standalone simulation
  useEffect(() => {
    const fetchAdminInventory = async () => {
      try {
        setIsLoading(true);
        await getProblems();
      } catch {
        toast.error(
          "Failed to recover complete tracking manifest from registry.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminInventory();
  }, [getProblems]);

  useEffect(() => {
    if (problems) {
      setLocalProblems(problems as IAdminProblemSummary[]);
    }
  }, [problems]);

  // Client-Side Live Search & Parameter Filter Matrix
  const filteredProblems = useMemo(() => {
    return localProblems.filter((prob) => {
      const matchesSearch =
        prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prob.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiff =
        difficultyFilter === "ALL" || prob.difficulty === difficultyFilter;
      return matchesSearch && matchesDiff;
    });
  }, [localProblems, searchQuery, difficultyFilter]);

  // Pagination Slice Bounds Calculations
  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const paginatedProblems = useMemo(() => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProblems.slice(offset, offset + ITEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  /* --- 🧪 DUMMY DELETION INTERCEPTOR LOOP --- */
  const handleDeleteRow = async (slug: string, title: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to permanently purge "${title}" from the registry?`,
    );
    if (!isConfirmed) return;

    try {
      setDeletingSlug(slug);

      // Simulating upstream delay loop
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mutate local state mirror array to test UI reaction smoothly
      setLocalProblems((prev) => prev.filter((p) => p.slug !== slug));
      toast.success("Problem vector removed successfully (Mock).");
    } catch {
      toast.error("Failed to execute deletion tracking command.");
    } finally {
      setDeletingSlug(null);
    }
  };

  /* --- 🧪 DUMMY VISIBILITY TOGGLE INTERCEPTOR LOOP --- */
  const handleToggleVisibility = async (
    slug: string,
    currentStatus: boolean,
  ) => {
    try {
      setUpdatingSlug(slug);

      // Simulating upstream network telemetry transmission delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Flip dynamic visibility flags on local data cache
      setLocalProblems((prev) =>
        prev.map((p) =>
          p.slug === slug ? { ...p, isActive: !currentStatus } : p,
        ),
      );
      toast.success("Problem registry visibility flipped cleanly (Mock).");
    } catch {
      toast.error("Failed to sync visibility flags down to schema layer.");
    } finally {
      setUpdatingSlug(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary px-4 py-8 md:px-8 max-w-7xl mx-auto selection:bg-accent-gold/20 antialiased font-sans">
      {/* --- UPPER CONTROLLER BAR HEADER ROW --- */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border-subtle pb-5 mb-6">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Settings size={18} className="text-text-muted opacity-80" />
            <span>Problem Inventory Lab</span>
          </h1>
          <p className="text-xs text-text-secondary leading-relaxed opacity-80">
            Monitor compilation parameters, index solution snapshots, prune
            stale tracking tasks, and deploy live coding challenges.
          </p>
        </div>

        <Link to="/admin-panel/create-problem" className="w-full md:w-auto">
          <button className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 h-8 px-4 bg-text-primary text-bg-primary font-bold rounded-lg uppercase tracking-wider text-[10px] font-mono hover:opacity-90 hover:border-accent-gold/20 active:scale-98 transition-all cursor-pointer shadow-3xs border border-transparent">
            <Plus size={12} className="stroke-[2.5]" />
            <span>Design Challenge</span>
          </button>
        </Link>
      </div>

      {/* --- LIVE SEARCH & INTERACTIVE FILTER RAIL --- */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-3 mb-4 font-mono text-[11px]">
        <div className="w-full sm:flex-1 relative">
          <Search
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search problems by title, slug token or namespace schema..."
            className="w-full h-8 pl-8 pr-4 bg-bg-secondary border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted/40 focus:outline-hidden focus:border-accent-gold/40 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <div className="flex items-center gap-1.5 px-2 text-text-muted select-none">
            <Filter size={11} />
            <span>Filter:</span>
          </div>
          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-3 bg-bg-secondary border border-border-subtle rounded-lg text-text-secondary focus:outline-hidden focus:border-accent-gold/40 transition-colors cursor-pointer font-mono text-[11px]"
          >
            <option value="ALL">ALL DIFFICULTIES</option>
            <option value="EASY">EASY TRACKS</option>
            <option value="MEDIUM">MEDIUM VECTORS</option>
            <option value="HARD">HARD SCHEMAS</option>
          </select>
        </div>
      </div>

      {/* --- INVENTORY SHEET DATAGRID CORE --- */}
      <div className="w-full border border-border-subtle rounded-xl bg-bg-secondary/10 overflow-hidden shadow-3xs">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[800px] border-collapse text-left text-xs select-none">
            <thead>
              <tr className="h-9 border-b border-border-subtle bg-bg-secondary/40 font-mono text-[10px] font-bold text-text-muted uppercase tracking-wider">
                <th className="pl-5 w-20">Index</th>
                <th>Challenge Context Name</th>
                <th className="w-32">Classification</th>
                <th className="w-44">Timestamp Matrix</th>
                <th className="w-36 pr-5 text-right">Utility Anchors</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle/40">
              {/* RUNTIME LOADING PLACEHOLDERS */}
              {isLoading &&
                [...Array(5)].map((_, idx) => (
                  <tr key={`loader-row-${idx}`} className="h-11 animate-pulse">
                    <td className="pl-5">
                      <div className="h-3 w-8 bg-bg-secondary rounded-sm" />
                    </td>
                    <td>
                      <div className="h-3 w-1/2 bg-bg-secondary rounded-sm" />
                    </td>
                    <td>
                      <div className="h-4 w-16 bg-bg-secondary rounded-sm" />
                    </td>
                    <td>
                      <div className="h-3 w-28 bg-bg-secondary rounded-sm" />
                    </td>
                    <td className="pr-5">
                      <div className="h-6 w-24 bg-bg-secondary rounded-md ml-auto" />
                    </td>
                  </tr>
                ))}

              {/* EMPTY INVENTORY FALLBACK */}
              {!isLoading && paginatedProblems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="max-w-xs mx-auto space-y-2 select-none">
                      <div className="w-8 h-8 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-muted/60 mx-auto">
                        <ShieldAlert size={14} />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-xs font-semibold text-text-primary">
                          No challenge tracks captured
                        </h3>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          Refine your searching parameter values or initialize a
                          pristine vector matrix.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}

              {/* LIVE ROWS MAP FEED */}
              {!isLoading &&
                paginatedProblems.map((prob, idx) => {
                  const globalIndex =
                    (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
                  const isRowDeleting = deletingSlug === prob.slug;
                  const isRowUpdating = updatingSlug === prob.slug;
                  const isCurrentlyActive = prob.isActive !== false;

                  return (
                    <tr
                      key={prob.id}
                      className={cn(
                        "h-11 transition-colors hover:bg-bg-secondary/30 group/item",
                        isRowDeleting && "opacity-40 bg-accent-crimson/[0.01]",
                        !isCurrentlyActive &&
                          "text-text-muted/60 bg-bg-secondary/10",
                      )}
                    >
                      {/* ID INDEX NODE */}
                      <td className="pl-5 font-mono text-[10px] text-text-muted opacity-50">
                        {String(globalIndex).padStart(3, "0")}
                      </td>

                      {/* IDENTITY NAME & SUB-SLUG SCHEMA */}
                      <td>
                        <div className="flex flex-col min-w-0 pr-4">
                          <Link
                            to={`/problems/${prob.slug}`}
                            className="font-medium text-text-primary hover:text-accent-gold transition-colors truncate select-text"
                          >
                            {prob.title}
                          </Link>
                          <span className="font-mono text-[9px] text-text-muted tracking-tight truncate select-text">
                            /{prob.slug}
                          </span>
                        </div>
                      </td>

                      {/* COMPLEXITY METER BADGE */}
                      <td>
                        <span
                          className={cn(
                            "font-mono text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm border",
                            prob.difficulty === "EASY" &&
                              "bg-emerald-500/5 text-emerald-400 border-emerald-500/10",
                            prob.difficulty === "MEDIUM" &&
                              "bg-amber-500/5 text-amber-400 border-amber-500/10",
                            prob.difficulty === "HARD" &&
                              "bg-rose-500/5 text-rose-400 border-rose-500/10",
                          )}
                        >
                          {prob.difficulty}
                        </span>
                      </td>

                      {/* METADATA SYSTEM TIMESTAMP */}
                      <td className="font-mono text-[10px] text-text-secondary opacity-70">
                        {new Date(prob.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </td>

                      {/* HOVER HOOK ACTIONS RAILS UTILITIES */}
                      <td className="pr-5 shrink-0">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover/item:opacity-100 focus-within:opacity-100 transition-all duration-150">
                          {/* DEPLOY STATUS VISIBILITY FLIPPER */}
                          <button
                            type="button"
                            disabled={isRowUpdating || isRowDeleting}
                            onClick={() =>
                              handleToggleVisibility(
                                prob.slug,
                                isCurrentlyActive,
                              )
                            }
                            className={cn(
                              "p-1.5 rounded-md border text-text-muted hover:text-text-primary hover:bg-bg-primary transition-all cursor-pointer shadow-3xs disabled:opacity-30",
                              !isCurrentlyActive
                                ? "border-dashed border-border-subtle"
                                : "border-transparent hover:border-border-subtle",
                            )}
                            title={
                              isCurrentlyActive
                                ? "Archive challenge pipeline"
                                : "Deploy pipeline live"
                            }
                          >
                            {isRowUpdating ? (
                              <Loader2
                                size={12}
                                className="animate-spin text-accent-gold"
                              />
                            ) : isCurrentlyActive ? (
                              <Eye size={12} />
                            ) : (
                              <EyeOff
                                size={12}
                                className="text-text-muted/40"
                              />
                            )}
                          </button>

                          {/* WORKSPACE DATA SPEC EDITOR ANCHOR */}
                          <Link to={`/admin-panel/edit-problem/${prob.slug}`}>
                            <button
                              type="button"
                              disabled={isRowDeleting}
                              className="p-1.5 rounded-md border border-transparent hover:border-border-subtle text-text-muted hover:text-accent-gold hover:bg-bg-primary transition-all cursor-pointer shadow-3xs disabled:opacity-30"
                              title="Edit structural metadata layout mappings"
                            >
                              <Edit3 size={12} />
                            </button>
                          </Link>

                          {/* PURGE CHALLENGE TRASH UTILITY BUTTON */}
                          <button
                            type="button"
                            disabled={isRowDeleting || isRowUpdating}
                            onClick={() =>
                              handleDeleteRow(prob.slug, prob.title)
                            }
                            className="p-1.5 rounded-md border border-transparent hover:border-border-subtle text-text-muted hover:text-accent-crimson hover:bg-bg-primary transition-all cursor-pointer shadow-3xs disabled:opacity-30"
                            title="Purge challenge from data store permanently"
                          >
                            {isRowDeleting ? (
                              <Loader2
                                size={12}
                                className="animate-spin text-accent-crimson"
                              />
                            ) : (
                              <Trash2 size={12} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* --- SYSTEM FOOTER INTERACTIVE PAGINATION PANEL --- */}
        {totalPages > 1 && (
          <div className="h-11 px-4 bg-bg-secondary/20 border-t border-border-subtle flex items-center justify-between font-mono text-[10px] text-text-secondary select-none">
            <span className="text-text-muted">
              Displaying slice range{" "}
              <span className="text-text-primary font-bold">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>
              -
              <span className="text-text-primary font-bold">
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredProblems.length,
                )}
              </span>{" "}
              of
              <span className="text-text-primary font-bold">
                {" "}
                {filteredProblems.length}
              </span>{" "}
              index logs
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1 || isLoading}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="h-6 w-6 rounded-md border border-border-subtle bg-bg-secondary flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={11} className="stroke-[2.5]" />
              </button>

              <span className="px-1.5 text-text-muted">
                Page{" "}
                <span className="text-text-primary font-bold">
                  {currentPage}
                </span>{" "}
                / {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages || isLoading}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="h-6 w-6 rounded-md border border-border-subtle bg-bg-secondary flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={11} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProblemsPage;
