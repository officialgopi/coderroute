import Editor from "@monaco-editor/react";

export const CodeEditorPane = () => (
  <div className="h-full flex flex-col ">
    <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
      <select className=" rounded px-2 py-1 text-sm">
        {["PYTHON", "JAVASCRIPT"].map((lang, idx) => (
          <option key={idx} value={lang}>
            {lang.toLocaleUpperCase()}
          </option>
        ))}
      </select>
    </div>
    <Editor
      height="100%"
      defaultLanguage="java"
      theme="vs-dark"
      defaultValue={`class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    \n  }\n}`}
    />
  </div>
);
