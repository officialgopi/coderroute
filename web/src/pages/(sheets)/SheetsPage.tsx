// src/features/sheets/pages/SheetsPage.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Table } from "lucide-react";
import CreateSheetModal from "@/components/sheets/CreateSheetModal";
import SheetsList from "@/components/sheets/SheetsList";

export const SheetsPage: React.FC = () => {
  const [isCreateSheetModalOpen, setIsCreateSheetModalOpen] =
    useState<boolean>(false);

  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary px-4 py-8 md:px-8 max-w-7xl mx-auto selection:bg-accent-gold/20 antialiased">
      {/* MODAL MOUNT CONTROLLER */}
      <CreateSheetModal
        open={isCreateSheetModalOpen}
        onClose={() => setIsCreateSheetModalOpen(false)}
      />

      {/* HEADER CONTROL CONTAINER ACTION ROW */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-between border-b border-border-subtle pb-5 mb-8"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Table size={16} className="text-accent-gold/80" />
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-text-primary">
              Cheat Sheets
            </h1>
          </div>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed tracking-tight">
            Curate algorithmic paradigms, save markdown snippets, and manage
            personal data reference indices.
          </p>
        </div>

        {/* COMPLEMENTARY ACTION BUTTON */}
        <button
          onClick={() => setIsCreateSheetModalOpen(true)}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-accent-gold text-bg-primary font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-accent-primary transition-colors duration-150 cursor-pointer shadow-3xs"
        >
          <Plus size={12} className="stroke-[2.5]" />
          <span>New Sheet</span>
        </button>
      </motion.div>

      {/* MAIN DATA LIST ENGAGEMENT CANVAS */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="w-full"
      >
        <SheetsList />
      </motion.div>
    </div>
  );
};

export default SheetsPage;
