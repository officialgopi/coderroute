import { useSheetStore, type ISheet } from "@/store/sheet.store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProblemListModalProps {
  open: boolean;
  onClose: () => void;
  problemId: string;
}

export const ProblemListModal: React.FC<ProblemListModalProps> = ({
  open,
  onClose,
  problemId,
}) => {
  const { getSheets, addProblemToSheet, deleteProblemFromSheet, sheets } =
    useSheetStore();
  useEffect(() => {
    const fetchSheets = async () => {
      await getSheets();
    };
    fetchSheets();
  }, [getSheets]);
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="
            absolute right-0 top-10
            w-80 rounded-xl p-4
            bg-neutral-100 dark:bg-neutral-900
            border border-neutral-700/40
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
            backdrop-blur-md
            text-neutral-900 dark:text-neutral-100
            select-none
          "
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-3 tracking-tight">
            My Lists
          </h2>

          <div className="space-y-2">
            {sheets?.map(({ id, name }) => {
              return (
                <Items
                  addProblemToSheet={addProblemToSheet}
                  deleteProblemFromSheet={deleteProblemFromSheet}
                  key={id}
                  id={id}
                  name={name}
                  sheets={sheets || []}
                  problemId={problemId}
                />
              );
            })}
          </div>

          <div
            onClick={onClose}
            className="
              mt-4 w-full py-2 
              rounded-lg text-sm font-medium
              bg-neutral-200 dark:bg-neutral-800
              hover:bg-neutral-300 dark:hover:bg-neutral-700
              transition-colors
            "
          >
            Close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Items = ({
  id,
  name,
  sheets,
  problemId,
  addProblemToSheet,
  deleteProblemFromSheet,
}: {
  id: string;
  name: string;
  problemId: string;
  sheets: ISheet[];
  addProblemToSheet: (
    sheetId: string,
    problemId: string
  ) => Promise<boolean | void>;
  deleteProblemFromSheet: (
    sheetId: string,
    problemId: string
  ) => Promise<boolean | void>;
}) => {
  const [isProblemInSheet, setIsProblemInSheet] = useState<boolean>(
    sheets
      .find((sheet) => sheet.id === id)
      ?.problems?.some((p) => p.problemId === problemId) ?? false
  );
  useEffect(() => {
    setIsProblemInSheet(
      sheets
        .find((sheet) => sheet.id === id)
        ?.problems?.some((p) => p.problemId === problemId) ?? false
    );
  }, [sheets, problemId]);
  return (
    <label
      key={id}
      className="
                  flex items-center gap-3 px-2 py-2
                  rounded-md cursor-pointer
                  hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60
                  transition-colors
                "
    >
      <input
        type="checkbox"
        className="w-4 h-4 accent-neutral-700 dark:accent-neutral-300 cursor-pointer"
        onChange={async () => {
          if (isProblemInSheet) {
            await deleteProblemFromSheet(id, problemId);
          } else {
            await addProblemToSheet(id, problemId);
          }
        }}
        checked={isProblemInSheet}
      />
      <span className="text-sm">{name}</span>
    </label>
  );
};

export default ProblemListModal;
