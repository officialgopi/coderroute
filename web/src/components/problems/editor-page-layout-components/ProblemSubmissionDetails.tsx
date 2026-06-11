// src/components/problems/editor-page-layout-components/ProblemSubmissionDetails.tsx
import {
  useEffect,
  useState,
  useMemo,
  memo,
  lazy,
  Suspense,
  useCallback,
} from "react";
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
import { cn } from "@/lib/utils";

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

  // Safe Metrics Aggregator Pipeline
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

  const getStatusStyles = useCallback((status: string) => {
    if (status?.toUpperCase() === "ACCEPTED") {
      return {
        bg: "bg-emerald-500/5 border-emerald-500/10",
        badge:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        text: "text-emerald-600 dark:text-emerald-400",
        icon: CheckCircle2,
      };
    }
    return {
      bg: "bg-rose-500/5 border-rose-500/10",
      badge:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      text: "text-rose-600 dark:text-rose-400",
      icon: XCircle,
    };
  }, []);

  if (isSubmissionLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center font-mono text-xs text-text-secondary opacity-40 select-none animate-pulse py-20">
        <span>Retrieving code run logs from engine layers...</span>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="p-12 text-center select-none opacity-50 font-mono text-xs text-text-secondary">
        // Submission target references not located or expired.
      </div>
    );
  }

  const statusConfig = getStatusStyles(submission.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="w-full flex flex-col space-y-6 max-w-4xl font-sans text-xs text-text-primary pb-8 select-none bg-bg-primary">
      {/* --- RE-COORDINATED LOG TOKEN HEADER TRACE --- */}
      <div className="pb-2.5 flex items-center gap-2 border-b border-border-subtle select-none">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50">
          Submissions
        </span>
        <ChevronRight size={10} className="text-text-secondary opacity-30" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-80">
          Log Token: {submissionId?.slice(0, 8)}
        </span>
      </div>

      {/* --- 💎 ENHANCED: INTEGRATED/STACKED METRICS HUB --- */}
      <div className="w-full border border-border-subtle rounded-xl bg-gradient-to-b from-bg-secondary/20 to-transparent shadow-3xs overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-subtle/60">
          <MetricCard
            label="Status"
            value={submission.status?.replace(/_/g, " ")}
            icon={<StatusIcon size={12} className={statusConfig.text} />}
            textStyles={statusConfig.text}
            accentVariant="status"
          />
          <MetricCard
            label="Time Taken"
            value={processedMetrics.totalTime}
            icon={<Clock size={11} />}
            accentVariant="time"
          />
          <MetricCard
            label="Memory Usage"
            value={processedMetrics.totalMemory}
            icon={<Cpu size={11} />}
            accentVariant="memory"
          />
          <MetricCard
            label="Language"
            value={submission.language?.toUpperCase()}
            icon={<Code size={11} />}
            fontMono
            accentVariant="language"
          />
        </div>
      </div>

      <div className="text-[10px] text-text-secondary opacity-40 font-mono flex items-center gap-1 pl-0.5 select-none">
        <Calendar size={10} />
        <span>
          Committed Core Script Run At:{" "}
          {new Date(submission.createdAt).toLocaleString()}
        </span>
      </div>

      {/* --- LAYER 2: INTERACTIVE READ-ONLY MONACO DISPLAY CONSOLE --- */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 pl-0.5">
          <Code size={11} />
          <span>Committed Source Script</span>
        </div>
        <div className="h-[420px] w-full rounded-xl border border-border-subtle bg-bg-secondary overflow-hidden pt-2 shadow-3xs">
          <Suspense
            fallback={
              <div className="h-full w-full bg-bg-secondary animate-pulse" />
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
                fontFamily:
                  "JetBrains Mono, Fira Code, Menlo, Monaco, monospace",
                fontLigatures: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
                domReadOnly: true,
                lineHeight: 1.6,
                renderLineHighlight: "all" as const,
                scrollbar: {
                  vertical: "visible" as const,
                  horizontal: "visible" as const,
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                },
              }}
            />
          </Suspense>
        </div>
      </div>

      {/* --- LAYER 3: COMPILER EXCEPTION RUN FAILING TARGET DIAGNOSTICS --- */}
      {submission.status === "WRONG_ANSWER" && submission.testcasesResults && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-crimson pl-0.5 select-none">
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
                  className="rounded-xl border border-border-subtle bg-bg-secondary/20 p-4 space-y-4 shadow-3xs"
                >
                  <div className="flex items-center justify-between border-b border-border-subtle/50 pb-2.5 select-none">
                    <span className="font-mono text-[10px] font-bold text-accent-crimson bg-accent-crimson/5 px-2 py-0.5 rounded border border-accent-crimson/10 uppercase tracking-wide">
                      Testcase {index + 1} • {tc?.status || "Wrong Answer"}
                    </span>
                  </div>

                  {/* BLOCK 1: INPUT DATA VECTOR */}
                  {tc?.testcase?.input && (
                    <div className="space-y-1.5">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
                        Input Parameters
                      </div>
                      <div className="w-full p-3 bg-bg-secondary border border-border-subtle text-text-primary font-mono text-[11px] rounded-lg whitespace-pre-wrap leading-relaxed shadow-3xs select-text">
                        {tc.testcase.input}
                      </div>
                    </div>
                  )}

                  {/* BLOCK 2: USER CONSOLE OUTPUT BUFFER */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
                      Your Output
                    </div>
                    <div className="w-full p-3 bg-bg-secondary border border-accent-crimson/20 font-mono text-[11px] text-accent-crimson rounded-lg whitespace-pre-wrap leading-relaxed shadow-3xs overflow-x-auto custom-scrollbar select-text">
                      {tc.stdout?.trim() === "" || !tc.stdout ? (
                        <span className="italic opacity-40 select-none font-mono text-text-secondary/60">
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
                    <div className="w-full p-3 bg-bg-secondary border border-border-subtle text-text-primary font-mono text-[11px] rounded-lg whitespace-pre-wrap leading-relaxed shadow-3xs overflow-x-auto custom-scrollbar select-text">
                      {tc?.expected ? (
                        <pre className="font-mono text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">
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
                      <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-crimson select-none">
                        <Terminal size={10} />
                        <span>Standard Error Trace (stderr)</span>
                      </div>
                      <div className="w-full p-3 bg-bg-secondary border border-accent-crimson/30 font-mono text-[11px] text-accent-crimson rounded-lg whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto custom-scrollbar select-text shadow-3xs">
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

/* --- 💎 HIGHT-DENSITY STACKED METRIC TILE --- */
interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  textStyles?: string;
  fontMono?: boolean;
  accentVariant?: "status" | "time" | "memory" | "language";
}

const MetricCard = memo(
  ({
    label,
    value,
    icon,
    textStyles = "text-text-primary",
    fontMono = false,
    accentVariant = "language",
  }: MetricCardProps) => {
    return (
      <div className="relative p-4 flex flex-col justify-between gap-2.5 transition-all duration-200 ease-out select-none group/card hover:bg-bg-secondary/40">
        {/* UPPER LABEL LINE */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary opacity-40">
            {label}
          </span>
          <div className="text-text-muted/50 group-hover/card:text-text-secondary transition-colors duration-150 shrink-0">
            {icon}
          </div>
        </div>

        {/* METRIC PERFORMANCE READOUT */}
        <div className="min-w-0">
          <span
            className={cn(
              "text-[13px] font-bold tracking-tight text-text-primary select-text block truncate leading-none",
              fontMono && "font-mono tracking-normal text-text-secondary",
              textStyles,
            )}
          >
            {value}
          </span>
        </div>

        {/* SIDEWAYS FOCUS EMBED GLOW TRACK */}
        <div
          className={cn(
            "absolute left-0 top-2 bottom-2 w-[2px] rounded-r-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-200",
            accentVariant === "status" && "bg-accent-gold",
            accentVariant === "time" && "bg-blue-500 dark:bg-blue-400",
            accentVariant === "memory" && "bg-purple-500 dark:bg-purple-400",
            accentVariant === "language" && "bg-text-secondary",
          )}
          aria-hidden="true"
        />
      </div>
    );
  },
);

MetricCard.displayName = "MetricCard";

export default ProblemSubmissionDetails;
