import React from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import type { CreateProblemBody } from "@/types/types";

interface Props {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

const TestcasesSection: React.FC<Props> = ({ problem, setProblem }) => {
  const addTestcase = () => {
    setProblem((prev) => ({
      ...prev,
      testcases: [
        ...prev.testcases,
        {
          std: {
            stdin: Array(prev.args.length).fill(""),
            stdout: "",
          },
          explanation: "",
        },
      ],
    }));
  };

  const removeTestcase = (index: number) => {
    setProblem((prev) => ({
      ...prev,
      testcases: prev.testcases.filter((_, i) => i !== index),
    }));
  };

  const updateStdin = (
    testcaseIndex: number,
    argIndex: number,
    value: string
  ) => {
    setProblem((prev) => {
      const updated = [...prev.testcases];
      updated[testcaseIndex] = {
        ...updated[testcaseIndex],
        std: {
          ...updated[testcaseIndex].std,
          stdin: updated[testcaseIndex].std.stdin.map((v, i) =>
            i === argIndex ? value : v
          ),
        },
      };
      return { ...prev, testcases: updated };
    });
  };

  const updateStdout = (index: number, value: string) => {
    setProblem((prev) => {
      const updated = [...prev.testcases];
      updated[index] = {
        ...updated[index],
        std: {
          ...updated[index].std,
          stdout: value,
        },
      };
      return { ...prev, testcases: updated };
    });
  };

  const updateExplanation = (index: number, value: string) => {
    setProblem((prev) => {
      const updated = [...prev.testcases];
      updated[index] = {
        ...updated[index],
        explanation: value,
      };
      return { ...prev, testcases: updated };
    });
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
            className="min-w-[280px] flex-shrink-0 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Case #{i + 1}</p>
              <button onClick={() => removeTestcase(i)} className="btn-danger">
                <Trash2 size={14} />
              </button>
            </div>

            {/* Inputs per arg */}
            {problem.args.map((arg, argIdx) => (
              <textarea
                key={argIdx}
                placeholder={`${arg} (input)`}
                value={tc.std.stdin[argIdx]}
                onChange={(e) => updateStdin(i, argIdx, e.target.value)}
                className="input-field text-xs mb-2"
              />
            ))}

            {/* Output */}
            <textarea
              placeholder="Expected Output"
              value={tc.std.stdout}
              onChange={(e) => updateStdout(i, e.target.value)}
              className="input-field text-xs mb-2"
            />

            {/* Explanation */}
            <textarea
              placeholder="Explanation (optional)"
              value={tc.explanation || ""}
              onChange={(e) => updateExplanation(i, e.target.value)}
              className="input-field text-xs"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestcasesSection;
