import { create } from "zustand";
import type { IUser } from "./auth.store";
import { apiCallHandler } from "../utils/api-call-handler.util";
import { toast } from "sonner";
type DiscussionType = {
  id: string;
  content: string;
  problemId?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  replies?: DiscussionType[];
  user: IUser;
  _count?: {
    replies: number;
  };
};

interface DiscussionState {
  isDiscussionsLoading: boolean;
  discussions: DiscussionType[];
  page: number;
  getDiscussions: (problemId?: string) => Promise<void>;
}

export const useDiscussionStore = create<DiscussionState>((set, get) => ({
  isDiscussionsLoading: false,
  discussions: [],
  page: 0,

  getDiscussions: async (problemId?: string) => {
    set({
      isDiscussionsLoading: true,
    });

    try {
      const response = await apiCallHandler<undefined, DiscussionType[]>(
        `/discussions`,
        "GET",
        undefined,
        {
          ...(problemId ? { problemId } : {}),
          page: get().page + 1,
        }
      );

      if (response.success && response.data) {
        set({
          discussions: [...get().discussions, ...response.data],
          isDiscussionsLoading: false,
          page: get().page + 1,
        });
      }
    } catch (error) {
      toast.error("An error occurred while fetching discussions.");
    } finally {
      if (get().isDiscussionsLoading) set({ isDiscussionsLoading: false });
    }
  },

  createDiscussion: async (
    content: string,
    problemId?: string,
    parentId?: string
  ) => {
    try {
      const response = await apiCallHandler<
        { content: string; problemId?: string; parentId?: string },
        DiscussionType
      >(`/discussions`, "POST", {
        content,
        ...(problemId ? { problemId } : {}),
        ...(parentId ? { parentId } : {}),
      });

      if (response.success && response.data) {
        set({
          discussions: [response.data, ...get().discussions],
        });
        toast.success("Discussion created successfully.");
      }
    } catch (error) {
      toast.error("An error occurred while creating discussion.");
    }
  },
}));
