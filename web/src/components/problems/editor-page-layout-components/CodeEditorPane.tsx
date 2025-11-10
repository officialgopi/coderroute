import PageLoader from "@/components/loaders/PageLoader";
import type { IProblem, TLanguage } from "@/types/types";
import { ChevronDown } from "lucide-react";
import { lazy, Suspense } from "react";

const Editor = lazy(() => import("@monaco-editor/react"));

const CodeEditorPane = ({
  isProblemDetailsLoading,
  problemDetails,
  language,
  setLanguage,
}: {
  isProblemDetailsLoading: boolean;
  problemDetails: IProblem | undefined;
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
}) =>
  isProblemDetailsLoading ? (
    <PageLoader />
  ) : (
    <div className="h-full flex flex-col ">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
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
      <Suspense fallback={<PageLoader />}>
        <Editor
          height="100%"
          defaultLanguage="java"
          theme="vs-dark"
          value={
            problemDetails?.problemDetails?.find(
              (pd) => pd.language === language
            )?.codeSnippet || ""
          }
          options={{
            language: language.toLowerCase(),
            minimap: {
              enabled: false,
            },
            fontSize: 14,
            wordWrap: "on",
            wrappingIndent: "indent",
            scrollBeyondLastLine: false,
          }}
        />
      </Suspense>
    </div>
  );

export default CodeEditorPane;
