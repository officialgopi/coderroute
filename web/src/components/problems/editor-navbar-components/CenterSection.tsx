import { Loader2, Play, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCodeExecutionStore } from "@/store/code-execution.store";
import { useProblemStore } from "@/store/problem.store";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";
import { useSubmissionStore } from "@/store/submission.store";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

export const CenterSection = () => {
  const { problemInCodeEditor, codeInEditor } = useProblemStore();
  const { isRunning, isSubmitting, runCode, submitCode } =
    useCodeExecutionStore();
  const { setSubmission } = useSubmissionStore();
  const { language } = useCodeEditorSettingsStore();
  const navigate = useNavigate();

  const isLocked = isRunning || isSubmitting;

  const handleRun = async () => {
    if (!problemInCodeEditor?.id) return;
    await runCode(problemInCodeEditor.id, codeInEditor, language);
  };

  const handleSubmit = async () => {
    if (!problemInCodeEditor?.id) return;
    const submission = await submitCode(
      problemInCodeEditor.id,
      codeInEditor,
      language,
    );
    if (submission) {
      setSubmission(submission);
      navigate(
        `/problems/${problemInCodeEditor?.slug}/submissions/${submission.id}`,
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-full select-none">
      <div className="inline-flex items-center shadow-xs rounded-md overflow-hidden border border-border-subtle dark:border-zinc-800/80 bg-surface-panel/30 dark:bg-zinc-950/20">
        {/* --- RUN INTERACTION CONTROL BUTTON --- */}
        <Button
          variant="ghost"
          disabled={isLocked}
          onClick={handleRun}
          className="h-7 px-3 rounded-none bg-transparent hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 border-none text-text-secondary hover:text-text-primary transition-colors cursor-pointer text-xs font-medium gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/30"
          title="Execute current source buffer code inputs against runtime testcases"
        >
          {isRunning ? (
            <Loader2 size={12} className="animate-spin text-amber-500" />
          ) : (
            <Play
              size={12}
              className="text-emerald-500 fill-emerald-500/10 stroke-[2.2]"
            />
          )}
          <span className="hidden sm:inline tracking-tight">Run</span>
        </Button>

        {/* COMPILER MONOLITH DIVIDER PIN */}
        <div className="h-4 w-[1px] bg-border-subtle/50 dark:bg-zinc-800/60 shrink-0" />

        {/* --- DEPLOYMENT SUBMISSION TRIGGER CONTROL --- */}
        <Button
          variant="ghost"
          onClick={handleSubmit}
          disabled={isLocked}
          className="h-7 px-3 rounded-none bg-transparent hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 border-none text-text-secondary hover:text-text-primary transition-colors cursor-pointer text-xs font-medium gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/30"
          title="Submit production source code bundle to online evaluation grader engine"
        >
          {isSubmitting ? (
            <Loader2 size={12} className="animate-spin text-amber-500" />
          ) : (
            <Upload size={12} className="text-amber-500 stroke-[2.2]" />
          )}
          <span className="tracking-tight">Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(CenterSection);
