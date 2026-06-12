// src/pages/(admin)/doc-hub/ManageSectionsPage.tsx
import React, { useState, useEffect, memo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  BookOpen,
  Terminal,
  HelpCircle,
  ChevronRight,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CommandModal } from "@/components/ui/CommandModal";

interface ITopicSection {
  id: string;
  title: string;
  type: "THEORY" | "EXAMPLE" | "ANALOGY" | "DIAGRAM" | "INTERVIEW" | "REVISION";
  content: any;
  order: number;
}

export const ManageSectionsPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [sections, setSections] = useState<ITopicSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) return;
    const fetchSections = async () => {
      try {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 400));
        setSections([
          {
            id: "sec-1",
            title: "Preemptive Paradigm Overview",
            type: "THEORY",
            content: { text: "Prose block variable text content mapping." },
            order: 1,
          },
          {
            id: "sec-2",
            title: "C-Compiler Processing Implementation",
            type: "EXAMPLE",
            content: {
              text: "Context code wrapper loops.",
              code: "void run() {}",
            },
            order: 2,
          },
        ]);
      } catch {
        toast.error("Failed to recover target element array sequences.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSections();
  }, [topicId]);

  const handleDeleteSection = async (id: string) => {
    try {
      await new Promise((r) => setTimeout(r, 350));
      setSections((prev) => prev.filter((sec) => sec.id !== id));
      toast.success("Content section dropped successfully.");
      setSectionToDelete(null);
    } catch {
      toast.error("Failed to drop segment data entries.");
    }
  };

  return (
    <div className="w-full space-y-6 font-sans text-xs text-text-primary antialiased select-none">
      {/* HEADER CRUMB ACCENTS */}
      <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-secondary pl-0.5">
        <Link
          to="/admin-panel/dochub/subjects"
          className="hover:text-accent-gold transition-colors"
        >
          Subjects
        </Link>
        <ChevronRight size={10} className="opacity-40" />
        <span className="text-text-secondary opacity-70">
          Topic Trace: {topicId?.slice(0, 8)}
        </span>
        <ChevronRight size={10} className="opacity-40" />
        <span className="text-accent-gold font-bold">Content Blocks</span>
      </div>

      {/* OPTIONAL PANEL CONTROL CONTROLLER STRIP */}
      <div className="w-full p-4 rounded-xl border border-border-subtle bg-bg-secondary/40 flex items-center justify-between gap-4 shadow-3xs backdrop-blur-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] text-text-secondary opacity-70">
            // Layout Content Matrices
          </span>
          <span className="text-[11px] font-medium text-text-muted">
            Polymorphic Article Core Blocks
          </span>
        </div>

        {/* 💎 FIXED NAVIGATION REDIRECTION PATH POINT */}
        <Button
          onClick={() =>
            navigate(`/admin-panel/dochub/topics/${topicId}/sections/create`)
          }
          className="h-8 px-3.5 bg-text-primary text-bg-primary rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-3xs active:scale-98 transition-transform"
        >
          <Plus size={12} strokeWidth={2.5} />
          <span>Add Block Section</span>
        </Button>
      </div>

      {/* CORE DISPLAY SECTIONS LIST MAP BLOCK */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-bg-secondary/20 border border-border-subtle rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : sections.length === 0 ? (
        <div className="w-full py-16 text-center border border-dashed border-border-subtle rounded-xl font-mono text-text-muted opacity-60">
          // No block modules configured inside this lesson track sheet.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}
          className="space-y-3 max-w-3xl"
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={{
                hidden: { opacity: 0, y: 4 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
              }}
              className="w-full p-4 rounded-xl border border-border-subtle bg-bg-secondary/20 flex items-center justify-between gap-4 shadow-3xs"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 select-none">
                  {section.type === "THEORY" && (
                    <BookOpen size={12} className="text-blue-400" />
                  )}
                  {section.type === "EXAMPLE" && (
                    <Terminal size={12} className="text-purple-400" />
                  )}
                  {section.type === "INTERVIEW" && (
                    <HelpCircle size={12} className="text-accent-gold" />
                  )}
                  <h4 className="font-semibold text-xs text-text-primary tracking-tight">
                    {section.title}
                  </h4>
                  <span className="font-mono text-[8px] font-bold tracking-wider opacity-40 text-text-muted">
                    INDEX ID: {section.order}
                  </span>
                </div>

                <div className="text-[11px] text-text-secondary leading-relaxed line-clamp-1 font-mono opacity-80 select-text bg-bg-primary/30 p-2 rounded border border-border-subtle/40">
                  {section.type === "INTERVIEW"
                    ? `Prompt: ${section.content.prompt}`
                    : `Data: ${section.content.text || "// Raw script arrays mapped."}`}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSectionToDelete(section.id)}
                className="h-7.5 w-7.5 rounded-md border border-transparent hover:border-accent-crimson/20 bg-bg-primary/20 text-text-muted hover:text-accent-crimson hover:bg-accent-crimson/5 transition-all flex items-center justify-center cursor-pointer shadow-3xs shrink-0"
              >
                <Trash2 size={12} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* DISMISS BLOCK DESTRUCTIVE SAFETY SHIELD */}
      <AnimatePresence>
        {sectionToDelete && (
          <CommandModal
            open={!!sectionToDelete}
            onClose={() => setSectionToDelete(null)}
          >
            <div className="p-5 space-y-4 w-full font-sans text-xs">
              <div className="flex items-center gap-2 text-accent-crimson font-mono text-[10px] font-bold uppercase border-b border-border-subtle pb-2.5">
                <AlertCircle size={13} />
                <span>Security Checkpoint Exception</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Confirm removing this dynamic content node. This immediately
                modifies the public reader syllabus rendering sequence logs.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 font-mono text-[10px] font-bold uppercase">
                <button
                  type="button"
                  onClick={() => setSectionToDelete(null)}
                  className="h-8 px-3.5 rounded-lg border border-border-subtle text-text-secondary bg-bg-secondary/40 hover:text-text-primary transition-colors cursor-pointer"
                >
                  Abort
                </button>
                <button
                  type="button"
                  onClick={() =>
                    sectionToDelete && handleDeleteSection(sectionToDelete)
                  }
                  className="h-8 px-3.5 rounded-lg bg-accent-crimson text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Purge Element
                </button>
              </div>
            </div>
          </CommandModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ManageSectionsPage);
