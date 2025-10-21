import { create } from "zustand";
import type { TLanguage } from "../types/types";
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
    submission: {
      id: string;
      userId: string;
      problemId: string;
      sourceCode: string;
      language: TLanguage;
    };
  } | void>;
}

export const useCodeExecutionStore = create<CodeExecutionState>((set, get) => ({
  isRunning: false,
  isSubmitting: false,
  runCode: async () => {},
  submitCode: async () => {},
}));
