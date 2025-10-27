import React from "react";
import { CommandModal } from "@/components/ui/CommandModal"; // Adjust the import path if needed
import { AnimatePresence } from "framer-motion";
import { Type, Settings2 } from "lucide-react";
import { useState } from "react";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <CommandModal open={open} onClose={onClose}>
          <SettingsContent />
        </CommandModal>
      )}
    </AnimatePresence>
  );
};

export const SettingsContent = () => {
  const [fontSize, setFontSize] = useState(14);
  const [editorSettings, setEditorSettings] = useState({
    minimap: true,
    lineNumbers: true,
    wordWrap: false,
  });

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

      {/* === Monaco Editor Settings === */}
      <div className="flex flex-col gap-2">
        <h4 className=" font-medium flex items-center gap-2">
          <Settings2 className="w-4 h-4 " /> Monaco Editor
        </h4>
        <div className="flex flex-col gap-1">
          {Object.entries(editorSettings).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between px-3 py-2 rounded-md  cursor-pointer transition-colors"
            >
              <span className="capitalize ">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setEditorSettings((prev) => ({
                    ...prev,
                    [key]: !value,
                  }))
                }
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
