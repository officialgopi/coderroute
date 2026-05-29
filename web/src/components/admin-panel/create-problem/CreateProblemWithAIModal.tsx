import React, { useState, useCallback, memo } from "react";
import { toast } from "sonner";
import { Sparkles, Loader2, CornerDownLeft, X } from "lucide-react";
import { useAiStore } from "@/store/ai.store";
import { CommandModal } from "@/components/ui/CommandModal";
import type { CreateProblemBody } from "@/types/types";

interface CreateProblemWithAIModalProps {
  open: boolean;
  onClose: () => void;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

export const CreateProblemWithAIModal = ({
  open,
  onClose,
  setProblem,
}: CreateProblemWithAIModalProps) => {
  const { createProblemWithAI, isProblemCreatingWithAI } = useAiStore();
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const sanitizedPrompt = prompt.trim();
      if (!sanitizedPrompt) {
        toast.error("Generation parameter vector cannot be empty.");
        return;
      }

      try {
        const generatedProblem = await createProblemWithAI(sanitizedPrompt);

        if (generatedProblem) {
          setProblem(generatedProblem);
          setPrompt(""); // Flush configuration buffer state upon successful conversion
          onClose();
          toast.success(
            "AI Generation successfully integrated into form context.",
          );
        } else {
          toast.error(
            "Model returned an invalid schema. Refine generation parameters.",
          );
        }
      } catch (error) {
        console.error("AI Generation Engine Failure exception:", error);
        toast.error(
          "Sandbox generation gateway timed out. Please retry compilation.",
        );
      }
    },
    [prompt, createProblemWithAI, setProblem, onClose],
  );

  return (
    <CommandModal open={open} onClose={onClose}>
      <div className="w-full relative font-sans text-text-primary antialiased">
        {/* --- MODAL UPPER DECK TITLE TRACK --- */}
        <div className="px-5 pt-5 pb-3 border-b border-border-subtle/20 dark:border-zinc-900/40 flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Sparkles size={13} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                AI Solution Blueprint Drafter
              </h3>
              <p className="text-[10px] text-text-secondary opacity-60 font-medium mt-0.5">
                Describe a challenge pattern to construct schemas instantly.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-6 w-6 rounded-md border border-transparent hover:border-border-subtle/60 dark:hover:border-zinc-800 text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer outline-none"
            aria-label="Dismiss generation prompt modal panel"
          >
            <X size={13} className="stroke-[2.2]" />
          </button>
        </div>

        {/* --- CORE USER INTERACTIVE GENERATIVE CONSOLE --- */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="space-y-1.5">
            <label
              className="block text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60 select-none"
              htmlFor="prompt-input"
            >
              Generation Specifications Context
            </label>

            <div className="w-full relative rounded-xl border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/40 overflow-hidden group focus-within:border-border-intense dark:focus-within:border-zinc-700 transition-colors shadow-3xs">
              <textarea
                name="prompt"
                id="prompt-input"
                disabled={isProblemCreatingWithAI}
                className="w-full h-36 px-3 py-2.5 text-xs bg-transparent text-text-primary outline-none placeholder:opacity-30 leading-relaxed resize-none font-sans select-text"
                placeholder="e.g., Create an Easy array partition problem titled 'Find Even Subsets' that accepts an array of numbers and returns filtered matches encoded inside an un-ordered JSON format structure..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              {/* Context layout helper tag line */}
              <div className="absolute bottom-2 right-3 font-mono text-[9px] text-text-secondary opacity-30 select-none pointer-events-none hidden sm:flex items-center gap-1">
                <span>Press Enter to Submit</span>
                <CornerDownLeft size={8} className="stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* --- BOTTOM SUBMISSION CONTROL ROW --- */}
          <div className="w-full flex items-center justify-end pt-1 select-none">
            <button
              type="submit"
              disabled={isProblemCreatingWithAI}
              className={`h-8 px-4 rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm outline-none border ${
                isProblemCreatingWithAI
                  ? "bg-neutral-50 dark:bg-zinc-900 border-border-subtle/50 text-text-secondary opacity-50 cursor-not-allowed"
                  : "bg-zinc-900 dark:bg-zinc-100 border-transparent text-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer"
              }`}
            >
              {isProblemCreatingWithAI ? (
                <>
                  <Loader2 size={12} className="animate-spin stroke-[2.5]" />
                  <span>Compiling Sandbox Structures...</span>
                </>
              ) : (
                <>
                  <Sparkles size={11} className="stroke-[2.5]" />
                  <span>Generate Blueprint</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </CommandModal>
  );
};

export default memo(CreateProblemWithAIModal);
