import { create } from "zustand";
import { toast } from "sonner";
import { apiCallHandler } from "../utils/api-call-handler.util";
interface AuthState {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    avatar?: string;
    isEmailVerified: boolean;
    authProvider: string;
    createdAt: string;
    updatedAt: string;
  } | null;

  getMe: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthLoading: false,
  isAuthenticated: false,
  user: null,

  getMe: async () => {
    set({ isAuthLoading: true });
    try {
      if (get().isAuthenticated) {
        toast.warning("You are already logged in");
        return;
      }

      let authRes = await apiCallHandler<
        {
          id: string;
          name: string;
          email: string;
          username: string;
          role: string;
          avatar?: string;
          isEmailVerified: boolean;
          authProvider: string;
          createdAt: string;
          updatedAt: string;
        },
        undefined
      >("/auth/me", "GET");

      if (authRes.success && authRes.data) {
        set({
          isAuthenticated: true,
          user: authRes.data,
        });
        return;
      }

      authRes = await apiCallHandler("/auth", "PUT");
      if (!authRes.success) {
        toast.error("Session expired. Please log in again.");
        return;
      }
      authRes = await apiCallHandler<
        {
          id: string;
          name: string;
          email: string;
          username: string;
          role: string;
          avatar?: string;
          isEmailVerified: boolean;
          authProvider: string;
          createdAt: string;
          updatedAt: string;
        },
        undefined
      >("/auth/me", "GET");

      if (authRes.success && authRes.data) {
        set({
          isAuthenticated: true,
          user: authRes.data,
        });
        return;
      }
      toast.error("Session expired. Please log in again.");
    } catch (error) {
    } finally {
      set({
        isAuthLoading: false,
      });
    }
  },

  logout: async () => {
    set({ isAuthLoading: true });
    try {
      const res = await apiCallHandler("/auth/logout", "DELETE");
      if (res.success) {
        set({
          isAuthenticated: false,
          user: null,
        });
        toast.success("Logged out successfully");
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      toast.error("An error occurred while logging out");
    } finally {
      set({
        isAuthLoading: false,
      });
    }
  },
}));
