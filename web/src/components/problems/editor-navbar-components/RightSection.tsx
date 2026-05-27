import { useThemeStore } from "@/lib/theme.lib";
import { useAuthStore } from "@/store/auth.store";
import { Moon, Settings, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { memo } from "react";

interface RightSectionProps {
  onOpenSettings: () => void;
}

export const RightSection = ({ onOpenSettings }: RightSectionProps) => {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();

  return (
    <div className="flex items-center justify-end gap-2.5 h-full select-none">
      {/* --- CORE PREFERENCES CONTROLS DECK --- */}
      <div className="flex items-center gap-1.5">
        {/* INTERACTIVE COLOR STANDARD TOGGLE */}
        <button
          onClick={() => toggleTheme()}
          className="flex items-center justify-center h-7 w-7 rounded-md border border-border-subtle dark:border-zinc-800/80 bg-surface-panel/30 dark:bg-zinc-950/20 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700 hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
          title={
            theme === "dark"
              ? "Switch to light theme mode"
              : "Switch to dark theme mode"
          }
        >
          {theme === "dark" ? (
            <Moon size={13} className="stroke-[2.2]" />
          ) : (
            <Sun size={13} className="stroke-[2.2]" />
          )}
        </button>

        {/* WORKSPACE PREFERENCES CONFIGURATIONS ANCHOR BUTTON */}
        <button
          onClick={onOpenSettings}
          className="flex items-center justify-center h-7 w-7 rounded-md border border-border-subtle dark:border-zinc-800/80 bg-surface-panel/30 dark:bg-zinc-950/20 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700 hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
          title="Open layout workspace configurations editor panel"
        >
          <Settings size={13} className="stroke-[2.2]" />
        </button>
      </div>

      {/* COMPILER SEPARATOR CONTROLS PIN */}
      <div className="h-4 w-[1px] bg-border-subtle/40 dark:bg-zinc-800/60 mx-0.5" />

      {/* --- SECURED USER ACCOUNT REDIRECT ENGINE --- */}
      {/* Fixed template routing configuration to evaluate variables rather than string loops */}
      <Link
        to={`/${user?.username}`}
        className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 rounded-full transition-transform active:scale-95 shrink-0"
        title={`View @${user?.username || "developer"}'s execution record profiling metrics`}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.username || "User"}'s profile avatar image layout`}
            className="w-6 h-6 rounded-full border border-border-subtle dark:border-zinc-800 object-cover bg-surface-panel"
            loading="lazy"
          />
        ) : (
          <div className="w-6 h-6 rounded-full border border-border-subtle dark:border-zinc-800 bg-surface-panel flex items-center justify-center text-text-secondary opacity-70">
            <User size={11} className="stroke-[2.5]" />
          </div>
        )}
      </Link>
    </div>
  );
};

export default memo(RightSection);
