import { useMemo, useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Terminal, Play } from "lucide-react";
import { useCodeExecutionStore } from "@/store/code-execution.store";
import { useProblemStore } from "@/store/problem.store";

type TConsoleTab = "testcase" | "result";

export const Testcases = () => {
  const { isProblemDetailsLoading, problemInCodeEditor } = useProblemStore();
  const { currentProblemRunningResult, isRunning } = useCodeExecutionStore();

  const [activeTestcase, setActiveTestcase] = useState(0);
  const [activeTab, setActiveTab] = useState<TConsoleTab>("testcase");

  // Automatically lift focus to the code execution result tab once runtime responses land
  useEffect(() => {
    if (currentProblemRunningResult) {
      setActiveTab("result");
    }
  }, [currentProblemRunningResult]);

  // Reset tab selection matrices back to baseline setups when global tasks change
  useEffect(() => {
    setActiveTestcase(0);
    setActiveTab("testcase");
  }, [problemInCodeEditor]);

  // Compute local display objects driven exclusively by the defined dataset arrays
  const testcases = useMemo(() => {
    if (!problemInCodeEditor || !problemInCodeEditor.testcases) return [];

    const base = problemInCodeEditor.testcases.map((tc, index) => ({
      id: index,
      input: (problemInCodeEditor.args || []).map(
        (arg, i) => `${arg} = ${tc.std?.stdin?.[i] ?? "—"}`,
      ),
      expected: tc.std?.stdout ?? "",
      actual: undefined as string | undefined,
      passed: undefined as boolean | undefined,
      status: undefined as string | undefined,
    }));

    if (!currentProblemRunningResult || !currentProblemRunningResult.testcases)
      return base;

    return base.map((tc) => {
      const result = currentProblemRunningResult.testcases.find(
        (r) => r.testcase - 1 === tc.id,
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

  if (isProblemDetailsLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center font-mono text-xs text-text-secondary opacity-40 select-none animate-pulse">
        <span>Loading testcases…</span>
      </div>
    );
  }

  const tc = testcases[activeTestcase];
  const hasRunResults = testcases.some(
    (t) => t.passed !== undefined || t.status !== undefined,
  );

  return (
    <div className="h-full flex flex-col bg-transparent font-sans text-xs">
      {/* --- LAYER 1: PLATFORM MODE CONSOLE TABS NAVIGATION --- */}
      <div className="shrink-0 flex items-center justify-between border-b border-border-subtle/40 dark:border-zinc-900/40 pb-2 select-none">
        <div className="flex items-center gap-4 h-6">
          <button
            type="button"
            onClick={() => setActiveTab("testcase")}
            className={`relative h-full font-medium tracking-tight transition-colors cursor-pointer outline-none ${
              activeTab === "testcase"
                ? "text-text-primary font-semibold"
                : "text-text-secondary opacity-60 hover:opacity-100"
            }`}
          >
            <span>Testcase</span>
            {activeTab === "testcase" && (
              <motion.div
                layoutId="consoleUnderline"
                className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-amber-500"
              />
            )}
          </button>

          {hasRunResults && (
            <button
              type="button"
              onClick={() => setActiveTab("result")}
              className={`relative h-full font-medium tracking-tight transition-colors cursor-pointer outline-none flex items-center gap-1.5 ${
                activeTab === "result"
                  ? "text-text-primary font-semibold"
                  : "text-text-secondary opacity-60 hover:opacity-100"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${testcases.every((t) => t.passed) ? "bg-emerald-500" : "bg-rose-500"}`}
              />
              <span>Result</span>
              {activeTab === "result" && (
                <motion.div
                  layoutId="consoleUnderline"
                  className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-amber-500"
                />
              )}
            </button>
          )}
        </div>

        {/* Global Runtime Compiler Pulse */}
        {isRunning && (
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-amber-500 animate-pulse">
            <Play size={10} className="fill-amber-500/20 animate-spin" />
            <span>Running…</span>
          </div>
        )}
      </div>

      {/* --- LAYER 2: STEPPER DRIVER CASE SELECTION MATRIX --- */}
      <div className="shrink-0 flex items-center gap-1.5 py-3 overflow-x-auto max-w-full custom-scrollbar select-none">
        {testcases.map((t, i) => {
          const isActive = activeTestcase === i;

          let caseStyle =
            "bg-surface-panel/50 dark:bg-zinc-900/20 border-border-subtle/60 dark:border-zinc-900 text-text-secondary hover:text-text-primary hover:border-border-intense";

          if (isActive) {
            caseStyle =
              "bg-surface-card border-border-intense text-text-primary font-bold shadow-2xs";
          } else if (activeTab === "result" && t.passed === true) {
            caseStyle =
              "bg-emerald-500/[0.02] border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/5";
          } else if (activeTab === "result" && t.passed === false) {
            caseStyle =
              "bg-rose-500/[0.02] border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/5";
          }

          return (
            <button
              key={`case-step-btn-${t.id}`}
              onClick={() => setActiveTestcase(i)}
              className={`inline-flex items-center gap-1.5 h-6 px-3 rounded-lg border font-mono text-[10px] font-medium transition-all cursor-pointer outline-none ${caseStyle}`}
            >
              {activeTab === "result" && t.passed === true && (
                <CheckCircle2
                  size={11}
                  className="text-emerald-500 stroke-[2.5]"
                />
              )}
              {activeTab === "result" && t.passed === false && (
                <XCircle size={11} className="text-rose-500 stroke-[2.5]" />
              )}
              <span>Case {i + 1}</span>
            </button>
          );
        })}
      </div>

      {/* --- LAYER 3: CONSOLE VIEWPORT RESPONSIVE RENDERER --- */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {tc ? (
          <AnimatePresence mode="wait">
            {activeTab === "testcase" ? (
              /* --- TESTCASE VIEW MODE --- */
              <motion.div
                key={`tab-panel-tc-${tc.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="h-full overflow-y-auto space-y-3 pr-1 custom-scrollbar pb-4"
              >
                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
                    Input
                  </div>
                  <div className="w-full rounded-lg border border-border-subtle/50 dark:border-zinc-900 bg-surface-panel/40 dark:bg-zinc-950/20 p-3 font-mono text-[11px] text-text-primary leading-relaxed whitespace-pre-wrap shadow-3xs">
                    {tc.input.join("\n")}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* --- EXECUTION RESULT VIEW MODE --- */
              <motion.div
                key={`tab-panel-res-${tc.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="h-full overflow-y-auto space-y-4 pr-1 custom-scrollbar pb-4"
              >
                {/* User Runtime Evaluation Outputs Frame */}
                {tc.actual !== undefined && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between select-none">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40">
                        Your Output
                      </div>
                      {tc.status && (
                        <span
                          className={`font-mono text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${
                            tc.passed
                              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : "bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {tc.status}
                        </span>
                      )}
                    </div>

                    <div
                      className={`rounded-lg border p-3 font-mono text-[11px] leading-relaxed shadow-xs transition-colors ${
                        tc.passed
                          ? "bg-emerald-500/[0.01] dark:bg-emerald-500/[0.02] border-emerald-500/30 text-emerald-600 dark:text-emerald-300"
                          : "bg-rose-500/[0.01] dark:bg-rose-500/[0.02] border-rose-500/30 text-rose-600 dark:text-rose-300"
                      }`}
                    >
                      {tc.actual.trim() === "" ? (
                        <span className="italic opacity-40 select-none">
                          // No parameters outputted to stdout.
                        </span>
                      ) : (
                        <pre className="whitespace-pre-wrap font-mono">
                          {tc.actual.trim()}
                        </pre>
                      )}
                    </div>
                  </div>
                )}

                {/* Expected Output Reference Box */}
                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
                    Expected Output
                  </div>
                  <div className="w-full rounded-lg border border-border-subtle/50 dark:border-zinc-900 bg-surface-panel/40 dark:bg-zinc-950/20 p-3 font-mono text-[11px] text-text-primary leading-relaxed shadow-3xs">
                    {tc.expected || "—"}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 select-none opacity-40">
            <Terminal size={14} className="text-text-secondary mb-1.5" />
            <p className="text-xs font-medium">No testcases detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Testcases);
