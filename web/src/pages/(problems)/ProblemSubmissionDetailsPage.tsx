import { ArrowLeftIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";

const ProblemSubmissionDetails = lazy(
  () =>
    import(
      "@/components/problems/editor-page-layout-components/ProblemSubmissionDetails"
    )
);

const ProblemSubmissionDetailsPage = () => {
  const { slug } = useParams();

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="flex items-center  gap-2">
        <Link to={`/problems/${slug}/submissions`} className="">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Submission Details</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProblemSubmissionDetails />
      </Suspense>
    </div>
  );
};

export default ProblemSubmissionDetailsPage;
