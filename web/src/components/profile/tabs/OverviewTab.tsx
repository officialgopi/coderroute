import { fakeActivity } from "../demo_data/fakeActivity";
import { fakeRecentSolvedProblems } from "../demo_data/fakeSolvedProblems";
import { fakeStats } from "../demo_data/fakeStats";
import { ActivityHeatmap } from "../elements/ActivityHeatmap";
import { RecentSolvedProblems } from "../elements/RecentSolvedProblems";
import { StatsCards } from "../elements/StatsCards";

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <StatsCards stats={fakeStats} />
      <ActivityHeatmap activity={fakeActivity} />
      <RecentSolvedProblems problems={fakeRecentSolvedProblems} />
    </div>
  );
}
