import React, { lazy } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = lazy(() => import("react-quill-new"));

interface Props {
  problem: any;
  setProblem: any;
}

const ProblemMetadata: React.FC<Props> = ({ problem, setProblem }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={problem.title}
          onChange={(e) =>
            setProblem((p: any) => ({ ...p, title: e.target.value }))
          }
          className="input-field text-sm"
          placeholder="Enter problem title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Difficulty</label>
        <select
          value={problem.difficulty}
          onChange={(e) =>
            setProblem((p: any) => ({ ...p, difficulty: e.target.value }))
          }
          className="input-field text-sm"
        >
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <ReactQuill
          theme="snow"
          value={problem.description}
          onChange={(val) =>
            setProblem((p: any) => ({ ...p, description: val }))
          }
          className="text-sm bg-neutral-50 dark:bg-neutral-900 rounded-md border border-neutral-300 dark:border-neutral-700"
        />
      </div>
    </div>
  );
};

export default ProblemMetadata;
