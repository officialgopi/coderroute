import React from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import type { CreateProblemBody } from "@/types/types";

interface Testcase {
  input: string;
  output: string;
  explaination?: string;
}

interface Props {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

const TestCasesSection: React.FC<Props> = ({ problem, setProblem }) => {
  const addTestcase = () => {
    setProblem((prev) => ({
      ...prev,
      testcases: [
        ...prev.testcases,
        { input: "", output: "", explaination: "" },
      ],
    }));
  };

  const removeTestcase = (index: number) => {
    setProblem((prev) => ({
      ...prev,
      testcases: prev.testcases.filter((_, i) => i !== index),
    }));
  };

  const updateTestcase = (
    index: number,
    field: keyof Testcase,
    value: string
  ) => {
    const updated = [...problem.testcases];
    updated[index][field] = value;
    setProblem((prev) => ({ ...prev, testcases: updated }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Define your problem’s testcases
        </p>
        <button
          type="button"
          onClick={addTestcase}
          className="btn-sub text-sm flex items-center gap-1.5"
        >
          <Plus size={14} /> Add Testcase
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {problem.testcases.map((tc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="min-w-[260px] flex-shrink-0 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Case #{i + 1}
              </p>
              <button
                type="button"
                onClick={() => removeTestcase(i)}
                className="btn-danger"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <textarea
              placeholder="Input"
              value={tc.input}
              onChange={(e) => updateTestcase(i, "input", e.target.value)}
              className="input-field text-xs mb-2"
            />
            <textarea
              placeholder="Expected Output"
              value={tc.output}
              onChange={(e) => updateTestcase(i, "output", e.target.value)}
              className="input-field text-xs mb-2"
            />
            <textarea
              placeholder="Explanation (optional)"
              value={tc.explaination || ""}
              onChange={(e) =>
                updateTestcase(i, "explaination", e.target.value)
              }
              className="input-field text-xs"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestCasesSection;
