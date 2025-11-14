import z from "zod";

const getSubmissionByProblemIdParamsSchema = z.object({
  problemId: z.string(),
});
const getSubmissionBySubmissionIdParamsSchema = z.object({
  submissionId: z.string(),
});

export {
  getSubmissionByProblemIdParamsSchema,
  getSubmissionBySubmissionIdParamsSchema,
};
