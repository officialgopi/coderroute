import { useProblemStore } from "@/store/problem.store";
import { lazy, Suspense } from "react";

const ProblemDescription = lazy(
  () =>
    import(
      "@/components/problems/editor-page-layout-components/ProblemDescription"
    )
);

const ProblemDescriptionPage = () => {
  const { problemInCodeEditor } = useProblemStore();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProblemDescription problem={problemInCodeEditor} />
    </Suspense>
  );
};

export default ProblemDescriptionPage;
