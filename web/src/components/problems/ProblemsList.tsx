import React from "react";
import { ProblemItem } from "./ProblemItem";
import type { IProblem } from "@/store/problem.store";
import { motion } from "framer-motion";

export const ProblemsList: React.FC<{ problems: IProblem[] }> = ({
  problems,
}) => {
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
    </motion.div>
  );
};
