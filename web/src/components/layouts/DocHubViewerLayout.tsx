// src/layouts/DocHubViewerLayout.tsx
import React, { memo } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { ChevronLeft, BookOpen, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the shape of data our layout expects to receive from the active page node
export interface IDocHubOutletContext {
  sections: Array<{ id: string; title: string }>;
  activeSectionId: string;
}

export const DocHubViewerLayout: React.FC = () => {
  const { subjectSlug, topicId, sectionId } = useParams<{
    subjectSlug: string;
    topicId: string;
    sectionId?: string;
  }>();

  // 💎 THE FIXED ENGINE PORT: Local state manager shared between parent and child elements
  const [context, setContext] = React.useState<IDocHubOutletContext | null>(
    null,
  );

  return (
    <div className="w-full h-screen bg-bg-primary text-text-primary flex overflow-hidden font-sans antialiased">
      {/* --- PERSISTENT SECTIONS SIDEBAR RAIL --- */}
      <aside className="w-64 border-r border-border-subtle bg-bg-secondary/10 shrink-0 hidden md:flex flex-col select-none h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
          <Link
            to={`/learn/${subjectSlug}`} // Clean fallback return route to subject dashboard
            className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary hover:text-accent-gold transition-colors w-max"
          >
            <ChevronLeft size={10} />
            <span>Close Workspace</span>
          </Link>
          <div className="font-sans font-bold text-xs text-text-primary flex items-center gap-1.5 pt-1 truncate">
            <BookOpen size={13} className="text-accent-gold shrink-0" />
            <span className="truncate uppercase font-mono text-[10px] tracking-tight text-text-muted">
              Reading Room
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <span className="font-mono text-[9px] font-bold text-text-secondary/40 tracking-wider uppercase px-2.5 block mb-2">
            Section Modules
          </span>

          {!context ? (
            <div className="space-y-2 p-1 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-full rounded-md bg-bg-secondary/40"
                />
              ))}
            </div>
          ) : (
            context.sections.map((section, idx) => {
              /* 💎 FIXED ACCORDING TO REQUIREMENTS:
                 Compares against browser url path sectionId state cleanly.
              */
              const isSectionActive = sectionId
                ? section.id === sectionId
                : idx === 0;

              return (
                /* 💎 DEEP-LINK PARSING:
                   Keeps :subjectSlug and :topicId intact. ONLY mutates the trailing sectionId parameter token.
                */
                <Link
                  key={section.id}
                  to={`/learn/${subjectSlug}/${topicId}/${section.id}`}
                  className={cn(
                    "w-full px-2.5 py-1.5 rounded-lg font-sans text-xs text-left transition-all flex items-center justify-between gap-2 border border-transparent group",
                    isSectionActive
                      ? "bg-bg-secondary text-text-primary border-border-subtle font-semibold shadow-3xs"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/30",
                  )}
                >
                  <span className="truncate">{section.title}</span>
                  {!isSectionActive && (
                    <FileText
                      size={11}
                      className="opacity-0 group-hover:opacity-40 text-text-muted transition-opacity shrink-0"
                    />
                  )}
                </Link>
              );
            })
          )}
        </nav>
      </aside>

      {/* --- DYNAMIC ARTICLE DISPLAY FIELD CANVAS --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Pass the state context mutator portal function down to the children routes pages natively */}
        <Outlet context={{ setContext, sectionId }} />
      </div>
    </div>
  );
};

export default memo(DocHubViewerLayout);
