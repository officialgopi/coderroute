import type { TLanguage } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CodeEditorSettingsState {
  fontSize: number;
  setFontSize: (size: number) => void;
  tabSize: number;
  setTabSize: (size: number) => void;
  minimap: boolean;
  setMinimap: (minimap: boolean) => void;
  lineNumbers: boolean;
  setLineNumbers: (lineNumbers: boolean) => void;
  wordWrap: boolean;
  setWordWrap: (wordWrap: boolean) => void;
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
}

export const useCodeEditorSettingsStore = create<
  CodeEditorSettingsState,
  [["zustand/persist", unknown]]
>(
  persist(
    (set) => ({
      fontSize: 14,
      setFontSize: (size: number) => set({ fontSize: size }),
      tabSize: 2,
      setTabSize: (size: number) => set({ tabSize: size }),
      minimap: false,
      setMinimap: (minimap: boolean) => set({ minimap: minimap }),
      lineNumbers: true,
      setLineNumbers: (lineNumbers: boolean) =>
        set({ lineNumbers: lineNumbers }),
      wordWrap: true,
      setWordWrap: (wordWrap: boolean) => set({ wordWrap: wordWrap }),
      language: "JAVASCRIPT",
      setLanguage: (lang: TLanguage) => set({ language: lang }),
    }),
    {
      name: "code-editor-settings",
    }
  )
);
