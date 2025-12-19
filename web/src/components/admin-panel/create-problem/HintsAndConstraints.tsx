import type { CreateProblemBody } from "@/types/types";
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TAGS, type TAG } from "@/schemas/schemas";

interface Props {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

const HintsAndConstraints: React.FC<Props> = ({ problem, setProblem }) => {
  /* ---------- Constraints ---------- */
  const addConstraint = () => {
    setProblem((p) => ({
      ...p,
      constraints: [...(p.constraints ?? []), ""],
    }));
  };

  const updateConstraint = (index: number, value: string) => {
    setProblem((p) => ({
      ...p,
      constraints: (p.constraints ?? []).map((c, i) =>
        i === index ? value : c
      ),
    }));
  };

  const removeConstraint = (index: number) => {
    setProblem((p) => ({
      ...p,
      constraints: (p.constraints ?? []).filter((_, i) => i !== index),
    }));
  };

  /* ---------- Hints ---------- */
  const addHint = () => {
    setProblem((p) => ({
      ...p,
      hints: [...(p.hints ?? []), ""],
    }));
  };

  const updateHint = (index: number, value: string) => {
    setProblem((p) => ({
      ...p,
      hints: (p.hints ?? []).map((h, i) => (i === index ? value : h)),
    }));
  };

  const removeHint = (index: number) => {
    setProblem((p) => ({
      ...p,
      hints: (p.hints ?? []).filter((_, i) => i !== index),
    }));
  };
  const toggleTag = (tag: string) => {
    setProblem((p: any) => {
      // Here we use 'any' to avoid type issues with tags
      const currentTags = p.tags ?? [];
      return {
        ...p,
        tags: currentTags.includes(tag as TAG)
          ? currentTags.filter((t: TAG) => t !== tag)
          : [...currentTags, tag],
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Constraints */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Constraints
          </label>
          <button
            type="button"
            onClick={addConstraint}
            className="btn-sub text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        {(problem.constraints ?? []).map((c, i) => (
          <div key={i} className="flex gap-2 items-start">
            <textarea
              value={c}
              onChange={(e) => updateConstraint(i, e.target.value)}
              placeholder={`Constraint ${i + 1}`}
              className="input-field text-sm min-h-[60px] flex-1"
            />
            <button
              type="button"
              onClick={() => removeConstraint(i)}
              className="btn-danger mt-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {(problem.constraints ?? []).length === 0 && (
          <p className="text-xs text-neutral-500">No constraints added.</p>
        )}
      </div>

      {/* Hints */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Hints
          </label>
          <button
            type="button"
            onClick={addHint}
            className="btn-sub text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        {(problem.hints ?? []).map((h, i) => (
          <div key={i} className="flex gap-2 items-start">
            <textarea
              value={h}
              onChange={(e) => updateHint(i, e.target.value)}
              placeholder={`Hint ${i + 1}`}
              className="input-field text-sm min-h-[60px] flex-1"
            />
            <button
              type="button"
              onClick={() => removeHint(i)}
              className="btn-danger mt-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {(problem.hints ?? []).length === 0 && (
          <p className="text-xs text-neutral-500">No hints added.</p>
        )}
      </div>
      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Tags
        </label>

        <div className="flex flex-wrap gap-2">
          {Object.values(TAGS).map((tag) => {
            const selected = (problem.tags ?? []).includes(tag);

            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs border transition
            ${
              selected
                ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-transparent text-neutral-600 border-neutral-300 dark:text-neutral-400 dark:border-neutral-600 hover:border-neutral-500"
            }`}
              >
                {tag.replaceAll("_", " ")}
              </button>
            );
          })}
        </div>

        {(problem.tags ?? []).length === 0 && (
          <p className="text-xs text-neutral-500">No tags selected.</p>
        )}
      </div>
    </div>
  );
};

export default HintsAndConstraints;
