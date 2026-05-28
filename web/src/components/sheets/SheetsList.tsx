// src/components/sheets/SheetsList.tsx
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useSheetStore } from "@/store/sheet.store";
import SheetsCard from "./SheetCard";
import { TableProperties } from "lucide-react";

export const SheetsList: React.FC = () => {
  const { sheets, isSheetsLoading, getSheets } = useSheetStore();

  useEffect(() => {
    getSheets();
  }, [getSheets]);

  // Handle true empty collection response
  const isEmpty = !isSheetsLoading && (!sheets || sheets.length === 0);

  return (
    <div className="w-full">
      {/* PRECISE SYSTEM GRID PLATFORM 
        Replaced irregular flexing blocks with an explicit column-clamped CSS Grid
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {/* RENDER LOADED DATA COLLECTIONS */}
        {sheets?.map((sheet) => (
          <SheetsCard key={sheet.id} sheet={sheet} />
        ))}

        {/* HIGH-FIDELITY FAINT RUNTIME LOADING SKELETONS */}
        {isSheetsLoading && (
          <>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full h-40 bg-bg-secondary/40 border border-border-subtle rounded-xl p-5 flex flex-col justify-between animate-pulse select-none"
              >
                <div className="space-y-2.5">
                  <div className="h-4 bg-bg-surface/50 rounded-md w-2/3" />
                  <div className="h-3 bg-bg-surface/30 rounded-md w-full" />
                  <div className="h-3 bg-bg-surface/30 rounded-md w-5/6" />
                </div>
                <div className="h-3.5 bg-bg-surface/40 rounded-md w-1/4 mt-auto" />
              </div>
            ))}
          </>
        )}
      </div>

      {/* COMPACT EMPTY ZERO STATE INTERACTION VIEW */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full py-20 flex flex-col items-center justify-center text-center space-y-3 select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-muted/60">
            <TableProperties size={18} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium text-text-primary">
              No reference sheets initialized
            </h3>
            <p className="text-xs text-text-muted max-w-xs leading-relaxed">
              Create an isolated tracking card index to safely isolate your
              custom problem sets.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SheetsList;
