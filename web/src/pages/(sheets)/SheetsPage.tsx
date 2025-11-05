import CreateSheetModal from "@/components/sheets/CreateSheetModal";
import SheetsCard from "@/components/sheets/SheetCard";
import { useState } from "react";

const SheetsPage = () => {
  const [isCreateSheetModalOpen, setIsCreateSheetModalOpen] =
    useState<boolean>(false);
  return (
    <div className="w-full flex flex-col gap-6">
      <CreateSheetModal
        open={isCreateSheetModalOpen}
        onClose={() => {
          setIsCreateSheetModalOpen(false);
        }}
      />
      <div className="w-full flex justify-between items-center ">
        <h1 className="text-2xl font-semibold">Sheets</h1>
        <button
          className="px-4 py-2  border rounded-sm  hover:bg-neutral-500/20  transition-colors"
          onClick={() => {
            setIsCreateSheetModalOpen(true);
          }}
        >
          + Create New Sheet
        </button>
      </div>
      <div className="w-full flex justify-between flex-wrap">
        <SheetsCard />
      </div>
    </div>
  );
};

export default SheetsPage;
