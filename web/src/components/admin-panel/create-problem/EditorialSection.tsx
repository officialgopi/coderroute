import type { CreateProblemBody } from "@/types/types";
import React, { Suspense, lazy } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = lazy(() => import("react-quill-new"));

interface Props {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

const EditorialSection: React.FC<Props> = ({ problem, setProblem }) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Write a detailed editorial explaining the problem approach.
      </p>

      <Suspense
        fallback={
          <div className="text-sm text-neutral-500">Loading editor...</div>
        }
      >
        <ReactQuill
          theme="snow"
          value={problem.editorial}
          onChange={(val: string) =>
            setProblem((prev) => ({ ...prev, editorial: val }))
          }
          className="text-sm bg-neutral-50 dark:bg-neutral-900 rounded-md border border-neutral-300 dark:border-neutral-700"
        />
      </Suspense>
    </div>
  );
};

export default EditorialSection;
