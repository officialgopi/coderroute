// src/components/shared/SubmissionsTab.tsx
import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Clock,
  Check,
  X,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 💎 BIND CENTRALIZED STATE HOOK MATRIX WITH LIVE RETRIEVAL PARAMS
import { useUserStore } from "@/store/user.store";

export const SubmissionsTab = () => {
  // Bind core reactive lists, execution loaders, and context fetch triggers from store
  const { submissions, isSubmissionsLoading, getSubmissions } = useUserStore();

  // Local filter telemetry states supporting custom network criteria
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Synchronize state data engine map loops on filter configuration mutations
  useEffect(() => {
    const fetchFilteredSubmissions = async () => {
      const queryPayload: any = { page: 1, limit: 20 };

      if (selectedLanguage !== "ALL") queryPayload.language = selectedLanguage;
      if (selectedStatus !== "ALL") queryPayload.status = selectedStatus;

      await getSubmissions(queryPayload);
    };

    fetchFilteredSubmissions();
  }, [selectedLanguage, selectedStatus, getSubmissions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full space-y-4 font-sans text-text-primary antialiased"
    >
      {/* --- 💎 PREMIUM FILTER CONTROLS MATRICES BAR --- */}
      <div className="w-full p-3.5 rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-bg-secondary/20 flex flex-wrap items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-text-muted uppercase">
          <SlidersHorizontal size={11} className="text-accent-gold" />
          <span>Filter Compilation Matrix</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Status Select Node Wrapper */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-7 px-2.5 bg-bg-primary border border-border-subtle rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary focus:outline-none focus:border-text-primary/30 transition-all cursor-pointer shadow-3xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="Accepted">Accepted Only</option>
            <option value="Wrong Answer">Wrong Answer</option>
            <option value="Runtime Error">Runtime Error</option>
            <option value="Time Limit Exceeded">TLE Error</option>
          </select>

          {/* Language Selector Node Wrapper */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="h-7 px-2.5 bg-bg-primary border border-border-subtle rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary focus:outline-none focus:border-text-primary/30 transition-all cursor-pointer shadow-3xs"
          >
            <option value="ALL">All Languages</option>
            <option value="PYTHON">Python</option>
            <option value="TYPESCRIPT">TypeScript</option>
            <option value="JAVASCRIPT">JavaScript</option>
            <option value="CPP">C++</option>
            <option value="JAVA">Java</option>
          </select>
        </div>
      </div>

      {/* --- REPOSITORY COMPILATION FEED BLOCK --- */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1 select-none">
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40">
            Telemetry Compilation Stack
          </h3>
          {isSubmissionsLoading && (
            <div className="flex items-center gap-1 font-mono text-[9px] text-accent-gold animate-pulse">
              <Loader2 size={10} className="animate-spin" />
              <span>Querying Node API...</span>
            </div>
          )}
        </div>

        {submissions.length === 0 && !isSubmissionsLoading ? (
          <div className="w-full p-12 text-center border border-dashed border-border-subtle rounded-2xl font-mono text-[10px] text-text-muted/50 flex flex-col items-center justify-center gap-2 select-none bg-bg-secondary/5">
            <AlertCircle size={14} className="opacity-40 text-accent-gold" />
            <span>
              // No token execution submissions discoverable mapping current
              filter flags.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {submissions.map((sub) => {
              const isAccepted = sub.status === "Accepted";

              return (
                <div
                  key={sub.id}
                  className="w-full rounded-xl border border-border-subtle/40 dark:border-zinc-900 bg-surface-card/20 dark:bg-zinc-900/5 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors shadow-3xs group"
                >
                  {/* Left Identity Segment */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all select-none",
                        isAccepted
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                          : "bg-rose-500/5 border-rose-500/20 text-rose-500",
                      )}
                    >
                      {isAccepted ? (
                        <Check size={11} strokeWidth={3} />
                      ) : (
                        <X size={11} strokeWidth={3} />
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-semibold text-text-primary truncate max-w-sm group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors select-text">
                        {sub.problemTitle || "Algorithmic Task Node"}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-text-secondary opacity-50 select-none">
                        <span
                          className={cn(
                            "font-bold tracking-wide",
                            isAccepted ? "text-emerald-400" : "text-rose-400",
                          )}
                        >
                          {sub.status}
                        </span>
                        <span>•</span>
                        <span>
                          {sub.submittedAt
                            ? new Date(sub.submittedAt).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "Compiled Dynamic Segment"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Performance Matrix Segment */}
                  <div className="flex items-center gap-4 sm:justify-end font-mono text-[10px] text-text-secondary opacity-60 ml-9 sm:ml-0 select-none">
                    <div
                      className="flex items-center gap-1"
                      title="Sandbox execution runtime speed"
                    >
                      <Clock size={11} className="opacity-70 text-text-muted" />
                      <span>{sub.runtime > 0 ? `${sub.runtime}ms` : "—"}</span>
                    </div>

                    <div
                      className="flex items-center gap-1"
                      title="Memory page allocation threshold footprint"
                    >
                      <Cpu size={11} className="opacity-70 text-text-muted" />
                      <span>
                        {sub.memory > 0 ? `${sub.memory.toFixed(1)} MB` : "—"}
                      </span>
                    </div>

                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-zinc-900 border border-border-subtle/50 text-[9px] uppercase font-black tracking-wider text-text-primary opacity-80 shadow-3xs">
                      {sub.language?.toLowerCase() || "c"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(SubmissionsTab);
