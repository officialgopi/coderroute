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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      // Catch exceptions silently or let sonner handle error logging inside the store
    } finally {
      setMarking(false);
    }
  };

  // 💎 FIXED DEFENSIVE LOOKUP: Protects the rendering loop thread from reading values of undefined properties
  const isTopicCompleted = useMemo(() => {
    const safeProgress = progress || {};
    return !!safeProgress[topicId || ""]?.completed;
  }, [progress, topicId]);

  if (isTopicLoading && !currentSection)
    return (
      <div className="flex-1 flex items-center justify-center font-mono text-xs text-text-muted animate-pulse select-none">
        <Loader2 size={13} className="animate-spin text-accent-gold mr-2" />
        <span>Parsing Markdown abstract structures...</span>
      </div>
    );

  if (!currentTopic || !currentSection) return null;

  return (
    <>
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 custom-scrollbar bg-bg-primary">
        <article className="max-w-3xl mx-auto space-y-6 pb-12">
          {/* CRUMB METRICS TITLE BLOCK */}
          <div className="space-y-1.5 border-b border-border-subtle pb-4 select-none">
            <div className="flex items-center gap-2 font-mono text-[9px] text-text-secondary opacity-50 uppercase font-bold tracking-wider">
              <Clock size={10} />
              <span>
                Section {activeIdx + 1} of {sortedSections.length}
              </span>
              <span>•</span>
              <ShieldCheck size={10} className="text-accent-gold" />
              <span>Verified CoderRoute Core</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary select-text">
              {currentSection.title}
            </h1>
          </div>

          {/* RENDERING CANVAS PORTAL LAYER */}
          <MdxRenderer content={currentSection.content?.value || ""} />
        </article>
      </main>

      {/* --- FOOTER PACED CONTROLLER STRIPBAR --- */}
      <footer className="h-14 border-t border-border-subtle bg-bg-secondary/10 px-4 sm:px-8 md:px-12 flex items-center justify-between shrink-0 select-none backdrop-blur-xs">
        <Button
          onClick={() => syncSectionIndexNavigation(-1)}
          disabled={activeIdx === 0}
          className="h-8 px-3 border border-border-subtle bg-bg-primary text-text-secondary hover:text-text-primary font-mono text-[10px] font-bold uppercase tracking-wider disabled:opacity-20 flex items-center gap-1 shadow-3xs"
        >
          <ArrowLeft size={11} strokeWidth={2.5} /> <span>Back</span>
        </Button>

        {activeIdx === sortedSections.length - 1 && (
          <Button
            disabled={isTopicCompleted || marking}
            onClick={handleComplete}
            className={cn(
              "h-8 px-4 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-3xs transition-all border pt-0.5",
              isTopicCompleted
                ? "bg-bg-secondary border-border-subtle text-emerald-400"
                : "bg-text-primary text-bg-primary border-transparent hover:opacity-90",
            )}
          >
            {marking ? (
              <Loader2 size={11} className="animate-spin" />
            ) : isTopicCompleted ? (
              <>
                <CheckSquare size={11} className="stroke-[2.5]" />
                <span>Topic Completed</span>
              </>
            ) : (
              <>
                <span>Complete Topic</span>
                <BookmarkCheck size={11} className="stroke-[2.5]" />
              </>
            )}
          </Button>
        )}

        <Button
          onClick={() => syncSectionIndexNavigation(1)}
          disabled={activeIdx === sortedSections.length - 1}
          className="h-8 px-3 bg-text-primary text-bg-primary font-mono text-[10px] font-bold uppercase tracking-wider disabled:opacity-20 flex items-center gap-1 shadow-3xs"
        >
          <span>Next</span> <ArrowRight size={11} strokeWidth={2.5} />
        </Button>
      </footer>
    </>
  );
};

export default memo(DocHubTopicReadingPage);
