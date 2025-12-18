import { Judge0 } from "../../libs/judge0.lib";

function generateFormattedInputForJudge0ForCreatingProblem(problem: {
  details: {
    language: string;
    codeSnippet: string;
    backgroundCode: string;
    referenceSolution: string;
  }[];
  testcases: {
    std: {
      stdin: string[];
      stdout: string;
    };
    explaination?: string;
    output_format: "PLAIN" | "JSON" | "FLOAT";
  }[];
}) {
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
      const source_code = `${detail.referenceSolution}\n${detail.backgroundCode}`;
      for (const testcase of problem.testcases) {
        const inputArray = testcase.std.stdin;
        const inputString = inputArray.join("\n");

        temp.push({
          language_id: language_id,
          source_code: source_code,
          stdin: inputString,
          expected_output: testcase.std.stdout,
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
