import PageLoader from "@/components/loaders/PageLoader";
import { lazy, Suspense } from "react";

const UserDetails = lazy(() => import("@/components/profile/UserDetails"));
const UserProfilePage = () => {
  return (
    <div className="w-full">
      <Suspense fallback={<PageLoader />}>
        <UserDetails />
      </Suspense>
    </div>
  );
};

export default UserProfilePage;
