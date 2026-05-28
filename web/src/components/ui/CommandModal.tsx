// src/components/ui/CommandModal.tsx
import React, { useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CommandModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  theme?: "light" | "dark";
}

export const CommandModal: React.FC<CommandModalProps> = ({
  open,
  onClose,
  children,
  theme,
}) => {
  // High-Fidelity Keyboard Navigation Event Trap
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Accessibility Management: Enforce strict viewport scrolling lock isolation while open
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
          {/* --- LAYER 1: ABSOLUTE BACKGROUND MASK --- 
              This element handles the heavy backdrop-blur effect exclusively. 
              By keeping it isolated, the blur cannot leak into foreground fonts.
          */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/[0.02] dark:bg-black/[0.25] backdrop-blur-xl cursor-pointer"
            aria-hidden="true"
          />

          {/* --- LAYER 2: INTERACTIVE CONTENT LAYER (SIBLING COMPOSITION) --- */}
          <div
            className={`fixed inset-0 z-50 pointer-events-none flex items-start justify-center pt-20 sm:pt-28 px-4 overflow-hidden ${theme || ""}`}
          >
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.99 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              /* Grounded Content Background Block: 
                Uses an explicit, solid semantic background token and crisp shadows 
                to separate the modal cleanly from the blurred background.
              */
              className="w-full max-w-md bg-bg-secondary border border-border-subtle rounded-xl text-text-primary shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(CommandModal);
