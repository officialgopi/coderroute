import { useProblemStore } from "@/store/problem.store";
import { lazy, Suspense, useEffect, useState, memo } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Outlet, useParams } from "react-router-dom";

// Lazy-loaded workspace panel elements
const CodeEditorPageNavbar = lazy(
  () => import("@/components/problems/CodeEditorPageNavbar"),
);
const LeftSidebar = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/LeftSidebar"),
);
const CodeEditorPane = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/CodeEditorPane"),
);
const Testcases = lazy(
  () => import("@/components/problems/editor-page-layout-components/Testcases"),
);

export const CodeEditorPageLayout = () => {
  const { slug } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  const {
    getProblemDetails,
    isProblemDetailsLoading,
    problemInCodeEditor,
    setProblemInCodeEditor,
  } = useProblemStore();

  // Responsive Workspace Listener: Switches panels seamlessly between vertical stack and horizontal split modes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Toggles mode at the standard 1024px tablet breakpoint
    };

    handleResize(); // Initial call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProblemDetails(problemSlug: string) {
      const details = await getProblemDetails(problemSlug);
      if (details) {
        setProblemInCodeEditor(details);
      }
    }
    if (slug) {
      fetchProblemDetails(slug);
    }
  }, [slug, getProblemDetails, setProblemInCodeEditor]);

  return (
    // Root container blocks parent scroll bleed and sets up a clean, high-density developer environment
    <div className="h-screen w-screen flex flex-col bg-bg-canvas text-text-primary overflow-hidden antialiased select-none">
      {/* GLOBAL RUNTIME WORKSPACE NAVBAR */}
      <Suspense
        fallback={
          <div className="h-11 w-full bg-surface-panel/40 border-b border-border-subtle animate-pulse" />
        }
      >
        <CodeEditorPageNavbar />
      </Suspense>

      {/* CORE ACTIVE SPLIT-PANE INTERFACE ENVIRONMENT */}
      <div className="flex-1 w-full overflow-hidden relative z-10 bg-bg-canvas dark:bg-zinc-950">
        <PanelGroup
          key={isMobile ? "vertical-stack" : "horizontal-split"} // Forces a clean layout mount upon browser orientation shift
          direction={isMobile ? "vertical" : "horizontal"}
          autoSaveId={
            isMobile ? "coderroute-mobile-v4" : "coderroute-desktop-v4"
          }
          className="w-full h-full"
        >
          {/* --- PANEL 1: PROBLEM SPECIFICATION PANEL COLUMN --- */}
          <Panel
            defaultSize={isMobile ? 45 : 38}
            minSize={isMobile ? 25 : 20}
            maxSize={isMobile ? 70 : 60}
            className="h-full"
          >
            <div className="h-full p-1.5 lg:pr-0.5">
              <div className="h-full flex flex-col w-full bg-surface-panel/40 dark:bg-zinc-900/30 border border-border-subtle dark:border-zinc-800/80 rounded-xl overflow-hidden shadow-xs">
                {/* Meta Tabs Header Shell (Context Nav Track) */}
                <div className="shrink-0 bg-surface-card/40 dark:bg-zinc-950/20 border-b border-border-subtle dark:border-zinc-800/50 px-4 py-2">
                  <Suspense
                    fallback={
                      <div className="h-6 w-32 bg-surface-card rounded animate-pulse" />
                    }
                  >
                    <LeftSidebar
                      isProblemDetailsLoading={isProblemDetailsLoading}
                      problemDetails={problemInCodeEditor}
                    />
                  </Suspense>
                </div>

                {/* Left Dynamic Content Area (Enforces its own internal scrolling context) */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-transparent select-text">
                  <Outlet />
                </div>
              </div>
            </div>
          </Panel>

          {/* DYNAMIC LAYOUT ACCENT DIVIDER CHANNEL */}
          <PanelResizeHandle
            className={`transition-colors duration-150 hover:bg-amber-500/10 active:bg-amber-500/20 flex items-center justify-center z-50 ${
              isMobile
                ? "h-1.5 w-full cursor-row-resize flex-col"
                : "w-1.5 h-full cursor-col-resize flex-row"
            }`}
          >
            <div
              className={`bg-border-subtle/50 dark:bg-zinc-800/80 group-hover:bg-amber-500/40 transition-colors duration-150 ${
                isMobile ? "h-[1px] w-full" : "w-[1px] h-full"
              }`}
            />
          </PanelResizeHandle>

          {/* --- PANEL 2: COMPILER WORKSPACE COLUMN (EDITOR + TERMINAL) --- */}
          <Panel
            defaultSize={isMobile ? 55 : 62}
            minSize={isMobile ? 30 : 40}
            className="h-full"
          >
            <PanelGroup
              direction="vertical"
              autoSaveId="coderroute-editor-core-v4"
            >
              {/* COMPILER MONACO TEXT CANVAS CONTAINER */}
              <Panel defaultSize={65} minSize={35} className="h-full">
                <div className="h-full p-1.5 lg:pl-0.5 pb-0.5">
                  <div className="h-full w-full bg-surface-panel/30 dark:bg-zinc-900/10 border border-border-subtle dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-sm">
                    <Suspense
                      fallback={
                        <div className="h-full w-full bg-surface-panel/50 dark:bg-zinc-900/20 animate-pulse flex items-center justify-center font-mono text-xs text-text-secondary opacity-40">
                          // Allocating virtual core compiler buffers...
                        </div>
                      }
                    >
                      <CodeEditorPane
                        problemDetails={problemInCodeEditor}
                        isProblemDetailsLoading={isProblemDetailsLoading}
                      />
                    </Suspense>
                  </div>
                </div>
              </Panel>

              {/* VERTICAL ADJUSTMENT SUB-SEPARATOR CHANNEL */}
              <PanelResizeHandle className="h-1.5 group relative flex flex-col items-center justify-center transition-colors duration-150 hover:bg-amber-500/10 active:bg-amber-500/20 cursor-row-resize z-50">
                <div className="h-[1px] w-full bg-border-subtle/50 dark:bg-zinc-800/80 group-hover:bg-amber-500/40 group-active:bg-amber-500 transition-colors duration-150" />
              </PanelResizeHandle>

              {/* INTEGRATED RUNTIME TESTCASE OUTPUT CONSOLE */}
              <Panel defaultSize={35} minSize={15} className="h-full">
                <div className="h-full p-1.5 lg:pl-0.5 pt-0.5">
                  <div className="h-full flex flex-col w-full bg-surface-panel/40 dark:bg-zinc-900/30 border border-border-subtle dark:border-zinc-800/80 rounded-xl overflow-hidden shadow-xs">
                    {/* Upper Section Anchor Title Header Strip */}
                    <div className="shrink-0 bg-surface-card/40 dark:bg-zinc-950/20 border-b border-border-subtle dark:border-zinc-800/50 px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider text-text-secondary opacity-60">
                      Console Output / Testcases
                    </div>

                    {/* Scrolling Console Log Field */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-transparent min-h-0">
                      <Suspense
                        fallback={
                          <div className="w-full h-full bg-transparent animate-pulse" />
                        }
                      >
                        <Testcases />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default memo(CodeEditorPageLayout);
