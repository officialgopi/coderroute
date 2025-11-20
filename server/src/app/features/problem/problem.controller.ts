import { db } from "../../../db";
import { Judge0 } from "../../libs/judge0.lib";
import { ApiError, ApiResponse, AsyncHandler } from "../../utils";
import {
  addTestcaseToProblemBodySchema,
  addTestcaseToProblemParamsSchema,
  createProblemBodySchema,
  deleteProblemBySlugParamsSchema,
  deleteTestcaseFromProblemByIdAndTestcaseIdBodySchema,
  deleteTestcaseFromProblemByIdAndTestcaseIdParamsSchema,
  getProblemBySlugParamsSchema,
  getProblemsQuerySchema,
  updateProblemBodySchema,
  updateProblemParamsSchema,
} from "./problem.schema";
import { generateFormattedInputForJudge0ForCreatingProblem } from "./problem.service";
import slugify from "slugify";

const createProblem = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = createProblemBodySchema.safeParse(req.body);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  /**
   * First run in judge0 to get the stdin and stdout
   * Then store the problem in the database
   * Return the problem id
   */
  const formattedParameter =
    generateFormattedInputForJudge0ForCreatingProblem(data);

  if (!formattedParameter) {
    throw new ApiError(500, "Failed to generate formatted input for Judge0");
  }

  // Send this to judge0 to verify the testcases

  for (const submissionBatchParameter of formattedParameter) {
    const responseFromJudge0AfterCreatingSubmissionBatch =
      await Judge0.createSubmissionBatch(submissionBatchParameter);

    if (
      !responseFromJudge0AfterCreatingSubmissionBatch.success ||
      !responseFromJudge0AfterCreatingSubmissionBatch.data
    ) {
      throw new ApiError(500, "Failed to create submission batch in Judge0");
    }

    const tokens = responseFromJudge0AfterCreatingSubmissionBatch.data.map(
      (submission) => submission.token
    );

    const responseFromJudge0AfterPoolingBatchResults =
      await Judge0.poolBatchResults(tokens);

    if (
      !responseFromJudge0AfterPoolingBatchResults.success ||
      !responseFromJudge0AfterPoolingBatchResults.data
    ) {
      throw new ApiError(500, "Failed to pool batch results in Judge0");
    }

    const submissions = responseFromJudge0AfterPoolingBatchResults.data;

    for (let i = 0; i < submissions.length; i++) {
      const result = submissions[i];

      if (result.status.id !== 3) {
        throw new ApiError(
          400,
          `Test case ${(
            i + Number(1)
          ).toString()} failed for language ${Judge0.getJudge0LanguageName(
            submissionBatchParameter[0].language_id
          )}`
        );
      }
    }
  }

  //SAVE TO THE DATABASE
  const problem = await db.problem.create({
    data: {
      title: data.title,
      slug: slugify(data.title, {
        lower: true,
        strict: true,
        replacement: "-",
        trim: true,
      }),
      description: data.description,
      difficulty: data.difficulty,
      tags: data.tags,
      constraints: data.constraints as string[],
      editorial: data.editorial,
      hints: data.hints as string[],
      createdByUserId: req.user.id,
    },
  });
  try {
    await db.problemDetails.createMany({
      data: data.details.map((detail) => {
        return {
          problemId: problem.id,
          language: detail.language,
          codeSnippet: detail.codeSnippet,
          backgroundCode: detail.backgroundCode,
          whereToWriteCode: "<WHERE_TO_WRITE_CODE/>",
          referenceSolution: detail.referenceSolution,
        };
      }),
    });
    await db.testcases.createMany({
      data: data.testcases.map((testcase) => {
        return {
          problemId: problem.id,
          input: testcase.input,
          output: testcase.output,
          explanation: testcase.explaination,
        };
      }),
    });
  } catch (error) {
    await db.problem.delete({
      where: {
        id: problem.id,
      },
    }); // DELETE CASCADE WORKS HERE FOR PROBLEM DETAILS AND TESTCASES ERRORS THEY ARE DELETED AUTOMATICALLY
    throw new ApiError(500, "Failed to create problem details");
  }

  new ApiResponse(201, {
    problem: problem,
  }).send(res);
});

const getProblems = AsyncHandler(async (req, res) => {
  const { data, success } = getProblemsQuerySchema.safeParse(req.query);
  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const query = {} as any;
  if (data.difficulty) {
    query.difficulty = data.difficulty;
  }
  if (data.tags && data.tags.length > 0) {
    query.tags = {
      hasEvery: data.tags,
    };
  }
  if (data.search) {
    query.OR = [
      {
        title: {
          contains: data.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: data.search,
          mode: "insensitive",
        },
      },
    ];
  }

  const problems = await db.problem.findMany({
    where: query,
    skip: (data.page - 1) * data.limit,
    take: data.limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  new ApiResponse(200, { problems }).send(res);
});

const getProblemBySlug = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = getProblemBySlugParamsSchema.safeParse(req.params);
  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }
  const problem = await db.problem.findUnique({
    where: {
      slug: data.slug,
    },
    include: {
      problemDetails: true,
      testcases: {
        orderBy: {
          id: "asc",
        },
        take: 3,
      },
    },
  });
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  new ApiResponse(200, {
    problem,
  }).send(res);
});

const deleteProblem = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } = deleteProblemBySlugParamsSchema.safeParse(
    req.params
  );
  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }
  const problem = await db.problem.findUnique({
    where: {
      id: data.problemId,
    },
  });
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }
  await db.problem.delete({
    where: {
      id: problem.id,
    },
  });

  new ApiResponse(200, {}, "Problem deleted successfully").send(res);
});

const getSolvedProblems = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const problems = await db.problem.findMany({
    where: {
      submissions: {
        some: {
          userId: req.user.id,
          status: "ACCEPTED",
        },
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  new ApiResponse(200, { problems }).send(res);
});

const updateProblemMetadata = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const paramsData = updateProblemParamsSchema.safeParse(req.params);
  if (!paramsData.success || !paramsData.data) {
    throw new ApiError(400, "Invalid request data");
  }

  const problem = await db.problem.findUnique({
    where: {
      id: paramsData.data.problemId,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const { data, success } = updateProblemBodySchema.safeParse(req.body);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const updateData = {};

  if (data.title) {
    (updateData as any).title = data.title;
    (updateData as any).slug = slugify(data.title, {
      lower: true,
      strict: true,
      replacement: "-",
      trim: true,
    });
  }
  if (data.description) (updateData as any).description = data.description;
  if (data.difficulty) (updateData as any).difficulty = data.difficulty;
  if (data.tags) (updateData as any).tags = data.tags;
  if (data.constraints) (updateData as any).constraints = data.constraints;
  if (data.editorial) (updateData as any).editorial = data.editorial;
  if (data.hints) (updateData as any).hints = data.hints;

  const updatedProblem = await db.problem.update({
    where: {
      id: problem.id,
    },
    data: updateData,
  });

  new ApiResponse(
    200,
    {
      problem: updatedProblem,
    },
    "Problem updated successfully"
  ).send(res);
});

//Testcase
const addTestcaseToProblemById = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }
  const body = addTestcaseToProblemBodySchema.safeParse(req.body);

  if (!body.success || !body.data) {
    throw new ApiError(400, "Invalid request data");
  }

  const { data, success } = addTestcaseToProblemParamsSchema.safeParse(
    req.params
  );

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const problem = await db.problem.findUnique({
    where: {
      id: data.problemId,
    },
    include: {
      problemDetails: true,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const formattedParameterArgData = {
    details: problem.problemDetails.map((detail) => ({
      language: detail.language,
      backgroundCode: detail.backgroundCode,
      whereToWriteCode: "<WHERE_TO_WRITE_CODE/>",
      referenceSolution: detail.referenceSolution,
      codeSnippet: detail.codeSnippet,
    })),
    testcases: body.data.testcases,
  };

  const formattedParameter = generateFormattedInputForJudge0ForCreatingProblem(
    formattedParameterArgData
  );

  if (!formattedParameter) {
    throw new ApiError(500, "Failed to generate formatted input for Judge0");
  }

  // Send this to judge0 to verify the testcases

  for (const submissionBatchParameter of formattedParameter) {
    const responseFromJudge0AfterCreatingSubmissionBatch =
      await Judge0.createSubmissionBatch(submissionBatchParameter);

    if (
      !responseFromJudge0AfterCreatingSubmissionBatch.success ||
      !responseFromJudge0AfterCreatingSubmissionBatch.data
    ) {
      throw new ApiError(500, "Failed to create submission batch in Judge0");
    }

    const tokens = responseFromJudge0AfterCreatingSubmissionBatch.data.map(
      (submission) => submission.token
    );

    const responseFromJudge0AfterPoolingBatchResults =
      await Judge0.poolBatchResults(tokens);

    if (
      !responseFromJudge0AfterPoolingBatchResults.success ||
      !responseFromJudge0AfterPoolingBatchResults.data
    ) {
      throw new ApiError(500, "Failed to pool batch results in Judge0");
    }

    const submissions = responseFromJudge0AfterPoolingBatchResults.data;

    for (let i = 0; i < submissions.length; i++) {
      const result = submissions[i];

      if (result.status.id !== 3) {
        throw new ApiError(
          400,
          `Test case ${(
            i + Number(1)
          ).toString()} failed for language ${Judge0.getJudge0LanguageName(
            submissionBatchParameter[0].language_id
          )}`
        );
      }
    }
  }

  //Save to database
  await db.testcases.createMany({
    data: body.data.testcases.map((testcase) => ({
      problemId: problem.id,
      input: testcase.input,
      output: testcase.output,
      explanation: testcase.explaination,
    })),
  });

  new ApiResponse(201, {}, "Testcases added successfully").send(res);
});

const deleteTestcaseFromProblemById = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { data, success } =
    deleteTestcaseFromProblemByIdAndTestcaseIdParamsSchema.safeParse(
      req.params
    );

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const body = deleteTestcaseFromProblemByIdAndTestcaseIdBodySchema.safeParse(
    req.body
  );

  if (!body.success || !body.data) {
    throw new ApiError(400, "Invalid request data");
  }

  const problem = await db.problem.findUnique({
    where: {
      id: data.problemId,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const testcase = await db.testcases.delete({
    where: {
      id: body.data.testcaseId,
      problemId: problem.id,
    },
  });

  if (!testcase) {
    throw new ApiError(404, "Testcase not found");
  }

  new ApiResponse(200, {}, "Testcase deleted successfully").send(res);
});

export {
  createProblem,
  getProblems,
  getProblemBySlug,
  deleteProblem,
  getSolvedProblems,
  deleteTestcaseFromProblemById,
  updateProblemMetadata,
  addTestcaseToProblemById,
};
