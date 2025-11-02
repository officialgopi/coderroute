import { create } from "zustand";
import { toast } from "sonner";
import { apiCallHandler } from "../utils/api-call-handler.util";

interface IUser {
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
}

interface AuthState {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;

  getMe: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthLoading: true,
  isAuthenticated: false,
  user: null,

  getMe: async () => {
    set({ isAuthLoading: true });
    try {
      if (get().isAuthenticated) {
        toast.warning("You are already logged in");
        return;
      }

      let authRes = await apiCallHandler<undefined, { user: IUser }>(
        "/auth/me",
        "GET"
      );

      if (authRes.success && authRes.data) {
        set({
          isAuthenticated: true,
          user: authRes.data.user,
          isAuthLoading: false,
        });
        return;
      }

      authRes = await apiCallHandler("/auth", "PUT");
      if (!authRes.success) {
        toast.error("Session expired. Please log in again.");
        return;
      }
      authRes = await apiCallHandler<undefined, { user: IUser }>(
        "/auth/me",
        "GET"
      );

      if (authRes.success && authRes.data) {
        set({
          isAuthenticated: true,
          user: authRes.data.user,
          isAuthLoading: false,
        });
        return;
      }
      toast.error("Session expired. Please log in again.");
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    } finally {
      if (get().isAuthLoading) {
        set({ isAuthLoading: false });
      }
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
          isAuthLoading: false,
        });
        toast.success("Logged out successfully");
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      toast.error("An error occurred while logging out");
    } finally {
      if (get().isAuthLoading) {
        set({ isAuthLoading: false });
      }
    }
  },
}));

export type { IUser };
