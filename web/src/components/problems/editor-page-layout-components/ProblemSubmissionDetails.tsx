import { useSubmissionStore, type ISubmission } from "@/store/submission.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProblemSubmissionDetails = () => {
  const { submissionId } = useParams();
  const { getSubmissionBySubmissionId, isSubmissionLoading } =
    useSubmissionStore();
  const [submission, setSubmission] = useState<ISubmission | null>(null);
  useEffect(() => {
    async function fetchSubmission(submissionId: string) {
      const submission = await getSubmissionBySubmissionId(submissionId);
      if (submission) {
        setSubmission(submission);
      }
    }
    fetchSubmission(submissionId!);
  }, [submissionId]);

  if (isSubmissionLoading) {
    return <p>Fetchhing submission details...</p>;
  }

  return (
    <div className="w-full p-4">
      {submission ? (
        <div
          className="
    w-full flex flex-col 
    px-4 py-3 
    border border-neutral-300 dark:border-neutral-700 
    rounded-xl 
    bg-white dark:bg-neutral-900 
    shadow-sm 
    divide-y divide-neutral-200 dark:divide-neutral-700
  "
        >
          <div className="py-3">
            <Section label="Status" value={submission.status} />
          </div>

          <div className="py-3">
            <Section label="Memory Usage" value={submission.memory ?? "N/A"} />
          </div>

          <div className="py-3">
            <Section label="Time Taken" value={submission.time ?? "N/A"} />
          </div>

          <div className="py-3">
            <Section
              label="Submitted At"
              value={new Date(submission.createdAt).toLocaleString()}
            />
          </div>

          <div className="py-3">
            <Section label="Language" value={submission.language} />
          </div>

          {/* Code */}
          <div className="py-3">
            <h3 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-1">
              Code
            </h3>
            <pre
              className="
        bg-neutral-100 dark:bg-neutral-800 
        p-3 rounded-lg 
        overflow-auto text-sm 
        leading-relaxed
      "
            >
              <code>{submission.sourceCode}</code>
            </pre>
          </div>

          {/* Testcases */}
          {submission.status === "WRONG_ANSWER" && (
            <div className="py-3">
              <h3 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
                Failing Testcase Results
              </h3>

              <div className="space-y-4">
                {submission.testcasesResults.map((tc) => {
                  if (tc.passed) return null;

                  return (
                    <div
                      key={tc.id}
                      className="
                p-4 rounded-xl 
                border border-red-300 dark:border-red-700 
                bg-red-50 dark:bg-red-950/40 
                shadow-sm
              "
                    >
                      <p className="text-sm mb-2">
                        <span className="font-medium">Status:</span> {tc.status}
                      </p>

                      <p className="text-sm mb-2">
                        <span className="font-medium">Expected:</span>{" "}
                        {tc.expected}
                      </p>

                      <div className="mt-3">
                        <p className="font-semibold text-sm">Input:</p>
                        <pre className="whitespace-pre-wrap bg-neutral-200 dark:bg-neutral-800 p-2 rounded text-xs mt-1">
                          <code>{tc.testcase.input}</code>
                        </pre>
                      </div>

                      <div className="mt-3">
                        <p className="font-semibold text-sm">Output:</p>
                        <pre className="whitespace-pre-wrap bg-neutral-200 dark:bg-neutral-800 p-2 rounded text-xs mt-1">
                          <code>{tc.stdout}</code>
                        </pre>
                      </div>

                      {tc.stderr && (
                        <div className="mt-3">
                          <p className="font-semibold text-sm">Error:</p>
                          <pre className="whitespace-pre-wrap bg-red-200 dark:bg-red-900 p-2 rounded text-xs mt-1">
                            <code>{tc.stderr}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading submission details...</p>
      )}
    </div>
  );
};

export default ProblemSubmissionDetails;
const Section = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full my-3">
    <h3 className="font-medium">{label}:</h3>
    <p>{value}</p>
  </div>
);
