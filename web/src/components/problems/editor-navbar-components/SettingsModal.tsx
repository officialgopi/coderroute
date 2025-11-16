import React from "react";
import { CommandModal } from "@/components/ui/CommandModal"; // Adjust the import path if needed
import { Type, Settings2 } from "lucide-react";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  return (
    <CommandModal open={open} onClose={onClose}>
      <SettingsContent />
    </CommandModal>
  );
};

export const SettingsContent = () => {
  const {
    fontSize,
    setFontSize,
    tabSize,
    setTabSize,

    minimap,
    setMinimap,
    lineNumbers,
    setLineNumbers,
    wordWrap,
    setWordWrap,
  } = useCodeEditorSettingsStore();

  return (
    <div className="flex flex-col gap-4 text-sm  p-4">
      {/* === Editor Font Size === */}
      <div className="flex flex-col gap-2 ">
        <h4 className=" font-medium flex items-center gap-2">
          <Type className="w-4 h-4 text-neutral-400" /> Editor Font Size
        </h4>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={10}
            max={24}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full  cursor-pointer"
          />
          <span className=" w-6 text-right">{fontSize}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h4 className=" font-medium flex items-center gap-2">
          <Type className="w-4 h-4 text-neutral-400" /> Editor Tab Size
        </h4>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={2}
            max={14}
            value={tabSize}
            onChange={(e) => setTabSize(Number(e.target.value))}
            className="w-full  cursor-pointer"
          />
          <span className=" w-6 text-right">{tabSize}</span>
        </div>
      </div>

      {/* === Monaco Editor Settings === */}
      <div className="flex flex-col gap-2">
        <h4 className=" font-medium flex items-center gap-2">
          <Settings2 className="w-4 h-4 " /> Monaco Editor
        </h4>
        <div className="flex flex-col gap-1">
          {Object.entries({
            tabSize,
            minimap,
            lineNumbers,
            wordWrap,
          }).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between px-3 py-2 rounded-md  cursor-pointer transition-colors"
            >
              <span className="capitalize ">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={() => {
                  switch (key) {
                    case "tabSize":
                      setTabSize(value as number);
                      break;
                    case "minimap":
                      setMinimap(!(value as boolean));
                      break;
                    case "lineNumbers":
                      setLineNumbers(!(value as boolean));
                      break;
                    case "wordWrap":
                      setWordWrap(!(value as boolean));
                      break;
                    case "fontSize":
                      setFontSize(value as number);
                      break;
                  }
                }}
                className=" cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
