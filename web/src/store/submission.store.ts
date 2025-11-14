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
}

const useSubmissionStore = create<ISubmisisonStore>((set, get) => ({
  allSubmissions: [],
  isSubmissionLoading: false,
  getSubmissionBySubmissionId: async (submissionId: string) => {
    set({
      isSubmissionLoading: true,
    });
    try {
      const submission = await apiCallHandler<
        undefined,
        {
          submission: ISubmission;
        }
      >(`/submission/${submissionId}`, "GET");

      if (!submission.success || !submission.data) {
        toast.error("No submission Found");
      }
      const existingSubmission = get().allSubmissions.find(
        (s) => s.problemId === submission.data?.submission.problemId
      );
      let updatedSubmissions:
        | {
            problemId: string;
            submissions: ISubmission[];
          }
        | undefined;
      if (!existingSubmission) {
        updatedSubmissions = {
          problemId: submission.data?.submission.problemId!,
          submissions: [submission.data?.submission!],
        };

        set({
          allSubmissions: [...get().allSubmissions, updatedSubmissions],
          isSubmissionLoading: false,
        });
      } else {
        updatedSubmissions = {
          problemId: submission.data?.submission.problemId!,
          submissions: existingSubmission?.submissions.map((s) => {
            if (s.id !== submission.data?.submission.id) {
              return s;
            } else {
              return submission.data.submission;
            }
          }),
        };
        set({
          allSubmissions: get().allSubmissions.map((s) => {
            if (s.problemId == updatedSubmissions?.problemId) {
              return updatedSubmissions;
            } else {
              return s;
            }
          }),
          isSubmissionLoading: false,
        });
      }
      return submission.data?.submission;
    } catch (error) {
      toast.error("Something weht wrong");
    } finally {
      if (get().isSubmissionLoading) set({ isSubmissionLoading: false });
    }
  },
}));

export { useSubmissionStore };
