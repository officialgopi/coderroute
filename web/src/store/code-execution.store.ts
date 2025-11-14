import { create } from "zustand";
import type { ISubmission, TLanguage } from "../types/types";
import { apiCallHandler } from "../utils/api-call-handler.util";
import { toast } from "sonner";
// import { useSubmissionStore } from "./submission.store";
interface CodeExecutionState {
  isRunning: boolean;
  isSubmitting: boolean;
  currentProblemRunningResult: {
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
  } | null;
  // currentProblemSubmittingResult: {
  //   id: string;
  //   userId: string;
  //   problemId: string;
  //   sourceCode: string;
  //   language: TLanguage;
  //   compileOutput?: string;
  //   status: string;
  //   memory?: string;
  //   time?: string;
  //   createdAt: string;
  //   updatedAt: string;
  //   testCasesResults: {
  //     id: string;
  //     submissionId: string;
  //     testCaseId: number;
  //     passed: boolean;
  //     stdout?: string;
  //     expected?: string;
  //     stderr?: string;
  //     compileOutput?: string;
  //     status?: string;
  //     memory?: string;
  //     time?: string;
  //     createdAt: Date;
  //     updatedAt: Date;
  //   }[];
  // } | null;
  resetRunningResult: () => void;

  runCode: (
    problemId: string,
    source_code: string,
    stdin: string[],
    expectedOutput: string[],
    language: TLanguage
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
  ) => Promise<ISubmission | void>;
}

export const useCodeExecutionStore = create<CodeExecutionState>((set, get) => ({
  isRunning: false,
  isSubmitting: false,
  currentProblemRunningResult: null,
  resetRunningResult: () =>
    set({
      currentProblemRunningResult: null,
    }),
  runCode: async (problemId, source_code, stdin, expectedOutput, language) => {
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
          expectedOutput,
          language,
        }
      );
      if (!response.data) {
        toast.error("Failed to run code. Please try again.");
        return;
      }
      set({
        currentProblemRunningResult: response.data,
      });
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
      const response = await apiCallHandler<
        {
          source_code: string;
          language: TLanguage;
        },
        {
          submission: ISubmission;
        }
      >(`/code-execution/${problemId}/submit`, "POST", {
        source_code,
        language,
      });
      if (!response.data) {
        toast.error("Failed to submit code. Please try again.");
        return;
      }

      // useSubmissionStore.getState().setSubmission(response.data.submission);
      return response.data.submission;
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
