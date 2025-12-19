import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useCodeExecutionStore } from "@/store/code-execution.store";
import { useProblemStore } from "@/store/problem.store";

const Testcases = () => {
  const { isProblemDetailsLoading, problemInCodeEditor } = useProblemStore();
  const { currentProblemRunningResult, isRunning } = useCodeExecutionStore();

  const [activeTestcase, setActiveTestcase] = useState(0);

  const testcases = useMemo(() => {
    if (!problemInCodeEditor) return [];

    const base = problemInCodeEditor.testcases!.map((tc, index) => ({
      id: index,
      input: problemInCodeEditor.args.map(
        (arg, i) => `${arg} = ${tc.std.stdin[i] ?? "—"}`
      ),
      expected: tc.std.stdout,
      actual: undefined as string | undefined,
      passed: undefined as boolean | undefined,
      status: undefined as string | undefined,
    }));

    if (!currentProblemRunningResult) return base;

    return base.map((tc) => {
      const result = currentProblemRunningResult.testcases.find(
        (r) => r.testcase - 1 === tc.id
      );

      return result
        ? {
            ...tc,
            actual: result.actual,
            passed: result.passed,
            status: result.status,
          }
        : tc;
    });
  }, [problemInCodeEditor, currentProblemRunningResult]);

  useEffect(() => {
    setActiveTestcase(0);
  }, [problemInCodeEditor, currentProblemRunningResult]);

  if (isProblemDetailsLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-neutral-500">Loading testcases…</span>
      </div>
    );
  }

  const tc = testcases[activeTestcase];

  return (
    <div className="h-full flex flex-col ">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Testcases
        </h3>
        {isRunning && (
          <span className="text-xs text-blue-400 animate-pulse">Running…</span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto">
        {testcases.map((t, i) => {
          const isActive = activeTestcase === i;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTestcase(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition
                ${
                  isActive
                    ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30"
                    : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                }`}
            >
              {t.passed === true && (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              )}
              {t.passed === false && (
                <XCircle className="w-3.5 h-3.5 text-red-500" />
              )}
              Case {i + 1}
            </button>
          );
        })}
      </div>

      {/* Body */}
      {tc && (
        <motion.div
          key={tc.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-y-auto p-4 space-y-4 text-xs"
        >
          {/* Input */}
          <div className="rounded-lg bg-neutral-900/60 border border-neutral-800 p-3">
            <p className="text-neutral-400 mb-2">Input</p>
            <pre className="text-neutral-200 whitespace-pre-wrap">
              {tc.input.join("\n")}
            </pre>
          </div>

          {/* Expected */}
          <div className="rounded-lg bg-neutral-900/60 border border-neutral-800 p-3">
            <p className="text-neutral-400 mb-2">Expected Output</p>
            <pre className="text-neutral-200">{tc.expected}</pre>
          </div>

          {/* User Output */}
          {tc.actual !== undefined && (
            <div
              className={`rounded-lg border p-3 ${
                tc.passed
                  ? "bg-green-950/30 border-green-900"
                  : "bg-red-950/30 border-red-900"
              }`}
            >
              <p
                className={`mb-2 ${
                  tc.passed ? "text-green-400" : "text-red-400"
                }`}
              >
                Your Output
              </p>
              <pre className="text-neutral-200">{tc.actual.trim()}</pre>
            </div>
          )}

          {/* Status */}
          {tc.status && (
            <div className="flex justify-end">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tc.passed
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {tc.status}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Testcases;
