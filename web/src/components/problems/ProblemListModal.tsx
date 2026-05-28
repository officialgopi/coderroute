// src/components/problems/ProblemListModal.tsx
import React, { useEffect, useState, useTransition, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSheetStore } from "@/store/sheet.store";
import { ListPlus, X, FolderHeart, Loader2 } from "lucide-react";

interface ProblemListModalProps {
  open: boolean;
  onClose: () => void;
  problemId: string;
}

export const ProblemListModal: React.FC<ProblemListModalProps> = ({
  open,
  onClose,
  problemId,
}) => {
  const { getSheets, addProblemToSheet, deleteProblemFromSheet, sheets } =
    useSheetStore();

  useEffect(() => {
    if (!open) return;
    const fetchSheets = async () => {
      await getSheets();
    };
    fetchSheets();
  }, [getSheets, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -2, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -2, scale: 0.99 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          /* 
            CRITICAL FIX: Added 'bg-bg-secondary' explicitly to make the layout 
            completely solid and opaque, plus deep shadows to elevate it from the table.
          */
          className="absolute right-0 top-6 w-72 bg-bg-canvas border border-border-subtle rounded-xl shadow-[0_10px_32px_-4px_rgba(0,0,0,0.4)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.8)] p-3.5 text-text-primary z-50 select-none overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER ROW ACTIONS CONTROL PANEL */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-text-primary">
              <ListPlus size={12} className="text-accent-gold/90" />
              <h2 className="text-[10px] font-bold tracking-wider uppercase font-mono text-text-secondary">
                Collect Track
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-text-muted hover:text-text-secondary hover:bg-bg-primary/50 transition-colors cursor-pointer"
            >
              <X size={11} className="stroke-[2.5]" />
            </button>
          </div>

          {/* SCROLLABLE GRID FEED TRACKS */}
          <div className="space-y-0.5 max-h-48 overflow-y-auto pr-0.5">
            {sheets && sheets.length > 0 ? (
              sheets.map((sheet) => {
                const isInitiallyChecked =
                  sheet.problems?.some((p) => p.problemId === problemId) ??
                  false;

                return (
                  <MemoizedSheetItem
                    key={sheet.id}
                    id={sheet.id}
                    name={sheet.name}
                    problemId={problemId}
                    isInitiallyChecked={isInitiallyChecked}
                    addProblemToSheet={addProblemToSheet}
                    deleteProblemFromSheet={deleteProblemFromSheet}
                  />
                );
              })
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 opacity-40">
                <FolderHeart size={14} />
                <span className="text-[9px] font-mono tracking-tight">
                  // No sheets found
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SheetItemProps {
  id: string;
  name: string;
  problemId: string;
  isInitiallyChecked: boolean;
  addProblemToSheet: (
    sheetId: string,
    problemId: string,
  ) => Promise<boolean | void>;
  deleteProblemFromSheet: (
    sheetId: string,
    problemId: string,
  ) => Promise<boolean | void>;
}

const SheetItem: React.FC<SheetItemProps> = ({
  id,
  name,
  problemId,
  isInitiallyChecked,
  addProblemToSheet,
  deleteProblemFromSheet,
}) => {
  const [, startMutationTransition] = useTransition();
  const [checked, setChecked] = useState<boolean>(isInitiallyChecked);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    setChecked(isInitiallyChecked);
  }, [isInitiallyChecked]);

  const handleToggle = () => {
    const nextState = !checked;
    setChecked(nextState);
    setIsPending(true);

    startMutationTransition(async () => {
      try {
        if (!nextState) {
          await deleteProblemFromSheet(id, problemId);
        } else {
          await addProblemToSheet(id, problemId);
        }
      } catch {
        setChecked(checked); // Rollback on failure
      } finally {
        setIsPending(false);
      }
    });
  };

  return (
    <label
      className={`flex items-center justify-between px-2 h-7.5 rounded-md cursor-pointer text-xs text-text-secondary transition-all duration-100 relative ${
        checked
          ? "bg-bg-primary/50 text-text-primary font-medium"
          : "hover:bg-bg-primary/25 hover:text-text-primary"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="size-3 rounded-xs border-border-subtle bg-bg-primary/40 text-accent-gold accent-accent-gold focus:ring-0 focus:ring-offset-0 cursor-pointer transition-colors"
        />
        <span className="truncate pr-4 tracking-tight">{name}</span>
      </div>

      {isPending && (
        <Loader2
          size={10}
          className="animate-spin text-accent-gold/60 shrink-0 absolute right-2"
        />
      )}
    </label>
  );
};

const MemoizedSheetItem = memo(SheetItem);

export default ProblemListModal;
