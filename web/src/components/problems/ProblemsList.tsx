import { useEffect } from "react";
import { ProblemItem } from "./ProblemItem";
import { useProblemStore } from "@/store/problem.store";
import { motion } from "framer-motion";

export const ProblemsList = () => {
  const { isProblemsLoading, problems, getProblems } = useProblemStore();
  useEffect(() => {
    getProblems();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-lg overflow-hidden w-full border border-neutral-500/50 divide-y divide-neutral-500/50"
    >
      {problems.map((p, i) => (
        <ProblemItem key={p.id} problem={p} index={i} />
      ))}
      {isProblemsLoading && (
        <div className="w-full p-2 flex flex-col items-center justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full p-4 rounded-sm flex items-center justify-center bg-neutral-500/20 animate-pulse"
            ></div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
