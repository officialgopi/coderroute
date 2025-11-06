import PageLoader from "@/components/loaders/PageLoader";
import { lazy, Suspense } from "react";

const AdminPanelFunctionalitisesList = lazy(
  () => import("@/components/admin-panel/AdminPanelFunctionalitisesList")
);

const AdminPanelPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="flex flex-wrap items-center gap-4 w-full">
        <Suspense fallback={<PageLoader />}>
          <AdminPanelFunctionalitisesList />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminPanelPage;
