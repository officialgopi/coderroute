import { createProblemBodySchema } from "@/schemas/schemas";
import type { CreateProblemBody } from "@/types/types";
import { apiCallHandler } from "@/utils/api-call-handler.util";
import { toast } from "sonner";
import { create } from "zustand";

export interface IProblem {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProblemState {
  isProblemsLoading: boolean;
  problems: IProblem[];
  page: number;
  getProblems: () => Promise<void>;
  createProblem: (problem: CreateProblemBody) => Promise<IProblem | undefined>;
}

export const useProblemStore = create<ProblemState>((set, get) => ({
  isProblemsLoading: false,
  page: 0,
  problems: [],
  getProblems: async () => {
    set({
      isProblemsLoading: true,
    });
    try {
      const response = await apiCallHandler<null, { problems: IProblem[] }>(
        "/problem",
        "GET",
        null,
        {
          page: get().page + 1,
          limit: 20,
        }
      );
      console.log(response.data);
      if (response.success && response.data && response.data.problems) {
        set({
          problems: [...get().problems, ...response.data.problems],
          isProblemsLoading: false,
          page: get().page + 1,
        });
      }
    } catch (error) {
    } finally {
      if (get().isProblemsLoading)
        set({
          isProblemsLoading: false,
        });
    }
  },
  createProblem: async (problem: CreateProblemBody) => {
    createProblemBodySchema.parse(problem);
    const response = await apiCallHandler<
      CreateProblemBody,
      {
        problem: IProblem;
      }
    >("/problem", "POST", problem);

    if (response.success && response.data) {
      toast.success("Problem created successfully");
      return response.data.problem;
    } else {
      toast.error(response.message || "Failed to create problem");
    }
  },
}));
