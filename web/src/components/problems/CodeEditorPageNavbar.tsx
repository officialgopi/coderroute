import { useState, memo } from "react";
import { motion } from "framer-motion";
import LeftSection from "./editor-navbar-components/LeftSection";
import CenterSection from "./editor-navbar-components/CenterSection";
import RightSection from "./editor-navbar-components/RightSection";
import DailySidebar from "./editor-navbar-components/DailySidebar";
import SettingsModal from "./editor-navbar-components/SettingsModal";

export const CodeEditorPageNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      {/* 
        Unified Workspace App Bar Container
        - Dropped fixed constraints: Sitting naturally inside the flex stack eliminates layout calculation bugs.
        - h-11 (44px) enforces high-density developer data grids without wasting vertical screen real estate.
      */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "linear" }}
        className="w-full shrink-0 h-11 bg-surface-card/40 dark:bg-zinc-950/40 border-b border-border-subtle dark:border-zinc-900/60 backdrop-blur-md flex items-center justify-between px-4 select-none relative z-50"
      >
        {/* LEFT COMPONENT ACTIONS: Dashboard gateway portal handles sidebar toggle hooks */}
        <div className="flex items-center h-full">
          <LeftSection onToggleSidebar={() => setIsSidebarOpen(true)} />
        </div>

        {/* CENTER COMPONENT ACTIONS: Context compiler state indicators & submission records */}
        <div className="flex items-center h-full">
          <CenterSection />
        </div>

        {/* RIGHT COMPONENT ACTIONS: System preferences, dark theme adjustments, user profiling */}
        <div className="flex items-center h-full">
          <RightSection onOpenSettings={() => setIsSettingsOpen(true)} />
        </div>
      </motion.nav>

      {/* COMPILER COMPONENT PORTALS DECK */}
      <DailySidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <SettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default memo(CodeEditorPageNavbar);
