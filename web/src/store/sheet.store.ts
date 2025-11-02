import { apiCallHandler } from "@/utils/api-call-handler.util";
import { create } from "zustand";
import type { IProblem } from "@/types/types";
import { toast } from "sonner";

interface ISheet {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  copyFromSheetId?: string;
  problems?: IProblem[];
}

interface SheetState {
  sheets?: ISheet[];

  isSheetsLoading?: boolean;
  isSheetCreating?: boolean;
  isSheetUpdating?: boolean;
  isSheetDeleting?: boolean;

  createSheet: ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }) => Promise<void>;

  getSheets: () => Promise<void>;
}

export const useSheetStore = create<SheetState>((set, get) => ({
  isSheetsLoading: false,
  isSheetCreating: false,
  isSheetUpdating: false,
  isSheetDeleting: false,

  createSheet: async ({ name, description }) => {
    set({ isSheetCreating: true });
    try {
      const res = await apiCallHandler<
        { name: string; description?: string },
        { sheet: ISheet }
      >(`/sheet`, "POST", { name, description });

      if (!res.success || !res.data) {
        toast.error("Failed to create sheet");
        return;
      }

      const { sheet } = res.data;
      const currentSheets = get().sheets || [];
      const updatedSheets = [sheet, ...currentSheets].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      set({
        sheets: updatedSheets,
        isSheetCreating: false,
      });
      toast.success("Sheet created successfully");
    } catch (error) {
      toast.error("An error occurred while creating the sheet");
    } finally {
      if (get().isSheetCreating) set({ isSheetCreating: false });
    }
  },

  getSheets: async () => {
    set({ isSheetsLoading: true });
    try {
      const res = await apiCallHandler<null, { sheets: ISheet[] }>(
        `/sheet`,
        "GET"
      );

      if (!res.success || !res.data) {
        toast.error("Failed to fetch sheets");
        return;
      }

      set({
        sheets: res.data.sheets,
        isSheetsLoading: false,
      });
    } catch (error) {
      toast.error("An error occurred while fetching sheets");
    } finally {
      if (get().isSheetsLoading) set({ isSheetsLoading: false });
    }
  },
}));

export type { ISheet };
