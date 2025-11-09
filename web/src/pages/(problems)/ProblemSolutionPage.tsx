import { useProblemStore } from "@/store/problem.store";
import { lazy, Suspense } from "react";

const ProblemSolution = lazy(
  () =>
    import(
      "@/components/problems/editor-page-layout-components/ProblemSolution"
    )
);

const ProblemSolutionPage = () => {
  const { problemInCodeEditor } = useProblemStore();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProblemSolution problem={problemInCodeEditor} />
    </Suspense>
  );
};

export default ProblemSolutionPage;
