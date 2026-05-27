import PageLoader from "@/components/loaders/PageLoader";
import { ProblemsList } from "@/components/problems/ProblemsList";
import { lazy, Suspense } from "react";
import { Terminal } from "lucide-react";

const ProblemSearchModal = lazy(
  () => import("./../../components/problems/ProblemSearchModal"),
);

export const ProblemsPage = () => {
  return (
    // Core fallback suspension boundary ensures perfect viewport mounting stability
    <Suspense fallback={<PageLoader />}>
      <div className="w-full text-text-primary dark:text-text-primary antialiased select-none pb-12 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* --- DASHBOARD PORTAL HEADER --- */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-border-subtle/30 dark:border-zinc-900/40 pb-6">
            <div className="space-y-1.5">
              {/* Context Accent Label */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-500/10 dark:border-amber-400/10 bg-amber-500/[0.02] text-[10px] font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                <Terminal size={10} className="opacity-80" />
                <span>Code Index Track v4.0</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight font-sans">
                Problem{" "}
                <span className="font-mono bg-gradient-to-r from-neutral-900 via-amber-500 to-neutral-900 dark:from-zinc-100 dark:via-amber-400 dark:to-zinc-100 bg-clip-text text-transparent">
                  Repository
                </span>
              </h1>
              <p className="text-xs text-text-secondary dark:text-text-secondary opacity-70 max-w-md leading-relaxed">
                Refine your programmatic problem solving logic by indexing
                across our unified challenges pool.
              </p>
            </div>

            {/* Interactive Dynamic Modal Search Filter Gateway */}
            <div className="flex items-center justify-start sm:justify-end shrink-0">
              <ProblemSearchModal />
            </div>
          </div>

          {/* --- DATAGRID STREAM REPOSITORY CANVAS --- */}
          <div className="w-full relative z-10">
            <ProblemsList />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ProblemsPage;
