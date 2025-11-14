import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Tabs } from "@/components/admin-panel/create-problem/Tabs";
import type { CreateProblemBody } from "@/types/types";
import { useProblemStore } from "@/store/problem.store";

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

const CreateProblemPage: React.FC = () => {
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
      constraints: [""],
      hints: [""],
      editorial: "",
      testcases: [{ input: "", output: "", explaination: "" }],
      details: [
        {
          language: "JAVASCRIPT",
          codeSnippet: "",
          backgroundCode: "function solve() {\n  /* <WRITE_CODE_HERE> */\n}",
          whereToWriteCode: "<WRITE_CODE_HERE>",
          referenceSolution: "",
        },
        {
          language: "PYTHON",
          codeSnippet: "",
          backgroundCode: "def solve():\n    # <WRITE_CODE_HERE>",
          whereToWriteCode: "<WRITE_CODE_HERE>",
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
      console.log("Creating problem:", problem);
      await createProblem(problem);
      localStorage.removeItem(STORAGE_KEY);
      resetForm();
      setActiveTab(0);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setProblem({
      title: "",
      description: "",
      difficulty: "EASY",
      tags: [],
      constraints: [""],
      hints: [""],
      editorial: "",
      testcases: [{ input: "", output: "", explaination: "" }],
      details: [
        {
          language: "JAVASCRIPT",
          codeSnippet: "",
          backgroundCode: "function solve() {\n  /* <WRITE_CODE_HERE> */\n}",
          whereToWriteCode: "<WRITE_CODE_HERE>",
          referenceSolution: "",
        },
        {
          language: "PYTHON",
          codeSnippet: "",
          backgroundCode: "def solve():\n    # <WRITE_CODE_HERE>",
          whereToWriteCode: "<WRITE_CODE_HERE>",
          referenceSolution: "",
        },
      ],
    });
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
    <div className="flex flex-col gap-4 p-4 md:p-8">
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
        {activeTab > 0 && (
          <button
            onClick={() => setActiveTab((prev) => prev - 1)}
            className="btn-sub px-4 py-1.5 text-sm"
          >
            Back
          </button>
        )}

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
