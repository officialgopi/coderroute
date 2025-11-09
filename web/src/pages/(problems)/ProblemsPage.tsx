import PageLoader from "@/components/loaders/PageLoader";
import { ProblemsList } from "@/components/problems/ProblemsList";
import { lazy, Suspense } from "react";

const ProblemSearchModal = lazy(
  () => import("./../../components/problems/ProblemSearchModal")
);

const ProblemsPage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="w-full    ">
        <div className=" mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
            <h1 className="text-2xl font-semibold  ">Problems</h1>
            <ProblemSearchModal />
          </div>

          <ProblemsList />
        </div>
      </div>
    </Suspense>
  );
};

export default ProblemsPage;
