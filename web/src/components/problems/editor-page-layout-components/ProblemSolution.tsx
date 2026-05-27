import { useEffect, useRef, useState, memo, useMemo } from "react";
import hljs from "highlight.js";
import { Terminal, Check, Copy, Code } from "lucide-react";
import type { IProblem } from "@/store/problem.store";

// Use a cleaner modern dark/light system highlight standard
import "highlight.js/styles/github-dark-dimmed.min.css";

interface ProblemSolutionProps {
  problem: IProblem | undefined;
}

/* --- 💎 PREMIUM IMMUTABLE SYNTAX HIGHLIGHT BLOCK COMPONENT --- */
const CodeHighlightBlock = memo(
  ({ code, language }: { code: string; language: string }) => {
    const codeRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (codeRef.current) {
        // Force reset any old internal highlighting parsing states safely
        codeRef.current.removeAttribute("data-highlighted");
        hljs.highlightElement(codeRef.current);
      }
    }, [code, language]);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Quiet fail if browser block mechanisms intercept the copy event
      }
    };

    return (
      <div className="group rounded-xl border border-border-subtle/50 dark:border-zinc-900/60 bg-zinc-50 dark:bg-zinc-950/40 overflow-hidden shadow-3xs transition-all">
        {/* Terminal Title Bar Row Section */}
        <div className="h-8 px-4 flex items-center justify-between bg-zinc-100/80 dark:bg-zinc-900/30 border-b border-border-subtle/30 dark:border-zinc-900/40 select-none">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-60">
            <Terminal size={10} />
            <span>{language.toLowerCase()} solution environment</span>
          </div>

          {/* Clipboard copy trigger utility */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 h-5 px-2 rounded bg-surface-card dark:bg-zinc-900 border border-border-subtle/60 dark:border-zinc-800 text-text-secondary hover:text-text-primary hover:border-border-intense transition-all cursor-pointer outline-none text-[10px] font-mono font-medium"
          >
            {copied ? (
              <>
                <Check size={10} className="text-emerald-500 stroke-[2.5]" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Copied
                </span>
              </>
            ) : (
              <>
                <Copy size={10} className="opacity-70" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Structured Raw Code View Output Panel */}
        <div className="p-4 font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar select-text bg-zinc-50 dark:bg-zinc-950">
          <pre className="m-0 bg-transparent! p-0!">
            <code
              ref={codeRef}
              className={`language-${language.toLowerCase()} bg-transparent! p-0! rounded-none`}
            >
              {code.trim()}
            </code>
          </pre>
        </div>
      </div>
    );
  },
);

CodeHighlightBlock.displayName = "CodeHighlightBlock";

/* --- MAIN SOLUTIONS VIEWER TAB --- */
export const ProblemSolution = ({ problem }: ProblemSolutionProps) => {
  const hasSolutions = useMemo(() => {
    return problem?.problemDetails && problem.problemDetails.length > 0;
  }, [problem]);

  return (
    <div className="space-y-4 max-w-4xl font-sans text-xs text-text-primary pb-8">
      {/* --- LOW-CONTRAST METADATA HEADER ANCHOR --- */}
      <div className="pb-2.5 flex items-center gap-2 border-b border-border-subtle/30 dark:border-zinc-900/40 select-none">
        <Code
          size={12}
          className="text-text-secondary opacity-50 stroke-[2.2]"
        />
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-60">
          Reference Implementation Guides
        </span>
      </div>

      {/* --- SOLUTIONS BLOCKS FIELD --- */}
      <div className="space-y-5 pt-1">
        {!problem ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(2)].map((_, i) => (
              <div
                key={`sol-skeleton-${i}`}
                className="h-32 w-full rounded-xl bg-surface-panel/40 dark:bg-zinc-900/40 border border-border-subtle/30 dark:border-zinc-900"
              />
            ))}
          </div>
        ) : !hasSolutions ? (
          <div className="py-12 flex flex-col items-center justify-center text-center select-none opacity-40">
            <p className="italic font-mono text-text-secondary">
              // Reference solution scripts have not been committed for this
              problem statement.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {problem.problemDetails?.map((p, i) => {
              // Safety catch for empty or unpopulated solution models
              if (!p.referenceSolution) return null;

              return (
                <CodeHighlightBlock
                  key={`solution-block-wrapper-${p.language || i}`}
                  language={p.language || "code"}
                  code={p.referenceSolution}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProblemSolution);
