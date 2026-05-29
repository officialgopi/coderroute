import { memo } from "react";

interface TabHeaderProps {
  tabs: string[];
  activeTab: string;
  onTabSelect: (tabName: string) => void;
}

export const TabHeader = ({ tabs, activeTab, onTabSelect }: TabHeaderProps) => {
  return (
    <div
      role="tablist"
      className="flex gap-5 border-b border-border-subtle/40 dark:border-zinc-900/60 mb-2 select-none overflow-x-auto scrollbar-none"
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
            className={`pb-2 text-xs font-sans font-medium transition-all cursor-pointer outline-none border-b-2 relative -mb-[1px] whitespace-nowrap ${
              isActive
                ? "text-text-primary border-amber-500 font-semibold"
                : "text-text-secondary opacity-60 border-transparent hover:opacity-100 hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default memo(TabHeader);
