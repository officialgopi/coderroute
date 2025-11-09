import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronDown, ChevronRight } from "lucide-react";

interface TestCase {
  id: number;
  input: string;
  output: string;
  userOutput?: string;
  passed?: boolean;
}

interface TestCasesProps {
  testCases: TestCase[];
  isProblemDetailsLoading: boolean;
  isRunning?: boolean;
}

const TestCases: React.FC<TestCasesProps> = ({
  testCases,
  isRunning,
  isProblemDetailsLoading,
}) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (isProblemDetailsLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-neutral-500">Loading Test Cases...</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-neutral-950 border-t border-neutral-800">
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-200 tracking-wide uppercase">
          Test Cases
        </h3>
        {isRunning && (
          <span className="text-xs text-neutral-400 animate-pulse">
            Running...
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {testCases?.map((test) => (
          <motion.div
            key={test.id}
            layout
            className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/40 hover:bg-neutral-900 transition-colors"
          >
            <button
              onClick={() => setExpanded(expanded === test.id ? null : test.id)}
              className="flex items-center justify-between w-full px-3 py-2 text-left"
            >
              <div className="flex items-center gap-2">
                {test.passed === undefined ? (
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                ) : test.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="text-sm text-neutral-200 font-medium">
                  Test Case #{test.id}
                </span>
              </div>

              {expanded === test.id ? (
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              )}
            </button>

            <AnimatePresence>
              {expanded === test.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="px-4 pb-3 space-y-2 text-sm text-neutral-300"
                >
                  <div>
                    <span className="text-neutral-500 text-xs">Input</span>
                    <pre className="mt-1 bg-neutral-950 border border-neutral-800 rounded-md p-2 text-neutral-200 text-xs overflow-x-auto">
                      {test.input}
                    </pre>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-xs">
                      Expected Output
                    </span>
                    <pre className="mt-1 bg-neutral-950 border border-neutral-800 rounded-md p-2 text-neutral-200 text-xs overflow-x-auto">
                      {test.output}
                    </pre>
                  </div>

                  {test.userOutput !== undefined && (
                    <div>
                      <span className="text-neutral-500 text-xs">
                        Your Output
                      </span>
                      <pre
                        className={`mt-1 border rounded-md p-2 text-xs overflow-x-auto ${
                          test.passed
                            ? "bg-green-950/30 border-green-900 text-green-400"
                            : "bg-red-950/30 border-red-900 text-red-400"
                        }`}
                      >
                        {test.userOutput}
                      </pre>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestCases;
