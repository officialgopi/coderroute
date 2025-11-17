import { apiCallHandler } from "@/utils/api-call-handler.util";
import { create } from "zustand";
import { toast } from "sonner";
import type { IProblem } from "./problem.store";

interface ISheet {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  copyFromSheetId?: string;
  problems?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    problemId: string;
    sheetId: string;
    problem: IProblem;
  }[];
}

interface SheetState {
  sheets?: ISheet[];

  isSheetsLoading?: boolean;
  isSheetCreating?: boolean;
  isSheetUpdating?: boolean;
  isSheetDeleting?: boolean;
  isAddingProblemToSheet?: boolean;
  isDeletingProblemFromSheet?: boolean;

  createSheet: ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }) => Promise<void>;

  getSheets: () => Promise<ISheet[] | void>;

  getSheetById: (sheetId: string) => Promise<ISheet | undefined>;
  addProblemToSheet: (
    sheetId: string,
    problemId: string
  ) => Promise<boolean | undefined>;
  deleteProblemFromSheet: (
    sheetId: string,
    problemId: string
  ) => Promise<boolean | undefined>;
}

export const useSheetStore = create<SheetState>((set, get) => ({
  isSheetsLoading: false,
  isSheetCreating: false,
  isSheetUpdating: false,
  isSheetDeleting: false,
  isAddingProblemToSheet: false,
  isDeletingProblemFromSheet: false,
  sheets: [],
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

    if (get().sheets && get().sheets?.length! > 0) {
      set({ isSheetsLoading: false });
      return get().sheets;
    }

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

      return res.data.sheets;
    } catch (error) {
      toast.error("An error occurred while fetching sheets");
    } finally {
      if (get().isSheetsLoading) set({ isSheetsLoading: false });
    }
  },
  addProblemToSheet: async (sheetId: string, problemId: string) => {
    set({
      isAddingProblemToSheet: true,
    });
    try {
      const res = await apiCallHandler<
        { problemId: string },
        { sheet: ISheet }
      >(`/sheet/${sheetId}/add-problem`, "POST", { problemId });

      if (!res.success || !res.data) {
        toast.error("Failed to add problem to sheet");
        return;
      }
      const updatedSheet = res.data.sheet;
      const currentSheets = get().sheets || [];
      const updatedSheets = currentSheets.map((sheet) =>
        sheet.id === updatedSheet.id ? updatedSheet : sheet
      );

      set({
        sheets: updatedSheets,
        isAddingProblemToSheet: false,
      });

      toast.success("Problem added to sheet successfully");
      return true;
    } catch (error) {
      toast.error("An error occurred while adding problem to sheet");
    } finally {
      if (get().isAddingProblemToSheet) set({ isAddingProblemToSheet: false });
    }
  },
  deleteProblemFromSheet: async (sheetId: string, problemId: string) => {
    set({ isDeletingProblemFromSheet: true });
    try {
      const res = await apiCallHandler<
        { problemId: string },
        { sheet: ISheet }
      >(`/sheet/${sheetId}/delete-problem`, "POST", { problemId });

      if (!res.success || !res.data) {
        toast.error("Failed to remove problem from sheet");
        return;
      }
      const updatedSheet = res.data.sheet;
      const currentSheets = get().sheets || [];
      const updatedSheets = currentSheets.map((sheet) =>
        sheet.id === updatedSheet.id ? updatedSheet : sheet
      );

      set({
        sheets: updatedSheets,
        isDeletingProblemFromSheet: false,
      });

      toast.success("Problem removed from sheet successfully");
      return true;
    } catch (error) {
      toast.error("An error occurred while removing problem from sheet");
    } finally {
      if (get().isDeletingProblemFromSheet)
        set({ isDeletingProblemFromSheet: false });
    }
  },
  getSheetById: async (sheetId: string) => {
    if (get().sheets?.find((sheet) => sheet.id === sheetId)?.problems) {
      return get().sheets?.find((sheet) => sheet.id === sheetId);
    }
    try {
      const res = await apiCallHandler<null, { sheet: ISheet }>(
        `/sheet/${sheetId}`,
        "GET"
      );

      if (!res.success || !res.data) {
        toast.error("Failed to fetch sheet");
        return undefined;
      }

      const newSheet = res.data.sheet;
      const currentSheets = get().sheets || [];
      const sheetExists = currentSheets.find(
        (sheet) => sheet.id === newSheet.id
      );

      let updatedSheets: ISheet[];
      if (sheetExists) {
        updatedSheets = currentSheets.map((sheet) =>
          sheet.id === newSheet.id ? newSheet : sheet
        );
      } else {
        updatedSheets = [newSheet, ...currentSheets];
      }

      set({
        sheets: updatedSheets,
      });

      return res.data.sheet;
    } catch (error) {
      toast.error("An error occurred while fetching the sheet");
      return undefined;
    }
  },
}));

export type { ISheet };
