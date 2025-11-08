import React, { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs } from "@/components/admin-panel/create-problem/Tabs";
import ProblemMetadata from "@/components/admin-panel/create-problem/ProblemMetadata";
import TestCasesSection from "@/components/admin-panel/create-problem/TestCasesSection";
import HintsAndConstraints from "@/components/admin-panel/create-problem/HintsAndConstraints";
import EditorialSection from "@/components/admin-panel/create-problem/EditorialSection";
import CodeSetupSection from "@/components/admin-panel/create-problem/CodeSetupSection";
import { toast } from "sonner";
import type { CreateProblemBody } from "@/types/types";
import { createProblemBodySchema } from "@/schemas/schemas";

const CreateProblemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Metadata");
  const [problem, setProblem] = useState<CreateProblemBody>({
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

  const handleSubmit = () => {
    try {
      createProblemBodySchema.parse(problem);
      console.log(problem);
      toast.success("Problem data validated & ready!");
    } catch (error) {
      toast.error("Validation failed! Please check all fields.");
      console.error(error);
    }
  };

  const tabComponents: Record<string, JSX.Element> = {
    Metadata: <ProblemMetadata problem={problem} setProblem={setProblem} />,
    Testcases: <TestCasesSection problem={problem} setProblem={setProblem} />,
    Hints: <HintsAndConstraints problem={problem} setProblem={setProblem} />,
    Editorial: <EditorialSection problem={problem} setProblem={setProblem} />,
    "Code Setup": (
      <CodeSetupSection problem={problem} setProblem={setProblem} />
    ),
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <Tabs
        tabs={Object.keys(tabComponents)}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-sm p-4 md:p-6 transition-all">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tabComponents[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          className="bg-neutral-800 dark:bg-neutral-200 text-neutral-50 dark:text-neutral-900 px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
        >
          Create Problem
        </motion.button>
      </div>
    </div>
  );
};

export default CreateProblemPage;
