import { motion } from "framer-motion";
import { FileText, BookOpen, FileCode, ListChecks } from "lucide-react";

const tabs = [
  { label: "Description", icon: FileText },
  { label: "Editorial", icon: BookOpen },
  { label: "Solution", icon: FileCode },
  { label: "Submissions", icon: ListChecks },
];

export const LeftSidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <motion.div
    className="flex  px-2 items-center justify-between gap-2  border-r border-neutral-500/50  overflow-x-scroll"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {tabs.map((t) => (
      <button
        key={t.label}
        onClick={() => setActiveTab(t.label)}
        className={` px-4 py-2 mb-3 rounded-lg flex items-center justify-center transition-colors  text-sm gap-2 ${
          activeTab === t.label
            ? "  text-orange-500 border"
            : " dark:hover:text-neutral-400 border hover:text-neutral-500"
        }`}
      >
        <t.icon className="w-4 h-4" />
        {t.label}
      </button>
    ))}
  </motion.div>
);
