import { create } from "zustand";
import type { TLanguage } from "../types/types";
import { apiCallHandler } from "../utils/api-call-handler.util";
import { toast } from "sonner";
interface CodeExecutionState {
  isRunning: boolean;
  isSubmitting: boolean;

  runCode: (
    problemId: string,
    source_code: string,
    stdin: string[],
    expected_output: string[],
    langauge: TLanguage
  ) => Promise<{
    status: "ACCEPTED" | "WRONG_ANSWER";
    testcases: {
      testcase: number;
      passed: boolean;
      expected: string;
      actual: string;
      time: string;
      memory: string;
      status: string;
      stderr: string | null;
      compile_output: any;
    }[];
  } | void>;
  submitCode: (
    problemId: string,
    source_code: string,
    language: TLanguage
  ) => Promise<{
    submission:
      | {
          id: string;
          userId: string;
          problemId: string;
          sourceCode: string;
          language: TLanguage;
          compileOutput?: string;
          status: string;
          memory?: string;
          time?: string;
          createdAt: string;
          updatedAt: string;
          testCasesResults: {
            id: string;
            submissionId: string;
            testCaseId: number;
            passed: boolean;
            stdout?: string;
            expected?: string;
            stderr?: string;
            compileOutput?: string;
            status?: string;
            memory?: string;
            time?: string;
            createdAt: Date;
            updatedAt: Date;
          }[];
        }
      | undefined;
  } | void>;
}

export const useCodeExecutionStore = create<CodeExecutionState>((set, get) => ({
  isRunning: false,
  isSubmitting: false,
  runCode: async (problemId, source_code, stdin, expected_output, langauge) => {
    set({
      isRunning: true,
    });
    try {
      const response = await apiCallHandler(
        `/code-execution/${problemId}/run`,
        "POST",
        {
          source_code,
          stdin,
          expected_output,
          langauge,
        }
      );
      if (!response.data) {
        toast.error("Failed to run code. Please try again.");
        return;
      }
      return response.data;
    } catch (error) {
      toast.error("An error occurred while running the code.");
    } finally {
      if (get().isRunning)
        set({
          isRunning: false,
        });
    }
  },
  submitCode: async (problemId, source_code, language) => {
    set({
      isSubmitting: true,
    });
    try {
      const response = await apiCallHandler(
        `/code-execution/${problemId}/submit`,
        "POST",
        {
          source_code,
          language,
        }
      );
      if (!response.data) {
        toast.error("Failed to submit code. Please try again.");
        return;
      }
      return response.data;
    } catch (error) {
      toast.error("An error occurred while submitting the code.");
    } finally {
      if (get().isSubmitting)
        set({
          isSubmitting: false,
        });
    }
  },
}));
