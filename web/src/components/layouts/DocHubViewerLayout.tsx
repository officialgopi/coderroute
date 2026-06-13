// src/layouts/DocHubViewerLayout.tsx
import React, { useEffect, memo, useMemo } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { ChevronLeft, FileText, Sparkles, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

// 💎 BIND CENTRALIZED DATA MANAGERS & REUSABLE COMPONENTS
import { useLearnStore } from "@/store/learn.store";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";

export interface IDocHubOutletContext {
  setContext: (ctx: any) => void;
  sectionId?: string;
}

export const DocHubViewerLayout: React.FC = () => {
  const { subjectSlug, topicId, sectionId } = useParams<{
    subjectSlug: string;
    topicId: string;
    sectionId?: string;
  }>();

  // Ingest responsive core properties directly out of global state layer hooks
  const { topics, getTopicById } = useLearnStore();

  // Hydrate topic section deep-nodes immediately on mount or URL mutation parameters changes
  useEffect(() => {
    if (topicId) {
      getTopicById(topicId);
    }
  }, [topicId, getTopicById]);

  // Read active topic details straight from global hash map caches
  const activeTopic = topics[topicId || ""];
  const topicSections = useMemo(() => {
    if (!activeTopic?.sections) return [];
    return [...activeTopic.sections].sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    );
  }, [activeTopic]);

  return (
    <div className="w-full h-screen bg-bg-primary text-text-primary flex overflow-hidden font-sans antialiased">
      {/* --- PERSISTENT SECTIONS SIDEBAR RAIL --- */}
      <aside className="w-68 border-r border-border-subtle bg-gradient-to-b from-bg-secondary/30 via-bg-secondary/15 to-transparent shrink-0 hidden md:flex flex-col select-none h-screen sticky top-0 backdrop-blur-xl relative overflow-hidden z-20">
        {/* Decorative Top Ambient Mesh Glow */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* SIDEBAR INTERFACE HEADER BLOCK */}
        <div className="p-4 border-b border-border-subtle flex flex-col gap-3 relative z-10">
          <div className="flex items-center justify-between gap-2 w-full">
            <Link
              to={`/learn/${subjectSlug}`}
              className="h-7 px-2.5 border border-border-subtle bg-bg-secondary/40 text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 rounded-lg font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 transition-all shadow-3xs active:scale-95 w-max outline-hidden select-none"
            >
              <ChevronLeft size={11} strokeWidth={2.5} />
              <span>Close Workspace</span>
            </Link>

            {/* 💎 INTEGRATED MODULARIZED THEME TOGGLE UNIT */}
            <ThemeToggleButton />
          </div>

          <div className="flex items-center gap-2.5 pt-1 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-accent-gold shadow-inner shrink-0">
              <Cpu size={12} className="animate-pulse" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1 font-mono text-[8px] font-bold tracking-widest text-text-muted uppercase">
                <Sparkles size={8} className="text-accent-gold" />
                <span>Reading Room</span>
              </div>
              <h3 className="font-bold text-xs text-text-primary tracking-tight truncate uppercase font-mono max-w-[11rem] select-text">
                {activeTopic?.title || "// Hydrating Layout..."}
              </h3>
            </div>
          </div>
        </div>

        {/* NAVIGATION TREE TRACK MATRIX */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto custom-scrollbar relative z-10">
          <span className="font-mono text-[8px] font-black text-text-muted tracking-widest uppercase px-2.5 block mb-2.5 select-none opacity-60">
            // Section Modules Outline
          </span>

          {topicSections.length === 0 ? (
            <div className="space-y-2.5 p-1 animate-pulse select-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`section-skeleton-${i}`}
                  className="h-8 w-full rounded-xl bg-bg-secondary/40 border border-border-subtle/40"
                />
              ))}
            </div>
          ) : (
            topicSections.map((section, idx) => {
              const isSectionActive = sectionId
                ? section.id === sectionId
                : idx === 0;

              return (
                <Link
                  key={section.id}
                  to={`/learn/${subjectSlug}/${topicId}/${section.id}`}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl font-sans text-xs text-left transition-all flex items-center justify-between gap-3 border relative group outline-hidden active:scale-[0.99]",
                    isSectionActive
                      ? "bg-white/5 border-border-subtle/80 text-text-primary font-bold shadow-3xs shadow-black/20"
                      : "bg-transparent border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-secondary/20 hover:border-border-subtle/30",
                  )}
                >
                  {/* Active Anchor Block Left Strip Bracket Accent */}
                  <div
                    className={cn(
                      "absolute top-2 bottom-2 left-0 w-[2px] transition-colors rounded-r",
                      isSectionActive ? "bg-accent-gold" : "bg-transparent",
                    )}
                  />

                  <span className="truncate pr-1 pl-1 select-text font-medium">
                    {section.title}
                  </span>

                  <div className="flex items-center shrink-0 font-mono text-[8px] select-none">
                    {isSectionActive ? (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded border border-accent-gold/20 bg-accent-gold/5 font-black text-accent-gold tracking-widest">
                        READING
                      </span>
                    ) : (
                      <FileText
                        size={11}
                        className="opacity-0 group-hover:opacity-40 text-text-muted transition-opacity"
                      />
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </nav>
      </aside>

      {/* --- DYNAMIC ARTICLE DISPLAY FIELD CANVAS --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Pass down context mappings layout vectors cleanly to active view layers */}
        <Outlet
          context={{ setContext: () => {}, sectionId } as IDocHubOutletContext}
        />
      </div>
    </div>
  );
};

export default memo(DocHubViewerLayout);
