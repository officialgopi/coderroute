import React, { memo } from "react";
import {
  BookOpen,
  Beaker,
  HelpCircle,
  FileCode2,
  Terminal,
} from "lucide-react";
import type { CreateProblemBody } from "@/types/types";

interface ReviewSectionProps {
  problem: CreateProblemBody;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ problem }) => {
  const resolvedConstraints = problem.constraints ?? [];
  const resolvedHints = problem.hints ?? [];
  const resolvedTestcases = problem.testcases ?? [];
  const resolvedDetails = problem.details ?? [];
  const resolvedTags = problem.tags ?? [];

  return (
    <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased">
      {/* --- SECTION 1: CORE SUMMARY DATA --- */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 select-none">
          <BookOpen size={13} className="text-amber-500 stroke-[2.2]" />
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
            Core Metadata Specifications
          </h2>
        </div>

        <div className="bg-surface-card/40 dark:bg-zinc-950/20 rounded-xl p-4 border border-border-subtle/60 dark:border-zinc-900 space-y-2.5 shadow-3xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px] border-b border-border-subtle/20 dark:border-zinc-900/40 pb-2.5 select-none">
            <p>
              <span className="text-text-secondary opacity-50 font-bold uppercase text-[9px]">
                Title:
              </span>{" "}
              <span className="text-text-primary font-sans font-semibold ml-1">
                {problem.title || "—"}
              </span>
            </p>
            <p>
              <span className="text-text-secondary opacity-50 font-bold uppercase text-[9px]">
                Difficulty:
              </span>{" "}
              <span className="text-text-primary font-sans font-semibold ml-1">
                {problem.difficulty}
              </span>
            </p>
            <p>
              <span className="text-text-secondary opacity-50 font-bold uppercase text-[9px]">
                Format:
              </span>{" "}
              <span className="text-text-primary font-sans font-semibold ml-1">
                {problem.output_format}
              </span>
            </p>
          </div>

          <div className="select-none">
            <span className="font-mono text-[9px] font-bold text-text-secondary opacity-50 uppercase block mb-1">
              Function Signature Call
            </span>
            <code className="inline-block px-2 py-1 bg-neutral-100 dark:bg-zinc-900 rounded font-mono font-bold text-[11px] text-amber-600 dark:text-amber-400">
              solve({problem.args?.join(", ")})
            </code>
          </div>

          <div>
            <span className="font-mono text-[9px] font-bold text-text-secondary opacity-50 uppercase block mb-1 select-none">
              Markdown Description Text Context
            </span>
            <div
              className="prose prose-neutral dark:prose-invert max-w-none text-xs leading-relaxed select-text"
              dangerouslySetInnerHTML={{
                __html:
                  problem.description ||
                  "<p className='italic text-text-secondary opacity-40'>// Context clear</p>",
              }}
            />
          </div>

          {resolvedTags.length > 0 && (
            <div className="pt-2 border-t border-dashed border-border-subtle/30 dark:border-zinc-900/40 flex flex-wrap gap-1 select-none">
              {resolvedTags.map((tag) => (
                <span
                  key={`review-tag-${tag}`}
                  className="h-[18px] px-2 rounded-full border border-border-subtle/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-900/40 font-mono text-[9px] font-bold tracking-wide text-text-secondary uppercase flex items-center"
                >
                  {tag.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- SECTION 2: TEST VECTORS GRID --- */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 select-none">
          <Beaker size={13} className="text-amber-500 stroke-[2.2]" />
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
            Sandbox Evaluation Testcases
          </h2>
        </div>

        {resolvedTestcases.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resolvedTestcases.map((t, i) => (
              <div
                key={`review-tc-${i}`}
                className="border border-border-subtle/60 dark:border-zinc-900 rounded-xl p-4 bg-surface-card/40 dark:bg-zinc-950/20 space-y-2.5 shadow-3xs"
              >
                <div className="flex justify-between items-center select-none border-b border-border-subtle/20 dark:border-zinc-900/40 pb-1.5">
                  <span className="font-mono text-[10px] font-bold text-text-secondary opacity-50 uppercase">
                    Case #{i + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] font-bold text-text-secondary opacity-40 uppercase block select-none">
                    Inputs
                  </span>
                  <ul className="space-y-1 pl-1">
                    {t?.std?.stdin?.map((inp, idx) => (
                      <li
                        key={`rev-tc-${i}-in-${idx}`}
                        className="font-mono text-[11px] truncate select-text"
                      >
                        <span className="opacity-50">
                          {problem.args?.[idx] || "arg"}:
                        </span>{" "}
                        <span className="font-bold text-text-primary">
                          {inp || '""'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] font-bold text-emerald-500 opacity-50 uppercase block select-none">
                    Expected Out
                  </span>
                  <code className="block px-2 py-1 bg-neutral-100 dark:bg-zinc-900/60 rounded font-mono font-bold text-[11px] text-text-primary select-text truncate">
                    {t.std.stdout || "void"}
                  </code>
                </div>

                {t.explanation && (
                  <div className="space-y-0.5">
                    <span className="font-mono text-[9px] font-bold text-text-secondary opacity-40 uppercase block select-none">
                      Explanation
                    </span>
                    <p className="text-[11px] leading-relaxed text-text-secondary opacity-80 pl-0.5 select-text">
                      {t.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 border border-dashed border-border-subtle dark:border-zinc-900/80 rounded-xl text-center select-none opacity-40">
            <p className="font-mono">
              // No assessment assertions mapped to execution layers.
            </p>
          </div>
        )}
      </div>

      {/* --- SECTION 3: HINTS & CONSTRAINTS --- */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 select-none">
          <HelpCircle size={13} className="text-amber-500 stroke-[2.2]" />
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
            Constraints & Pedagogical Hints
          </h2>
        </div>

        <div className="border border-border-subtle/60 dark:border-zinc-900 rounded-xl p-4 bg-surface-card/40 dark:bg-zinc-950/20 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-3xs">
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] font-bold text-text-secondary opacity-40 uppercase block select-none">
              Limitations Matrix
            </span>
            {resolvedConstraints.length ? (
              <ul className="list-none pl-1 space-y-1 font-mono text-[11px] text-text-primary font-medium select-text">
                {resolvedConstraints.map((c, i) => (
                  <li
                    key={`rev-const-${i}`}
                    className="flex items-start gap-1.5"
                  >
                    <span className="opacity-30">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] italic text-text-secondary opacity-40 pl-1 select-none">
                // No boundaries declared
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[9px] font-bold text-text-secondary opacity-40 uppercase block select-none">
              Hints Track
            </span>
            {resolvedHints.length ? (
              <ul className="list-none pl-1 space-y-1 font-sans text-[11px] text-text-secondary leading-normal select-text">
                {resolvedHints.map((h, i) => (
                  <li
                    key={`rev-hint-${i}`}
                    className="flex items-start gap-1.5"
                  >
                    <span className="font-mono opacity-30 text-[10px]">
                      {i + 1}.
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] italic text-text-secondary opacity-40 pl-1 select-none">
                // No hints appended
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- SECTION 4: EDITORIAL WALKTHROUGH --- */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 select-none">
          <Terminal size={13} className="text-amber-500 stroke-[2.2]" />
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
            Solution Approach Editorial
          </h2>
        </div>
        <div
          className="prose prose-neutral dark:prose-invert max-w-none text-xs leading-relaxed border border-border-subtle/60 dark:border-zinc-900 p-4 rounded-xl bg-surface-card/40 dark:bg-zinc-950/20 shadow-3xs select-text"
          dangerouslySetInnerHTML={{
            __html:
              problem.editorial ||
              "<p className='italic text-text-secondary opacity-40 font-mono'>// Editorial analysis is empty.</p>",
          }}
        />
      </div>

      {/* --- SECTION 5: LANGUAGE TEMPLATE COMPILERS --- */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 select-none">
          <FileCode2 size={13} className="text-amber-500 stroke-[2.2]" />
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-text-secondary opacity-60">
            Language Solution Sandboxes
          </h2>
        </div>

        {resolvedDetails.length ? (
          <div className="space-y-3.5">
            {resolvedDetails.map((d) => (
              <div
                key={`review-lang-${d.language}`}
                className="border border-border-subtle/60 dark:border-zinc-900 rounded-xl p-4 bg-surface-card/40 dark:bg-zinc-950/20 space-y-3 shadow-3xs"
              >
                <p className="font-mono text-[11px] font-bold text-text-primary border-b border-border-subtle/20 dark:border-zinc-900/40 pb-1.5 select-none uppercase tracking-wide">
                  {d.language} Environment
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-text-secondary opacity-40 uppercase block select-none">
                      Starter Snippet
                    </span>
                    <pre className="bg-neutral-50 dark:bg-zinc-950/40 border border-border-subtle/40 dark:border-zinc-900 rounded-lg p-3 font-mono text-[11px] text-text-primary overflow-x-auto leading-relaxed select-text shadow-3xs">
                      {d.codeSnippet.trim() || "// No code block written"}
                    </pre>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-emerald-500 opacity-50 uppercase block select-none">
                      Reference Solution
                    </span>
                    <pre className="bg-neutral-50 dark:bg-zinc-950/40 border border-border-subtle/40 dark:border-zinc-900 rounded-lg p-3 font-mono text-[11px] text-text-primary overflow-x-auto leading-relaxed select-text shadow-3xs">
                      {d?.referenceSolution?.trim() ||
                        "// No code block written"}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 border border-dashed border-border-subtle dark:border-zinc-900/80 rounded-xl text-center select-none opacity-40">
            <p className="font-mono">// No language environments selected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ReviewSection);
