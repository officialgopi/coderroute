import { useState, lazy, Suspense, memo } from "react";
import { OverviewTab } from "./tabs/OverviewTab";
import { TabHeader } from "./tabs/TabHeader";

// Lazy loading upcoming profile feature modules to keep initial bundles light
const SolvedTab = lazy(() => import("./tabs/SolvedTab.tsx"));
const SubmissionsTab = lazy(() => import("./tabs/SubmissionsTab.tsx"));
const ContestsTab = lazy(() => import("./tabs/ContestsTab.tsx"));
const DiscussionsTab = lazy(() => import("./tabs/DiscussionsTab.tsx"));

const TABS_CONFIG = [
  "Overview",
  "Solved",
  "Submissions",
  "Contests",
  "Discussions",
];

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full space-y-5">
      {/* --- WORKSPACE NAVIGATION TRAIL HEADER --- */}
      <TabHeader
        tabs={TABS_CONFIG}
        activeTab={activeTab}
        onTabSelect={handleTabChange}
      />

      {/* --- ACTIVE CONTROL GRID CANVAS --- */}
      <div className="w-full min-h-[380px] focus:outline-none">
        <Suspense fallback={<TabWorkspaceSkeleton />}>
          {activeTab === "Overview" && <OverviewTab />}
          {activeTab === "Solved" && <SolvedTab />}
          {activeTab === "Submissions" && <SubmissionsTab />}
          {activeTab === "Contests" && <ContestsTab />}
          {activeTab === "Discussions" && <DiscussionsTab />}
        </Suspense>
      </div>
    </div>
  );
};

/* --- HIGH-FIDELITY SUB-TAB WORKSPACE SKELETON --- */
const TabWorkspaceSkeleton = memo(() => (
  <div
    className="w-full space-y-4 animate-pulse select-none pointer-events-none p-1"
    aria-hidden="true"
  >
    <div className="h-4 w-1/5 min-w-[120px] rounded bg-neutral-200 dark:bg-zinc-800" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="h-32 rounded-xl border border-border-subtle/30 dark:border-zinc-900/50 bg-surface-panel/10 dark:bg-zinc-950/10" />
      <div className="h-32 rounded-xl border border-border-subtle/30 dark:border-zinc-900/50 bg-surface-panel/10 dark:bg-zinc-950/10" />
    </div>
  </div>
));

TabWorkspaceSkeleton.displayName = "TabWorkspaceSkeleton";

export default memo(ProfileTabs);
