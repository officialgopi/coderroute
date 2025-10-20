import { create } from "zustand";
import { apiCallHandler } from "../utils/api-call-handler.util";
import { toast } from "sonner";

interface AIResponse {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  responseStatus: "SUCCESS" | "FAILURE" | "PARTIAL_SUCCESS";
  response: string;
}

interface AIState {
  isLoading: boolean;
  aiResponses: Record<string, AIResponse[]>;

  getChatsWithAiByProblemId: (
    problemId: string
  ) => Promise<AIResponse[] | void>;
}

export const useAiStore = create<AIState>((set, get) => ({
  isLoading: false,
  aiResponses: {},

  getChatsWithAiByProblemId: async (problemId: string) => {
    if (get().aiResponses?.[problemId]) {
      return get().aiResponses[problemId];
    }

    set({ isLoading: true });
    try {
      const response = await apiCallHandler<undefined, AIResponse[]>(
        `/ai/chat/${problemId}`,
        "GET"
      );

      if (!response.success || !response.data) {
        toast.error(
          response.message || "Failed to fetch AI responses. Please try again."
        );
        return;
      }
      set((state) => ({
        aiResponses: {
          ...state.aiResponses,
          [problemId]: response.data!,
        },
      }));

      return response.data!;
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      if (get().isLoading) set({ isLoading: false });
    }
  },
}));
