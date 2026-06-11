// src/components/admin-panel/create-problem/ImportProblemJsonModal.tsx
import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, FileCode2, Terminal, AlertCircle } from "lucide-react";
import type { CreateProblemBody } from "@/types/types";

interface ImportProblemJsonModalProps {
  open: boolean;
  onClose: () => void;
  onImportSuccess: (parsedProblem: CreateProblemBody) => void;
}

export const ImportProblemJsonModal: React.FC<ImportProblemJsonModalProps> = ({
  open,
  onClose,
  onImportSuccess,
}) => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [errorLog, setErrorLog] = useState<string | null>(null);

  const handleProcessImport = () => {
    try {
      setErrorLog(null);
      if (!jsonInput.trim()) {
        setErrorLog("Input buffer cannot execute empty structures.");
        return;
      }

      const parsedData = JSON.parse(jsonInput) as CreateProblemBody;

      // Essential structural type check validation passes
      if (!parsedData.title || !parsedData.description) {
        setErrorLog(
          "Validation rejected: Object missing required 'title' or 'description' fields.",
        );
        return;
      }

      onImportSuccess(parsedData);
      setJsonInput("");
      onClose();
    } catch (ex: any) {
      setErrorLog(
        `Syntax Error: ${ex?.message || "Invalid JSON telemetry notation."}`,
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* LAYER 1: ABSOLUTE BACKGROUND GLASS MASK */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/60 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* LAYER 2: INTERACTIVE DATA CANVAS PANEL */}
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl bg-bg-secondary border border-border-subtle rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
              role="dialog"
              aria-modal="true"
            >
              {/* HEADER CAPTION TABS */}
              <div className="h-12 border-b border-border-subtle/80 flex items-center justify-between px-4 shrink-0 bg-bg-secondary">
                <div className="flex items-center gap-2 text-text-primary">
                  <FileCode2 size={14} className="text-accent-gold" />
                  <h2 className="text-xs font-bold tracking-wider uppercase font-mono">
                    Bootstrap JSON Track
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-md text-text-muted hover:text-text-secondary hover:bg-bg-primary/40 transition-colors cursor-pointer"
                >
                  <X size={13} className="stroke-[2.5]" />
                </button>
              </div>

              {/* CENTRAL TEXTAREA DATASTREAM BUFFER CONTAINER */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                    <Terminal size={11} className="opacity-60" />
                    <span>Schema Manifest Input</span>
                  </label>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Paste your custom challenge data graph configuration below.
                    Validating syntax structure targets updates the visual
                    wizard and routes you straight to the preview step.
                  </p>
                </div>

                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`{\n  \"title\": \"Two Sum Vector\",\n  \"description\": \"Compute index matrix map target sums...\",\n  \"difficulty\": \"EASY\"\n}"
                  className="w-full h-64 bg-bg-primary border border-border-subtle rounded-xl p-4 font-mono text-[11px] text-text-primary placeholder:text-text-muted/30 focus:outline-hidden focus:border-accent-gold/40 transition-colors resize-none leading-relaxed`}
                  spellCheck={false}
                />

                {/* ERROR FEEDBACK ANCHOR LINE */}
                {errorLog && (
                  <div className="p-3 bg-accent-crimson/5 border border-accent-crimson/15 rounded-lg flex items-start gap-2.5 text-accent-crimson animate-in fade-in slide-in-from-top-1 duration-150">
                    <AlertCircle size={13} className="shrink-0 mt-0.5" />
                    <span className="text-[11px] font-mono leading-relaxed">
                      {errorLog}
                    </span>
                  </div>
                )}
              </div>

              {/* FOOTER ACTION PANEL CONTROL STRIP */}
              <div className="h-14 px-5 bg-bg-primary border-t border-border-subtle flex items-center justify-end gap-2 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 h-8 rounded-lg text-text-secondary hover:text-text-primary border border-transparent hover:border-border-subtle hover:bg-bg-secondary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleProcessImport}
                  className="h-8 px-4 bg-text-primary text-bg-primary font-bold rounded-lg uppercase tracking-wider hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-3xs"
                >
                  Parse & Preview
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(ImportProblemJsonModal);
