import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { IProblem } from "@/store/problem.store";
import { Link } from "react-router-dom";

export type { IProblem };

interface ProblemItemProps {
  problem: IProblem;
  index: number;
}

export const ProblemItem: React.FC<ProblemItemProps> = ({ problem, index }) => {
  const getDiffColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "text-emerald-400";
      case "MEDIUM":
        return "text-amber-400";
      case "HARD":
        return "text-rose-400";
      default:
        return "text-neutral-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between px-4 py-3 text-sm  border-neutral-500/50  transition-colors"
    >
      {/* Left section */}
      <div className="flex items-center gap-3 hover:text-neutral-500 dark:hover:text-neutral-200">
        <Check className="w-4 h-4  opacity-70 text-emerald-600" />
        <span className="text-neutral-400">{index + 1}.</span>
        <Link to={`/problems/${problem.id}`} className="  transition-colors">
          {problem.title}
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <span className={`${getDiffColor(problem.difficulty)} font-medium`}>
          {problem.difficulty.charAt(0) +
            problem.difficulty.slice(1).toLowerCase()}
        </span>
      </div>
    </motion.div>
  );
};
