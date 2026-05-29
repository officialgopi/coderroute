import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Beaker, HelpCircle } from "lucide-react";
import type { CreateProblemBody } from "@/types/types";

interface TestcasesSectionProps {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

export const TestcasesSection: React.FC<TestcasesSectionProps> = ({
  problem,
  setProblem,
}) => {
  const addTestcase = useCallback(() => {
    setProblem((prev) => ({
      ...prev,
      testcases: [
        ...(prev.testcases || []),
        {
          std: {
            stdin: Array(prev.args?.length || 0).fill(""),
            stdout: "",
          },
          explanation: "",
        },
      ],
    }));
  }, [setProblem]);

  const removeTestcase = useCallback(
    (index: number) => {
      setProblem((prev) => ({
        ...prev,
        testcases: prev.testcases.filter((_, i) => i !== index),
      }));
    },
    [setProblem],
  );

  const updateStdin = useCallback(
    (testcaseIndex: number, argIndex: number, value: string) => {
      setProblem((prev) => {
        const updated = [...prev.testcases];
        const targetStdin = [...(updated[testcaseIndex].std.stdin || [])];

        // Ensure row indexes exist even if parameters expanded retroactively
        while (targetStdin.length <= argIndex) {
          targetStdin.push("");
        }

        targetStdin[argIndex] = value;
        updated[testcaseIndex] = {
          ...updated[testcaseIndex],
          std: { ...updated[testcaseIndex].std, stdin: targetStdin },
        };

        return { ...prev, testcases: updated };
      });
    },
    [setProblem],
  );

  const updateStdout = useCallback(
    (index: number, value: string) => {
      setProblem((prev) => {
        const updated = [...prev.testcases];
        updated[index] = {
          ...updated[index],
          std: { ...updated[index].std, stdout: value },
        };
        return { ...prev, testcases: updated };
      });
    },
    [setProblem],
  );

  const updateExplanation = useCallback(
    (index: number, value: string) => {
      setProblem((prev) => {
        const updated = [...prev.testcases];
        updated[index] = { ...updated[index], explanation: value };
        return { ...prev, testcases: updated };
      });
    },
    [setProblem],
  );

  return (
    <div className="w-full space-y-4 font-sans text-text-primary">
      {/* --- SECTION HEADER CONTROL ROW --- */}
      <div className="flex justify-between items-center select-none">
        <div className="flex items-center gap-2">
          <Beaker size={13} className="text-amber-500 stroke-[2.2]" />
          <p className="text-xs font-semibold text-text-secondary opacity-80">
            Define Evaluation Test Vectors
          </p>
        </div>

        <button
          type="button"
          onClick={addTestcase}
          className="h-6 px-2.5 rounded-md border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/40 text-[11px] font-medium text-text-primary hover:border-border-intense dark:hover:border-zinc-700 shadow-3xs flex items-center gap-1 cursor-pointer outline-none transition-colors"
        >
          <Plus size={11} className="stroke-[2.5]" />
          <span>Add Testcase</span>
        </button>
      </div>

      {/* --- HORIZONTAL FEED STREAM DECK --- */}
      <div className="w-full flex gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-thin snap-x">
        {problem.testcases?.map((tc, i) => (
          <motion.div
            key={`tc-card-${i}`}
            initial={{ opacity: 0, scale: 0.97, y: 3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="w-[290px] shrink-0 border border-border-subtle/60 dark:border-zinc-900 bg-surface-card/40 dark:bg-zinc-950/20 rounded-xl p-4 shadow-3xs flex flex-col justify-between snap-contained group hover:border-border-intense dark:hover:border-zinc-800 transition-colors"
          >
            <div>
              {/* Card Meta Row Header */}
              <div className="flex justify-between items-center mb-3 select-none">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50">
                  Vector Case #{i + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeTestcase(i)}
                  className="h-6 w-6 rounded-md border border-transparent hover:border-rose-500/10 text-text-secondary hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer outline-none"
                  aria-label={`Purge testcase item parameters vector ${i + 1}`}
                >
                  <Trash2 size={12} className="stroke-[2.2]" />
                </button>
              </div>

              {/* Dynamic Function Input Fields */}
              <div className="space-y-2.5">
                {(!problem.args || problem.args.length === 0) && (
                  <div className="mb-2">
                    <span className="block font-mono text-[9px] text-text-secondary opacity-40 uppercase mb-1">
                      Void Call Input
                    </span>
                    <textarea
                      disabled
                      placeholder="No arguments configured in metadata."
                      className="w-full h-11 p-2 text-[11px] font-mono border border-border-subtle/40 dark:border-zinc-900 bg-neutral-100/50 dark:bg-zinc-900/10 text-text-secondary opacity-40 rounded-lg outline-none resize-none select-none"
                    />
                  </div>
                )}

                {problem.args?.map((arg, argIdx) => (
                  <div key={`tc-${i}-arg-${argIdx}`}>
                    <label className="block font-mono text-[9px] font-bold text-text-secondary opacity-40 uppercase mb-1">
                      Param: {arg || "unnamed"}
                    </label>
                    <textarea
                      rows={1}
                      placeholder={`value for ${arg || "argument"}`}
                      value={tc.std?.stdin?.[argIdx] || ""}
                      onChange={(e) => updateStdin(i, argIdx, e.target.value)}
                      className="w-full min-h-[36px] px-2.5 py-1.5 text-[11px] font-mono border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 rounded-lg outline-none focus:border-border-intense text-text-primary placeholder:opacity-30 scrollbar-none shadow-3xs"
                    />
                  </div>
                ))}

                {/* Expected Evaluation Output Segment */}
                <div className="pt-1 border-t border-dashed border-border-subtle/30 dark:border-zinc-900/40">
                  <label className="block font-mono text-[9px] font-bold text-amber-500 dark:text-amber-400 uppercase mb-1">
                    Expected Output
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Output primitive..."
                    value={tc.std?.stdout || ""}
                    onChange={(e) => updateStdout(i, e.target.value)}
                    className="w-full h-12 px-2.5 py-1.5 text-[11px] font-mono border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 rounded-lg outline-none focus:border-border-intense text-text-primary placeholder:opacity-30 shadow-3xs"
                  />
                </div>

                {/* Optional Explanation Block Box */}
                <div className="pt-0.5">
                  <label className="block font-mono text-[9px] font-bold text-text-secondary opacity-40 uppercase mb-1">
                    Explanation (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Context for sandbox failures..."
                    value={tc.explanation || ""}
                    onChange={(e) => updateExplanation(i, e.target.value)}
                    className="w-full h-12 px-2.5 py-1.5 text-[11px] font-sans border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 rounded-lg outline-none focus:border-border-intense text-text-primary placeholder:opacity-30 shadow-3xs leading-tight"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* --- EMPTY PLACEHOLDER ARCHIVE CONTAINER --- */}
        {(!problem.testcases || problem.testcases.length === 0) && (
          <div className="w-full py-12 border border-dashed border-border-subtle dark:border-zinc-900/80 rounded-2xl text-center select-none opacity-50 flex flex-col items-center justify-center gap-1.5">
            <HelpCircle
              size={14}
              className="text-text-secondary stroke-[2.2]"
            />
            <p className="font-mono text-[11px] text-text-secondary">
              // Sandbox vector trace clear. Map at least one condition matrix
              block.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TestcasesSection);
