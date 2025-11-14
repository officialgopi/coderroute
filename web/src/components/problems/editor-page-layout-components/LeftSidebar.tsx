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
    className="flex  px-2 items-center   gap-2  overflow-x-scroll  border-b "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {!isProblemDetailsLoading &&
      problemDetails !== null &&
      tabs.map((t) => (
        <NavLink
          to={`/problems/${problemDetails?.slug}/${t.label.toLowerCase()}`}
          key={t.label}
          className={({ isActive }) =>
            ` px-4 py-2 mb-3 rounded-lg flex items-center justify-center transition-colors  text-sm gap-2  hover:bg-neutral-500/10 ${
              isActive
                ? "  dark:text-neutral-100 font-semibold text-neutral-950  border  "
                : "dark:text-neutral-400  text-neutral-900  border"
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
