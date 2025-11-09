import QuillContentRenderer from "@/components/ui/QuillContentRender";
import type { IProblem } from "@/types/types";

const ProblemEditorial = ({ problem }: { problem: IProblem | undefined }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2 ">Problem Editorial</h2>
      <QuillContentRenderer htmlContent={problem?.editorial || ""} />
    </div>
  );
};

export default ProblemEditorial;
