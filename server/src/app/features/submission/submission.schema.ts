import z from "zod";

const getSubmissionByProblemIdParamsSchema = z.object({
  problemId: z.string(),
});

export { getSubmissionByProblemIdParamsSchema };
