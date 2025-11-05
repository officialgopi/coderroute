import { useSheetStore, type ISheet } from "@/store/sheet.store";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SheetsDetailsPage = () => {
  const { sheetId } = useParams();
  const { getSheetById } = useSheetStore();

  const [sheet, setSheet] = useState<ISheet | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSheet = async () => {
      setIsLoading(true);
      const fetchedSheet = await getSheetById(sheetId!);
      if (fetchedSheet) setSheet(fetchedSheet);
      setIsLoading(false);
    };

    fetchSheet();
  }, [sheetId, getSheetById]);

  return (
    <div className="sheets-details-page w-full flex flex-col gap-4 p-4">
      <div className="w-full flex justify-between mb-4 ">
        <div className="flex flex-col gap-1 ">
          {isLoading ? (
            <div className="w-[200px] h-[40px] rounded-md flex items-center justify-center bg-neutral-500/50  animate-pulse" />
          ) : (
            sheet && <h1 className="text-2xl font-bold">{sheet?.name}</h1>
          )}
          {isLoading ? (
            <div className="w-full h-[20px] rounded-md flex items-center justify-center bg-neutral-500/50  animate-pulse" />
          ) : (
            sheet && <p className="text-neutral-500">{sheet?.description}</p>
          )}
        </div>
        {/* <button className="hover:text-neutral-500/50 p-2 rounded-md transition-colors flex items-center gap-2">
          <Edit />
        </button> */}
      </div>

      <div className="flex flex-col gap-2">
        {isLoading && <Loader2 className="animate-spin text-neutral-500" />}
        {!isLoading && sheet && sheet.problems && sheet.problems.length > 0
          ? sheet.problems.map((problem) => (
              <div
                key={problem.id}
                className="p-4 border border-neutral-700 rounded-md hover:bg-neutral-800 transition-colors"
              >
                <h2 className="font-semibold text-lg">{problem.title}</h2>
                <p className="text-sm text-neutral-500">
                  Difficulty: {problem.difficulty}
                </p>
              </div>
            ))
          : !isLoading && (
              <p className="text-neutral-500">No problems found.</p>
            )}
      </div>
    </div>
  );
};

export default SheetsDetailsPage;
