import PageLoader from "@/components/loaders/PageLoader";
import { useThemeStore } from "@/lib/theme.lib";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";
import { useProblemStore } from "@/store/problem.store";
import type { IProblem, TLanguage } from "@/types/types";
import { ChevronDown } from "lucide-react";
import { lazy, Suspense, useEffect } from "react";

const Editor = lazy(() => import("@monaco-editor/react"));

const CodeEditorPane = ({
  isProblemDetailsLoading,
  problemDetails,
}: {
  isProblemDetailsLoading: boolean;
  problemDetails: IProblem | undefined;
}) => {
  const {
    fontSize,
    tabSize,
    minimap,
    lineNumbers,
    wordWrap,
    language,
    setLanguage,
  } = useCodeEditorSettingsStore();
  const { theme } = useThemeStore();
  const { codeInEditor, setCodeInEditor } = useProblemStore();
  useEffect(() => {
    setCodeInEditor(
      problemDetails?.problemDetails?.find((pd) => pd.language === language)
        ?.codeSnippet || ""
    );
  }, [language, problemDetails]);

  return isProblemDetailsLoading ? (
    <PageLoader />
  ) : (
    <div className="h-full flex flex-col rounded-md overflow-hidden  ">
      <div className="flex items-center justify-between px-4 py-2 ">
        <div className="relative inline-block">
          <select
            className="appearance-none pr-8 w-fit rounded-md border bg-neutral-100 dark:bg-neutral-900
               border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100
               text-sm px-3 py-1.5 outline-none transition-all duration-200
               focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600
               hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value as TLanguage)}
          >
            {["PYTHON", "JAVASCRIPT"].map((lang, idx) => (
              <option key={idx} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-400 pointer-events-none"
          />
        </div>
      </div>
      <div className="flex-1 rounded-md overflow-hidden border ">
        <Suspense fallback={<PageLoader />}>
          <Editor
            height="100%"
            className="px-2 dark:bg-neutral-500/20"
            theme={theme === "dark" ? "vs-dark" : "vs-light"}
            value={codeInEditor}
            language={language.toLowerCase()}
            onChange={(value) => {
              setCodeInEditor(value || "");
            }}
            options={{
              language: language.toLowerCase(),
              minimap: {
                enabled: minimap,
              },
              fontSize: fontSize,
              tabSize: tabSize,
              wordWrap: wordWrap ? "on" : "off",
              lineNumbers: lineNumbers ? "on" : "off",
              wrappingIndent: "indent",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              "semanticHighlighting.enabled": true,
              padding: {
                top: 10,
                bottom: 10,
              },
              lineHeight: 1.5,
              lineNumbersMinChars: 1,
              lineDecorationsWidth: 20, // adds spacing on the left
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};
export default CodeEditorPane;
