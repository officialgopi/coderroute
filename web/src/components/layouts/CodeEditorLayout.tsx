import { Outlet } from "react-router-dom";
import CodeEditorPageNavbar from "../problems/CodeEditorPageNavbar";

const CodeEditorLayout = () => {
  return (
    <div className="w-full">
      <CodeEditorPageNavbar />
      <div className="w-full mt-[60px] h-[calc(100vh-60px)] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default CodeEditorLayout;
