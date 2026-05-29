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
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/30 rounded-xl"
    >
      {children}
    </motion.div>
  );
};

export default memo(TabPanel);
