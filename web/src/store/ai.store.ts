import { create } from "zustand";
import { apiCallHandler } from "../utils/api-call-handler.util";
import { toast } from "sonner";
import type { CreateProblemBody } from "@/types/types";

interface AIResponse {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  responseStatus: "SUCCESS" | "FAILURE" | "PARTIAL_SUCCESS";
  response: string;
}

interface AIState {
  isProblemCreatingWithAI: boolean;
  isLoading: boolean;
  aiResponses: Record<string, AIResponse[]>;

  getChatsWithAiByProblemId: (
    problemId: string
  ) => Promise<AIResponse[] | void>;

  createProblemWithAI: (prompt: string) => Promise<CreateProblemBody | void>;
}

export const useAiStore = create<AIState>((set, get) => ({
  isLoading: false,
  isProblemCreatingWithAI: false,
  aiResponses: {},

  getChatsWithAiByProblemId: async (problemId: string) => {
    if (get().aiResponses?.[problemId]) {
      return get().aiResponses[problemId];
    }

    set({ isLoading: true });
    try {
      const response = await apiCallHandler<undefined, { chats: AIResponse[] }>(
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
          [problemId]: response.data?.chats!,
        },
      }));

      return response.data.chats!;
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      if (get().isLoading) set({ isLoading: false });
    }
  },
  createProblemWithAI: async (prompt: string) => {
    set({ isProblemCreatingWithAI: true });
    try {
      const response = await apiCallHandler<
        { prompt: string },
        {
          generatedProblem: CreateProblemBody;
        }
      >(`/ai/generate-problem`, "POST", { prompt });

      if (!response.success || !response.data) {
        toast.error(
          response.message ||
            "Failed to create problem with AI. Please try again."
        );
        return;
      }

      toast.success("Problem created with AI successfully!");

      return response.data.generatedProblem;
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      if (get().isProblemCreatingWithAI)
        set({ isProblemCreatingWithAI: false });
    }
  },
}));
