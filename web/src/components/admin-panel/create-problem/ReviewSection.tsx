import type { CreateProblemBody } from "@/types/types";
import React from "react";

interface ReviewSectionProps {
  problem: CreateProblemBody;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ problem }) => {
  return (
    <div className="space-y-6 text-sm text-neutral-800 dark:text-neutral-200">
      {/* Basic Info */}
      <div>
        <h2 className="text-base font-semibold mb-2">📘 Basic Info</h2>
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-300 dark:border-neutral-700 space-y-1">
          <p>
            <strong>Title:</strong> {problem.title || "—"}
          </p>
          <p>
            <strong>Difficulty:</strong> {problem.difficulty}
          </p>
          <p>
            <strong>Output Format:</strong> {problem.output_format}
          </p>
          <p>
            <strong>Function Signature:</strong>{" "}
            <code>solve({problem.args?.join(", ")})</code>
          </p>

          <div>
            <strong>Description:</strong>
            <div
              className="prose prose-neutral dark:prose-invert mt-2"
              dangerouslySetInnerHTML={{
                __html: problem.description || "<p>—</p>",
              }}
            />
          </div>
        </div>
      </div>

      {/* Testcases */}
      <div>
        <h2 className="text-base font-semibold mb-2">🧪 Testcases</h2>
        {problem.testcases.length ? (
          <div className="grid gap-3">
            {problem.testcases.map((t, i) => (
              <div
                key={i}
                className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-neutral-50 dark:bg-neutral-900 space-y-1"
              >
                <p className="font-medium">Case #{i + 1}</p>

                <div>
                  <strong>Input:</strong>
                  <ul className="list-disc ml-5">
                    {t.std.stdin.map((inp, idx) => (
                      <li key={idx}>
                        <code>
                          {problem.args[idx]} = {inp}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>

                <p>
                  <strong>Output:</strong> <code>{t.std.stdout}</code>
                </p>

                {t.explanation && (
                  <p>
                    <strong>Explanation:</strong> {t.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">No testcases added.</p>
        )}
      </div>

      {/* Hints & Constraints */}
      <div>
        <h2 className="text-base font-semibold mb-2">💡 Hints & Constraints</h2>
        <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-neutral-50 dark:bg-neutral-900 space-y-2">
          <div>
            <strong>Constraints:</strong>
            {problem.constraints?.length ? (
              <ul className="list-disc ml-5">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-500">—</p>
            )}
          </div>

          <div>
            <strong>Hints:</strong>
            {problem.hints?.length ? (
              <ul className="list-disc ml-5">
                {problem.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-500">—</p>
            )}
          </div>
        </div>
      </div>

      {/* Editorial */}
      <div>
        <h2 className="text-base font-semibold mb-2">🧭 Editorial</h2>
        <div
          className="prose prose-neutral dark:prose-invert text-sm border border-neutral-300 dark:border-neutral-700 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900"
          dangerouslySetInnerHTML={{
            __html: problem.editorial || "<p>—</p>",
          }}
        />
      </div>

      {/* Code Setup */}
      <div>
        <h2 className="text-base font-semibold mb-2">💻 Code Setup</h2>
        {problem.details.length ? (
          problem.details.map((d, i) => (
            <div
              key={i}
              className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-neutral-50 dark:bg-neutral-900 mb-2"
            >
              <p className="font-medium mb-1">{d.language}</p>

              <p className="font-semibold text-xs">Starter Code</p>
              <pre className="bg-neutral-200 dark:bg-neutral-800 rounded p-2 text-xs overflow-auto">
                {d.codeSnippet}
              </pre>

              <p className="font-semibold text-xs mt-2">Reference Solution</p>
              <pre className="bg-neutral-200 dark:bg-neutral-800 rounded p-2 text-xs overflow-auto">
                {d.referenceSolution}
              </pre>
            </div>
          ))
        ) : (
          <p className="text-neutral-500">No language setup added.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
