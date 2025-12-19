import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Tabs } from "@/components/admin-panel/create-problem/Tabs";
import type { CreateProblemBody } from "@/types/types";
import { useProblemStore } from "@/store/problem.store";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProblemMetadata = lazy(
  () => import("@/components/admin-panel/create-problem/ProblemMetadata")
);
const TestCasesSection = lazy(
  () => import("@/components/admin-panel/create-problem/TestcasesSection")
);
const HintsAndConstraints = lazy(
  () => import("@/components/admin-panel/create-problem/HintsAndConstraints")
);
const EditorialSection = lazy(
  () => import("@/components/admin-panel/create-problem/EditorialSection")
);
const CodeSetupSection = lazy(
  () => import("@/components/admin-panel/create-problem/CodeSetupSection")
);
const ReviewSection = lazy(
  () => import("@/components/admin-panel/create-problem/ReviewSection")
);

const STORAGE_KEY = "coderroute_create_problem";

const CreateProblemWithAIModal = lazy(
  () =>
    import("@/components/admin-panel/create-problem/CreateProblemWithAIModal")
);
const DEFAULT_PROBLEM: CreateProblemBody = {
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
      std: {
        stdin: [],
        stdout: "",
      },
      explanation: "",
    },
  ],
  details: [
    {
      language: "JAVASCRIPT",
      codeSnippet: "",
      backgroundCode:
        "function main() {\n  /* Write your code here */ \n}\nmain();\n",
      referenceSolution: "",
    },
    {
      language: "PYTHON",
      codeSnippet: "",
      backgroundCode: "def main():\n    # Write your code here\n\nmain()",
      referenceSolution: "",
    },
  ],
};

const CreateProblemPage: React.FC = () => {
  const [createProblemWithAIModalOpen, setCreateProblemWithAIModalOpen] =
    useState<boolean>(false);
  const tabs = [
    "Metadata",
    "Testcases",
    "Hints",
    "Editorial",
    "Code Setup",
    "Review",
  ];
  const [activeTab, setActiveTab] = useState(0);

  const { createProblem } = useProblemStore();
  const [problem, setProblem] = useState<CreateProblemBody>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
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
          std: {
            stdin: [],
            stdout: "",
          },
          explanation: "",
        },
      ],
      details: [
        {
          language: "JAVASCRIPT",
          codeSnippet: "",
          backgroundCode:
            "function main() {\n  /* Write your code here */\n }\n main();",
          referenceSolution: "",
        },
        {
          language: "PYTHON",
          codeSnippet: "",
          backgroundCode: "def main():\n    # Write your code here\n\nmain()",
          referenceSolution: "",
        },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(problem));
  }, [problem]);

  const handleSaveSection = () => {
    toast.success(`${tabs[activeTab]} saved`);
    if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  };

  const handleCreateProblem = async () => {
    try {
      await createProblem(problem);
      localStorage.removeItem(STORAGE_KEY);
      resetForm();
      setActiveTab(0);
    } catch (err) {}
  };

  const resetForm = () => {
    setProblem({
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
          std: {
            stdin: [],
            stdout: "",
          },
          explanation: "",
        },
      ],
      details: [
        {
          language: "JAVASCRIPT",
          codeSnippet: "",
          backgroundCode: "function solve() {\n  /* <WRITE_CODE_HERE> */\n}",
          referenceSolution: "",
        },
        {
          language: "PYTHON",
          codeSnippet: "",
          backgroundCode: "def solve():\n    # <WRITE_CODE_HERE>",
          referenceSolution: "",
        },
      ],
    });
  };
  const handleResetDraft = () => {
    const confirmed = window.confirm(
      "This will clear your saved draft and reset the form. Continue?"
    );

    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    setProblem(DEFAULT_PROBLEM);
    setActiveTab(0);
    toast.success("Draft reset successfully");
  };

  const renderActiveTab = () => {
    const props = { problem, setProblem };
    switch (tabs[activeTab]) {
      case "Metadata":
        return <ProblemMetadata {...props} />;
      case "Testcases":
        return <TestCasesSection {...props} />;
      case "Hints":
        return <HintsAndConstraints {...props} />;
      case "Editorial":
        return <EditorialSection {...props} />;
      case "Code Setup":
        return <CodeSetupSection {...props} />;
      case "Review":
        return <ReviewSection problem={problem} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 ">
      <Suspense fallback={<>Loading...</>}>
        <CreateProblemWithAIModal
          open={createProblemWithAIModalOpen}
          onClose={() => setCreateProblemWithAIModalOpen(false)}
          setProblem={setProblem}
        />
      </Suspense>
      <div className="w-full flex justify-end">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className="flex w-60  cursor-pointer items-center gap-2 px-4 py-2  border border-neutral-500/50 rounded-xl text-sm font-medium hover:bg-neutral-400/50 transition-colors "
          onClick={() => setCreateProblemWithAIModalOpen(true)}
        >
          <Sparkles className="h-4 w-4" />
          Create Problem With AI
        </motion.button>
      </div>
      <Tabs
        tabs={tabs}
        activeTab={tabs[activeTab]}
        onChange={(tab) => setActiveTab(tabs.indexOf(tab))}
      />

      <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-sm p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Suspense
              fallback={
                <p className="text-sm text-neutral-500 text-center py-6">
                  Loading section...
                </p>
              }
            >
              {renderActiveTab()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          {activeTab > 0 && (
            <button
              onClick={() => setActiveTab((prev) => prev - 1)}
              className="btn-sub px-4 py-1.5 text-sm"
            >
              Back
            </button>
          )}

          <Button
            variant={"destructive"}
            onClick={handleResetDraft}
            className=" px-4 py-1.5 text-sm"
          >
            Reset Draft
          </Button>
        </div>

        {activeTab < tabs.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSaveSection}
            className="btn-main text-sm px-6 py-1.5"
          >
            Save & Next
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreateProblem}
            className="btn-main text-sm px-6 py-1.5"
          >
            Create Problem
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CreateProblemPage;
