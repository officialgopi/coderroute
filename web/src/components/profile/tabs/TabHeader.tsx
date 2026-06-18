// src/components/shared/TabHeader.tsx
import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabHeaderProps {
  tabs: string[];
  activeTab: string;
  onTabSelect: (tabName: string) => void;
}

export const TabHeader = ({ tabs, activeTab, onTabSelect }: TabHeaderProps) => {
  return (
    <div
      role="tablist"
      className="w-full flex gap-1.5 border-b border-border-subtle/50 dark:border-zinc-900/80 mb-6 select-none overflow-x-auto custom-scrollbar shrink-0 pt-1"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={`tab-trigger-${tab}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabSelect(tab)}
            className={cn(
              "px-4 pb-3 pt-2 text-xs font-sans font-medium transition-colors duration-200 cursor-pointer outline-hidden relative whitespace-nowrap active:scale-[0.98]",
              isActive
                ? "text-text-primary font-bold tracking-tight"
                : "text-text-secondary opacity-60 hover:opacity-100 hover:text-text-primary",
            )}
          >
            {/* Dynamic Text Label Node */}
            <span className="relative z-10">{tab}</span>

            {/* 💎 HIGH-CONTRAST AMBER SLIDING OVERLAY BARS (Eliminates -mb layout jumps) */}
            {isActive && (
              <motion.div
                layoutId="activeTabUnderlineMask"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gold rounded-full z-20"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default memo(TabHeader);
