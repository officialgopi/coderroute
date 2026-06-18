// src/store/user.store.ts
import { create } from "zustand";
import axios from "axios";

// ==========================================
// 1. TYPINGS & API DATA CONTRACT PARAMS
// ==========================================

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string;
  bio: string | null;
  createdAt: string;
}

export interface IUserMetrics {
  solvedProblemsCount: number;
  currentStreak: number;
  longestStreak: number;
  points: number;
  rank?: number;
}

export interface ISolvedProblemItem {
  id: string;
  title: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  solvedAt: string;
}

export interface ISubmissionItem {
  id: string;
  problemId: string;
  problemTitle: string;
  status:
    | "Accepted"
    | "Wrong Answer"
    | "Time Limit Exceeded"
    | "Runtime Error"
    | string;
  language: "PYTHON" | "JAVASCRIPT" | "TYPESCRIPT" | "CPP" | "JAVA" | string;
  runtime: number; // in ms
  memory: number; // in MB
  submittedAt: string;
}

export interface IActivityHeatmap {
  [dateString: string]: number; // e.g., "2026-06-18": 4 (number of submissions)
}

export interface ISubmissionsQueryParams {
  page?: number;
  limit?: number;
  status?: "Accepted" | string;
  language?: "PYTHON" | "JAVASCRIPT" | "TYPESCRIPT" | "CPP" | "JAVA" | string;
}

interface UserState {
  // --- CORE CACHE STATES ---
  profile: IUserProfile | null;
  metrics: IUserMetrics | null;
  solvedProblems: ISolvedProblemItem[];
  submissions: ISubmissionItem[];
  heatmap: IActivityHeatmap | null;
  publicProfile: IUserProfile | null;

  // --- COMPONENT LOAD LIFECYCLES ---
  isProfileLoading: boolean;
  isMetricsLoading: boolean;
  isSolvedLoading: boolean;
  isSubmissionsLoading: boolean;
  isHeatmapLoading: boolean;
  isPublicLoading: boolean;
  isMutating: boolean; // Tracks patch update locks

  // --- READ/FETCH WORKSPACES ---
  getProfile: () => Promise<void>;
  getMetrics: () => Promise<void>;
  getSolvedProblems: () => Promise<void>;
  getSubmissions: (params?: ISubmissionsQueryParams) => Promise<void>;
  getActivityHeatmap: () => Promise<void>;
  getPublicProfile: (username: string) => Promise<void>;

  // --- WRITE MUTATION PIPELINES ---
  updateProfile: (payload: { name: string; bio: string }) => Promise<boolean>;
  updateAvatar: (avatarUrl: string) => Promise<boolean>;

  // --- CACHE MANAGEMENT ---
  clearUserStore: () => void;
}

// Target server routing variables mapped to the Postman environment base
const USER_API_BASE = "http://localhost:8000/api/v1/user";

// Helper macro to pull security bearer tokens directly on request fly
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token") || "";
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// ==========================================
// 2. CENTRALIZED STATE HOOKS LAYER
// ==========================================

export const useUserStore = create<UserState>((set, get) => ({
  // Initialization Baselines
  profile: null,
  metrics: null,
  solvedProblems: [],
  submissions: [],
  heatmap: null,
  publicProfile: null,

  isProfileLoading: false,
  isMetricsLoading: false,
  isSolvedLoading: false,
  isSubmissionsLoading: false,
  isHeatmapLoading: false,
  isPublicLoading: false,
  isMutating: false,

  // GET: Primary Account Profile Hydration Node
  getProfile: async () => {
    try {
      set({ isProfileLoading: true });
      const response = await axios.get(
        `${USER_API_BASE}/profile`,
        getAuthHeaders(),
      );
      if (response.data) {
        set({ profile: response.data });
      }
    } catch (error) {
      console.error("Zustand Pipeline Failure: getProfile out bounds.", error);
    } finally {
      set({ isProfileLoading: false });
    }
  },

  // GET: Operational Activity/Leaderboard Metrics
  getMetrics: async () => {
    try {
      set({ isMetricsLoading: true });
      const response = await axios.get(
        `${USER_API_BASE}/metrics`,
        getAuthHeaders(),
      );
      if (response.data) {
        set({ metrics: response.data });
      }
    } catch (error) {
      console.error("Zustand Pipeline Failure: getMetrics out bounds.", error);
    } finally {
      set({ isMetricsLoading: false });
    }
  },

  // GET: Detailed List Of Solved Algorithmic Tasks
  getSolvedProblems: async () => {
    try {
      set({ isSolvedLoading: true });
      const response = await axios.get(
        `${USER_API_BASE}/solved-problems`,
        getAuthHeaders(),
      );
      if (response.data) {
        set({ solvedProblems: response.data });
      }
    } catch (error) {
      console.error(
        "Zustand Pipeline Failure: getSolvedProblems out bounds.",
        error,
      );
    } finally {
      set({ isSolvedLoading: false });
    }
  },

  // GET: Polymorphic Ingestion Filtering for Submissions Stream
  getSubmissions: async (params) => {
    try {
      set({ isSubmissionsLoading: true });

      // Construct routing queries from object structure map arrays safely
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append("page", params.page.toString());
      if (params?.limit) searchParams.append("limit", params.limit.toString());
      if (params?.status) searchParams.append("status", params.status);
      if (params?.language)
        searchParams.append("language", params.language.toUpperCase());

      const queryUrl = `${USER_API_BASE}/submissions?${searchParams.toString()}`;
      const response = await axios.get(queryUrl, getAuthHeaders());

      if (response.data) {
        set({ submissions: response.data });
      }
    } catch (error) {
      console.error(
        "Zustand Pipeline Failure: getSubmissions execution crash.",
        error,
      );
    } finally {
      set({ isSubmissionsLoading: false });
    }
  },

  // GET: Chronological Git-Style Heatmap Coordinates Matrix
  getActivityHeatmap: async () => {
    try {
      set({ isHeatmapLoading: true });
      const response = await axios.get(
        `${USER_API_BASE}/activity`,
        getAuthHeaders(),
      );
      if (response.data) {
        set({ heatmap: response.data });
      }
    } catch (error) {
      console.error(
        "Zustand Pipeline Failure: getActivityHeatmap map sync.",
        error,
      );
    } finally {
      set({ isHeatmapLoading: false });
    }
  },

  // GET: public target layout mapping using raw un-authenticated username slots
  getPublicProfile: async (username) => {
    try {
      set({ isPublicLoading: true });
      const response = await axios.get(`${USER_API_BASE}/${username}`);
      if (response.data) {
        set({ publicProfile: response.data });
      }
    } catch (error) {
      console.error(
        `Zustand Pipeline Failure: getPublicProfile key [${username}] dropped.`,
        error,
      );
    } finally {
      set({ isPublicLoading: false });
    }
  },

  // PATCH: Commit Profile Biography and Structural Parameters Modifications
  updateProfile: async (payload) => {
    try {
      set({ isMutating: true });
      const response = await axios.patch(
        `${USER_API_BASE}/profile`,
        payload,
        getAuthHeaders(),
      );

      if (response.status === 200 || response.status === 204 || response.data) {
        // Immutably refresh internal tracking caches without re-triggering networks cycles
        const currentProfile = get().profile;
        if (currentProfile) {
          set({
            profile: {
              ...currentProfile,
              name: payload.name,
              bio: payload.bio,
            },
          });
        }
        return true;
      }
    } catch (error) {
      console.error(
        "Zustand Mutation Failure: updateProfile tracking block rejection.",
        error,
      );
    } finally {
      set({ isMutating: false });
    }
    return false;
  },

  // PATCH: Dynamic Cloudinary Avatar Token Injection Link Updates
  updateAvatar: async (avatarUrl) => {
    try {
      set({ isMutating: true });
      const response = await axios.patch(
        `${USER_API_BASE}/profile/avatar`,
        { avatarUrl },
        getAuthHeaders(),
      );

      if (response.status === 200 || response.data) {
        const currentProfile = get().profile;
        if (currentProfile) {
          set({
            profile: {
              ...currentProfile,
              avatarUrl: avatarUrl,
            },
          });
        }
        return true;
      }
    } catch (error) {
      console.error(
        "Zustand Mutation Failure: updateAvatar asset upload break.",
        error,
      );
    } finally {
      set({ isMutating: false });
    }
    return false;
  },

  // CACHE: Flushes memory map pointers clean (Useful on clear/logout routing logs)
  clearUserStore: () => {
    set({
      profile: null,
      metrics: null,
      solvedProblems: [],
      submissions: [],
      heatmap: null,
      publicProfile: null,
    });
  },
}));
