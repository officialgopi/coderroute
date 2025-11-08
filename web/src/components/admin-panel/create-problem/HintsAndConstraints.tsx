import type { CreateProblemBody } from "@/types/types";
import React from "react";

interface Props {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

const HintsAndConstraints: React.FC<Props> = ({ problem, setProblem }) => {
  const updateField = (field: keyof CreateProblemBody, value: string) => {
    setProblem((prev) => ({ ...prev, [field]: [value] }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
          Constraints
        </label>
        <textarea
          value={problem.constraints?.[0] || ""}
          onChange={(e) => updateField("constraints", e.target.value)}
          placeholder="Enter constraints..."
          className="input-field text-sm min-h-[80px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">
          Hints
        </label>
        <textarea
          value={problem.hints?.[0] || ""}
          onChange={(e) => updateField("hints", e.target.value)}
          placeholder="Provide optional hints..."
          className="input-field text-sm min-h-[80px]"
        />
      </div>
    </div>
  );
};

export default HintsAndConstraints;
