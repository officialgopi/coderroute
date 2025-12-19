import { OverviewTab } from "./tabs/OverviewTab";
import { TabHeader } from "./tabs/TabHeader";
import { TabPanel } from "./tabs/TabPanel";

const tabs = ["Overview", "Solved", "Submissions", "Contests", "Discussions"];

export function ProfileTabs() {
  return (
    <>
      <TabHeader tabs={tabs} />
      <TabPanel>
        <OverviewTab />
        {/* other tabs lazy loaded */}
      </TabPanel>
    </>
  );
}
