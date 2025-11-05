import PageLoader from "@/components/loaders/PageLoader";
import { lazy, Suspense } from "react";

const DiscussionList = lazy(
  () => import("@/components/discussions/DiscussionList")
);

const DiscussionsPage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <DiscussionList />
    </Suspense>
  );
};

export default DiscussionsPage;
