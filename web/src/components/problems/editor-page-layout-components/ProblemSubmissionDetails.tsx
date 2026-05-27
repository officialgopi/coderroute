import { useEffect, useState, useMemo, memo, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSubmissionStore, type ISubmission } from "@/store/submission.store";
import { useThemeStore } from "@/lib/theme.lib";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Calendar,
  Code,
  Terminal,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const Editor = lazy(() => import("@monaco-editor/react"));

export const ProblemSubmissionDetails = () => {
  const { submissionId } = useParams();
  const { getSubmissionBySubmissionId, isSubmissionLoading } =
    useSubmissionStore();
  const [submission, setSubmission] = useState<ISubmission | null>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    async function fetchSubmission(id: string) {
      const result = await getSubmissionBySubmissionId(id);
      if (result) setSubmission(result);
    }
    if (submissionId) {
      fetchSubmission(submissionId);
    }
  }, [submissionId, getSubmissionBySubmissionId]);

  // Safe Execution Metrics Parser: Defensively computes profiling parameters outside the render track
  const processedMetrics = useMemo(() => {
    if (!submission) return { totalMemory: "— KB", totalTime: "— s" };

    let totalMemory = "— KB";
    let totalTime = "— s";

    try {
      if (submission.memory) {
        const memoryArray =
          typeof submission.memory === "string"
            ? JSON.parse(submission.memory)
            : submission.memory;
        if (Array.isArray(memoryArray)) {
          const parsedMem = memoryArray
            .map((str) => Number(String(str).replace(/[^\d.]/g, "")))
            .reduce((a, b) => a + b, 0);
          totalMemory = `${parsedMem.toFixed(0)} KB`;
        }
      }
    } catch {
      totalMemory = "Error parsing profile allocation";
    }

    try {
      if (submission.time) {
        const timeArray =
          typeof submission.time === "string"
            ? JSON.parse(submission.time)
            : submission.time;
        if (Array.isArray(timeArray)) {
          const parsedTime = timeArray
            .map((str) => Number(String(str).replace(/[^\d.]/g, "")))
            .reduce((a, b) => a + b, 0);
          totalTime = `${parsedTime.toFixed(2)} s`;
        }
      }
    } catch {
      totalTime = "Error parsing duration execution";
    }

    return { totalMemory, totalTime };
  }, [submission]);

  const getStatusStyles = (status: string) => {
    if (status?.toUpperCase() === "ACCEPTED") {
      return {
        bg: "bg-emerald-500/5 dark:bg-emerald-500/[0.02] border-emerald-500/20 dark:border-emerald-500/10",
        badge:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        text: "text-emerald-600 dark:text-emerald-400",
        icon: CheckCircle2,
      };
    }
    return {
      bg: "bg-rose-500/5 dark:bg-rose-500/[0.02] border-rose-500/20 dark:border-rose-500/10",
      badge:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      text: "text-rose-600 dark:text-rose-400",
      icon: XCircle,
    };
  };

  if (isSubmissionLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center font-mono text-xs text-text-secondary opacity-40 select-none animate-pulse">
        <span>Retrieving code run logs from engine layers...</span>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="p-6 text-center select-none opacity-50 font-mono text-xs text-text-secondary">
        // Submission target references not located or expired.
      </div>
    );
  }

  const statusConfig = getStatusStyles(submission.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="w-full flex flex-col space-y-5 max-w-4xl font-sans text-xs text-text-primary pb-8 select-none">
      {/* --- LOW-CONTRAST HEADER ROADMAP --- */}
      <div className="pb-2.5 flex items-center gap-2 border-b border-border-subtle/30 dark:border-zinc-900/40 select-none">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50">
          Submissions
        </span>
        <ChevronRight size={10} className="text-text-secondary opacity-30" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-80">
          Log Token: {submissionId?.slice(0, 8)}
        </span>
      </div>

      {/* --- LAYER 1: METRICS HIGHLIGHT BOARD GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <MetricCard
          label="Status"
          value={submission.status?.replace(/_/g, " ")}
          icon={<StatusIcon size={13} className={statusConfig.text} />}
          textStyles={statusConfig.text}
        />
        <MetricCard
          label="Time Taken"
          value={processedMetrics.totalTime}
          icon={<Clock size={13} className="text-text-secondary opacity-60" />}
        />
        <MetricCard
          label="Memory Usage"
          value={processedMetrics.totalMemory}
          icon={<Cpu size={13} className="text-text-secondary opacity-60" />}
        />
        <MetricCard
          label="Language"
          value={submission.language?.toUpperCase()}
          icon={<Code size={13} className="text-text-secondary opacity-60" />}
          fontMono
        />
      </div>

      <div className="text-[10px] text-text-secondary opacity-40 font-mono flex items-center gap-1 pl-1 select-none">
        <Calendar size={10} />
        <span>
          Committed Core Script Run At:{" "}
          {new Date(submission.createdAt).toLocaleString()}
        </span>
      </div>

      {/* --- LAYER 2: INTERACTIVE READ-ONLY MONACO CONSOLE CANVAS --- */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 pl-0.5">
          <Code size={11} />
          <span>Committed Source Script</span>
        </div>
        <div className="h-64 w-full rounded-xl border border-border-subtle dark:border-zinc-900 bg-surface-card overflow-hidden pt-2">
          <Suspense
            fallback={
              <div className="h-full w-full bg-zinc-100 dark:bg-zinc-950 animate-pulse" />
            }
          >
            <Editor
              height="100%"
              theme={theme === "dark" ? "vs-dark" : "vs-light"}
              value={submission.sourceCode}
              language={submission.language?.toLowerCase()}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 12,
                fontFamily: "JetBrains Mono, Menlo, monospace",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 8, bottom: 8 },
                domReadOnly: true,
                lineHeight: 1.5,
              }}
            />
          </Suspense>
        </div>
      </div>

      {/* --- LAYER 3: COMPILER EXCEPTION RUN FAILING TARGET DIAGNOSTICS --- */}
      {submission.status === "WRONG_ANSWER" && submission.testcasesResults && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-500 pl-0.5 select-none">
            <AlertTriangle size={11} className="stroke-[2.5]" />
            <span>Failing Runtime Testcase Vectors</span>
          </div>

          <div className="space-y-4">
            {submission.testcasesResults.map((tc, index) => {
              if (tc?.passed) return null;

              return (
                <motion.div
                  key={`failing-case-${tc.id || index}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="rounded-xl border border-border-subtle dark:border-zinc-900/60 bg-surface-panel/20 dark:bg-zinc-900/10 p-4 space-y-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between border-b border-border-subtle/30 dark:border-zinc-900/40 pb-2.5 select-none">
                    <span className="font-mono text-[10px] font-bold text-rose-500 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/20 uppercase tracking-wide">
                      Testcase {index + 1} • {tc?.status || "Wrong Answer"}
                    </span>
                  </div>

                  {/* BLOCK 1: INPUT DATA VECTOR */}
                  {tc?.testcase?.input && (
                    <div className="space-y-1.5">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
                        Input Parameters
                      </div>
                      <div className="w-full p-3 bg-zinc-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-300 border border-border-subtle/60 dark:border-zinc-900/60 font-mono text-[11px] rounded-lg whitespace-pre-wrap leading-relaxed shadow-xs select-text">
                        {tc.testcase.input}
                      </div>
                    </div>
                  )}

                  {/* BLOCK 2: USER CONSOLE OUTPUT BUFFER */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
                      Your Output
                    </div>
                    <div className="w-full p-3 bg-zinc-50 dark:bg-zinc-950 border border-rose-500/20 font-mono text-[11px] text-rose-600 dark:text-rose-400 rounded-lg whitespace-pre-wrap leading-relaxed shadow-xs overflow-x-auto custom-scrollbar select-text">
                      {tc.stdout?.trim() === "" || !tc.stdout ? (
                        <span className="italic opacity-40 select-none">
                          // No parameters written to stdout.
                        </span>
                      ) : (
                        <pre className="font-mono whitespace-pre-wrap">
                          {tc.stdout.trim()}
                        </pre>
                      )}
                    </div>
                  </div>

                  {/* BLOCK 3: PLATFORM TARGET EXPECTED REFERENCE */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
                      Expected Output
                    </div>
                    <div className="w-full p-3 bg-zinc-50 dark:bg-zinc-950 border border-border-subtle/60 dark:border-zinc-900/60 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 rounded-lg whitespace-pre-wrap leading-relaxed shadow-xs overflow-x-auto custom-scrollbar select-text">
                      {tc?.expected ? (
                        <pre className="font-mono whitespace-pre-wrap">
                          {tc.expected.trim()}
                        </pre>
                      ) : (
                        <span className="opacity-30">—</span>
                      )}
                    </div>
                  </div>

                  {/* BLOCK 4: STANDARD RUNTIME ERRORS SYSTEM STACK */}
                  {tc.stderr && (
                    <div className="space-y-1.5 pt-0.5 animate-fade-in">
                      <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-500 select-none">
                        <Terminal size={10} />
                        <span>Standard Error Trace (stderr)</span>
                      </div>
                      <div className="w-full p-3 bg-zinc-50 dark:bg-zinc-950 border border-rose-500/30 font-mono text-[11px] text-rose-600 dark:text-rose-400/90 rounded-lg whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto custom-scrollbar select-text shadow-xs">
                        <pre className="font-mono whitespace-pre-wrap">
                          {tc.stderr.trim()}
                        </pre>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* --- PREMIUM HIGHLIGHT MATRIX TILE --- */
interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  textStyles?: string;
  fontMono?: boolean;
}

const MetricCard = memo(
  ({
    label,
    value,
    icon,
    textStyles = "text-text-primary dark:text-zinc-200",
    fontMono = false,
  }: MetricCardProps) => (
    <div className="px-4 py-3 border border-border-subtle/50 dark:border-zinc-900 bg-surface-panel/30 dark:bg-zinc-900/10 rounded-xl shadow-3xs flex items-center justify-between gap-3 select-none">
      <div className="space-y-0.5 truncate">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 block">
          {label}
        </span>
        <span
          className={`text-xs font-bold tracking-tight block truncate ${fontMono ? "font-mono" : ""} ${textStyles}`}
        >
          {value}
        </span>
      </div>
      <div className="h-7 w-7 rounded-md border border-border-subtle/30 dark:border-zinc-800/80 bg-surface-card dark:bg-zinc-950 flex items-center justify-center shrink-0 shadow-3xs">
        {icon}
      </div>
    </div>
  ),
);

MetricCard.displayName = "MetricCard";

export default memo(ProblemSubmissionDetails);
