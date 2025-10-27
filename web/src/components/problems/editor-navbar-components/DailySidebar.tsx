import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DailySidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -50, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 h-full w-80 bg-neutral-900/95 backdrop-blur-md border-r border-neutral-800 z-50 p-4 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-100 font-semibold text-lg">
              Daily Problems
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* List of problems here */}
            <p className="text-neutral-500 text-sm">Coming soon...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DailySidebar;
