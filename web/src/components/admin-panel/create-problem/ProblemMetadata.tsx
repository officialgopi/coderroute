import type { CreateProblemBody } from "@/types/types";
import React, { lazy } from "react";
import { Plus, Trash2 } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = lazy(() => import("react-quill-new"));

interface Props {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

const ProblemMetadata: React.FC<Props> = ({ problem, setProblem }) => {
  const addArg = () => {
    setProblem((p) => ({
      ...p,
      args: [...p.args, ""],
    }));
  };

  const updateArg = (index: number, value: string) => {
    setProblem((p) => ({
      ...p,
      args: p.args.map((arg, i) => (i === index ? value : arg)),
    }));
  };

  const removeArg = (index: number) => {
    setProblem((p) => ({
      ...p,
      args: p.args.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={problem.title}
          onChange={(e) => setProblem((p) => ({ ...p, title: e.target.value }))}
          className="input-field text-sm"
          placeholder="Enter problem title"
        />
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium mb-1">Difficulty</label>
        <select
          value={problem.difficulty}
          onChange={(e) =>
            setProblem((p) => ({
              ...p,
              difficulty: e.target.value as CreateProblemBody["difficulty"],
            }))
          }
          className="input-field text-sm"
        >
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">Output Format</label>

        <select
          value={problem.output_format}
          onChange={(e) =>
            setProblem((p) => ({
              ...p,
              output_format: e.target
                .value as CreateProblemBody["output_format"],
            }))
          }
          className="input-field text-sm"
        >
          <option value="PLAIN">Plain Text</option>
          <option value="JSON">JSON</option>
          <option value="FLOAT">Floating Point</option>
        </select>

        <p className="text-xs text-neutral-500">
          {problem.output_format === "PLAIN" &&
            "Exact string match (trimmed). Best for strings & integers."}
          {problem.output_format === "JSON" &&
            "Order-insensitive JSON comparison. Best for arrays & objects."}
          {problem.output_format === "FLOAT" &&
            "Floating-point comparison with tolerance (ε)."}
        </p>
      </div>
      {/* Args Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Function Arguments</label>
          <button
            type="button"
            onClick={addArg}
            className="btn-sub text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add Arg
          </button>
        </div>

        {problem.args?.length === 0 && (
          <p className="text-xs text-neutral-500">
            No arguments. Example: <code>solve()</code>
          </p>
        )}

        {problem.args?.map((arg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Arg {i + 1}</span>
            <input
              type="text"
              value={arg}
              onChange={(e) => updateArg(i, e.target.value)}
              placeholder="argument name"
              className="input-field text-sm flex-1"
            />
            <button
              type="button"
              onClick={() => removeArg(i)}
              className="btn-danger"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <ReactQuill
          theme="snow"
          value={problem.description}
          onChange={(val) => setProblem((p) => ({ ...p, description: val }))}
          className="text-sm bg-neutral-50 dark:bg-neutral-900 rounded-md border border-neutral-300 dark:border-neutral-700"
        />
      </div>
    </div>
  );
};

export default ProblemMetadata;
