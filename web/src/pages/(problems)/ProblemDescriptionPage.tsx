import { lazy, Suspense } from "react";

const ProblemDescription = lazy(
  () =>
    import(
      "@/components/problems/editor-page-layout-components/ProblemDescription"
    )
);

const ProblemDescriptionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProblemDescription />
    </Suspense>
  );
};

export default ProblemDescriptionPage;
