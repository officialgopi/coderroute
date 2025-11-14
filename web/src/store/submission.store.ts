import type { TLanguage } from "@/types/types";
import { apiCallHandler } from "@/utils/api-call-handler.util";
import { toast } from "sonner";
import { create } from "zustand";

interface ISubmission {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  problemId: string;
  sourceCode: string;
  language: TLanguage;
  compileOutput: string | null;
  status: string;
  memory: string | null;
  time: string | null;
  contestId: string | null;
  testcasesResults: {
    id: string;
    submissionId: string;
    testcaseId: string;
    status: string;
    expected: string;
    stdout: string;
    passed: boolean;
    stderr: string | null;
    time: string | null;
    memory: string | null;
    testcase: {
      id: string;
      input: string;
      output: string;
      problemId: string;
      createdAt: Date;
      updatedAt: Date;
    };
    createdAt: Date;
    updatedAt: Date;
  }[];
}

interface ISubmisisonStore {
  allSubmissions: {
    problemId: string;
    submissions: ISubmission[];
  }[];
  isSubmissionLoading: boolean;

  getSubmissionBySubmissionId: (
    submissionId: string
  ) => Promise<ISubmission | void>;
  getSubmissionsByProblemId: (
    problemId: string
  ) => Promise<ISubmission[] | void>;
}

const useSubmissionStore = create<ISubmisisonStore>((set, get) => ({
  allSubmissions: [],
  isSubmissionLoading: false,
  getSubmissionBySubmissionId: async (submissionId: string) => {
    set({
      isSubmissionLoading: true,
    });

    if (
      get().allSubmissions.some((s) =>
        s.submissions.some((sub) => sub.id === submissionId)
      )
    ) {
      const existingSubmission = get()
        .allSubmissions.map((s) => s.submissions)
        .flat()
        .find((sub) => sub.id === submissionId);
      if (existingSubmission) {
        set({ isSubmissionLoading: false });
        return existingSubmission;
      }
    }

    try {
      const submission = await apiCallHandler<
        undefined,
        {
          submission: ISubmission;
        }
      >(`/submission/${submissionId}`, "GET");

      if (!submission.success || !submission.data) {
        toast.error("No submission Found");
        return;
      }

      set({
        isSubmissionLoading: false,
      });
      return submission.data?.submission;
    } catch (error) {
      toast.error("Something weht wrong");
    } finally {
      if (get().isSubmissionLoading) set({ isSubmissionLoading: false });
    }
  },

  getSubmissionsByProblemId: async (problemId: string) => {
    const existingSubmissions = get().allSubmissions.find(
      (s) => s.problemId === problemId
    );
    if (existingSubmissions) {
      return existingSubmissions?.submissions;
    }

    set({
      isSubmissionLoading: true,
    });
    try {
      const submissions = await apiCallHandler<
        undefined,
        {
          submissions: ISubmission[];
        }
      >(`/submission/get-submissions/${problemId}`, "GET");

      if (!submissions.success || !submissions.data) {
        toast.error("No submissions Found");
        return;
      }

      const updatedSubmissions = {
        problemId,
        submissions: submissions.data?.submissions || [],
      };

      set({
        allSubmissions: [
          ...get().allSubmissions.filter((s) => s.problemId !== problemId),
          updatedSubmissions,
        ],
        isSubmissionLoading: false,
      });
      return submissions.data?.submissions;
    } catch (error) {
      toast.error("Something weht wrong");
    } finally {
      if (get().isSubmissionLoading) set({ isSubmissionLoading: false });
    }
  },
}));

export { useSubmissionStore };

export type { ISubmission };
