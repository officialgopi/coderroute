import React, { memo, useCallback } from "react";
import { Plus, Trash2, HelpCircle, ShieldAlert } from "lucide-react";
import type { CreateProblemBody } from "@/types/types";
import { TAGS, type TAG } from "@/schemas/schemas";

interface HintsAndConstraintsProps {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

export const HintsAndConstraints: React.FC<HintsAndConstraintsProps> = ({
  problem,
  setProblem,
}) => {
  /* ---------- 🛠️ CONSTRAINTS MUTATION IMPLEMENTATION ---------- */
  const addConstraint = useCallback(() => {
    setProblem((p) => ({
      ...p,
      constraints: [...(p.constraints ?? []), ""],
    }));
  }, [setProblem]);

  const updateConstraint = useCallback(
    (index: number, value: string) => {
      setProblem((p) => ({
        ...p,
        constraints: (p.constraints ?? []).map((c, i) =>
          i === index ? value : c,
        ),
      }));
    },
    [setProblem],
  );

  const removeConstraint = useCallback(
    (index: number) => {
      setProblem((p) => ({
        ...p,
        constraints: (p.constraints ?? []).filter((_, i) => i !== index),
      }));
    },
    [setProblem],
  );

  /* ---------- 💡 HINTS MUTATION IMPLEMENTATION ---------- */
  const addHint = useCallback(() => {
    setProblem((p) => ({
      ...p,
      hints: [...(p.hints ?? []), ""],
    }));
  }, [setProblem]);

  const updateHint = useCallback(
    (index: number, value: string) => {
      setProblem((p) => ({
        ...p,
        hints: (p.hints ?? []).map((h, i) => (i === index ? value : h)),
      }));
    },
    [setProblem],
  );

  const removeHint = useCallback(
    (index: number) => {
      setProblem((p) => ({
        ...p,
        hints: (p.hints ?? []).filter((_, i) => i !== index),
      }));
    },
    [setProblem],
  );

  /* ---------- 🏷️ TAG TOGGLE MUTATION IMPLEMENTATION ---------- */
  const toggleTag = useCallback(
    (tag: string) => {
      setProblem((p) => {
        const currentTags = p.tags ?? [];
        const isSelected = currentTags.includes(tag as TAG);

        return {
          ...p,
          tags: isSelected
            ? currentTags.filter((t) => t !== (tag as TAG))
            : [...currentTags, tag as TAG],
        };
      });
    },
    [setProblem],
  );

  const resolvedConstraints = problem.constraints ?? [];
  const resolvedHints = problem.hints ?? [];
  const resolvedTags = problem.tags ?? [];

  return (
    <div className="w-full space-y-6 font-sans text-text-primary">
      {/* --- SECTION 1: EXECUTION CONSTRAINTS BLOCK --- */}
      <div className="space-y-3">
        <div className="flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <ShieldAlert size={13} className="text-rose-500 stroke-[2.2]" />
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
              Execution Constraints
            </label>
          </div>
          <button
            type="button"
            onClick={addConstraint}
            className="h-6 px-2.5 rounded-md border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/40 text-[11px] font-medium text-text-primary hover:border-border-intense dark:hover:border-zinc-700 shadow-3xs flex items-center gap-1 cursor-pointer outline-none transition-colors"
          >
            <Plus size={11} className="stroke-[2.5]" />
            <span>Add Constraint</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {resolvedConstraints.map((c, i) => (
            <div
              key={`constraint-node-${i}`}
              className="flex gap-2 items-start animate-fade-in"
            >
              <span className="font-mono text-[10px] text-text-secondary opacity-40 select-none w-12 pt-2.5 shrink-0 text-right">
                #{i + 1}
              </span>
              <textarea
                value={c}
                onChange={(e) => updateConstraint(i, e.target.value)}
                placeholder="e.g., 1 <= nums.length <= 10^5"
                rows={1}
                className="min-h-[36px] flex-1 px-3 py-2 text-xs border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 rounded-xl outline-none focus:border-border-intense text-text-primary placeholder:opacity-30 resize-y shadow-3xs font-mono"
              />
              <button
                type="button"
                onClick={() => removeConstraint(i)}
                className="h-9 w-9 rounded-xl border border-transparent hover:border-rose-500/10 text-text-secondary hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer outline-none shrink-0"
                aria-label={`Purge algorithmic limitation index token ${i + 1}`}
              >
                <Trash2 size={13} className="stroke-[2.2]" />
              </button>
            </div>
          ))}
        </div>

        {resolvedConstraints.length === 0 && (
          <div className="py-4 border border-dashed border-border-subtle dark:border-zinc-900/80 rounded-xl text-center select-none opacity-50">
            <p className="font-mono text-[11px] text-text-secondary">
              No constraints mapped. Sandbox applies standard timeout limits.
            </p>
          </div>
        )}
      </div>

      {/* --- SECTION 2: HELP INDEX HINTS BLOCK --- */}
      <div className="space-y-3 pt-1">
        <div className="flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <HelpCircle size={13} className="text-amber-500 stroke-[2.2]" />
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
              Progression Hints
            </label>
          </div>
          <button
            type="button"
            onClick={addHint}
            className="h-6 px-2.5 rounded-md border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/40 text-[11px] font-medium text-text-primary hover:border-border-intense dark:hover:border-zinc-700 shadow-3xs flex items-center gap-1 cursor-pointer outline-none transition-colors"
          >
            <Plus size={11} className="stroke-[2.5]" />
            <span>Add Hint</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {resolvedHints.map((h, i) => (
            <div
              key={`hint-node-${i}`}
              className="flex gap-2 items-start animate-fade-in"
            >
              <span className="font-mono text-[10px] text-text-secondary opacity-40 select-none w-12 pt-2.5 shrink-0 text-right">
                Hint {i + 1}
              </span>
              <textarea
                value={h}
                onChange={(e) => updateHint(i, e.target.value)}
                placeholder="Suggest space optimizations or reference core patterns..."
                rows={2}
                className="min-h-[48px] flex-1 px-3 py-2 text-xs border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 rounded-xl outline-none focus:border-border-intense text-text-primary placeholder:opacity-30 resize-y shadow-3xs leading-relaxed"
              />
              <button
                type="button"
                onClick={() => removeHint(i)}
                className="h-9 w-9 rounded-xl border border-transparent hover:border-rose-500/10 text-text-secondary hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer outline-none shrink-0"
                aria-label={`Purge pedagogical help array index ${i + 1}`}
              >
                <Trash2 size={13} className="stroke-[2.2]" />
              </button>
            </div>
          ))}
        </div>

        {resolvedHints.length === 0 && (
          <div className="py-4 border border-dashed border-border-subtle dark:border-zinc-900/80 rounded-xl text-center select-none opacity-50">
            <p className="font-mono text-[11px] text-text-secondary">
              No context hints appended. Challenge will unlock maximum point
              weights.
            </p>
          </div>
        )}
      </div>

      {/* --- SECTION 3: CLASSIFICATION TAXONOMY TAG PILLS --- */}
      <div className="space-y-2.5 pt-1">
        <label className="block text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60 select-none">
          Algorithmic Taxonomy Tags
        </label>

        <div className="flex flex-wrap gap-1.5 select-none p-0.5">
          {Object.values(TAGS).map((tag) => {
            const isSelected = resolvedTags.includes(tag);

            return (
              <button
                key={`tag-pill-${tag}`}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`h-[22px] px-2.5 rounded-full text-[10px] font-mono font-bold tracking-wide border cursor-pointer transition-all duration-150 uppercase outline-none ${
                  isSelected
                    ? "bg-zinc-950 border-transparent text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold shadow-3xs"
                    : "bg-surface-card dark:bg-zinc-900/40 text-text-secondary border-border-subtle/80 dark:border-zinc-800/80 hover:border-border-intense dark:hover:border-zinc-700"
                }`}
              >
                {tag.replaceAll("_", " ")}
              </button>
            );
          })}
        </div>

        {resolvedTags.length === 0 && (
          <p className="font-sans text-[11px] italic text-text-secondary opacity-40 select-none pl-0.5">
            // Categorization index unassigned. Select pillars to assist problem
            queries.
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(HintsAndConstraints);
