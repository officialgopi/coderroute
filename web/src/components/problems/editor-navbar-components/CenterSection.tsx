import { Loader2, Play, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCodeExecutionStore } from "@/store/code-execution.store";
import { useProblemStore } from "@/store/problem.store";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";

const CenterSection = () => {
  const { problemInCodeEditor, codeInEditor } = useProblemStore();
  const { isRunning, isSubmitting, runCode, submitCode } =
    useCodeExecutionStore();
  const { language } = useCodeEditorSettingsStore();
  const handleRun = async () => {
    await runCode(
      problemInCodeEditor?.id!,
      codeInEditor,
      problemInCodeEditor?.testcases?.map((tc) => tc.input) || [],
      problemInCodeEditor?.testcases?.map((tc) => tc.output) || [],
      language
    );
  };
  const handleSubmit = async () => {
    await submitCode(problemInCodeEditor?.id!, codeInEditor, language);
  };
  return (
    <div className="flex items-center  flex-1 justify-center">
      <Button
        variant="outline"
        className=" rounded-md text-sm font-medium flex items-center gap-2 px-3 rounded-r-none"
        disabled={isRunning || isSubmitting}
        onClick={handleRun}
      >
        {!isRunning ? (
          <Play className="w-4 h-4" />
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </Button>
      <Button
        variant="outline"
        className="transition-colors   rounded-md  rounded-l-none text-sm font-medium flex items-center gap-2 px-3"
        onClick={handleSubmit}
        disabled={isRunning || isSubmitting}
      >
        {!isSubmitting ? (
          <Upload className="w-4 h-4" />
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        Submit
      </Button>
    </div>
  );
};

export default CenterSection;
