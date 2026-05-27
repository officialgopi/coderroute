import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import {
  History,
  Calendar,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useProblemStore } from "@/store/problem.store";
import { useSubmissionStore, type ISubmission } from "@/store/submission.store";

export const ProblemSubmission = () => {
  const { problemInCodeEditor } = useProblemStore();
  const { getSubmissionsByProblemId, isSubmissionLoading, allSubmissions } =
    useSubmissionStore();

  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  useEffect(() => {
    async function fetchSubmissions(problemId: string) {
      const response = await getSubmissionsByProblemId(problemId);
      setSubmissions(response || []);
    }

    if (problemInCodeEditor?.id) {
      fetchSubmissions(problemInCodeEditor.id);
    }
  }, [problemInCodeEditor, getSubmissionsByProblemId, allSubmissions]);

  // Premium status configuration containing specific styling parameters and iconography
  const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACCEPTED":
        return {
          label: "Accepted",
          icon: CheckCircle2,
          colorClass: "text-emerald-500 dark:text-emerald-400",
          bgClass: "bg-emerald-500/10 dark:bg-emerald-500/5",
          borderClass: "border-emerald-500/20 dark:border-emerald-500/10",
          timelineDot:
            "bg-emerald-500 ring-emerald-500/20 dark:ring-emerald-500/10",
        };
      case "WRONG_ANSWER":
        return {
          label: "Wrong Answer",
          icon: XCircle,
          colorClass: "text-rose-500 dark:text-rose-400",
          bgClass: "bg-rose-500/10 dark:bg-rose-500/5",
          borderClass: "border-rose-500/20 dark:border-rose-500/10",
          timelineDot: "bg-rose-500 ring-rose-500/20 dark:ring-rose-500/10",
        };
      default:
        return {
          label: status?.replace(/_/g, " ") || "Pending",
          icon: AlertCircle,
          colorClass: "text-amber-500 dark:text-amber-400",
          bgClass: "bg-amber-500/10 dark:bg-amber-500/5",
          borderClass: "border-amber-500/20 dark:border-amber-500/10",
          timelineDot: "bg-amber-500 ring-amber-500/20 dark:ring-amber-500/10",
        };
    }
  };

  return (
    <div className="space-y-5 max-w-4xl font-sans text-xs leading-relaxed text-text-primary antialiased">
      {/* --- LOW-CONTRAST HEADER SECTION --- */}
      <div className="pb-2.5 flex items-center gap-2 border-b border-border-subtle/30 dark:border-zinc-900/40 select-none">
        <History
          size={12}
          className="text-text-secondary opacity-50 stroke-[2.2]"
        />
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-60">
          Submission History Stream
        </span>
      </div>

      {/* --- TIMELINE CONTAINER --- */}
      <div className="relative pl-4 pt-1">
        {/* The Translucent Timeline Vertical Axis Track */}
        {submissions.length > 1 && (
          <div className="absolute left-1.5 top-3 bottom-3 w-[1px] bg-linear-to-b from-border-subtle/60 via-border-subtle/30 to-transparent dark:from-zinc-900 dark:via-zinc-900/40" />
        )}

        {isSubmissionLoading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={`sub-skeleton-${i}`}
                className="h-14 w-full rounded-xl bg-surface-panel/40 dark:bg-zinc-900/40 border border-border-subtle/30 dark:border-zinc-900"
              />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center select-none opacity-40">
            <p className="italic font-mono text-text-secondary">
              // No execution entries allocated for this problem scope yet.
            </p>
          </div>
        ) : (
          <div
            className="space-y-3.5"
            role="log"
            aria-label="Historical execution listings stream"
          >
            {submissions.map((submission: ISubmission) => {
              const config = getStatusConfig(submission.status);
              const StatusIcon = config.icon;

              return (
                <div
                  key={`submission-node-${submission.id}`}
                  className="relative group"
                >
                  {/* Timeline Node Point Ring */}
                  <div
                    className={`absolute -left-[14px] top-4.5 h-2 w-2 rounded-full ring-4 transition-all duration-300 group-hover:scale-110 ${config.timelineDot}`}
                  />

                  {/* High-Fidelity Link Row Component */}
                  <Link to={`${submission.id}`} className="block outline-none">
                    <div className="px-4 py-3 rounded-xl border border-border-subtle/40 dark:border-zinc-900/50 bg-surface-panel/20 dark:bg-zinc-950/20 hover:bg-surface-card dark:hover:bg-zinc-900/40 hover:border-border-intense dark:hover:border-zinc-800 flex items-center justify-between gap-4 transition-all duration-150 shadow-xs hover:shadow-sm">
                      {/* Left-Hand Metadata Block */}
                      <div className="min-w-0 flex items-start gap-3">
                        <StatusIcon
                          size={14}
                          className={`shrink-0 mt-0.5 stroke-[2.2] ${config.colorClass}`}
                        />

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4
                              className={`font-mono text-[11px] font-bold tracking-tight ${config.colorClass}`}
                            >
                              {config.label}
                            </h4>
                            <span className="text-[10px] text-text-secondary opacity-40 select-none">
                              •
                            </span>
                            <span className="font-mono uppercase tracking-wider text-[9px] font-bold text-text-secondary opacity-80 bg-surface-panel dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-border-subtle/40 dark:border-zinc-800">
                              {submission.language}
                            </span>
                          </div>

                          {/* Fine Timestamp Information */}
                          <div className="flex items-center gap-1 text-[10px] text-text-secondary opacity-50 font-mono">
                            <Calendar size={10} className="opacity-70" />
                            <span>
                              {new Date(submission.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right-Hand Navigation Access Block */}
                      <div className="flex items-center gap-2 shrink-0 select-none">
                        <span className="text-[10px] font-mono font-medium text-text-secondary opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-150">
                          Details
                        </span>
                        <ArrowRight
                          size={11}
                          className="text-text-secondary opacity-40 group-hover:opacity-100 group-hover:text-amber-500 transition-all duration-150 stroke-[2.2]"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProblemSubmission);
