import React, { useState, useEffect, memo, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Code2, FileCode2, Binary, Loader2 } from "lucide-react";

interface CodeDetail {
  language: "PYTHON" | "JAVASCRIPT";
  codeSnippet: string;
  backgroundCode: string;
  referenceSolution: string;
}

interface CodeSetupSectionProps {
  problem: { details: CodeDetail[] };
  setProblem: React.Dispatch<React.SetStateAction<any>>;
}

/* --- MONACO INSTANCE MOUNTING SHIMMER --- */
const EditorFallback = memo(() => (
  <div className="w-full h-[250px] rounded-xl border border-border-subtle/60 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-2 select-none">
    <Loader2
      size={16}
      className="text-text-secondary opacity-40 animate-spin stroke-[2.5]"
    />
    <span className="font-mono text-[10px] text-text-secondary opacity-40">
      // Mounting compiler workspace...
    </span>
  </div>
));
EditorFallback.displayName = "EditorFallback";

export const CodeSetupSection: React.FC<CodeSetupSectionProps> = ({
  problem,
  setProblem,
}) => {
  // Reactive tracking layer mapping active system document mutations
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">(
    "vs-dark",
  );

  useEffect(() => {
    const checkThemeMatch = () => {
      const isDarkActive = document.documentElement.classList.contains("dark");
      setEditorTheme(isDarkActive ? "vs-dark" : "light");
    };

    checkThemeMatch(); // Initial mapping pass

    // Mutation Observer handles reactive global theme alterations instantly
    const themeObserver = new MutationObserver(checkThemeMatch);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => themeObserver.disconnect();
  }, []);

  const handleChange = useCallback(
    (lang: CodeDetail["language"], field: keyof CodeDetail, value: string) => {
      setProblem((prev: { details: CodeDetail[] }) => ({
        ...prev,
        details: (prev.details || []).map((d) =>
          d.language === lang ? { ...d, [field]: value } : d,
        ),
      }));
    },
    [setProblem],
  );

  // Shared immutable config matrix maximizing viewport response times
  const coreEditorOptions = {
    minimap: { enabled: false },
    fontSize: 12,
    fontFamily: "var(--font-mono), Menlo, Monaco, 'Courier New', monospace",
    lineHeight: 19,
    padding: { top: 12, bottom: 12 },
    scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
    automaticLayout: true,
    tabSize: 2,
  };

  return (
    <div className="w-full space-y-8 font-sans text-text-primary">
      {problem.details?.map((detail) => {
        const syntaxLang =
          detail.language.toLowerCase() === "javascript"
            ? "javascript"
            : "python";

        return (
          <div
            key={`lang-block-${detail.language}`}
            className="space-y-4 border-b border-border-subtle/20 dark:border-zinc-900/40 pb-6 last:border-none last:pb-0"
          >
            {/* Language Pill Row */}
            <div className="flex items-center gap-2 select-none">
              <FileCode2 size={14} className="text-amber-500 stroke-[2.2]" />
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-text-primary">
                {detail.language} Configuration Environment
              </h3>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {/* --- FIELD 1: EDITABLE CODE SNIPPET BOILERPLATE --- */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 select-none opacity-60">
                  <Code2
                    size={12}
                    className="text-text-secondary stroke-[2.2]"
                  />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-text-secondary">
                    Starter Code Snippet (User Base Workspace)
                  </p>
                </div>
                <div className="rounded-xl border border-border-subtle/80 dark:border-zinc-800 overflow-hidden shadow-3xs group focus-within:border-border-intense dark:focus-within:border-zinc-700 transition-colors">
                  <Editor
                    height="250px"
                    language={syntaxLang}
                    theme={editorTheme}
                    loading={<EditorFallback />}
                    value={detail.codeSnippet}
                    onChange={(val) =>
                      handleChange(detail.language, "codeSnippet", val || "")
                    }
                    options={coreEditorOptions}
                  />
                </div>
              </div>

              {/* --- FIELD 2: REFERENCE STABLE SOLUTION CODE --- */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 select-none opacity-60">
                  <Code2 size={12} className="text-emerald-500 stroke-[2.2]" />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-text-secondary">
                    Official Reference Solution (Unlocked Post-Submission)
                  </p>
                </div>
                <div className="rounded-xl border border-border-subtle/80 dark:border-zinc-800 overflow-hidden shadow-3xs group focus-within:border-border-intense dark:focus-within:border-zinc-700 transition-colors">
                  <Editor
                    height="250px"
                    language={syntaxLang}
                    theme={editorTheme}
                    loading={<EditorFallback />}
                    value={detail.referenceSolution}
                    onChange={(val) =>
                      handleChange(
                        detail.language,
                        "referenceSolution",
                        val || "",
                      )
                    }
                    options={coreEditorOptions}
                  />
                </div>
              </div>
            </div>

            {/* --- FIELD 3: CONTEXT HIDDEN BACKGROUND EVALUATION LAYER --- */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 select-none opacity-60">
                <Binary size={12} className="text-rose-500 stroke-[2.2]" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-text-secondary">
                  Background Evaluation Driver Execution Code (Hidden from User)
                </p>
              </div>
              <div className="rounded-xl border border-border-subtle/80 dark:border-zinc-800 overflow-hidden shadow-3xs group focus-within:border-border-intense dark:focus-within:border-zinc-700 transition-colors">
                <Editor
                  height="180px"
                  language={syntaxLang}
                  theme={editorTheme}
                  loading={<EditorFallback />}
                  value={detail.backgroundCode}
                  onChange={(val) =>
                    handleChange(detail.language, "backgroundCode", val || "")
                  }
                  options={coreEditorOptions}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(CodeSetupSection);
