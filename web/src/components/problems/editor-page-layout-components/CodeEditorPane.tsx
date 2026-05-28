import {
  lazy,
  Suspense,
  useEffect,
  useState,
  useRef,
  memo,
  useCallback,
} from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/lib/theme.lib";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";
import { useProblemStore } from "@/store/problem.store";
import { ChevronDown, Sparkles, Check, Code } from "lucide-react";
import type { IProblem, TLanguage } from "@/types/types";

const Editor = lazy(() => import("@monaco-editor/react"));
const AIChatPanel = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/AiChatPanel"),
);

interface CodeEditorPaneProps {
  isProblemDetailsLoading: boolean;
  problemDetails: IProblem | undefined;
}

// Clean text configuration without relying on emojis or raw language logos
const LANGUAGE_CONFIG: Record<string, { label: string }> = {
  PYTHON: { label: "Python" },
  JAVASCRIPT: { label: "JavaScript" },
};

/* --- 💎 PREMIUM ISOLATED LANGUAGE SELECTOR COMPONENT --- */
const LanguageSelector = memo(() => {
  const { language, setLanguage } = useCodeEditorSettingsStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (lang: TLanguage) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentMeta = LANGUAGE_CONFIG[language.toUpperCase()] || {
    label: language,
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 h-6 px-2.5 rounded-md border border-border-subtle dark:border-zinc-800/80 bg-surface-panel/60 dark:bg-zinc-900/50 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700 font-mono text-[11px] font-bold tracking-tight outline-none cursor-pointer transition-all duration-150 focus-visible:ring-1 focus-visible:ring-amber-500/30"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Code size={11} className="opacity-60 text-text-secondary" />
        <span>{currentMeta.label}</span>
        <ChevronDown
          size={10}
          className={`opacity-60 transition-transform duration-200 stroke-[2.5] ${isOpen ? "rotate-180 text-amber-500" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-40 rounded-lg border border-border-subtle dark:border-zinc-800/80 bg-surface-panel/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div
            role="listbox"
            aria-label="Workspace compiler language environments"
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, meta]) => {
              const isSelected = language.toUpperCase() === key;
              return (
                <button
                  key={`lang-item-${key}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(key as TLanguage)}
                  className={`flex items-center justify-between w-full px-3 h-8 text-left text-[11px] font-mono font-medium transition-colors cursor-pointer outline-none ${
                    isSelected
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                      : "text-text-secondary hover:bg-surface-card/60 dark:hover:bg-zinc-800/30 hover:text-text-primary"
                  }`}
                >
                  <span className="truncate">{meta.label}</span>

                  {isSelected && (
                    <Check
                      size={11}
                      className="text-amber-500 shrink-0 stroke-[2.5] animate-scale-in"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

LanguageSelector.displayName = "LanguageSelector";

/* --- MAIN WORKSPACE CANVAS WRAPPER --- */
export const CodeEditorPane = ({ problemDetails }: CodeEditorPaneProps) => {
  const { fontSize, tabSize, minimap, lineNumbers, wordWrap, language } =
    useCodeEditorSettingsStore();

  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const aiPanelRef = useRef<ImperativePanelHandle>(null);

  const { theme } = useThemeStore();
  const { codeInEditor, setCodeInEditor } = useProblemStore();

  useEffect(() => {
    const targetSnippet = problemDetails?.problemDetails?.find(
      (pd) => pd.language?.toUpperCase() === language?.toUpperCase(),
    )?.codeSnippet;

    setCodeInEditor(targetSnippet || "");
  }, [language, problemDetails, setCodeInEditor]);

  const handlePanelExpand = useCallback(() => setIsAiChatOpen(true), []);
  const handlePanelCollapse = useCallback(() => setIsAiChatOpen(false), []);

  const toggleAiChatChannel = useCallback(() => {
    const targetPanel = aiPanelRef.current;
    if (!targetPanel) return;

    if (targetPanel.isCollapsed()) {
      targetPanel.expand(35);
    } else {
      targetPanel.collapse();
    }
  }, []);

  if (!problemDetails) {
    return (
      <div className="h-full w-full bg-surface-panel/50 dark:bg-zinc-900/20 animate-pulse flex items-center justify-center font-mono text-xs text-text-secondary opacity-40">
        // Syncing virtual stream files...
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-bg-canvas dark:bg-zinc-950/40 overflow-hidden">
      {/* --- INTEGRATED SUB-HEADER MICRO TOOLBAR --- */}
      <div className="h-9 shrink-0 flex items-center justify-between px-4 bg-surface-card/40 dark:bg-zinc-950/40 border-b border-border-subtle/50 dark:border-zinc-900/60 relative z-50 select-none">
        <LanguageSelector />

        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={toggleAiChatChannel}
            className={`h-6 px-2.5 rounded-md border text-[11px] font-medium gap-1.5 cursor-pointer transition-all duration-150 shadow-2xs focus-visible:ring-1 focus-visible:ring-amber-500/30 ${
              isAiChatOpen
                ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold"
                : "bg-surface-panel dark:bg-zinc-900 border-border-subtle dark:border-zinc-800 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700"
            }`}
          >
            <Sparkles
              size={11}
              className={isAiChatOpen ? "text-amber-500" : "opacity-70"}
            />
            <span>AI Copilot</span>
          </Button>
        </div>
      </div>

      {/* --- RUNTIME SOURCE VIEW SPLIT GRID --- */}
      <div className="flex-1 w-full overflow-hidden relative">
        <PanelGroup
          direction="horizontal"
          autoSaveId="coderroute-editor-inner-v4"
          className="w-full h-full"
        >
          <Panel minSize={45} className="h-full relative overflow-hidden">
            <div className="absolute inset-0 pt-2 bg-transparent">
              <Suspense
                fallback={
                  <div className="h-full w-full bg-transparent animate-pulse flex items-center justify-center font-mono text-xs text-text-secondary opacity-30">
                    // Compiling editor frame buffer...
                  </div>
                }
              >
                <Editor
                  height="100%"
                  theme={theme === "dark" ? "vs-dark" : "vs-light"}
                  value={codeInEditor}
                  language={language.toLowerCase()}
                  onChange={(value) => setCodeInEditor(value || "")}
                  options={{
                    minimap: { enabled: minimap },
                    fontSize: fontSize,
                    tabSize: tabSize,
                    wordWrap: wordWrap ? "on" : "off",
                    lineNumbers: lineNumbers ? "on" : "off",
                    fontFamily:
                      "JetBrains Mono, Fira Code, Menlo, Monaco, monospace",
                    fontLigatures: true,
                    wrappingIndent: "indent",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 },
                    lineHeight: 1.6,
                    lineNumbersMinChars: 3,
                    lineDecorationsWidth: 12,
                    scrollbar: {
                      vertical: "visible",
                      horizontal: "visible",
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                      useShadows: false,
                    },
                    quickSuggestions: true,
                    renderLineHighlight: "all",
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                  }}
                />
              </Suspense>
            </div>
          </Panel>

          <PanelResizeHandle
            className={`w-1.5 group relative flex items-center justify-center transition-colors duration-150 z-50 ${
              isAiChatOpen
                ? "cursor-col-resize hover:bg-amber-500/10 active:bg-amber-500/20"
                : "pointer-events-none"
            }`}
          >
            <div
              className={`w-[1px] h-full transition-colors duration-150 ${
                isAiChatOpen
                  ? "bg-border-subtle/50 dark:bg-zinc-800/80 group-hover:bg-amber-500/40"
                  : "bg-transparent"
              }`}
            />
          </PanelResizeHandle>

          <Panel
            ref={aiPanelRef}
            maxSize={50}
            minSize={25}
            collapsible
            defaultSize={0}
            onExpand={handlePanelExpand}
            onCollapse={handlePanelCollapse}
            className="h-full"
          >
            <div className="h-full pl-0.5 border-l border-border-subtle/50 dark:border-zinc-900/60 bg-surface-card/10 backdrop-blur-xs">
              <Suspense
                fallback={
                  <div className="h-full w-full bg-surface-panel/30 animate-pulse border-l border-border-subtle" />
                }
              >
                <AIChatPanel />
              </Suspense>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default memo(CodeEditorPane);
