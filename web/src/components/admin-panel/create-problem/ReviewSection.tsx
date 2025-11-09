import type { CreateProblemBody } from "@/types/types";
import React from "react";

interface ReviewSectionProps {
  problem: CreateProblemBody;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ problem }) => {
  return (
    <div className="space-y-6 text-sm text-neutral-800 dark:text-neutral-200">
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
            <strong>Description:</strong>
          </p>
          <p className="pl-2 text-neutral-600 dark:text-neutral-400">
            {problem.description || "—"}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold mb-2">🧪 Testcases</h2>
        {problem.testcases.length ? (
          <div className="grid gap-3">
            {problem.testcases.map((t: any, i: number) => (
              <div
                key={i}
                className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-neutral-50 dark:bg-neutral-900"
              >
                <p className="font-medium">Case #{i + 1}</p>
                <p>
                  <strong>Input:</strong> {t.input}
                </p>
                <p>
                  <strong>Output:</strong> {t.output}
                </p>
                {t.explaination && (
                  <p>
                    <strong>Explanation:</strong> {t.explaination}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">No testcases added.</p>
        )}
      </div>

      <div>
        <h2 className="text-base font-semibold mb-2">💡 Hints & Constraints</h2>
        <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-neutral-50 dark:bg-neutral-900">
          <p>
            <strong>Constraints:</strong> {problem.constraints?.[0] || "—"}
          </p>
          <p>
            <strong>Hints:</strong> {problem.hints?.[0] || "—"}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold mb-2">🧭 Editorial</h2>
        <div
          className="prose prose-neutral dark:prose-invert text-sm border border-neutral-300 dark:border-neutral-700 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900"
          dangerouslySetInnerHTML={{ __html: problem.editorial || "<p>—</p>" }}
        />
      </div>

      <div>
        <h2 className="text-base font-semibold mb-2">💻 Code Setup</h2>
        {problem.details.map((d: any, i: number) => (
          <div
            key={i}
            className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 bg-neutral-50 dark:bg-neutral-900 mb-2"
          >
            <p className="font-medium mb-1">{d.language}</p>
            <p>
              <strong>Snippet:</strong>
            </p>
            <pre className="bg-neutral-200 dark:bg-neutral-800 rounded p-2 text-xs overflow-auto">
              {d.codeSnippet}
            </pre>
            <p className="mt-2">
              <strong>Reference Solution:</strong>
            </p>
            <pre className="bg-neutral-200 dark:bg-neutral-800 rounded p-2 text-xs overflow-auto">
              {d.referenceSolution}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
