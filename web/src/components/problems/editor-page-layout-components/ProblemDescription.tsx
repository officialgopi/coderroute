import QuillContentRenderer from "@/components/ui/QuillContentRender";
import type { IProblem } from "@/types/types";

const ProblemDescription = ({ problem }: { problem: IProblem | undefined }) => {
  return (
    <div className="p-6 ">
      <h2 className="text-xl font-semibold mb-2 ">{problem?.title}</h2>
      <QuillContentRenderer htmlContent={problem?.description || ""} />
    </div>
  );
};

export default ProblemDescription;
