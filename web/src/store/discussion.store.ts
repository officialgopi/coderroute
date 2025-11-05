import { create } from "zustand";
import type { IUser } from "./auth.store";
import { apiCallHandler } from "../utils/api-call-handler.util";
import { toast } from "sonner";
type IDiscussion = {
  id: string;
  content: string;
  problemId?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  replies?: IDiscussion[];
  user: IUser;
  _count?: {
    replies: number;
  };
};

interface DiscussionState {
  isDiscussionDetailsLoading?: boolean;
  isDiscussionsLoading: boolean;
  isDiscussionCreating?: boolean;
  discussions: IDiscussion[];
  page: number;
  getDiscussions: (problemId?: string) => Promise<void>;
  createDiscussion: (args: {
    content: string;
    problemId?: string;
    parentId?: string;
  }) => Promise<void>;
  getDiscussionById: (id: string) => Promise<IDiscussion | undefined>;
  getDiscussionReplies: (parentId: string) => Promise<IDiscussion[]>;
}

export const useDiscussionStore = create<DiscussionState>((set, get) => ({
  isDiscussionsLoading: true,
  isDiscussionCreating: false,
  isDiscussionDetailsLoading: false,
  discussions: [],
  page: 0,

  getDiscussions: async (problemId?: string) => {
    set({
      isDiscussionsLoading: true,
    });

    try {
      const response = await apiCallHandler<
        undefined,
        { discussions: IDiscussion[] }
      >(`/discussion`, "GET", undefined, {
        ...(problemId ? { problemId } : {}),
        page: get().page + 1,
      });

      if (response.success && response.data) {
        const newResponses = response.data.discussions.filter(
          (newDiscussion) =>
            !get()
              .discussions.map((d) => d.id)
              .includes(newDiscussion.id)
        );

        set({
          discussions: [...get().discussions, ...newResponses],
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

  createDiscussion: async ({ content, parentId, problemId }) => {
    set({ isDiscussionCreating: true });
    try {
      const response = await apiCallHandler<
        { content: string; problemId?: string; parentId?: string },
        { discussion: IDiscussion }
      >(`/discussion`, "POST", {
        content,
        ...(problemId ? { problemId } : {}),
        ...(parentId ? { parentId } : {}),
      });

      if (response.success && response.data) {
        if (!response.data.discussion.parentId)
          set({
            discussions: [response.data.discussion, ...get().discussions],
            isDiscussionCreating: false,
          });
        toast.success("Discussion created successfully.");
      }
    } catch (error) {
      toast.error("An error occurred while creating discussion.");
    } finally {
      if (get().isDiscussionCreating) set({ isDiscussionCreating: false });
    }
  },

  getDiscussionById: async (id: string) => {
    if (get().discussions.find((discussion) => discussion.id === id)) {
      return get().discussions.find((discussion) => discussion.id === id);
    }

    set({ isDiscussionDetailsLoading: true });
    try {
      const response = await apiCallHandler<
        undefined,
        { discussion: IDiscussion }
      >(`/discussion/${id}`, "GET", undefined);

      if (response.success && response.data) {
        const discussion = response.data.discussion;
        set({
          discussions: [discussion, ...get().discussions],
          isDiscussionDetailsLoading: false,
        });
        return discussion;
      }
    } catch (error) {
      toast.error("An error occurred while fetching discussion details.");
    } finally {
      if (get().isDiscussionDetailsLoading)
        set({ isDiscussionDetailsLoading: false });
    }
  },

  getDiscussionReplies: async (parentId: string): Promise<IDiscussion[]> => {
    try {
      const response = await apiCallHandler<
        undefined,
        { replies: IDiscussion[] }
      >(`/discussion/${parentId}/replies`, "GET", undefined);

      if (response.success && response.data) {
        const replies = response.data.replies;
        return replies;
      }
    } catch (error) {
      toast.error("An error occurred while fetching discussion replies.");
    } finally {
      if (get().isDiscussionDetailsLoading)
        set({ isDiscussionDetailsLoading: false });
    }
    return [];
  },
}));

export type { IDiscussion };
