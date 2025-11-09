import { createProblemBodySchema } from "@/schemas/schemas";
import type { CreateProblemBody, TLanguage } from "@/types/types";
import { apiCallHandler } from "@/utils/api-call-handler.util";
import { toast } from "sonner";
import { create } from "zustand";

export interface IProblem {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  problemDetails?: {
    language: TLanguage;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    problemId: string;
    codeSnippet: string;
    backgroundCode: string;
    whereToWriteCode: string;
    referenceSolution: string;
  }[];

  testCases?: {
    output: string;
    input: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    problemId: string;
    explanation: string | null;
  }[];
}

interface ProblemState {
  isProblemsLoading: boolean;
  isProblemDetailsLoading: boolean;
  problems: IProblem[];
  page: number;
  getProblems: (arg?: {
    isSearch: boolean;
    searchText: string;
    page: number;
  }) => Promise<IProblem[] | void>;
  createProblem: (problem: CreateProblemBody) => Promise<IProblem | undefined>;
  getProblemDetails: (slug: string) => Promise<IProblem | undefined>;
}

export const useProblemStore = create<ProblemState>((set, get) => ({
  isProblemsLoading: false,
  isProblemDetailsLoading: false,
  page: 0,
  problems: [],
  getProblems: async (arg?: {
    isSearch?: boolean;
    searchText?: string;
    page?: number;
  }) => {
    const { isSearch = false, searchText = "", page = 1 } = arg || {};
    if (!isSearch)
      set({
        isProblemsLoading: true,
      });
    try {
      const response = await apiCallHandler<
        undefined,
        { problems: IProblem[] }
      >("/problem", "GET", undefined, {
        page: isSearch ? page : get().page + 1,
        limit: 20,
        search: searchText || undefined,
      });
      if (response.success && response.data && response.data.problems) {
        if (isSearch) {
          return response.data.problems;
        }
        const updatedProblems = get().problems.filter(
          (existingProblem) =>
            !response.data!.problems.some(
              (newProblem) => newProblem.id === existingProblem.id
            )
        );
        if (response.data.problems.length === 0) {
          set({
            problems: [...updatedProblems, ...response.data.problems],
            isProblemsLoading: false,
          });
        } else {
          set({
            problems: [...updatedProblems, ...response.data.problems],
            isProblemsLoading: false,
            page: get().page + 1,
          });
        }
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
  getProblemDetails: async (slug: string) => {
    set({ isProblemDetailsLoading: true });
    const problem = get().problems.find((p) => p.slug === slug);
    if (problem && problem?.problemDetails && problem?.testCases) {
      return problem;
    }
    try {
      const response = await apiCallHandler<
        null,
        {
          problem: IProblem;
        }
      >(`/problem/get-problem/${slug}`, "GET", null);

      if (response.success && response.data) {
        if (problem) {
          const updatedProblems = get().problems.map((p) =>
            p.id === problem.id ? response.data!.problem : p
          );
          set({ problems: updatedProblems });
        } else {
          set({ problems: [...get().problems, response.data.problem] });
        }
        return response.data.problem;
      } else {
        toast.error(response.message || "Failed to fetch problem details");
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred while fetching problem details"
      );
    } finally {
      set({ isProblemDetailsLoading: false });
    }
  },
}));
