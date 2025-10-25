import { create } from "zustand";

interface IProblem {
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
}

export const useProblemStore = create<ProblemState>(() => ({
  isProblemsLoading: false,

  problems: [],
}));
