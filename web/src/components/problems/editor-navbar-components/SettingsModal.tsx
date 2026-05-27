import React, { memo } from "react";
import { CommandModal } from "@/components/ui/CommandModal";
import { Type, Settings2, Eye } from "lucide-react";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <CommandModal open={open} onClose={onClose}>
      {/* Structural Header Band */}
      <div className="p-4 border-b border-border-subtle dark:border-zinc-900 flex items-center gap-2.5 bg-surface-card/10 select-none">
        <Settings2 size={15} className="text-text-secondary opacity-60" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary dark:text-zinc-200">
          Workspace Configurations
        </h3>
      </div>

      <div className="p-4 overflow-y-auto max-h-[420px] custom-scrollbar">
        <SettingsContent />
      </div>
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
    <div className="space-y-6 text-xs text-text-primary">
      {/* === SECTION 1: TYPOGRAPHY AND SCALING PARAMETERS === */}
      <div className="space-y-3">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 flex items-center gap-1.5 select-none">
          <Type size={11} className="stroke-[2.2]" />
          <span>Editor Typography</span>
        </h4>

        <div className="space-y-3.5 bg-surface-panel/30 dark:bg-zinc-900/10 border border-border-subtle/60 dark:border-zinc-900 rounded-xl p-3.5 shadow-xs">
          {/* Font Size Selector Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-medium select-none">
              <span className="text-text-secondary">Font Scaling</span>
              <span className="font-mono text-[11px] font-bold bg-surface-card border border-border-subtle/70 px-1.5 py-0.5 rounded">
                {fontSize}px
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={12}
                max={22}
                step={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1 h-1 bg-border-subtle dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Separation Divider Pin */}
          <div className="h-[1px] w-full bg-border-subtle/30 dark:bg-zinc-900" />

          {/* Tab Spacing Options Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-medium select-none">
              <span className="text-text-secondary">Tab Width Offset</span>
              <span className="font-mono text-[11px] font-bold bg-surface-card border border-border-subtle/70 px-1.5 py-0.5 rounded">
                {tabSize} Spaces
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={2}
                max={8}
                step={2}
                value={tabSize}
                onChange={(e) => setTabSize(Number(e.target.value))}
                className="flex-1 h-1 bg-border-subtle dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* === SECTION 2: GRAPHICAL VIEWS PREFERENCES === */}
      <div className="space-y-3">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-50 flex items-center gap-1.5 select-none">
          <Eye size={11} className="stroke-[2.2]" />
          <span>Interface Display</span>
        </h4>

        <div className="divide-y divide-border-subtle/40 dark:divide-zinc-900 border border-border-subtle/60 dark:border-zinc-900 bg-surface-panel/30 dark:bg-zinc-900/10 rounded-xl overflow-hidden shadow-xs">
          {/* Toggle Block: Code Minimap Visibility */}
          <label className="flex items-center justify-between px-4 py-3 hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 transition-colors cursor-pointer select-none group">
            <div className="space-y-0.5 pr-4">
              <span className="font-medium text-text-primary group-hover:text-text-primary transition-colors">
                Code Minimap
              </span>
              <p className="text-[10px] text-text-secondary opacity-70 leading-normal">
                Displays a visual overview outline strip on the editor right
                column edge.
              </p>
            </div>
            <input
              type="checkbox"
              checked={minimap}
              onChange={() => setMinimap(!minimap)}
              className="w-7 h-4 rounded-full bg-border-subtle dark:bg-zinc-800 appearance-none checked:bg-amber-500 relative transition-all duration-200 cursor-pointer outline-none shrink-0
                after:absolute after:top-[2px] after:left-[2px] after:w-3 after:h-3 after:rounded-full after:bg-white dark:after:bg-zinc-400 checked:after:bg-zinc-950 after:transition-all checked:after:left-[14px]"
            />
          </label>

          {/* Toggle Block: Gutter Line Numbers */}
          <label className="flex items-center justify-between px-4 py-3 hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 transition-colors cursor-pointer select-none group">
            <div className="space-y-0.5 pr-4">
              <span className="font-medium text-text-primary group-hover:text-text-primary transition-colors">
                Line Number Gutter
              </span>
              <p className="text-[10px] text-text-secondary opacity-70 leading-normal">
                Show vertical index positioning margins inside the left file
                tracks.
              </p>
            </div>
            <input
              type="checkbox"
              checked={lineNumbers}
              onChange={() => setLineNumbers(!lineNumbers)}
              className="w-7 h-4 rounded-full bg-border-subtle dark:bg-zinc-800 appearance-none checked:bg-amber-500 relative transition-all duration-200 cursor-pointer outline-none shrink-0
                after:absolute after:top-[2px] after:left-[2px] after:w-3 after:h-3 after:rounded-full after:bg-white dark:after:bg-zinc-400 checked:after:bg-zinc-950 after:transition-all checked:after:left-[14px]"
            />
          </label>

          {/* Toggle Block: Text Word Wrap */}
          <label className="flex items-center justify-between px-4 py-3 hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 transition-colors cursor-pointer select-none group">
            <div className="space-y-0.5 pr-4">
              <span className="font-medium text-text-primary group-hover:text-text-primary transition-colors">
                Soft Word Wrapping
              </span>
              <p className="text-[10px] text-text-secondary opacity-70 leading-normal">
                Automatically force horizontal text characters to wrap within
                screen margins.
              </p>
            </div>
            <input
              type="checkbox"
              checked={wordWrap}
              onChange={() => setWordWrap(!wordWrap)}
              className="w-7 h-4 rounded-full bg-border-subtle dark:bg-zinc-800 appearance-none checked:bg-amber-500 relative transition-all duration-200 cursor-pointer outline-none shrink-0
                after:absolute after:top-[2px] after:left-[2px] after:w-3 after:h-3 after:rounded-full after:bg-white dark:after:bg-zinc-400 checked:after:bg-zinc-950 after:transition-all checked:after:left-[14px]"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default memo(SettingsModal);
