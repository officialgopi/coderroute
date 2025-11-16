import { AnimatePresence, motion } from "framer-motion";

interface ProblemListModalProps {
  open: boolean;
  onClose: () => void;
  lists: string[];
}

export const ProblemListModal: React.FC<ProblemListModalProps> = ({
  open,
  onClose,
  lists,
}) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="
            absolute right-0 top-10
            w-80 rounded-xl p-4
            bg-neutral-100 dark:bg-neutral-900
            border border-neutral-700/40
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
            backdrop-blur-md
            text-neutral-900 dark:text-neutral-100
            select-none
          "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-3 tracking-tight">
            My Lists
          </h2>

          <div className="space-y-2">
            {lists.map((listName) => (
              <label
                key={listName}
                className="
                  flex items-center gap-3 px-2 py-2
                  rounded-md cursor-pointer
                  hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60
                  transition-colors
                "
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-neutral-700 dark:accent-neutral-300 cursor-pointer"
                />
                <span className="text-sm">{listName}</span>
              </label>
            ))}
          </div>

          <button
            onClick={onClose}
            className="
              mt-4 w-full py-2 
              rounded-lg text-sm font-medium
              bg-neutral-200 dark:bg-neutral-800
              hover:bg-neutral-300 dark:hover:bg-neutral-700
              transition-colors
            "
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
