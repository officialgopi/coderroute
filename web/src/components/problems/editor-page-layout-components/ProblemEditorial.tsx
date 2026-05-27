import { memo } from "react";
import QuillContentRenderer from "@/components/ui/QuillContentRender";
import type { IProblem } from "@/types/types";
import { BookOpen } from "lucide-react";

interface ProblemEditorialProps {
  problem: IProblem | undefined;
}

export const ProblemEditorial = ({ problem }: ProblemEditorialProps) => {
  return (
    <div className="space-y-4 max-w-4xl font-sans text-sm leading-relaxed text-text-primary antialiased selection:bg-amber-500/20">
      {/* --- PREMIUM LOW-CONTRAST METADATA HEADER --- */}
      <div className="pb-2 flex items-center gap-2 border-b border-border-subtle/30 dark:border-zinc-900/40 select-none">
        <BookOpen
          size={13}
          className="text-text-secondary opacity-50 stroke-[2.2]"
        />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-secondary opacity-60">
          Official Editorial Guide
        </span>
      </div>

      {/* --- CONTENT BLOCK --- */}
      <div
        className="prose prose-sm dark:prose-invert max-w-none select-text focus:outline-none tracking-normal pt-1
        prose-p:leading-relaxed prose-p:text-text-primary/90
        prose-code:font-mono prose-code:text-amber-600 dark:prose-code:text-amber-400 prose-code:bg-surface-panel dark:prose-code:bg-zinc-900/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border-subtle/50 prose-pre:p-4 prose-pre:rounded-xl"
      >
        {problem?.editorial ? (
          <QuillContentRenderer htmlContent={problem.editorial} />
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center select-none opacity-50">
            <p className="italic font-mono text-xs text-text-secondary">
              // An official editorial guide has not been published for this
              task yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProblemEditorial);
