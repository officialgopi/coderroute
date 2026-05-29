import React, { lazy, Suspense, memo, useCallback } from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import type { CreateProblemBody } from "@/types/types";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = lazy(() => import("react-quill-new"));

interface ProblemMetadataProps {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CriteriaSelectorsProps {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

export const CriteriaSelectors: React.FC<CriteriaSelectorsProps> = ({
  problem,
  setProblem,
}) => {
  const [activeMenu, setActiveMenu] = useState<"difficulty" | "format" | null>(
    null,
  );

  const difficultyRef = useRef<HTMLDivElement>(null);
  const formatRef = useRef<HTMLDivElement>(null);

  // Close menus instantly on external viewport actions
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (
        activeMenu === "difficulty" &&
        difficultyRef.current &&
        !difficultyRef.current.contains(targetNode)
      ) {
        setActiveMenu(null);
      }
      if (
        activeMenu === "format" &&
        formatRef.current &&
        !formatRef.current.contains(targetNode)
      ) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeMenu]);

  const difficultyOptions = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];

  const formatOptions = [
    { value: "PLAIN", label: "Plain Text (Exact Trim)" },
    { value: "JSON", label: "JSON Structure (Unordered)" },
    { value: "FLOAT", label: "Floating Point Matrix (ε)" },
  ];

  const currentDifficultyLabel =
    difficultyOptions.find((o) => o.value === problem.difficulty)?.label ||
    "Easy";
  const currentFormatLabel =
    formatOptions.find((o) => o.value === problem.output_format)?.label ||
    "Plain Text (Exact Trim)";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-text-primary select-none">
      {/* --- DIFFICULTIES CUSTOM MENU DROPDOWN --- */}
      <div ref={difficultyRef} className="space-y-1.5 relative">
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
          Difficulty Tier
        </label>

        <button
          type="button"
          role="combobox"
          aria-expanded={activeMenu === "difficulty"}
          aria-haspopup="listbox"
          onClick={() =>
            setActiveMenu((prev) =>
              prev === "difficulty" ? null : "difficulty",
            )
          }
          className={`w-full h-9 px-3 rounded-xl border bg-surface-card dark:bg-zinc-950/40 flex items-center justify-between text-xs font-medium outline-none transition-all shadow-3xs cursor-pointer ${
            activeMenu === "difficulty"
              ? "border-border-intense ring-1 ring-border-subtle/20"
              : "border-border-subtle/80 dark:border-zinc-800"
          }`}
        >
          <span className="truncate">{currentDifficultyLabel}</span>
          <ChevronDown
            size={12}
            className={`text-text-secondary opacity-50 transition-transform duration-200 stroke-[2.5] shrink-0 ${activeMenu === "difficulty" ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {activeMenu === "difficulty" && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: 3, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 3, scale: 0.98 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="absolute left-0 right-0 mt-1.5 rounded-xl border border-border-subtle/60 dark:border-zinc-900 bg-surface-card dark:bg-zinc-950 p-1 shadow-md z-50 overflow-hidden space-y-0.5"
            >
              {difficultyOptions.map((opt) => {
                const isSelected = problem.difficulty === opt.value;
                return (
                  <li key={`diff-opt-${opt.value}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setProblem((p) => ({
                          ...p,
                          difficulty:
                            opt.value as CreateProblemBody["difficulty"],
                        }));
                        setActiveMenu(null);
                      }}
                      className={`w-full h-8 px-2.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer outline-none transition-colors ${
                        isSelected
                          ? "bg-neutral-50 dark:bg-zinc-900 text-text-primary font-semibold"
                          : "text-text-secondary hover:bg-neutral-50/60 dark:hover:bg-zinc-900/40 hover:text-text-primary"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <Check
                          size={11}
                          className="text-amber-500 stroke-[3]"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* --- EVALUATION MATRIX FORMAT CUSTOM DROPDOWN --- */}
      <div ref={formatRef} className="space-y-1.5 relative">
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
          Evaluation Logic Format
        </label>

        <button
          type="button"
          role="combobox"
          aria-expanded={activeMenu === "format"}
          aria-haspopup="listbox"
          onClick={() =>
            setActiveMenu((prev) => (prev === "format" ? null : "format"))
          }
          className={`w-full h-9 px-3 rounded-xl border bg-surface-card dark:bg-zinc-950/40 flex items-center justify-between text-xs font-medium outline-none transition-all shadow-3xs cursor-pointer ${
            activeMenu === "format"
              ? "border-border-intense ring-1 ring-border-subtle/20"
              : "border-border-subtle/80 dark:border-zinc-800"
          }`}
        >
          <span className="truncate">{currentFormatLabel}</span>
          <ChevronDown
            size={12}
            className={`text-text-secondary opacity-50 transition-transform duration-200 stroke-[2.5] shrink-0 ${activeMenu === "format" ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {activeMenu === "format" && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: 3, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 3, scale: 0.98 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="absolute left-0 right-0 mt-1.5 rounded-xl border border-border-subtle/60 dark:border-zinc-900 bg-surface-card dark:bg-zinc-950 p-1 shadow-md z-50 overflow-hidden space-y-0.5"
            >
              {formatOptions.map((opt) => {
                const isSelected = problem.output_format === opt.value;
                return (
                  <li key={`fmt-opt-${opt.value}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setProblem((p) => ({
                          ...p,
                          output_format:
                            opt.value as CreateProblemBody["output_format"],
                        }));
                        setActiveMenu(null);
                      }}
                      className={`w-full h-8 px-2.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer outline-none transition-colors ${
                        isSelected
                          ? "bg-neutral-50 dark:bg-zinc-900 text-text-primary font-semibold"
                          : "text-text-secondary hover:bg-neutral-50/60 dark:hover:bg-zinc-900/40 hover:text-text-primary"
                      }`}
                    >
                      <span className="truncate pr-4">{opt.label}</span>
                      {isSelected && (
                        <Check
                          size={11}
                          className="text-amber-500 stroke-[3]"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* --- RICH TEXT EDITOR LOADOUT FALLBACK --- */
const EditorSkeleton = memo(() => (
  <div className="w-full h-48 rounded-xl border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950 flex flex-col overflow-hidden animate-pulse">
    <div className="h-9 w-full bg-neutral-100 dark:bg-zinc-900 border-b border-border-subtle/40 dark:border-zinc-800/60" />
    <div className="p-4 space-y-2 flex-1">
      <div className="h-3.5 w-11/12 rounded bg-neutral-200 dark:bg-zinc-800 opacity-60" />
      <div className="h-3.5 w-4/5 rounded bg-neutral-200 dark:bg-zinc-800 opacity-40" />
    </div>
  </div>
));
EditorSkeleton.displayName = "EditorSkeleton";

export const ProblemMetadata: React.FC<ProblemMetadataProps> = ({
  problem,
  setProblem,
}) => {
  const addArg = useCallback(() => {
    setProblem((p) => ({
      ...p,
      args: [...(p.args || []), ""],
    }));
  }, [setProblem]);

  const updateArg = useCallback(
    (index: number, value: string) => {
      setProblem((p) => ({
        ...p,
        args: (p.args || []).map((arg, i) => (i === index ? value : arg)),
      }));
    },
    [setProblem],
  );

  const removeArg = useCallback(
    (index: number) => {
      setProblem((p) => ({
        ...p,
        args: (p.args || []).filter((_, i) => i !== index),
      }));
    },
    [setProblem],
  );

  return (
    <div className="w-full space-y-5 font-sans text-text-primary">
      {/* --- ROW 1: PROBLEM TITLE --- */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
          Problem Title
        </label>
        <input
          type="text"
          value={problem.title}
          onChange={(e) => setProblem((p) => ({ ...p, title: e.target.value }))}
          className="w-full h-9 px-3 text-xs border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 rounded-xl outline-none focus:border-border-intense transition-colors text-text-primary placeholder:opacity-40"
          placeholder="e.g., Compute Matrix Subsets"
        />
      </div>
      {/* --- ROW 2: CRITERIA SELECTORS --- */}
      <CriteriaSelectors problem={problem} setProblem={setProblem} />
      {/* --- EVALUATION CONTEXT DESCRIPTIVE CAPTION --- */}
      <div className="p-3 rounded-xl border border-border-subtle/40 dark:border-zinc-900/60 bg-neutral-50/50 dark:bg-zinc-900/10 flex items-start gap-2.5 select-none">
        <HelpCircle
          size={13}
          className="text-text-secondary opacity-50 mt-0.5 shrink-0 stroke-[2.2]"
        />
        <p className="text-[11px] leading-relaxed text-text-secondary opacity-70">
          {problem.output_format === "PLAIN" &&
            "Standard exact string comparison path (whitespace trimmed). Ideal choice for alphanumeric primitives, strings, and integers."}
          {problem.output_format === "JSON" &&
            "Deep order-insensitive object analysis tree validation. Perfect choice for multidimensional arrays, hash objects, and graphs."}
          {problem.output_format === "FLOAT" &&
            "Floating-point evaluation matching within absolute precision ranges ($10^{-5}$ deviation scale tolerance). Required for accurate mathematical ratios."}
        </p>
      </div>
      {/* --- ROW 3: ARGUMENTS MANAGEMENT TRAIL --- */}
      <div className="space-y-3 pt-1">
        <div className="flex justify-between items-center select-none">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
            Dynamic Compilation Arguments
          </label>
          <button
            type="button"
            onClick={addArg}
            className="h-6 px-2.5 rounded-md border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/40 text-[11px] font-medium text-text-primary hover:border-border-intense dark:hover:border-zinc-700 shadow-3xs flex items-center gap-1 cursor-pointer outline-none transition-colors"
          >
            <Plus size={11} className="stroke-[2.5]" />
            <span>Add Parameter</span>
          </button>
        </div>

        {(!problem.args || problem.args.length === 0) && (
          <div className="py-4 border border-dashed border-border-subtle dark:border-zinc-900/80 rounded-xl text-center select-none opacity-50">
            <p className="font-mono text-[11px] text-text-secondary">
              No parameters configured. Evaluates as:{" "}
              <code className="bg-neutral-100 dark:bg-zinc-900 px-1 py-0.5 rounded font-mono font-bold text-[10px]">
                solve()
              </code>
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {problem.args?.map((arg, i) => (
            <div
              key={`param-input-${i}`}
              className="flex items-center gap-2 animate-fade-in"
            >
              <span className="font-mono text-[10px] text-text-secondary opacity-40 select-none w-12 shrink-0">
                Param {i + 1}
              </span>
              <input
                type="text"
                value={arg}
                onChange={(e) => updateArg(i, e.target.value)}
                placeholder="variableName"
                className="flex-1 h-8 px-3 text-xs border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 rounded-lg outline-none focus:border-border-intense text-text-primary placeholder:opacity-30"
              />
              <button
                type="button"
                onClick={() => removeArg(i)}
                className="h-8 w-8 rounded-lg border border-transparent hover:border-rose-500/20 text-text-secondary hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer outline-none shrink-0"
                aria-label={`Remove compilation argument pointer ${i + 1}`}
              >
                <Trash2 size={13} className="stroke-[2.2]" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* --- ROW 4: RICH EXTENDED DESCRIPTION FRAME --- */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60 select-none">
          Problem Markdown Description
        </label>

        <div className="w-full text-text-primary rounded-xl border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/30 overflow-hidden shadow-3xs group focus-within:border-border-intense dark:focus-within:border-zinc-700 transition-colors">
          <Suspense fallback={<EditorSkeleton />}>
            <ReactQuill
              theme="snow"
              value={problem.description}
              onChange={(val) =>
                setProblem((p) => ({ ...p, description: val }))
              }
              placeholder="Draft structural parameters, edge cases details, and evaluation notes..."
              className="font-sans text-xs dark:text-zinc-200"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default memo(ProblemMetadata);
