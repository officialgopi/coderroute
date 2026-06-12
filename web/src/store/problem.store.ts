// src/store/problem.store.ts
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
  constraints: string[];
  hints: string[];
  args: string[];
  output_format: "PLAIN" | "JSON" | "FLOAT";
  editorial?: string;
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
    referenceSolution: string;
  }[];
  testcases?: {
    id: number;
    std: {
      stdin: string[];
      stdout: string;
    };
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
  problemInCodeEditor: IProblem | undefined;
  page: number;
  hasMore: boolean;
  codeInEditor: string;
  getProblems: (arg?: {
    isSearch?: boolean;
    searchText?: string;
    page?: number;
    resetPagination?: boolean;
    limit?: number;
  }) => Promise<IProblem[] | void>;
  createProblem: (problem: CreateProblemBody) => Promise<IProblem | undefined>;
  getProblemDetails: (slug: string) => Promise<IProblem | undefined>;
  setProblemInCodeEditor: (problem: IProblem) => void;
  setCodeInEditor: (code: string) => void;
  resetProblemState: () => void;
}

export const useProblemStore = create<ProblemState>((set, get) => ({
  isProblemsLoading: false,
  isProblemDetailsLoading: false,
  page: 1,
  hasMore: true,
  problems: [],
  problemInCodeEditor: undefined,
  codeInEditor: "",

  setCodeInEditor: (code: string) => set({ codeInEditor: code }),

  setProblemInCodeEditor: (problem: IProblem) =>
    set({ problemInCodeEditor: problem }),

  /* --- 🚀 REFACTORED INFINITE SCROLL & SEARCH STREAM HANDLING --- */
  getProblems: async (arg?) => {
    const {
      isSearch = false,
      searchText = "",
      page,
      resetPagination = false,
      limit = 10, // Stepped up block tracking size to 20 to fill taller screens comfortably
    } = arg || {};

    // Determine the calculated target page index safely
    const targetPage = page ?? (resetPagination ? 1 : get().page);

    // Short-circuit execution if we are trying to fetch dead subsequent records
    if (!resetPagination && !get().hasMore && !isSearch && targetPage > 1)
      return;

    if (!isSearch) {
      set({ isProblemsLoading: true });
    }

    try {
      const response = await apiCallHandler<
        undefined,
        { problems: IProblem[] }
      >("/problem", "GET", undefined, {
        page: targetPage,
        limit: limit,
        search: searchText || undefined,
      });

      if (response.success && response.data?.problems) {
        const fetchedProblems = response.data.problems;
        const reachedPageLimit = fetchedProblems.length < limit;

        // Isolated search response escape hatch
        if (isSearch) {
          return fetchedProblems;
        }

        set((state) => {
          // Drain historical arrays cleanly if running a fresh mount or filter reset
          const nextInventory =
            targetPage === 1 || resetPagination
              ? fetchedProblems
              : [...state.problems, ...fetchedProblems];

          return {
            problems: nextInventory,
            page: targetPage + 1,
            hasMore: !reachedPageLimit,
            isProblemsLoading: false,
          };
        });
      }
    } catch (error) {
      console.error(
        "Downstream stream parser caught execution failure:",
        error,
      );
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  createProblem: async (problem: CreateProblemBody) => {
    const { data, success, error } = createProblemBodySchema.safeParse(problem);
    if (!success) {
      console.error(error);
      toast.error("Validation failed. Check your inputs.");
      return;
    }

    const toastId = toast.loading("Creating problem...");
    try {
      const response = await apiCallHandler<
        CreateProblemBody,
        { problem: IProblem }
      >("/problem", "POST", data);

      if (response.success && response.data) {
        toast.success("Problem created successfully", { id: toastId });
        return response.data.problem;
      } else {
        toast.error(response.message || "Failed to create problem", {
          id: toastId,
        });
        throw new Error(response.message || "Failed to create problem");
      }
    } catch (err: any) {
      toast.error(
        err?.message || "Failed to finalize repository write operation",
        { id: toastId },
      );
      throw err;
    }
  },

  getProblemDetails: async (slug: string) => {
    set({ isProblemDetailsLoading: true });
    const problem = get().problems.find((p) => p.slug === slug);

    if (problem?.problemDetails && problem?.testcases) {
      set({ isProblemDetailsLoading: false });
      return problem;
    }

    try {
      const response = await apiCallHandler<null, { problem: IProblem }>(
        `/problem/get-problem/${slug}`,
        "GET",
        null,
      );

      if (response.success && response.data) {
        set((state) => {
          const updatedProblems = problem
            ? state.problems.map((p) =>
                p.id === problem.id ? response.data!.problem : p,
              )
            : [...state.problems, response.data!.problem];
          return { problems: updatedProblems };
        });
        return response.data.problem;
      } else {
        toast.error(response.message || "Failed to fetch problem details");
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred while fetching problem details",
      );
    } finally {
      set({ isProblemDetailsLoading: false });
    }
  },

  // Flushes out tracking pages when cycling view filters on the dashboard page level
  resetProblemState: () => {
    set({ problems: [], page: 1, hasMore: true, isProblemsLoading: false });
  },
}));
