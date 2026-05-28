// src/components/sheets/CreateSheetModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { useSheetStore } from "@/store/sheet.store";
import { CommandModal } from "../ui/CommandModal";
import { Loader2, Plus, CornerDownLeft } from "lucide-react";
import { toast } from "sonner";

interface CreateSheetModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateSheetModal: React.FC<CreateSheetModalProps> = ({
  open,
  onClose,
}) => {
  const { createSheet, isSheetCreating } = useSheetStore();
  const [sheetForm, setSheetForm] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the primary input field whenever the modal window activates
  useEffect(() => {
    if (open) {
      // Use a sub-pixel timeout macro to clear downstream rendering lifecycle frames safely
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sheetForm.name.trim();
    if (!cleanName) {
      toast.error("Sheet name definition cannot be left blank.");
      return; // CRITICAL: Stop programmatic runtime action immediately
    }

    try {
      await createSheet({
        name: cleanName,
        description: sheetForm.description.trim(),
      });
      setSheetForm({ name: "", description: "" });
      toast.success("Cheat Sheet schema initialized successfully.");
      onClose();
    } catch {
      toast.error("Failed to broadcast sheet generation context.");
    }
  };

  return (
    <CommandModal onClose={onClose} open={open}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-bg-secondary text-text-primary overflow-hidden select-none"
      >
        {/* MODAL TITLE LAYER AREA */}
        <div className="p-5 pb-3 border-b border-border-subtle">
          <h1 className="text-base font-semibold tracking-tight text-text-primary">
            Create Algorithmic Sheet
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-sans leading-relaxed">
            Initialize an isolated matrix to categorize, sort, and retain
            competitive code problems.
          </p>
        </div>

        {/* INTEGRATED CORE TEXT HOUSING MATRIX */}
        <div className="p-5 space-y-4">
          {/* FIELD VECTOR A: NAME INPUT */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold"
            >
              Index Name
            </label>
            <input
              ref={firstInputRef}
              type="text"
              name="name"
              id="name"
              value={sheetForm.name}
              placeholder="e.g., Core Dynamic Programming, Sliding Window Metrics..."
              onChange={(e) =>
                setSheetForm({ ...sheetForm, name: e.target.value })
              }
              className="w-full bg-bg-primary/40 text-sm px-3 py-2 rounded-lg border border-border-subtle focus:border-accent-gold/30 focus:bg-bg-primary outline-hidden transition-all duration-150 text-text-primary placeholder:text-text-muted/30 focus:ring-0"
              autoComplete="off"
              spellCheck="false"
              disabled={isSheetCreating}
            />
          </div>

          {/* FIELD VECTOR B: DESCRIPTION FIELD */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold"
            >
              Functional Description
            </label>
            <textarea
              name="description"
              id="description"
              value={sheetForm.description}
              placeholder="e.g., Retain complex multidimensional recurrence traces and localized window vectors..."
              onChange={(e) =>
                setSheetForm({ ...sheetForm, description: e.target.value })
              }
              rows={3}
              className="w-full bg-bg-primary/40 text-sm px-3 py-2 rounded-lg border border-border-subtle focus:border-accent-gold/30 focus:bg-bg-primary outline-hidden transition-all duration-150 text-text-primary placeholder:text-text-muted/30 resize-none font-sans leading-relaxed focus:ring-0"
              spellCheck="false"
              disabled={isSheetCreating}
            />
          </div>
        </div>

        {/* FOOTER INTERACTIVE UTILITY RIBBON */}
        <div className="h-12 px-5 bg-bg-primary border-t border-border-subtle flex items-center justify-between text-[10px] font-mono text-text-muted select-none">
          <span className="opacity-50 flex items-center gap-1">
            <CornerDownLeft size={10} />
            <span>Press Enter to initialize vector</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 h-7 rounded-md text-text-muted hover:text-text-secondary transition-colors cursor-pointer font-medium"
              disabled={isSheetCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSheetCreating || !sheetForm.name.trim()}
              className="inline-flex items-center gap-1.5 h-7 px-3 bg-accent-gold text-bg-primary font-bold rounded-md font-mono text-[10px] uppercase tracking-wider hover:bg-accent-primary transition-all duration-150 disabled:opacity-20 cursor-pointer shadow-3xs"
            >
              {isSheetCreating ? (
                <>
                  <Loader2 size={10} className="animate-spin" />
                  <span>Configuring...</span>
                </>
              ) : (
                <>
                  <Plus size={10} className="stroke-[2.5]" />
                  <span>Create Sheet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </CommandModal>
  );
};

export default CreateSheetModal;
