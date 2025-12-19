type OutputFormat = "PLAIN" | "FLOAT" | "JSON";

interface CompareOptions {
  format: OutputFormat;
  epsilon?: number; // only for FLOAT
}

/* ================= NORMALIZERS ================= */

function normalizePlain(s: string): string {
  return s
    .replace(/\r\n/g, "\n") // Windows → Unix
    .trim();
}

/* ================= COMPARATORS ================= */

function comparePlain(stdout: string, expected: string): boolean {
  return normalizePlain(stdout) === normalizePlain(expected);
}

function compareFloat(
  stdout: string,
  expected: string,
  epsilon: number = 1e-6
): boolean {
  const a = parseFloat(stdout.trim());
  const b = parseFloat(expected.trim());

  if (Number.isNaN(a) || Number.isNaN(b)) return false;

  return Math.abs(a - b) <= epsilon;
}

function normalizeJson(value: any): string {
  // Stable stringify to avoid key-order issues
  return JSON.stringify(value);
}

function compareJson(stdout: string, expected: string): boolean {
  try {
    const user = JSON.parse(stdout.trim());
    const exp = JSON.parse(expected.trim());

    return normalizeJson(user) === normalizeJson(exp);
  } catch {
    return false; // invalid JSON → WA
  }
}

/* ================= GLOBAL ENTRY POINT ================= */

export function compareOutput(
  stdout: string,
  expected: string,
  options: CompareOptions
): boolean {
  const { format, epsilon } = options;

  switch (format) {
    case "PLAIN":
      return comparePlain(stdout, expected);

    case "FLOAT":
      return compareFloat(stdout, expected, epsilon);

    case "JSON":
      return compareJson(stdout, expected);

    default:
      throw new Error(`Unsupported output format: ${format}`);
  }
}

// Exported module
import { Judge0 } from "../../libs/judge0.lib";

const executeCodeService = async (
  output_format: "PLAIN" | "JSON" | "FLOAT",
  code: string,
  backgroundCode: string,
  languageId: number,
  std: {
    stdin: string[];
    stdout: string;
  }[]
) => {
  try {
    if (!code || !languageId) {
      return {
        success: false,
        message: "Code and languageId are required",
      };
    }
    if (!Array.isArray(std) || std.length === 0)
      return {
        success: false,
        message: "Code and languageId are required",
      };
    const stdin = std.map((item) => item.stdin.join("\n"));
    const stdout = std.map((item) => item.stdout);

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
      const expected = stdout[idx];
      const result_output = result.stdout?.trim();

      const passed = compareOutput(result_output || "", expected, {
        format: output_format,
      });

      if (!passed) allPassed = false;

      return {
        testcase: idx + 1,
        passed: passed,
        expected: expected,
        actual: result_output,
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
