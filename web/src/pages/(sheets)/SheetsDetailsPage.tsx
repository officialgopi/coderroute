// src/features/sheets/pages/SheetsDetailsPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSheetStore } from "@/store/sheet.store";
import {
  Loader2,
  Trash2,
  Code2,
  Calendar,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export const SheetsDetailsPage: React.FC = () => {
  const { sheetId } = useParams<{ sheetId: string }>();
  const { getSheetById, sheets, deleteProblemFromSheet } = useSheetStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletingProblemId, setDeletingProblemId] = useState<string | null>(
    null,
  );

  const sheet = useMemo(
    () => sheets?.find((s) => s.id === sheetId),
    [sheets, sheetId],
  );

  useEffect(() => {
    if (!sheetId) return;

    const fetchSheetData = async () => {
      try {
        setIsLoading(true);
        await getSheetById(sheetId);
      } catch {
        toast.error("Failed to recover target problem matrix context.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();
  }, [sheetId, getSheetById]);

  const handleDelete = async (e: React.MouseEvent, problemId: string) => {
    // FIX INTENT: Block event bubbling so clicking delete doesn't fire parent Link redirection paths
    e.preventDefault();
    e.stopPropagation();

    if (!sheetId || deletingProblemId) return;

    try {
      setDeletingProblemId(problemId);
      await deleteProblemFromSheet(sheetId, problemId);
      toast.success("Problem vector unlinked successfully.");
    } catch {
      toast.error("Failed to purge problem from sheet index.");
    } finally {
      setDeletingProblemId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary px-4 py-8 md:px-8 max-w-5xl mx-auto selection:bg-accent-gold/20 antialiased font-sans">
      {/* 1. BACKWARD NAVIGATION TRACK LINE BAR */}
      <Link
        to="/sheets"
        className="inline-flex items-center gap-1 text-xs font-mono text-text-muted hover:text-accent-gold transition-colors mb-6 group/link focus:outline-hidden"
      >
        <ChevronLeft
          size={12}
          className="transition-transform duration-150 group-hover/link:-translate-x-0.5"
        />
        <span>back to indices</span>
      </Link>

      {/* 2. DYNAMIC HEADER SECTION AREA */}
      <div className="w-full border-b border-border-subtle pb-6 mb-8 flex flex-col gap-2 select-none">
        {isLoading ? (
          <div className="space-y-2.5 w-full">
            <div className="h-7 bg-bg-secondary/60 border border-border-subtle rounded-md w-1/3 animate-pulse" />
            <div className="h-4 bg-bg-secondary/40 border border-border-subtle rounded-md w-1/2 animate-pulse" />
          </div>
        ) : (
          sheet && (
            <>
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-text-primary">
                {sheet.name}
              </h1>
              {sheet.description ? (
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-3xl select-text">
                  {sheet.description}
                </p>
              ) : (
                <p className="text-xs font-mono italic text-text-muted/40">
                  // No additional scope metrics specified
                </p>
              )}
            </>
          )
        )}
      </div>

      {/* 3. CORE SUB-PROBLEM ROUTING STACK GRID */}
      <div className="flex flex-col w-full">
        {/* HYDRATION SKELETON PLACEHOLDERS */}
        {isLoading && (
          <div className="space-y-3 w-full">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="w-full h-16 bg-bg-secondary/30 border border-border-subtle rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* DATA LOOPING ARRAY EMISSION VIEW */}
        {!isLoading && sheet && sheet.problems && sheet.problems.length > 0 ? (
          <div className="rounded-xl border border-border-subtle bg-bg-secondary/10 overflow-hidden divide-y divide-border-subtle shadow-3xs">
            {sheet.problems.map(({ problem }) => {
              if (!problem) return null;
              const isRowDeleting = deletingProblemId === problem.id;

              return (
                /* FIXED DESIGN INTENT: 
                  - Wrapped row layout inside a semantic, block-level Router 'Link' 
                  - Routes users cleanly to the targeted algorithmic sandbox environment code editor
                */
                <Link
                  key={problem.id}
                  to={`/problems/${problem.slug}`}
                  className="group relative p-4 flex items-center justify-between transition-colors duration-150 hover:bg-bg-secondary/40 select-none cursor-pointer outline-hidden focus:bg-bg-secondary/30 block"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-12">
                    <div className="w-7 h-7 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-text-muted shrink-0 shadow-3xs group-hover:border-accent-gold/20 group-hover:text-text-primary transition-colors">
                      <Code2 size={13} />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <h2 className="font-semibold text-sm text-text-primary truncate tracking-tight group-hover:text-accent-gold transition-colors select-text">
                        {problem.title}
                      </h2>

                      {/* CRISP COMPACT METADATA STRIPS */}
                      <div className="flex items-center gap-3 text-[10px] font-mono">
                        <span
                          className={cn(
                            "font-bold tracking-wider text-[9px] uppercase px-1.5 py-0.5 rounded-sm border",
                            problem.difficulty === "EASY" &&
                              "bg-emerald-500/5 text-emerald-400 border-emerald-500/10",
                            problem.difficulty === "MEDIUM" &&
                              "bg-amber-500/5 text-amber-400 border-amber-500/10",
                            problem.difficulty === "HARD" &&
                              "bg-rose-500/5 text-rose-400 border-rose-500/10",
                          )}
                        >
                          {problem.difficulty || "UNKNOWN"}
                        </span>
                        <span className="text-text-muted/20">|</span>
                        <span className="text-text-muted/60 flex items-center gap-1">
                          <Calendar size={10} />
                          <span>Vector Matrix Verified</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ISOLATED ROW DELETION CONTROLLER TARGET */}
                  <button
                    type="button"
                    disabled={isRowDeleting}
                    onClick={(e) => handleDelete(e, problem.id)}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus:bg-bg-primary transition-all duration-150 p-1.5 text-text-muted hover:text-accent-crimson hover:bg-bg-primary rounded-md border border-transparent hover:border-border-subtle shadow-3xs cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 disabled:opacity-40"
                    title="Unlink problem vector from sheet"
                  >
                    {isRowDeleting ? (
                      <Loader2
                        size={13}
                        className="animate-spin text-text-muted"
                      />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        ) : (
          /* EMPTY FALLBACK CONTAINER STATE */
          !isLoading && (
            <div className="w-full py-16 flex flex-col items-center justify-center text-center space-y-3 border border-dashed border-border-subtle rounded-xl select-none">
              <div className="w-9 h-9 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-muted/50">
                <AlertCircle size={16} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-medium text-text-primary">
                  No algorithmic tracks attached
                </h3>
                <p className="text-[11px] text-text-muted max-w-xs leading-relaxed">
                  Link algorithmic target elements directly inside our
                  integrated sandbox editor tabs.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SheetsDetailsPage;
