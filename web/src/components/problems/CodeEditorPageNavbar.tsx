import { useState } from "react";
import { motion } from "framer-motion";
import LeftSection from "./editor-navbar-components/LeftSection";
import CenterSection from "./editor-navbar-components/CenterSection";
import RightSection from "./editor-navbar-components/RightSection";
import DailySidebar from "./editor-navbar-components/DailySidebar";
import SettingsModal from "./editor-navbar-components/SettingsModal";

const CodeEditorPageNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full fixed top-0 border-b border-neutral-500/50  backdrop-blur-lg flex items-center justify-between px-4 py-2 h-[60px] "
      >
        <LeftSection onToggleSidebar={() => setIsSidebarOpen(true)} />
        <CenterSection />
        <RightSection onOpenSettings={() => setIsSettingsOpen(true)} />
      </motion.nav>

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

export default CodeEditorPageNavbar;
