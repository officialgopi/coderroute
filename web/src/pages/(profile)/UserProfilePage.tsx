import { lazy, Suspense, memo } from "react";

const UserDetails = lazy(() => import("@/components/profile/ProfilePage"));

/* --- 💎 PREMIUM USER ACCOUNT PROFILE SKELETON LOADER --- */
const ProfileSkeleton = memo(() => (
  <div
    className="w-full max-w-5xl mx-auto space-y-8 animate-pulse select-none pointer-events-none p-1"
    aria-hidden="true"
  >
    {/* Upper Profile Identity Card Header Block */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-6 border-b border-border-subtle/30 dark:border-zinc-900/40">
      <div className="flex items-center gap-4">
        {/* Massive User Profile Avatar Circle Spot */}
        <div className="h-16 w-16 rounded-full bg-neutral-200 dark:bg-zinc-800 shrink-0" />

        <div className="space-y-2">
          {/* Main User Nickname Title Line Stub */}
          <div className="h-5 w-44 rounded bg-neutral-200 dark:bg-zinc-800" />
          {/* Subtitle Bio / Handle Identifier Tag */}
          <div className="h-3 w-32 rounded bg-neutral-200 dark:bg-zinc-800 opacity-60" />
        </div>
      </div>

      {/* Profile Modification Action Button Skeleton */}
      <div className="h-8 w-28 rounded-lg bg-neutral-100 dark:bg-zinc-900 border border-border-subtle/40 dark:border-zinc-900 shrink-0" />
    </div>

    {/* Metric Grid Activity Tracker Clusters */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={`profile-metric-bone-${i}`}
          className="h-20 rounded-xl border border-border-subtle/40 dark:border-zinc-900/50 bg-surface-panel/20 dark:bg-zinc-950/20"
        />
      ))}
    </div>

    {/* Secondary Detailed Panels Structural Stubs */}
    <div className="space-y-3 pt-2">
      <div className="h-4 w-40 rounded bg-neutral-200 dark:bg-zinc-800" />
      <div className="h-32 w-full rounded-xl border border-border-subtle/30 dark:border-zinc-900/40 bg-neutral-50/40 dark:bg-zinc-950/10" />
    </div>
  </div>
));

ProfileSkeleton.displayName = "ProfileSkeleton";

/* --- MAIN ACCOUNT USER PROFILE PAGE PORTAL WORKSPACE --- */
export const UserProfilePage = () => {
  return (
    <div className="w-full text-text-primary antialiased">
      <Suspense fallback={<ProfileSkeleton />}>
        <UserDetails />
      </Suspense>
    </div>
  );
};

export default memo(UserProfilePage);
