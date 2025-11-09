import type { IProblem } from "@/types/types";
import { motion } from "framer-motion";
import { FileText, BookOpen, FileCode, ListChecks } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Description", icon: FileText },
  { label: "Editorial", icon: BookOpen },
  { label: "Solution", icon: FileCode },
  { label: "Submissions", icon: ListChecks },
];

const LeftSidebar = ({
  isProblemDetailsLoading,
  problemDetails,
}: {
  problemDetails: IProblem | undefined;
  isProblemDetailsLoading: boolean;
}) => (
  <motion.div
    className="flex  px-2 items-center justify-between gap-2  border-r border-neutral-500/50  overflow-x-scroll"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {!isProblemDetailsLoading &&
      problemDetails !== null &&
      tabs.map((t) => (
        <NavLink
          to={`/problems/${problemDetails?.slug}/${t.label.toLowerCase()}`}
          key={t.label}
          className={(isActive) =>
            ` px-4 py-2 mb-3 rounded-lg flex items-center justify-center transition-colors  text-sm gap-2 ${
              isActive
                ? "  text-orange-500 border"
                : " dark:hover:text-neutral-400 border hover:text-neutral-500"
            }`
          }
        >
          <t.icon className="w-4 h-4" />
          {t.label}
        </NavLink>
      ))}
    {isProblemDetailsLoading && (
      <div className="w-full p-2 flex  items-center justify-center gap-4">
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

export default LeftSidebar;
