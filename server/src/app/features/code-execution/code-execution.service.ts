import { logger } from "../../../logger";
import { Judge0 } from "../../libs/judge0.lib";

const executeCodeService = async (
  code: string,
  backgroundCode: string,
  _whereToWriteCode: string,
  languageId: number,
  stdin: string[],
  expectedOutput: string[]
) => {
  try {
    if (!code || !languageId) {
      return {
        success: false,
        message: "Code and languageId are required",
      };
    }
    if (
      !Array.isArray(stdin) ||
      !Array.isArray(expectedOutput) ||
      expectedOutput.length === 0 ||
      stdin.length === 0
    )
      return {
        success: false,
        message: "Code and languageId are required",
      };
    const submissions = stdin.map((input) => ({
      source_code: `${code} \n${backgroundCode}`,
      language_id: languageId,
      stdin: input,
    }));

    const submitResponse = await Judge0.createSubmissionBatch(submissions);

    if (!submitResponse.success) {
      return {
        success: false,
        message: "Failed to create submission batch",
      };
    }

    const tokens = submitResponse.data!.map((item) => item.token);

    const results = await Judge0.poolBatchResults(tokens);

    if (!results.success) {
      return {
        success: false,
        message: "Failed to pool batch results",
      };
    }

    let allPassed = true;
    const detailedResults = results.data?.map((result, idx) => {
      const expected = JSON.parse(expectedOutput[idx]?.trim());
      // const expected = JSON.stringify(JSON.parse(expectedOutput[idx]?.trim()));
      // const actual = JSON.stringify(JSON.parse(result.stdout?.trim()));
      let actual = result.stdout?.trim();
      if (!actual) {
        actual = "";
      }

      const passed = JSON.stringify(expected) === actual;
      console.log(expected);
      console.log(actual);
      console.log("----");

      if (!passed) allPassed = false;

      // logger.error(results);

      return {
        testcase: idx + 1,
        passed: passed,
        expected: expected,
        actual: actual,
        time: result.time ? `${result.time}s` : "N/A",
        memory: result.memory ? `${result.memory}KB` : "N/A",
        status: result.status ? result.status.description : "N/A",
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
      };
    });

    return {
      success: true,
      data: {
        allPassed,
        detailedResults,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export { executeCodeService };
