import { useProblemStore } from "@/store/problem.store";
import { useSubmissionStore, type ISubmission } from "@/store/submission.store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProblemSubmission = () => {
  const { problemInCodeEditor } = useProblemStore();
  const { getSubmissionsByProblemId } = useSubmissionStore();
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  useEffect(() => {
    async function getSubmissions(problemId: string) {
      const submissions = await getSubmissionsByProblemId(problemId);
      setSubmissions(submissions || []);
    }
    if (problemInCodeEditor) {
      getSubmissions(problemInCodeEditor.id);
    }
  }, [problemInCodeEditor, getSubmissionsByProblemId]);
  return (
    <div className="w-full h-full flex flex-col py-2">
      {submissions.map((submission) => (
        <Link
          to={`${submission.id}`}
          key={submission.id}
          className={`
      rounded-lg
      border
      border-neutral-300 
      dark:border-neutral-700
      p-3      /* smaller padding */
      mb-3
      bg-white 
      dark:bg-neutral-900
      shadow-sm 
      hover:shadow-md
      transition-all 
      duration-200
${
  submission.status === "ACCEPTED"
    ? "bg-green-500/15 text-green-500"
    : submission.status === "WRONG_ANSWER"
    ? "bg-red-500/15 text-red-500 "
    : "bg-yellow-500/15 text-yellow-500"
}
    `}
        >
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[15px] font-medium text-neutral-500 dark:text-neutral-400">
              {new Date(submission.createdAt).toLocaleString()}
            </p>

            <span
              className={`
          px-2 py-0.5 rounded-full text-[10px] font-semibold
          ${
            submission.status === "ACCEPTED"
              ? "bg-green-500/15 text-green-500"
              : submission.status === "WRONG_ANSWER"
              ? "bg-red-500/15 text-red-500 "
              : "bg-yellow-500/15 text-yellow-500"
          }
        `}
            >
              {submission.status}
            </span>
          </div>

          <div className="space-y-0.5">
            <p className="text-xs">
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">
                Language:
              </span>{" "}
              {submission.language}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProblemSubmission;
