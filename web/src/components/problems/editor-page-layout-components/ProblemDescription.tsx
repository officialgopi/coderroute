import QuillContentRenderer from "@/components/ui/QuillContentRender";
import { useProblemStore } from "@/store/problem.store";

const ProblemDescription = () => {
  const { problemInCodeEditor } = useProblemStore();
  return (
    <div className="p-6 ">
      <h2 className="text-lg font-semibold mb-2 ">
        {problemInCodeEditor?.title}
      </h2>
      <h1 className="text-2xl font-semibold mb-2 ">Description</h1>
      <QuillContentRenderer
        htmlContent={problemInCodeEditor?.description || ""}
      />
    </div>
  );
};

export default ProblemDescription;
