import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { memo } from "react";

interface LeftSectionProps {
  onToggleSidebar: () => void;
}

export const LeftSection = ({ onToggleSidebar }: LeftSectionProps) => {
  return (
    <div className="flex items-center gap-4 h-full select-none">
      {/* BRAND GATEWAY PORTAL ICON LAYER */}
      <Link
        to="/"
        className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 rounded transition-transform active:scale-95 shrink-0"
        title="Return to CoderRoute Dashboard"
      >
        <img
          src="/coderroute.png"
          alt="CoderRoute"
          className="w-6 h-6 rounded object-cover shadow-xs border border-border-subtle/50"
        />
      </Link>

      {/* COMPILER SEPARATOR PIN */}
      <div className="h-4 w-[1px] bg-border-subtle/40 dark:bg-zinc-800/60 hidden sm:block" />

      {/* CURATED SHEET DRAWER TRACK HOOK BUTTON */}
      <button
        onClick={onToggleSidebar}
        className="flex items-center gap-2 h-7 px-2.5 rounded-md border border-border-subtle dark:border-zinc-800/80 bg-surface-panel/30 dark:bg-zinc-950/20 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700 hover:bg-surface-card/40 dark:hover:bg-zinc-900/15 cursor-pointer transition-all duration-150 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
        title="Open daily challenges curation board"
      >
        <Menu size={13} className="opacity-80 stroke-[2.2]" />
        <span className="tracking-tight hidden sm:inline">Daily Questions</span>
      </button>
    </div>
  );
};

export default memo(LeftSection);
