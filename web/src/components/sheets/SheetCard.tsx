import type { ISheet } from "@/store/sheet.store";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const icons = [Play];

const SheetsCard = ({ sheet }: { sheet: ISheet }) => {
  const Icon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="
    w-[260px] h-[300px] rounded-xl
    border border-neutral-300 dark:border-neutral-700
    hover:border-neutral-500 dark:hover:border-cyan-400
    transition-colors
  "
    >
      <div
        className="
      w-full h-full rounded-xl
      bg-white/95 dark:bg-neutral-900/80
      shadow-sm backdrop-blur-sm
      flex flex-col overflow-hidden
    "
      >
        {/* Header */}
        <div
          className="
        h-[120px] border-b border-neutral-200 dark:border-neutral-800
        bg-neutral-100/80 dark:bg-neutral-800/40
        flex items-center justify-center
      "
        >
          <Icon className="w-[120px] h-[120px] text-neutral-400 dark:text-neutral-600 opacity-40 rotate-[15deg]" />
        </div>

        {/* Text */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className=" text-xl font-semibold text-neutral-900 dark:text-neutral-200 line-clamp-1">
              {sheet.name}
            </h3>

            {sheet.description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                {sheet.description.slice(0, 100)}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-[11px] text-neutral-500 dark:text-neutral-400 mt-3">
            <span>{new Date(sheet.createdAt).toLocaleDateString()}</span>
            <Link to={`/sheets/${sheet.id}`}>
              <motion.button
                whileHover={{ rotate: 4 }}
                whileTap={{ scale: 0.9 }}
                className="
            p-2 rounded-full 
            border border-neutral-300 dark:border-neutral-700 
            bg-white dark:bg-neutral-900 
            hover:bg-neutral-100 dark:hover:bg-neutral-800
            transition
          "
              >
                <Play className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SheetsCard;
