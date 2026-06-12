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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// 💎 IMPORT THE DECOUPLED CUSTOM MDX COMPILER LAYER
import MdxRenderer from "@/components/ui/MdxRenderer";

interface ISection {
  id: string;
  title: string;
  markdownContent: string;
}

interface ITopicDetails {
  id: string;
  title: string;
  summary: string;
  estimatedTime: number;
  sections: ISection[];
  isCompleted: boolean;
}

export const DocHubTopicReadingPage: React.FC = () => {
  const { subjectSlug, topicId, sectionId } = useParams<{
    subjectSlug: string;
    topicId: string;
    sectionId?: string;
  }>();

  const navigate = useNavigate();
  const { setContext } = useOutletContext<{ setContext: (ctx: any) => void }>();

  const [topic, setTopic] = useState<ITopicDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const fetchTopicContent = async () => {
      try {
        setLoading(true);
        // Simulation parsing standard content blocks streams: GET {{baseUrl}}/learn/topics/{{topicId}}
        await new Promise((r) => setTimeout(r, 300));

        setTopic({
          id: topicId!,
          title: "Round Robin Process Matrix",
          summary:
            "Preemptive algorithmic execution engine scheduling paradigm utilizing uniform time-slice quanta mappings.",
          estimatedTime: 15,
          isCompleted: false,
          sections: [
            {
              id: "preemptive-mechanics",
              title: "01. Preemptive Context Mechanics",
              markdownContent: `
# Core Context Scheduling Loops

Round-Robin (RR) scheduling passes processes sequentially down a circular FIFO tracking queue. The kernel assigns a fixed microsecond execution frame called a **Time Quantum**.

<mdxanalogycard title="The Card Dealer Layout">
  Think of Round-Robin like a card dealer distributing chips down around a circular poker table. Instead of dumping all chips onto one player until they finish, the dealer drops exactly one token to each person sequentially, looping back immediately until the table requests conclude.
</mdxanalogycard>

If a thread exceeds its allocated chunk boundary, context vectors execute hardware traps to freeze process spaces into ready stacks safely.

\`\`\`c
void executeRoundRobin(Process proc[], int n, int quantum) {
  int remaining_time[proc.id];
  while(1) {
    bool done = true;
    for(int i = 0; i < n; i++) {
      if(remaining_time[i] > 0) {
        done = false;
        // Check execution quanta boundaries
      }
    }
    if (done == true) break;
  }
}
\`\`\`

<mdxinterviewbox 
  prompt="What structural issues occur inside runtime scheduler pipelines if the defined Time Quantum approaches zero?" 
  expected="Execution overhead collapses under continuous hardware state changes as the kernel context switches constantly."
/>
              `,
            },
          ],
        });

        if (!sectionId && topic?.sections.length) {
          navigate(`/learn/${subjectSlug}/${topicId}/${topic.sections[0].id}`, {
            replace: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTopicContent();
  }, [topicId, subjectSlug]);

  useEffect(() => {
    if (topic) {
      setContext({
        sections: topic.sections.map((s) => ({ id: s.id, title: s.title })),
        activeSectionId: sectionId || topic.sections[0]?.id,
      });
    }
    return () => setContext(null);
  }, [topic, sectionId, setContext]);

  const activeIdx = useMemo(() => {
    return topic?.sections.findIndex((s) => s.id === sectionId) ?? 0;
  }, [topic, sectionId]);

  const currentSection = topic?.sections[activeIdx];

  const syncSectionIndexNavigation = (directionOffset: number) => {
    const nextSection = topic?.sections[activeIdx + directionOffset];
    if (nextSection) {
      navigate(`/learn/${subjectSlug}/${topicId}/${nextSection.id}`);
    }
  };

  const handleComplete = async () => {
    try {
      setMarking(true);
      await new Promise((r) => setTimeout(r, 400));
      setTopic((prev) => (prev ? { ...prev, isCompleted: true } : null));
      toast.success("Topic course progression saved successfully!");
    } catch {
      toast.error("Failed to commit progress keys.");
    } finally {
      setMarking(false);
    }
  };

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center font-mono text-xs text-text-muted animate-pulse select-none">
        <Loader2 size={13} className="animate-spin text-accent-gold mr-2" />
        <span>Parsing Markdown abstract structures...</span>
      </div>
    );
  if (!topic || !currentSection) return null;

  return (
    <>
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 custom-scrollbar bg-bg-primary">
        <article className="max-w-3xl mx-auto space-y-6 pb-12">
          {/* CRUMB METRICS TITLE BLOCK */}
          <div className="space-y-1.5 border-b border-border-subtle pb-4 select-none">
            <div className="flex items-center gap-2 font-mono text-[9px] text-text-secondary opacity-50 uppercase font-bold tracking-wider">
              <Clock size={10} />
              <span>
                Section {activeIdx + 1} of {topic.sections.length}
              </span>
              <span>•</span>
              <ShieldCheck size={10} className="text-accent-gold" />
              <span>Verified CoderRoute Core</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary select-text">
              {currentSection.title}
            </h1>
          </div>

          {/* 💎 CLEAN RENDER EXTRACTION POINT:
              Bypasses the strict dictionary object layout limitations cleanly using our isolated MdxRenderer canvas wrapper.
          */}
          <MdxRenderer content={currentSection.markdownContent} />
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

        {activeIdx === topic.sections.length - 1 && (
          <Button
            disabled={topic.isCompleted || marking}
            onClick={handleComplete}
            className={cn(
              "h-8 px-4 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-3xs transition-all border",
              topic.isCompleted
                ? "bg-bg-secondary border-border-subtle text-emerald-400"
                : "bg-text-primary text-bg-primary border-transparent hover:opacity-90",
            )}
          >
            {marking ? (
              <Loader2 size={11} className="animate-spin" />
            ) : topic.isCompleted ? (
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
          disabled={activeIdx === topic.sections.length - 1}
          className="h-8 px-3 bg-text-primary text-bg-primary font-mono text-[10px] font-bold uppercase tracking-wider disabled:opacity-20 flex items-center gap-1 shadow-3xs"
        >
          <span>Next</span> <ArrowRight size={11} strokeWidth={2.5} />
        </Button>
      </footer>
    </>
  );
};

export default memo(DocHubTopicReadingPage);
