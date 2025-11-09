import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const STEP_SIZE_PX = 36; // adjust globally (controls circle size)

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  const activeIndex = tabs.indexOf(activeTab);
  const maxIndex = Math.max(0, tabs.length - 1);

  // percentage of the line that should be filled
  const fillPercent = useMemo(() => {
    if (maxIndex === 0) return 100;
    return (activeIndex / maxIndex) * 100;
  }, [activeIndex, maxIndex]);

  return (
    <div
      className="relative w-full"
      style={{
        // make sure left/right padding equals circle radius so line aligns with circle centers
        paddingLeft: `${STEP_SIZE_PX / 2}px`,
        paddingRight: `${STEP_SIZE_PX / 2}px`,
      }}
    >
      {/* base line */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-300 dark:bg-neutral-800"
        style={{ zIndex: 0 }}
      />

      {/* filled line (exact width computed) */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-800 dark:bg-neutral-100"
        style={{ zIndex: 1, width: `${fillPercent}%` }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />

      {/* steps */}
      <div className="relative z-10 flex items-center justify-between">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;
          const isClickable = index <= activeIndex;
          const isDisabled = index > activeIndex;
          const isFinal = tab.toLowerCase() === "review";

          return (
            <div
              key={tab}
              className="flex-1 flex flex-col items-center text-center"
            >
              <motion.button
                onClick={() => isClickable && onChange(tab)}
                disabled={isDisabled}
                whileHover={isClickable ? { scale: 1.06 } : {}}
                whileTap={isClickable ? { scale: 0.96 } : {}}
                className={`flex items-center justify-center rounded-full border select-none
                  `}
                style={{
                  width: STEP_SIZE_PX,

                  height: STEP_SIZE_PX,
                  zIndex: 20,
                  // visual states
                  background: isActive
                    ? undefined
                    : isCompleted
                    ? undefined
                    : undefined,
                }}
              >
                <span
                  className={[
                    "inline-flex items-center justify-center w-full h-full text-[13px] font-semibold transition-colors",
                    isFinal && isActive
                      ? "bg-green-600 text-white rounded-full"
                      : isActive
                      ? "bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full"
                      : isCompleted
                      ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-full"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 rounded-full",
                  ].join(" ")}
                >
                  {index + 1}
                </span>
              </motion.button>

              <div
                className={`mt-2 text-[13px] font-medium transition-colors ${
                  isFinal && isActive
                    ? "text-green-600 dark:text-green-400"
                    : isActive
                    ? "text-neutral-900 dark:text-neutral-100"
                    : isCompleted
                    ? "text-neutral-700 dark:text-neutral-300"
                    : "text-neutral-500 dark:text-neutral-600"
                }`}
                style={{ maxWidth: 100 }}
              >
                {tab}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
