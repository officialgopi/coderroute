import PageLoader from "@/components/loaders/PageLoader";
import type { IProblem, TLanguage } from "@/types/types";
import { lazy, Suspense } from "react";

const Editor = lazy(() => import("@monaco-editor/react"));

const CodeEditorPane = ({
  isProblemDetailsLoading,
  problemDetails,
  language,
  setLanguage,
}: {
  isProblemDetailsLoading: boolean;
  problemDetails: IProblem | null;
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
}) =>
  isProblemDetailsLoading ? (
    <PageLoader />
  ) : (
    <div className="h-full flex flex-col ">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
        <select
          className=" rounded px-2 py-1 text-sm"
          value={language}
          onChange={(e) => setLanguage(e.target.value as TLanguage)}
        >
          {["PYTHON", "JAVASCRIPT"].map((lang, idx) => (
            <option key={idx} value={lang}>
              {lang.toLocaleUpperCase()}
            </option>
          ))}
        </select>
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
