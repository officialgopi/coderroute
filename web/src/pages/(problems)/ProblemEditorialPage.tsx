import { useProblemStore } from "@/store/problem.store";
import { lazy, Suspense } from "react";

const ProblemEditorial = lazy(
  () =>
    import(
      "@/components/problems/editor-page-layout-components/ProblemEditorial"
    )
);

const ProblemEditorialPage = () => {
  const { problemInCodeEditor } = useProblemStore();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProblemEditorial problem={problemInCodeEditor} />
    </Suspense>
  );
};

export default ProblemEditorialPage;
