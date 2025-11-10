import { useProblemStore } from "@/store/problem.store";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DailySidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { problems, getProblems } = useProblemStore();
  useEffect(() => {
    if (open) {
      getProblems();
    }
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -50, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 h-full w-80  bg-neutral-100  dark:bg-neutral-950 backdrop-blur-md border-r border-neutral-500/50 z-50 p-4 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Daily Problems</h2>
            <button
              onClick={onClose}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {problems.length === 0 ? (
              <p className="text-neutral-600 dark:text-neutral-400">
                No problems found
              </p>
            ) : (
              <ul className="space-y-3">
                {problems.map((problem, idx) => (
                  <Link
                    to={`/problems/${problem.slug}`}
                    key={problem.slug}
                    onClick={onClose}
                  >
                    <li
                      className={
                        `p-3  rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition` +
                        (idx % 2 === 0
                          ? " bg-neutral-200 dark:bg-neutral-900"
                          : " bg-neutral-100 dark:bg-neutral-950")
                      }
                    >
                      <h3 className="font-medium">{problem.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Difficulty: {problem.difficulty}
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DailySidebar;
