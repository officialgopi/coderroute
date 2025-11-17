import { cn } from "@/lib/utils";
import { useSheetStore, type ISheet } from "@/store/sheet.store";
import { Loader2, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const SheetsDetailsPage = () => {
  const { sheetId } = useParams();
  const { getSheetById, sheets, deleteProblemFromSheet } = useSheetStore();
  const sheet: ISheet | undefined = useMemo(
    () => sheets?.find((s) => s.id === sheetId),
    [sheets]
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSheet = async () => {
      setIsLoading(true);
      await getSheetById(sheetId!);
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
          ? sheet.problems.map(({ problem }) => (
              <div
                key={problem.id}
                className="
    group relative p-4 rounded-xl border border-neutral-700 
    
    transition-all duration-200
    shadow-sm hover:shadow-md
  "
              >
                {/* Delete Button */}
                <button
                  onClick={async () => {
                    await deleteProblemFromSheet(sheet.id, problem.id);
                  }}
                  className="
      absolute top-3 right-3 opacity-0 group-hover:opacity-100
      text-neutral-400 hover:text-red-400 transition-all
      p-1 rounded-md
    "
                >
                  <Trash />
                </button>

                <h2 className="font-semibold text-lg ">{problem.title}</h2>

                <p
                  className={cn(
                    "text-sm  mt-1",
                    problem?.difficulty! === "EASY"
                      ? "text-green-500"
                      : problem?.difficulty! === "MEDIUM"
                      ? "text-yellow-500"
                      : "text-red-500"
                  )}
                >
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
