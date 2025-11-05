import { useSheetStore } from "@/store/sheet.store";
import SheetsCard from "./SheetCard";
import { useEffect } from "react";
const SheetsList = () => {
  const { sheets, isSheetsLoading, getSheets } = useSheetStore();
  useEffect(() => {
    getSheets();
  }, [getSheets]);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[812px] flex  items-center gap-4 flex-wrap">
        {sheets?.map((sheet) => (
          <SheetsCard key={sheet.id} sheet={sheet} />
        ))}
        {isSheetsLoading && (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-[260px] h-[300px] bg-neutral-500/50 rounded-md animate-pulse"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SheetsList;
