import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { LeftSidebar } from "@/components/problems/editor-page-layout-components/LeftSidebar";
import { ProblemDescription } from "@/components/problems/editor-page-layout-components/ProblemDescription";
import { CodeEditorPane } from "@/components/problems/editor-page-layout-components/CodeEditorPane";
import TestCases from "@/components/problems/editor-page-layout-components/TestCases";

const CodeEditorPage = () => {
  const [activeTab, setActiveTab] = useState("Description");
  const testCases = [
    {
      id: 1,
      input: "2\n3",
      expectedOutput: "5",
      userOutput: "5",
      passed: true,
    },
    {
      id: 2,
      input: "10\n20",
      expectedOutput: "30",
      userOutput: "25",
      passed: false,
    },
    { id: 3, input: "0\n0", expectedOutput: "0" },
  ];
  return (
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
          <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "Description" && <ProblemDescription />}
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-col-resize" />

        {/* Right Panel (Editor + Bottom Testcases) */}
        <Panel>
          <PanelGroup direction="vertical">
            {/* Code Editor */}
            <Panel defaultSize={70} minSize={50}>
              <CodeEditorPane />
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="h-1 bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-row-resize" />

            {/* Testcase Section */}
            <Panel defaultSize={30} minSize={15}>
              {/* <TestcasePanel /> */}
              <TestCases testCases={testCases} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};
export default CodeEditorPage;
