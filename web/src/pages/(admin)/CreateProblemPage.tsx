import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
  memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, Save } from "lucide-react";
import { useProblemStore } from "@/store/problem.store";
import { Tabs } from "@/components/admin-panel/create-problem/Tabs";
import { Button } from "@/components/ui/button";
import type { CreateProblemBody } from "@/types/types";

// Dynamic Code-Splitting Asset Map Modules
const ProblemMetadata = lazy(
  () => import("@/components/admin-panel/create-problem/ProblemMetadata"),
);
const TestCasesSection = lazy(
  () => import("@/components/admin-panel/create-problem/TestcasesSection"),
);
const HintsAndConstraints = lazy(
  () => import("@/components/admin-panel/create-problem/HintsAndConstraints"),
);
const EditorialSection = lazy(
  () => import("@/components/admin-panel/create-problem/EditorialSection"),
);
const CodeSetupSection = lazy(
  () => import("@/components/admin-panel/create-problem/CodeSetupSection"),
);
const ReviewSection = lazy(
  () => import("@/components/admin-panel/create-problem/ReviewSection"),
);
const CreateProblemWithAIModal = lazy(
  () =>
    import("@/components/admin-panel/create-problem/CreateProblemWithAIModal"),
);

const STORAGE_KEY = "coderroute_create_problem_draft";

// Immutable Master Blueprint State Object Schema Contract
const FIXED_INITIAL_PROBLEM_STATE: CreateProblemBody = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: [],
  constraints: [],
  hints: [],
  editorial: "",
  args: [],
  output_format: "PLAIN",
  testcases: [
    {
      std: { stdin: [], stdout: "" },
      explanation: "",
    },
  ],
  details: [
    {
      language: "JAVASCRIPT",
      codeSnippet: "",
      backgroundCode: "function solve() {\n  /* <WRITE_CODE_HERE> */\n}\n",
      referenceSolution: "",
    },
    {
      language: "PYTHON",
      codeSnippet: "",
      backgroundCode: "def solve():\n    # <WRITE_CODE_HERE>\n",
      referenceSolution: "",
    },
  ],
};

/* --- HIGH-FIDELITY SUB-SECTION SHIMMER SUSPENSE WRAPPER --- */
const TabSectionFallback = memo(() => (
  <div
    className="w-full space-y-4 py-8 animate-pulse select-none pointer-events-none"
    aria-hidden="true"
  >
    <div className="space-y-2">
      <div className="h-4 w-1/4 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-9 w-full rounded-lg border border-border-subtle/50 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-950/20" />
    </div>
    <div className="space-y-2 pt-2">
      <div className="h-4 w-1/3 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-32 w-full rounded-xl border border-border-subtle/50 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-950/20" />
    </div>
  </div>
));
TabSectionFallback.displayName = "TabSectionFallback";

export const CreateProblemPage: React.FC = () => {
  const { createProblem } = useProblemStore();
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = useMemo(
    () => [
      "Metadata",
      "Testcases",
      "Hints",
      "Editorial",
      "Code Setup",
      "Review",
    ],
    [],
  );

  // Safe Lazy Initializer shields processor cycles from recurring IO disk parse bottlenecks
  const [problem, setProblem] = useState<CreateProblemBody>(() => {
    try {
      const savedDraftString = localStorage.getItem(STORAGE_KEY);
      if (savedDraftString) {
        return JSON.parse(savedDraftString);
      }
    } catch {
      console.error(
        "Failed to rehydrate local draft validation matrices safely.",
      );
    }
    return structuredClone(FIXED_INITIAL_PROBLEM_STATE);
  });

  // Keep disk state synchronized in the background
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(problem));
  }, [problem]);

  const handleSaveSection = useCallback(() => {
    toast.success(`${tabs[activeTab]} progress saved in local sandbox state.`);
    if (activeTab < tabs.length - 1) {
      setActiveTab((prev) => prev + 1);
    }
  }, [activeTab, tabs]);

  const handleCreateProblem = useCallback(async () => {
    try {
      await createProblem(problem);
      localStorage.removeItem(STORAGE_KEY);
      setProblem(structuredClone(FIXED_INITIAL_PROBLEM_STATE));
      setActiveTab(0);
      toast.success("Problem compiled and appended to index successfully.");
    } catch {
      toast.error(
        "Transmission rejected. Check structural syntax layout variables.",
      );
    }
  }, [problem, createProblem]);

  const handleResetDraft = useCallback(() => {
    const confirmed = window.confirm(
      "This process will clear your persistent draft storage. Continue?",
    );
    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    setProblem(structuredClone(FIXED_INITIAL_PROBLEM_STATE));
    setActiveTab(0);
    toast.success("Form structural configurations reverted to base standard.");
  }, []);

  const renderActiveTabContent = () => {
    const contextProps = { problem, setProblem };
    switch (tabs[activeTab]) {
      case "Metadata":
        return <ProblemMetadata {...contextProps} />;
      case "Testcases":
        return <TestCasesSection {...contextProps} />;
      case "Hints":
        return <HintsAndConstraints {...contextProps} />;
      case "Editorial":
        return <EditorialSection {...contextProps} />;
      case "Code Setup":
        return <CodeSetupSection {...contextProps} />;
      case "Review":
        return <ReviewSection problem={problem} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 p-4 md:p-6 text-text-primary antialiased select-none font-sans">
      {/* --- INVISIBLE ROUTE MODALS --- */}
      <Suspense fallback={null}>
        <CreateProblemWithAIModal
          open={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          setProblem={setProblem}
        />
      </Suspense>

      {/* --- UPPER ACTION BAR HEADER ROW --- */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle/20 dark:border-zinc-900/40 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Challenge Design Lab
          </h1>
          <p className="text-xs text-text-secondary opacity-60 font-medium mt-0.5">
            Define metadata constraints, sandbox test vectors, and language
            solution templates.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => setAiModalOpen(true)}
          className="w-full sm:w-auto h-8 px-4 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 dark:hover:bg-amber-500/15 text-amber-600 dark:text-amber-400 font-sans text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer outline-none focus:border-amber-500"
        >
          <Sparkles size={12} className="stroke-[2.5]" />
          <span>Generate Boilerplate with AI</span>
        </motion.button>
      </div>

      {/* --- WIZARD BREADCRUMB TAB CONTROL MODULE --- */}
      <div className="w-full">
        <Tabs
          tabs={tabs}
          activeTab={tabs[activeTab]}
          onChange={(tab) => setActiveTab(tabs.indexOf(tab))}
        />
      </div>

      {/* --- ACTIVE CENTRAL WIZARD DISPLAY CONTAINER --- */}
      <div className="w-full rounded-2xl border border-border-subtle/40 dark:border-zinc-900/60 bg-surface-card/30 dark:bg-zinc-950/10 shadow-3xs p-5 md:p-6 min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`wizard-pane-${activeTab}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full h-full focus:outline-none"
          >
            <Suspense fallback={<TabSectionFallback />}>
              {renderActiveTabContent()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- LOWER FOOTER FLOW STEERING CONTROL RAIL --- */}
      <div className="w-full flex items-center justify-between pt-2 border-t border-border-subtle/20 dark:border-zinc-900/40 font-sans">
        {/* Step Backward/Destructive Controls Group */}
        <div className="flex items-center gap-2">
          {activeTab > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab((prev) => prev - 1)}
              className="h-8 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1.5 shadow-3xs border-border-subtle/60 dark:border-zinc-800 bg-surface-card hover:bg-neutral-50 dark:hover:bg-zinc-900"
            >
              <ArrowLeft size={11} className="stroke-[2.5]" />
              <span>Back</span>
            </Button>
          )}

          <Button
            variant="destructive"
            size="sm"
            onClick={handleResetDraft}
            className="h-8 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1.5 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:border-rose-500/30 transition-all shadow-3xs shadow-rose-500/2"
          >
            <RotateCcw size={11} className="stroke-[2.5]" />
            <span>Reset Draft</span>
          </Button>
        </div>

        {/* Step Forward/Save Controls Group */}
        {activeTab < tabs.length - 1 ? (
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              size="sm"
              onClick={handleSaveSection}
              className="h-8 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 border border-border-subtle dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-2xs"
            >
              <span>Save & Next</span>
              <ArrowRight size={11} className="stroke-[2.5]" />
            </Button>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              size="sm"
              onClick={handleCreateProblem}
              className="h-8 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 border border-transparent bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 transition-all shadow-sm shadow-emerald-600/10"
            >
              <Save size={11} className="stroke-[2.5]" />
              <span>Create Problem</span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default memo(CreateProblemPage);
