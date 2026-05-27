import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, memo } from "react";

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
  // High-Fidelity Keyboard Navigation Event Trap
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      // If a sub-component already captured and handled the Esc action, cancel bubbling
      if (e.defaultPrevented) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Accessibility Management: Enforce strict body viewport scrolling lock isolation while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* --- LAYER 1: BACKDROP MASK PANEL --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "linear" }}
            className="fixed inset-0 z-50 bg-zinc-950/20 dark:bg-zinc-950/50 backdrop-blur-xs flex items-start justify-center pt-24 sm:pt-32 px-4 cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          >
            {/* --- LAYER 2: INTERACTIVE PALETTE ENGINE CORE --- */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-surface-panel dark:bg-zinc-950 border border-border-subtle dark:border-zinc-900 rounded-xl text-text-primary shadow-2xl overflow-hidden cursor-default flex flex-col"
              onClick={(e) => e.stopPropagation()} // Isolates internal interaction bubbling
              role="dialog"
              aria-modal="true"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(CommandModal);
