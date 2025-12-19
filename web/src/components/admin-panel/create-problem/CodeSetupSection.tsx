import React from "react";
import Editor from "@monaco-editor/react";

interface CodeDetail {
  language: "PYTHON" | "JAVASCRIPT";
  codeSnippet: string;
  backgroundCode: string;
  referenceSolution: string;
}

interface Props {
  problem: { details: CodeDetail[] };
  setProblem: React.Dispatch<React.SetStateAction<any>>;
}

const CodeSetupSection: React.FC<Props> = ({ problem, setProblem }) => {
  const handleChange = (
    lang: CodeDetail["language"],
    field: keyof CodeDetail,
    value: string
  ) => {
    setProblem((prev: { details: CodeDetail[] }) => ({
      ...prev,
      details: prev.details.map((d: CodeDetail) =>
        d.language === lang ? { ...d, [field]: value } : d
      ),
    }));
  };

  const getTheme = () =>
    document.documentElement.classList.contains("dark")
      ? "vs-dark"
      : "vs-light";

  return (
    <div className="space-y-6">
      {problem.details.map((detail) => (
        <div key={detail.language} className="space-y-3">
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            {detail.language}
          </h3>

          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              Code Snippet (Editable Section)
            </p>
            <Editor
              height="250px"
              language={detail.language.toLowerCase()}
              theme={getTheme()}
              value={detail.codeSnippet}
              onChange={(val) =>
                handleChange(detail.language, "codeSnippet", val || "")
              }
              options={{ minimap: { enabled: false }, fontSize: 13 }}
            />
          </div>

          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              Reference Solution (Visible to user)
            </p>
            <Editor
              height="250px"
              language={detail.language.toLowerCase()}
              theme={getTheme()}
              value={detail.referenceSolution}
              onChange={(val) =>
                handleChange(detail.language, "referenceSolution", val || "")
              }
              options={{ minimap: { enabled: false }, fontSize: 13 }}
            />
          </div>

          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              Background Code (Hidden from user)
            </p>
            <Editor
              height="200px"
              language={detail.language.toLowerCase()}
              theme={getTheme()}
              value={detail.backgroundCode}
              onChange={(val) =>
                handleChange(detail.language, "backgroundCode", val || "")
              }
              options={{
                minimap: { enabled: false },
                readOnly: false,
                fontSize: 13,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodeSetupSection;
