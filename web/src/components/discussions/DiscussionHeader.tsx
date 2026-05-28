import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Plus } from "lucide-react";
import { SortDropdown } from "./SortDropdown";
import { FilterDropdown } from "./FilterDropdown";
import { Button } from "../ui/button";

export const DiscussionHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border-subtle/30 dark:border-zinc-900/40 pb-5 mb-5 select-none"
    >
      {/* --- LEFT SECTION: METADATA IDENTITY ANCHOR --- */}
      <div className="flex items-center gap-2">
        <MessageSquare
          size={13}
          className="text-text-secondary opacity-50 stroke-[2.2]"
        />
        <h1 className="text-xl font-bold tracking-tight text-text-primary">
          Discussions
        </h1>
      </div>

      {/* --- RIGHT SECTION: INTERACTIVE FILTER CONTROLS FIELD --- */}
      <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-2.5">
        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
          <div className="flex-1 sm:flex-initial">
            <SortDropdown />
          </div>
          <div className="flex-1 sm:flex-initial">
            <FilterDropdown />
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/discussions/create")}
          className="h-8 px-3 rounded-lg border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/40 text-text-primary hover:border-border-intense dark:hover:border-zinc-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer text-xs font-mono font-medium shadow-3xs"
        >
          <Plus size={11} className="stroke-[2.5]" />
          <span>New Thread</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default memo(DiscussionHeader);
