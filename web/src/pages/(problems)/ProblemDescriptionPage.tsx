// src/components/problems/pages/ProblemDescriptionPage.tsx
import { lazy, Suspense, memo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useProblemStore } from "@/store/problem.store";

const ProblemDescription = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/ProblemDescription"),
);

/* --- 💎 PREMIUM TYPOGRAPHY SKELETON LOADER --- */
const DescriptionSkeleton = memo(() => (
  <div
    className="space-y-5 max-w-4xl animate-pulse select-none pointer-events-none"
    aria-hidden="true"
  >
    <div className="pb-3 border-b border-border-subtle/50">
      <div className="h-6 w-2/5 rounded-md bg-bg-secondary" />
    </div>
    <div className="space-y-3 pt-2">
      <div className="h-4 w-11/12 rounded bg-bg-secondary" />
      <div className="h-4 w-full rounded bg-bg-secondary" />
      <div className="h-4 w-4/5 rounded bg-bg-secondary" />
    </div>
  </div>
));
DescriptionSkeleton.displayName = "DescriptionSkeleton";

/* --- ACCORDION ITEM NODE FOR HINTS --- */
const HintAccordionItem = memo(
  ({ hint, index }: { hint: string; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border border-border-subtle bg-bg-secondary/40 rounded-xl overflow-hidden transition-colors duration-150 hover:bg-bg-secondary/60">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full h-9 px-4 flex items-center justify-between font-sans text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <Lightbulb
              size={12}
              className={isOpen ? "text-accent-gold" : "text-text-muted"}
            />
            <span>Hint {index + 1}</span>
          </div>
          <ChevronDown
            size={11}
            className={`text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180 text-accent-gold" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-4 pb-3.5 pt-0.5 font-mono text-[11px] leading-relaxed text-text-secondary border-t border-border-subtle/30 bg-bg-primary/30 select-text">
                {hint}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
HintAccordionItem.displayName = "HintAccordionItem";

/* --- MAIN PAGE CONTEXT WRAPPER --- */
export const ProblemDescriptionPage = () => {
  const { problemInCodeEditor: currentProblem } = useProblemStore();

  if (!currentProblem) {
    return (
      <div className="w-full p-4">
        <DescriptionSkeleton />
      </div>
    );
  }

  const constraints = currentProblem.constraints || [];
  const hints = currentProblem.hints || [];
  const testcases = currentProblem.testcases || [];

  return (
    /* FIXED SCROLLBARS DUPLICATION:
      - Changed 'h-full' to 'h-auto' so the layout doesn't assert an absolute bounding dimension constraint.
      - Removed 'overflow-y-auto' and 'custom-scrollbar' to yield full scroll handling up to the active parent Outlet.
      - Dropped vertical padding ('py-5') to completely stop inner clipping at layout boundaries.
    */
    <div className="w-full h-auto bg-bg-primary  space-y-7 antialiased">
      {/* 1. CORE DESCRIPTION MARKDOWN MODULE */}
      <div className="prose prose-sm dark:prose-invert max-w-none border-b border-border-subtle pb-6">
        <Suspense fallback={<DescriptionSkeleton />}>
          <ProblemDescription />
        </Suspense>
      </div>

      {/* 2. HIGH-FIDELITY TESTCASE EXPLANATION SECTIONS (LEETCODE MATRIX FORMAT) */}
      {testcases.length > 0 && (
        <div className="space-y-4 max-w-4xl pt-1">
          <div className="flex items-center gap-1.5 text-text-primary select-none">
            <Terminal size={12} className="text-accent-gold/80" />
            <h3 className="text-[11px] font-bold tracking-wider uppercase font-mono text-text-secondary">
              Examples & Traces
            </h3>
          </div>

          <div className="space-y-4">
            {testcases.slice(0, 3).map((tc, idx) => {
              const formattedStdin = Array.isArray(tc.std?.stdin)
                ? tc.std.stdin
                    .map((val) =>
                      typeof val === "object"
                        ? JSON.stringify(val)
                        : String(val),
                    )
                    .join(", ")
                : String(tc.std?.stdin || "");

              return (
                <div key={`example-node-${idx}`} className="space-y-2">
                  <h4 className="text-[11px] font-medium font-mono text-text-secondary pl-0.5">
                    Example {idx + 1}:
                  </h4>

                  <div className="w-full rounded-xl border border-border-subtle bg-bg-secondary/30 p-4 font-mono text-[11px] space-y-1.5 leading-relaxed selection:bg-accent-gold/20 select-text">
                    <div>
                      <span className="text-text-muted">Input: </span>
                      <span className="text-text-primary">
                        args = [{formattedStdin}]
                      </span>
                    </div>
                    <div>
                      <span className="text-text-muted">Output: </span>
                      <span className="text-text-primary">
                        {tc.std?.stdout}
                      </span>
                    </div>
                    {tc.explanation && (
                      <div className="pt-1.5 mt-1.5 border-t border-border-subtle/30 text-text-secondary">
                        <span className="text-text-muted font-sans font-medium italic">
                          Explanation:{" "}
                        </span>
                        <span>{tc.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CONDITIONAL COMPILER CONSTRAINTS SECTION */}
      {constraints.length > 0 && (
        <div className="space-y-2.5 max-w-4xl pt-1">
          <div className="flex items-center gap-1.5 text-text-primary select-none">
            <ShieldAlert size={13} className="text-accent-gold/80" />
            <h3 className="text-[11px] font-bold tracking-wider uppercase font-mono text-text-secondary">
              Constraints
            </h3>
          </div>

          <ul className="pl-4 space-y-1.5 font-mono text-[11px] tracking-tight text-text-secondary list-disc select-text">
            {constraints.map((constraint, index) => (
              <li
                key={`constraint-${index}`}
                className="marker:text-border-intense"
              >
                <code className="px-1.5 py-0.5 rounded-md bg-bg-secondary text-text-primary border border-border-subtle/40">
                  {constraint}
                </code>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. CONDITIONAL HINTS ACCORDION CONTROL STRIP */}
      {hints.length > 0 && (
        <div className="space-y-2.5 max-w-4xl pt-1">
          <div className="flex items-center gap-1.5 text-text-primary select-none">
            <Sparkles size={12} className="text-accent-gold/80" />
            <h3 className="text-[11px] font-bold tracking-wider uppercase font-mono text-text-secondary">
              Hints & Directives
            </h3>
          </div>

          <div className="space-y-1.5">
            {hints.map((hint, index) => (
              <HintAccordionItem
                key={`hint-node-${index}`}
                hint={hint}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ProblemDescriptionPage);
