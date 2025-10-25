import { create } from "zustand";
import { apiCallHandler } from "../utils/api-call-handler.util";
import { toast } from "sonner";

interface CollaborativeCodeEditorState {
  isCollaborativeMode: boolean;
  isCollaborateLoading: boolean;
  editorId: string | null;
  createSessionForCollaborativeCodeEditor: () => Promise<string | void>;
  removeSessionForCollaborativeCodeEditor?: () => void;
}

export const useCollaborativeCodeEditorStore =
  create<CollaborativeCodeEditorState>((set, get) => ({
    isCollaborativeMode: false,
    isCollaborateLoading: false,
    editorId: null,
    createSessionForCollaborativeCodeEditor: async () => {
      try {
        set({ isCollaborateLoading: true });

        const response = await apiCallHandler<
          undefined,
          {
            body: string;
          }
        >("/liveblocks/create-session", "POST");

        if (!response?.data?.body) {
          toast.error("Failed to create collaborative session.");
          return;
        }
        set({
          isCollaborateLoading: false,
          isCollaborativeMode: true,
          editorId: response.data.body,
        });
        return response.data.body;
      } catch (error) {
        toast.error("An error occurred while creating collaborative session.");
      } finally {
        if (get().isCollaborateLoading) set({ isCollaborateLoading: false });
      }
    },
  }));
