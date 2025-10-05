import { Judge0 } from "../../libs/judge0.lib";

const executeCodeService = async (
  code: string,
  backgroundCode: string,
  whereToWriteCode: string,
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

    const submissions = stdin.map((input, index) => ({
      source_code: backgroundCode.replace(whereToWriteCode, code),
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
      const exprected = expectedOutput[idx]?.trim();
      const actual = result.stdout?.trim() || "";

      const passed = exprected === actual;

      if (!passed) allPassed = false;

      return {
        testcase: idx + 1,
        passed: passed,
        expected: exprected,
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
