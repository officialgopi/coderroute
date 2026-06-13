// src/components/ui/ThemeToggleButton.tsx
import React, { memo } from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/theme.lib";

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={() => toggleTheme()}
      type="button"
      className="p-2 rounded-xl border border-border-subtle bg-bg-secondary text-text-secondary hover:text-text-primary hover:border-text-muted/20 transition-all duration-150 cursor-pointer shadow-3xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-gold/40 active:scale-95 flex items-center justify-center outline-hidden"
      aria-label="Toggle system interface style theme"
    >
      {theme === "light" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
};

export default memo(ThemeToggleButton);
