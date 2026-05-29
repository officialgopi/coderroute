import { memo } from "react";
import { ProfileSidebar } from "./ProfileSidebar";
import { ProfileTabs } from "./ProfileTabs";

export const ProfilePage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-6 select-none antialiased animate-fade-in">
      {/* --- PREMIUM CONTENT HUBS CONSOLE LAYOUT --- */}
      <div className="grid grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* --- LEFT SECTION: METADATA IDENTITY SIDEBAR PANEL --- */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3.5 xl:col-span-3 sticky top-6">
          <div className="w-full rounded-2xl border border-border-subtle/40 dark:border-zinc-900/60 bg-surface-card/30 dark:bg-zinc-950/10 p-4 lg:p-5 shadow-3xs">
            <ProfileSidebar />
          </div>
        </aside>

        {/* --- RIGHT SECTION: INTERACTIVE ENGAGEMENT ACTIVE DATA WORKSPACE --- */}
        <main className="col-span-12 md:col-span-8 lg:col-span-8.5 xl:col-span-9 space-y-6">
          <div className="w-full rounded-2xl border border-border-subtle/30 dark:border-zinc-900/40 bg-transparent">
            <ProfileTabs />
          </div>
        </main>
      </div>
    </div>
  );
};

export default memo(ProfilePage);
