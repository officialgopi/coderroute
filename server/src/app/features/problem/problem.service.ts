import z from "zod";
import { createProblemBodySchema } from "./problem.schema";
import { Judge0 } from "../../libs/judge0.lib";

function generateFormattedInputForJudge0ForCreatingProblem(
  problem: z.infer<typeof createProblemBodySchema>
) {
  try {
    let formattedSubmissionBatchParameter: {
      language_id: number;
      source_code: string;
      stdin: string;
      expected_output: string;
    }[][] = [];
    for (const detail of problem.details) {
      let temp = [];
      const language_id = Judge0.getJudge0LanguageId(detail.language);
      if (!language_id) {
        return null;
      }
      const source_code = detail.backgroundCode.replace(
        detail.whereToWriteCode,
        detail.referenceSolution
      );
      for (const testcase of problem.testcases) {
        temp.push({
          language_id: language_id,
          source_code: source_code,
          stdin: testcase.input,
          expected_output: testcase.output,
        });
      }
      formattedSubmissionBatchParameter.push(temp);
    }

    return formattedSubmissionBatchParameter;
  } catch (error) {
    return null;
  }
}

export { generateFormattedInputForJudge0ForCreatingProblem };
