import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Terminal,
  Beaker,
  HelpCircle,
  BookOpen,
  FileCode2,
  Eye,
} from "lucide-react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

// Maps appropriate technical icons to maintain design context across tabs
const getTabIcon = (tab: string) => {
  switch (tab.toLowerCase()) {
    case "metadata":
      return BookOpen;
    case "testcases":
      return Beaker;
    case "hints":
      return HelpCircle;
    case "editorial":
      return Terminal;
    case "code setup":
      return FileCode2;
    case "review":
      return Eye;
    default:
      return Terminal;
  }
};

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <div className="w-full font-sans select-none border-b border-border-subtle/30 dark:border-zinc-900/60 pb-px">
      {/* --- FLEX SLIDER DECK SYSTEM --- */}
      <div className="w-full flex items-center justify-start gap-1 sm:gap-2 overflow-x-auto scrollbar-none snap-x mask-fade-right">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;
          const isClickable = index <= activeIndex;
          const isFinal = tab.toLowerCase() === "review";

          const TabIcon = getTabIcon(tab);

          return (
            <button
              key={`tech-tab-${tab}`}
              type="button"
              disabled={!isClickable}
              onClick={() => onChange(tab)}
              className={`group flex items-center gap-2 h-9 px-3.5 rounded-t-xl transition-all duration-200 outline-none relative snap-contained shrink-0 ${
                isActive
                  ? "text-text-primary"
                  : isCompleted
                    ? "text-emerald-600 dark:text-emerald-400/80 hover:text-text-primary"
                    : "text-text-secondary opacity-50 hover:opacity-100 hover:text-text-primary"
              } ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              {/* --- PERSISTENT ACTIVE PILL BACKGROUND DECK --- */}
              {isActive && (
                <motion.div
                  layoutId="activeAdminTabDeck"
                  className="absolute inset-0 bg-neutral-100/70 dark:bg-zinc-900/40 rounded-t-xl border-t border-x border-border-subtle/40 dark:border-zinc-800/80 z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* --- TAB INDICATOR DOT / ICON RAIL --- */}
              <div className="relative z-10 flex items-center justify-center shrink-0">
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-4 w-4 rounded-md bg-emerald-500/10 flex items-center justify-center"
                  >
                    <Check
                      size={10}
                      className="stroke-[3.5] text-emerald-600 dark:text-emerald-400"
                    />
                  </motion.div>
                ) : (
                  <TabIcon
                    size={13}
                    className={`stroke-[2.2] transition-colors ${
                      isActive
                        ? isFinal
                          ? "text-emerald-500"
                          : "text-amber-500"
                        : "text-text-secondary"
                    }`}
                  />
                )}
              </div>

              {/* --- STEP TEXT STRING ROW --- */}
              <span
                className={`relative z-10 font-sans text-xs tracking-tight transition-all ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {tab}
              </span>

              {/* --- DYNAMIC BOTTOM RULER HIGHLIGHT LINE --- */}
              {isActive && (
                <motion.div
                  layoutId="activeAdminTabLine"
                  className={`absolute bottom-0 left-0 right-0 h-[2px] z-20 ${
                    isFinal
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : "bg-amber-500"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Tabs);
