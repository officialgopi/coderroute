import { useEffect } from "react";
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<
  ThemeState,
  [["zustand/persist", ThemeState]]
>(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        }));
        if (get().theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return children;
};
