import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

interface CommandModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CommandModal: React.FC<CommandModalProps> = ({
  open,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000000000] bg-white/50 dark:bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
            className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-500/50 rounded-lg w-[90%] sm:w-[550px] text-neutral-950 dark:text-neutral-200 shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
