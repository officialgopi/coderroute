import React from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all border
            ${
              activeTab === tab
                ? "bg-neutral-800 dark:bg-neutral-200 text-neutral-50 dark:text-neutral-900 border-neutral-700 dark:border-neutral-300"
                : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
