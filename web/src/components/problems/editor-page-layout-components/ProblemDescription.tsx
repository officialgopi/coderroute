import { memo } from "react";
import QuillContentRenderer from "@/components/ui/QuillContentRender";
import { useProblemStore } from "@/store/problem.store";

export const ProblemDescription = () => {
  const { problemInCodeEditor } = useProblemStore();

  return (
    <div className="space-y-4 max-w-4xl font-sans text-sm leading-relaxed text-text-primary antialiased selection:bg-amber-500/20">
      {/* --- EXPLICIT TITLE MARKER HEADER --- */}
      {problemInCodeEditor?.title && (
        <div className="pb-2 border-b border-border-subtle/30 dark:border-zinc-900/40 select-text">
          <h1 className="text-xl font-bold tracking-tight text-text-primary dark:text-zinc-100">
            {problemInCodeEditor.title}
          </h1>
        </div>
      )}

      {/* --- RICH TEXT CONTENT DISPATCH CANVAS --- */}
      <div
        className="prose prose-sm dark:prose-invert max-w-none select-text focus:outline-none tracking-normal
        prose-p:leading-relaxed prose-p:text-text-primary/90
        prose-code:font-mono prose-code:text-amber-600 dark:prose-code:text-amber-400 prose-code:bg-surface-panel dark:prose-code:bg-zinc-900/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border-subtle/50 prose-pre:p-4 prose-pre:rounded-xl"
      >
        <QuillContentRenderer
          htmlContent={
            problemInCodeEditor?.description ||
            "<p className='italic opacity-40'>No prompt context provided.</p>"
          }
        />
      </div>
    </div>
  );
};

export default memo(ProblemDescription);
