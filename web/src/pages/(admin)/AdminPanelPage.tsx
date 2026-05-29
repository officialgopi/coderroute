import { lazy, Suspense, memo } from "react";

const AdminPanelFunctionalitiesList = lazy(
  () => import("@/components/admin-panel/AdminPanelFunctionalitisesList"),
);

/* --- 💎 PREMIUM MANAGEMENT HUB SKELETON LAYOUT --- */
const AdminDashboardSkeleton = memo(() => (
  <div
    className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse select-none pointer-events-none p-1"
    aria-hidden="true"
  >
    {[...Array(6)].map((_, i) => (
      <div
        key={`admin-action-bone-${i}`}
        className="h-28 rounded-2xl border border-border-subtle/40 dark:border-zinc-900/60 bg-surface-card/10 dark:bg-zinc-950/10 p-4 flex flex-col justify-between"
      >
        <div className="space-y-2 w-full">
          {/* Mock Action Icon Node placeholder circle */}
          <div className="h-6 w-6 rounded-lg bg-neutral-200 dark:bg-zinc-800" />
          {/* Action Title Header block lines */}
          <div className="h-3.5 w-1/2 rounded bg-neutral-200 dark:bg-zinc-800" />
          {/* Inner description text placeholder block line */}
          <div className="h-2.5 w-5/6 rounded bg-neutral-200 dark:bg-zinc-800 opacity-60" />
        </div>

        {/* Lower trigger link placeholder segment lines */}
        <div className="h-3 w-16 rounded bg-neutral-100 dark:bg-zinc-900 self-end" />
      </div>
    ))}
  </div>
));

AdminDashboardSkeleton.displayName = "AdminDashboardSkeleton";

/* --- MAIN APPLICATION ADMINISTRATIVE WORKSPACE GATEWAY --- */
export const AdminPanelPage = () => {
  return (
    <div className="w-full space-y-5 text-text-primary antialiased">
      {/* --- DASHBOARD VIEW HEADER REGION --- */}
      <div className="w-full border-b border-border-subtle/20 dark:border-zinc-900/40 pb-3 select-none">
        <h1 className="text-xl font-bold font-sans tracking-tight">
          System Administration Hub
        </h1>
        <p className="text-xs text-text-secondary opacity-60 font-medium font-sans mt-0.5">
          Provision permissions, execute repository diagnostics, and audit
          conversation threads.
        </p>
      </div>

      {/* --- UNIFIED UTILITY FUNCTIONALITIES WRAPPER PANEL --- */}
      <div className="w-full">
        <Suspense fallback={<AdminDashboardSkeleton />}>
          <AdminPanelFunctionalitiesList />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(AdminPanelPage);
