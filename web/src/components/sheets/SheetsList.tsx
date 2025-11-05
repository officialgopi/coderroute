import { useSheetStore } from "@/store/sheet.store";
import SheetsCard from "./SheetCard";
import { useEffect } from "react";
const SheetsList = () => {
  const { sheets, isSheetsLoading, getSheets } = useSheetStore();
  useEffect(() => {
    getSheets();
  }, [getSheets]);

  return (
    <div className="w-full flex justify-center items-center gap-4 flex-wrap">
      {sheets?.map((sheet) => (
        <SheetsCard sheet={sheet} />
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
  );
};

export default SheetsList;
