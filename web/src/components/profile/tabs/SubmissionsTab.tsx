import { memo } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Clock, Check, X } from "lucide-react";

const SUBMISSIONS_MOCK = [
  {
    id: "s1",
    problem: "Two Sum",
    status: "Accepted",
    lang: "typescript",
    runtime: "48ms",
    memory: "44.2 MB",
    timestamp: "2 hours ago",
  },
  {
    id: "s2",
    problem: "Reverse Integer",
    status: "Runtime Error",
    lang: "cpp",
    runtime: "—",
    memory: "—",
    timestamp: "1 day ago",
  },
  {
    id: "s3",
    problem: "LRU Cache",
    status: "Accepted",
    lang: "python",
    runtime: "112ms",
    memory: "68.5 MB",
    timestamp: "3 days ago",
  },
];

export const SubmissionsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-3 font-sans text-text-primary"
    >
      <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none px-1">
        Telemetry Compilation Stack
      </h3>

      <div className="flex flex-col gap-2.5">
        {SUBMISSIONS_MOCK.map((sub) => {
          const isAccepted = sub.status === "Accepted";

          return (
            <div
              key={sub.id}
              className="w-full rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/20 dark:bg-zinc-900/5 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors shadow-3xs"
            >
              {/* Left Identity Segment */}
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`h-6 w-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                    isAccepted
                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                      : "bg-rose-500/5 border-rose-500/20 text-rose-500"
                  }`}
                >
                  {isAccepted ? (
                    <Check size={12} className="stroke-[3]" />
                  ) : (
                    <X size={12} className="stroke-[3]" />
                  )}
                </div>

                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-xs font-semibold text-text-primary truncate">
                    {sub.problem}
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-text-secondary opacity-50">
                    <span
                      className={`font-semibold ${isAccepted ? "text-emerald-500" : "text-rose-500"}`}
                    >
                      {sub.status}
                    </span>
                    <span>•</span>
                    <span>{sub.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Right Performance Matrix Segment */}
              <div className="flex items-center gap-4 sm:justify-end font-mono text-[10px] text-text-secondary opacity-60 ml-9 sm:ml-0">
                <div className="flex items-center gap-1">
                  <Clock size={10} className="opacity-70" />
                  <span>{sub.runtime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Cpu size={10} className="opacity-70" />
                  <span>{sub.memory}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-zinc-900 border border-border-subtle/50 text-[9px] uppercase font-bold tracking-wider select-none text-text-primary opacity-80">
                  {sub.lang}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default memo(SubmissionsTab);
