import { useProblemStore, type IProblem } from "@/store/problem.store";
import type { TLanguage } from "@/types/types";
import { lazy, Suspense, useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "react-router-dom";

const CodeEditorPageNavbar = lazy(
  () => import("@/components/problems/CodeEditorPageNavbar")
);
const LeftSidebar = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/LeftSidebar")
);

const ProblemDescription = lazy(
  () =>
    import(
      "@/components/problems/editor-page-layout-components/ProblemDescription"
    )
);

const CodeEditorPane = lazy(
  () =>
    import("@/components/problems/editor-page-layout-components/CodeEditorPane")
);

const TestCases = lazy(
  () => import("@/components/problems/editor-page-layout-components/TestCases")
);

const CodeEditorPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const { slug } = useParams();
  const { getProblemDetails, isProblemDetailsLoading } = useProblemStore();
  //SETTINGS
  const [language, setLanguage] = useState<TLanguage>("PYTHON");

  const [problemDetails, setProblemDetails] = useState<IProblem | null>(null);
  useEffect(() => {
    async function fetchProblemDetails(slug: string) {
      const details = await getProblemDetails(slug);
      if (details) {
        setProblemDetails(details);
      }
    }
    if (slug) {
      fetchProblemDetails(slug);
    }
  }, [slug]);
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <CodeEditorPageNavbar />
      </Suspense>
      <div className="w-full mt-[60px] h-[calc(100vh-60px)] overflow-hidden">
        {/* <Outlet /> */}

        <div className="h-screen w-full p-2  flex overflow-hidden">
          {/* Left Sidebar */}

          {/* Horizontal Panels: Left (Description) | Right (Editor + Testcases) */}
          <PanelGroup
            direction="horizontal"
            className="flex-1"
            autoSaveId="coderroute-problem-layout"
          >
            {/* Left Panel */}

            <Panel
              defaultSize={40}
              minSize={25}
              maxSize={55}
              className="overflow-y-auto border-r border-neutral-800"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <LeftSidebar
                  isProblemDetailsLoading={isProblemDetailsLoading}
                  problemDetails={problemDetails}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                {activeTab === "Description" && <ProblemDescription />}
              </Suspense>
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="w-1 bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-col-resize" />

            {/* Right Panel (Editor + Bottom Testcases) */}
            <Panel>
              <PanelGroup direction="vertical">
                {/* Code Editor */}
                <Panel defaultSize={70} minSize={50}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <CodeEditorPane
                      language={language}
                      setLanguage={setLanguage}
                      problemDetails={problemDetails}
                      isProblemDetailsLoading={isProblemDetailsLoading}
                    />
                  </Suspense>
                </Panel>

                {/* Resize Handle */}
                <PanelResizeHandle className="h-1 bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-row-resize" />

                {/* Testcase Section */}
                <Panel defaultSize={30} minSize={15}>
                  {/* <TestcasePanel /> */}
                  <Suspense fallback={<div>Loading...</div>}>
                    <TestCases
                      isProblemDetailsLoading={isProblemDetailsLoading}
                      testCases={problemDetails?.testCases!}
                    />
                  </Suspense>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
};
export default CodeEditorPage;
