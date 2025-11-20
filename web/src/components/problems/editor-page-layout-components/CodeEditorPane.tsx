import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/lib/theme.lib";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";
import { useProblemStore } from "@/store/problem.store";
import type { IProblem, TLanguage } from "@/types/types";
import { ChevronDown } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const Editor = lazy(() => import("@monaco-editor/react"));
const AIChatPanel = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/AiChatPanel")
);

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
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);

  const { theme } = useThemeStore();
  const { codeInEditor, setCodeInEditor } = useProblemStore();
  useEffect(() => {
    setCodeInEditor(
      problemDetails?.problemDetails?.find((pd) => pd.language === language)
        ?.codeSnippet || ""
    );
  }, [language, problemDetails]);

  return isProblemDetailsLoading ? (
    <div className="h-full w-full rounded-md bg-neutral-100 dark:bg-neutral-500/20 animate-pulse" />
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
        <div className="flex items-center space-x-2">
          <Button
            variant={"outline"}
            onClick={() => setIsAiChatOpen((o) => !o)}
          >
            {isAiChatOpen ? "Close AI Chat" : "Open AI Chat"}
          </Button>
        </div>
      </div>
      <div className="flex-1 rounded-md overflow-hidden w-full h-full">
        <PanelGroup
          direction="horizontal"
          className=" bg-transparent border-0 overflow-hidden rounded-md h-full w-full"
        >
          <Panel
            maxSize={isAiChatOpen ? 70 : 100}
            minSize={isAiChatOpen ? 50 : 100}
            defaultSize={isAiChatOpen ? 50 : 100}
            className="h-full border-0 rounded-md overflow-hidden "
          >
            <Suspense
              fallback={
                <div className="h-full w-full bg-neutral-100 dark:bg-neutral-500/20 animate-pulse " />
              }
            >
              <Editor
                height="100%"
                className="px-2 dark:bg-neutral-500/20 rounded-md"
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
                  padding: {
                    top: 10,
                    bottom: 10,
                  },
                  lineHeight: 1.5,
                  lineNumbersMinChars: 1,
                  lineDecorationsWidth: 20, // adds spacing on the left
                  quickSuggestions: true,
                  quickSuggestionsDelay: 200,
                }}
              />
            </Suspense>
          </Panel>
          <PanelResizeHandle className="cursor-ew-resize bg-transparent border-0" />
          <Panel
            maxSize={isAiChatOpen ? 50 : 0}
            defaultSize={isAiChatOpen ? 50 : 0}
            minSize={isAiChatOpen ? 30 : 0}
            className="h-full border-0 rounded-md overflow-hidden "
          >
            {isAiChatOpen && (
              <div className="h-full w-full  border-l px-2 ">
                <Suspense
                  fallback={
                    <div className="h-full w-full bg-neutral-100 dark:bg-neutral-500/20 animate-pulse" />
                  }
                >
                  {/* AI Chat Component */}
                  <AIChatPanel />
                </Suspense>
              </div>
            )}
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
export default CodeEditorPane;
