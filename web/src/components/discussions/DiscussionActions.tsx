import { useState, useRef, useEffect, memo } from "react";
import {
  MoreHorizontal,
  Link2,
  AlertCircle,
  Trash2,
  Edit3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DiscussionActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onCopyLink?: () => void;
  onReport?: () => void;
  isOwner?: boolean; // Toggles destructive admin rights conditionally
}

export const DiscussionActions = ({
  onEdit,
  onDelete,
  onCopyLink,
  onReport,
  isOwner = false,
}: DiscussionActionsProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Structural outside tracking listener for safe popover dismissal
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const handleAction = (callback?: () => void) => {
    if (callback) callback();
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left font-sans"
    >
      {/* --- UTILITY BUTTON TRIGGER --- */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center justify-center h-7 w-7 rounded-lg border transition-all cursor-pointer outline-none select-none ${
          open
            ? "bg-surface-panel border-border-intense text-text-primary shadow-3xs"
            : "border-transparent text-text-secondary opacity-40 hover:opacity-100 hover:text-text-primary hover:bg-neutral-100 dark:hover:bg-zinc-900/60"
        }`}
      >
        <MoreHorizontal size={14} className="stroke-[2.2]" />
      </button>

      {/* --- ACTIONS CONTEXT CONSOLE PANEL --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="absolute right-0 mt-1 w-40 rounded-xl border border-border-subtle/60 dark:border-zinc-900/80 bg-surface-card dark:bg-zinc-950 p-1 shadow-md z-50 overflow-hidden focus:outline-none"
          >
            {/* Standard Global Action Items */}
            <button
              type="button"
              onClick={() => handleAction(onCopyLink)}
              className="w-full h-7.5 px-2 rounded-md font-sans text-xs text-text-secondary hover:bg-neutral-100 dark:hover:bg-zinc-900/50 hover:text-text-primary flex items-center gap-2 cursor-pointer outline-none transition-colors"
            >
              <Link2 size={12} className="opacity-70" />
              <span>Copy Thread Link</span>
            </button>

            {isOwner ? (
              <>
                <div className="my-1 border-t border-border-subtle/30 dark:border-zinc-900/50" />
                <button
                  type="button"
                  onClick={() => handleAction(onEdit)}
                  className="w-full h-7.5 px-2 rounded-md font-sans text-xs text-text-secondary hover:bg-neutral-100 dark:hover:bg-zinc-900/50 hover:text-text-primary flex items-center gap-2 cursor-pointer outline-none transition-colors"
                >
                  <Edit3 size={12} className="opacity-70" />
                  <span>Modify Post</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAction(onDelete)}
                  className="w-full h-7.5 px-2 rounded-md font-sans text-xs text-rose-500 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer outline-none transition-colors font-medium"
                >
                  <Trash2 size={12} />
                  <span>Delete Thread</span>
                </button>
              </>
            ) : (
              <>
                <div className="my-1 border-t border-border-subtle/30 dark:border-zinc-900/50" />
                <button
                  type="button"
                  onClick={() => handleAction(onReport)}
                  className="w-full h-7.5 px-2 rounded-md font-sans text-xs text-text-secondary hover:bg-orange-500/5 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-2 cursor-pointer outline-none transition-colors"
                >
                  <AlertCircle size={12} className="opacity-70" />
                  <span>Report Abuse</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(DiscussionActions);
