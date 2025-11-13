import PageLoader from "@/components/loaders/PageLoader";
import { useProblemStore } from "@/store/problem.store";
import { lazy, Suspense, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Outlet, useParams } from "react-router-dom";

const CodeEditorPageNavbar = lazy(
  () => import("@/components/problems/CodeEditorPageNavbar")
);
const LeftSidebar = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/LeftSidebar")
);

const CodeEditorPane = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/CodeEditorPane")
);

const TestCases = lazy(
  () => import("@/components/problems/editor-page-layout-components/TestCases")
);

const CodeEditorPageLayout = () => {
  const { slug } = useParams();
  const {
    getProblemDetails,
    isProblemDetailsLoading,
    problemInCodeEditor,
    setProblemInCodeEditor,
  } = useProblemStore();

  useEffect(() => {
    async function fetchProblemDetails(slug: string) {
      const details = await getProblemDetails(slug);
      if (details) {
        setProblemInCodeEditor(details);
      }
    }
    if (slug) {
      fetchProblemDetails(slug);
    }
  }, [slug]);

  return (
    <div className="w-full h-screen overflow-hidden ">
      <Suspense fallback={<div>Loading...</div>}>
        <CodeEditorPageNavbar />
      </Suspense>
      <div className="w-full mt-[60px] h-[calc(100vh-60px)] overflow-hidden ">
        <div className="h-full w-full   flex overflow-hidden">
          {/* Left Sidebar */}

          {/* Horizontal Panels: Left (Description) | Right (Editor + Testcases) */}
          <PanelGroup
            direction="horizontal"
            className="flex-1 flex gap-[1px] overflow-hidden h-full"
            autoSaveId="coderroute-problem-layout"
          >
            {/* Left Panel */}

            <Panel
              defaultSize={40}
              minSize={25}
              maxSize={55}
              className="overflow-hidden  h-full  "
            >
              <div className="h-full p-1  overflow-hidden ">
                <div className="h-full flex flex-col w-full border rounded-md p-2 dark:bg-neutral-900  ">
                  <Suspense fallback={<div>Loading...</div>}>
                    <LeftSidebar
                      isProblemDetailsLoading={isProblemDetailsLoading}
                      problemDetails={problemInCodeEditor}
                    />
                  </Suspense>
                  <div className="flex-1 overflow-y-scroll">
                    <Outlet />
                  </div>
                </div>
              </div>
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="w-1 transition-colors  active:bg-neutral-500/50 bg-neutral-500/10 hover:bg-neutral-500/30  hover:opacity-100  cursor-col-resize p-0" />

            {/* Right Panel (Editor + Bottom Testcases) */}
            <Panel className="overflow-hidden  h-full  border-neutral-800">
              <PanelGroup direction="vertical">
                {/* Code Editor */}
                <Panel
                  defaultSize={70}
                  minSize={50}
                  className="p-2 h-full rounded-md overflow-hidden "
                >
                  <Suspense fallback={<PageLoader />}>
                    <CodeEditorPane
                      problemDetails={problemInCodeEditor}
                      isProblemDetailsLoading={isProblemDetailsLoading}
                    />
                  </Suspense>
                </Panel>

                {/* Resize Handle */}
                <PanelResizeHandle className="h-1 transition-colors  active:bg-neutral-500/50 bg-neutral-500/10 hover:bg-neutral-500/30  p-0 hover:opacity-100  cursor-col-resize" />

                {/* Testcase Section */}
                <Panel defaultSize={30} minSize={15} className="p-2">
                  {/* <TestcasePanel /> */}
                  <div className="h-full overflow-y-scroll border rounded-md  dark:bg-neutral-900 ">
                    <Suspense fallback={<div>Loading...</div>}>
                      <TestCases
                        isProblemDetailsLoading={isProblemDetailsLoading}
                        testCases={problemInCodeEditor?.testcases!}
                      />
                    </Suspense>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
};
export default CodeEditorPageLayout;
