// src/components/shared/TabPanel.tsx
import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";

interface TabPanelProps {
  children: ReactNode;
}

export const TabPanel = ({ children }: TabPanelProps) => {
  return (
    <motion.div
      role="tabpanel"
      tabIndex={0}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 28,
        mass: 0.8,
      }}
      className="w-full focus:outline-hidden focus-visible:ring-1 focus-visible:ring-accent-gold/20 rounded-2xl outline-hidden pt-1"
    >
      {children}
    </motion.div>
  );
};

export default memo(TabPanel);
