import { lazy, Suspense } from "react";

const ProblemSubmission = lazy(
  () =>
    import(
      "@/components/problems/editor-page-layout-components/ProblemSubmission"
    )
);
const ProblemSubmissionPage = () => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <h1 className="text-2xl font-bold">Problem Submissions</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProblemSubmission />
      </Suspense>
    </div>
  );
};

export default ProblemSubmissionPage;
