import React, { Suspense, lazy, memo } from "react";
import { BookOpen } from "lucide-react";
import type { CreateProblemBody } from "@/types/types";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = lazy(() => import("react-quill-new"));

interface EditorialSectionProps {
  problem: CreateProblemBody;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}

/* --- RICH TEXT EDITOR LOADOUT FALLBACK SHIMMER --- */
const EditorSkeleton = memo(() => (
  <div className="w-full h-56 rounded-xl border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950 flex flex-col overflow-hidden animate-pulse">
    <div className="h-9 w-full bg-neutral-100 dark:bg-zinc-900 border-b border-border-subtle/40 dark:border-zinc-800/60" />
    <div className="p-4 space-y-2 flex-1">
      <div className="h-3.5 w-11/12 rounded bg-neutral-200 dark:bg-zinc-800 opacity-60" />
      <div className="h-3.5 w-5/6 rounded bg-neutral-200 dark:bg-zinc-800 opacity-40" />
      <div className="h-3.5 w-2/3 rounded bg-neutral-200 dark:bg-zinc-800 opacity-20" />
    </div>
  </div>
));
EditorSkeleton.displayName = "EditorSkeleton";

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  problem,
  setProblem,
}) => {
  return (
    <div className="w-full space-y-4 font-sans text-text-primary">
      {/* --- SECTION DESCRIPTIVE HEADER REGION --- */}
      <div className="flex items-center gap-2 select-none">
        <BookOpen size={13} className="text-amber-500 stroke-[2.2]" />
        <p className="text-xs font-semibold text-text-secondary opacity-80">
          Official Author Solution Editorial
        </p>
      </div>

      {/* --- RICH TEXT EDITORIAL FIELD CONTAINER --- */}
      <div className="w-full text-text-primary rounded-xl  border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-950/30 overflow-hidden shadow-3xs group focus-within:border-border-intense dark:focus-within:border-zinc-700 transition-colors">
        <Suspense fallback={<EditorSkeleton />}>
          <ReactQuill
            theme="snow"
            value={problem.editorial || ""}
            onChange={(val: string) =>
              setProblem((prev) => ({ ...prev, editorial: val }))
            }
            placeholder="Draft the official challenge analysis, optimal architectural walkthroughs, and explicit time/space complexity proofs..."
            className="font-sans text-xs dark:text-zinc-200 min-h-[180px]"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(EditorialSection);
