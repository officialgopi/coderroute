// src/pages/(doc-hub)/DocHubTopicReadingPage.tsx
import React, { useState, useEffect, useMemo, memo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import {
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckSquare,
  BookmarkCheck,
  Cpu,
  Sparkles,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 💎 IMPORT THE UNIFIED COMPILER AND CENTRALIZED CACHE MATRIX
import MdxRenderer from "@/components/ui/MdxRenderer";
import { useLearnStore } from "@/store/learn.store";

export const DocHubTopicReadingPage: React.FC = () => {
  const { subjectSlug, topicId, sectionId } = useParams<{
    subjectSlug: string;
    topicId: string;
    sectionId?: string;
  }>();

  const navigate = useNavigate();
  const { setContext } = useOutletContext<{ setContext: (ctx: any) => void }>();

  // Bind reactive global states directly from your store layer hooks
  const {
    topics,
    progress,
    isTopicLoading,
    getTopicById,
    updateTopicProgress,
    getProgress,
  } = useLearnStore();

  const [marking, setMarking] = useState(false);

  // Ingest topic structural parameters from the state map slice
  const currentTopic = useMemo(() => topics[topicId || ""], [topics, topicId]);

  const sortedSections = useMemo(() => {
    if (!currentTopic?.sections) return [];
    return [...currentTopic.sections].sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    );
  }, [currentTopic]);

  // Synchronize topic and progress state hydration on path changes
  useEffect(() => {
    const hydrateActiveTopic = async () => {
      if (topicId) {
        await getTopicById(topicId);
        await getProgress(); // Safely keep tracking maps calibrated
      }
    };
    hydrateActiveTopic();
  }, [topicId, getTopicById, getProgress]);

  // Direct route parsing lookups to clear unaligned trailing path fragments
  useEffect(() => {
    if (
      !isTopicLoading &&
      currentTopic &&
      sortedSections.length > 0 &&
      !sectionId
    ) {
      navigate(`/learn/${subjectSlug}/${topicId}/${sortedSections[0].id}`, {
        replace: true,
      });
    }
  }, [
    isTopicLoading,
    currentTopic,
    sortedSections,
    sectionId,
    navigate,
    subjectSlug,
    topicId,
  ]);

  // Bubble context maps layout coordinates back up to the persistent layout sidebar rail
  useEffect(() => {
    if (currentTopic && sortedSections.length > 0) {
      setContext({
        sections: sortedSections.map((s) => ({ id: s.id, title: s.title })),
        activeSectionId: sectionId || sortedSections[0].id,
      });
    }
    return () => setContext(null);
  }, [currentTopic, sortedSections, sectionId, setContext]);

  const activeIdx = useMemo(() => {
    return sortedSections.findIndex((s) => s.id === sectionId) ?? 0;
  }, [sortedSections, sectionId]);

  const currentSection = sortedSections[activeIdx];

  const syncSectionIndexNavigation = (directionOffset: number) => {
    const nextSection = sortedSections[activeIdx + directionOffset];
    if (nextSection) {
      navigate(`/learn/${subjectSlug}/${topicId}/${nextSection.id}`);
    }
  };

  // Lock progress keys securely directly up through your core global store action loop
  const handleComplete = async () => {
    if (!topicId) return;
    try {
      setMarking(true);
      await updateTopicProgress(topicId, true);
    } catch {
      // Exceptions caught gracefully at centralized store boundaries
    } finally {
      setMarking(false);
    }
  };

  // FIXED DEFENSIVE LOOKUP: Protects the rendering loop thread from reading values of undefined properties
  const isTopicCompleted = useMemo(() => {
    const safeProgress = progress || {};
    return !!safeProgress[topicId || ""]?.completed;
  }, [progress, topicId]);

  if (isTopicLoading && !currentSection)
    return (
      <div className="flex-1 flex items-center justify-center font-mono text-xs text-text-muted animate-pulse select-none bg-bg-primary">
        <Loader2 size={14} className="animate-spin text-accent-gold mr-2.5" />
        <span>Parsing Markdown abstract structures...</span>
      </div>
    );

  if (!currentTopic || !currentSection) return null;

  return (
    <>
      {/* Dynamic Workspace Container Field Canvas */}
      <main className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-10 custom-scrollbar bg-bg-primary relative">
        {/* Subtle Ambient Background Mesh Glow Accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

        <article className="max-w-3xl mx-auto space-y-8 pb-16 relative z-10">
          {/* 💎 HIGH-DENSITY PREMIUM HUD TITLE BLOCK HEADER */}
          <div className="p-5 sm:p-6 rounded-2xl border border-border-subtle bg-gradient-to-b from-bg-secondary/40 to-bg-secondary/10 flex flex-col gap-3.5 shadow-2xs select-none backdrop-blur-xs">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-widest text-text-secondary opacity-60">
                <span className="flex items-center gap-1">
                  <Layers size={11} className="text-accent-gold" />
                  <span>
                    Module Frame: {activeIdx + 1}/{sortedSections.length}
                  </span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} className="text-text-muted" />
                  <span>Topic Stream Reading</span>
                </span>
              </div>

              <div className="flex items-center gap-1 font-mono text-[9px] font-black uppercase tracking-widest text-accent-gold px-2 py-0.5 rounded border border-accent-gold/10 bg-accent-gold/5">
                <ShieldCheck size={10} strokeWidth={2.5} />
                <span>CoderRoute Verified Core</span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-text-primary font-sans select-text leading-tight">
                {currentSection.title}
              </h1>
            </div>
          </div>

          {/* RENDERING CANVAS PORTAL MODULE LAYER */}
          <div className="w-full max-w-full overflow-x-hidden pt-2 text-justify select-text">
            <MdxRenderer content={currentSection.content?.value || ""} />
          </div>
        </article>
      </main>

      {/* --- PREMIUM FOOTER PACED CONTROLLER STRIPBAR --- */}
      <footer className="h-14.5 border-t border-border-subtle bg-bg-secondary/30 px-6 sm:px-12 md:px-16 flex items-center justify-between shrink-0 select-none backdrop-blur-xl relative z-20">
        {/* Back Link Navigation Trigger */}
        <button
          type="button"
          disabled={activeIdx === 0}
          onClick={() => syncSectionIndexNavigation(-1)}
          className="h-8.5 px-4 border border-border-subtle bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary hover:text-white rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 flex items-center gap-1.5 shadow-3xs active:scale-95 transition-all duration-150 cursor-pointer outline-hidden"
        >
          <ArrowLeft size={12} strokeWidth={2.5} />
          <span>Back</span>
        </button>

        {/* Unified Completion Centralized Control Button Trigger */}
        {activeIdx === sortedSections.length - 1 && (
          <button
            type="button"
            disabled={isTopicCompleted || marking}
            onClick={handleComplete}
            className={cn(
              "h-8.5 px-5 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-md transition-all duration-200 rounded-xl outline-hidden border pt-0.5 cursor-pointer active:scale-95",
              isTopicCompleted
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 font-black shadow-inner shadow-emerald-950/20 cursor-default"
                : "bg-white text-black border-none hover:bg-neutral-200",
            )}
          >
            {marking ? (
              <Loader2 size={12} className="animate-spin text-current" />
            ) : isTopicCompleted ? (
              <>
                <CheckSquare
                  size={12}
                  strokeWidth={2.5}
                  className="text-emerald-400"
                />
                <span>Topic Completed</span>
              </>
            ) : (
              <>
                <span>Complete Topic</span>
                <BookmarkCheck size={12} strokeWidth={2.5} />
              </>
            )}
          </button>
        )}

        {/* Forward Next Segment Navigation Trigger */}
        <button
          type="button"
          disabled={activeIdx === sortedSections.length - 1}
          onClick={() => syncSectionIndexNavigation(1)}
          className="h-8.5 px-4 bg-white text-black hover:bg-neutral-200 disabled:bg-bg-secondary disabled:text-text-muted border-none rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 flex items-center gap-1.5 shadow-md active:scale-95 transition-all duration-150 cursor-pointer outline-hidden"
        >
          <span>Next</span>
          <ArrowRight size={12} strokeWidth={2.5} />
        </button>
      </footer>
    </>
  );
};

export default memo(DocHubTopicReadingPage);
