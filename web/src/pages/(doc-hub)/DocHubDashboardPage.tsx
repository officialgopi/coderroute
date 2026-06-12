// src/pages/(doc-hub)/DocHubDashboardPage.tsx
import React, { useState, useEffect, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  BookOpen,
  Search,
  CheckCircle2,
  Flame,
  GraduationCap,
  ChevronRight,
  Trophy,
} from "lucide-react";

interface ISubjectSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  chapterCount: number;
  progressPercent: number; // Hydrated from user's /progress endpoints
}

export const DocHubDashboardPage: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const hydrateDocHubCatalog = async () => {
      try {
        setIsLoading(true);
        // Simultaneously fetching: GET {{baseUrl}}/learn/subjects & GET {{baseUrl}}/progress
        await new Promise((r) => setTimeout(r, 450));

        setSubjects([
          {
            id: "sub-os",
            name: "Operating Systems",
            slug: "operating-systems",
            description:
              "Master thread process synchronization, scheduling kernels, virtualization schemes, memory segmentation, and dynamic disk file management loops.",
            chapterCount: 8,
            progressPercent: 65,
          },
          {
            id: "sub-db",
            name: "Database Internals",
            slug: "database-internals",
            description:
              "Demystify B-Trees, write-ahead logs (WAL), ACID transactional concurrency control models, page layout optimization, and memory cache buffer pools.",
            chapterCount: 6,
            progressPercent: 20,
          },
          {
            id: "sub-cn",
            name: "Computer Networks",
            slug: "computer-networks",
            description:
              "Trace packet framing flows, physical layer modulation, TCP state sliding window congestion controllers, DNS resolution topologies, and application routing architectures.",
            chapterCount: 10,
            progressPercent: 0,
          },
        ]);
      } catch (error) {
        console.error(
          "Failed to map course registry metadata from DocHub streams:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };
    hydrateDocHubCatalog();
  }, []);

  // Filtered Subject Computation Logic
  const filteredSubjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return subjects;

    return subjects.filter(
      (s) =>
        s.name.toLowerCase().includes(normalizedQuery) ||
        (s.description?.toLowerCase() || "").includes(normalizedQuery),
    );
  }, [subjects, searchQuery]);

  // Overall aggregate workspace metrics calculations
  const totalChapters = useMemo(
    () => subjects.reduce((acc, s) => acc + s.chapterCount, 0),
    [subjects],
  );

  const completedStats = useMemo(() => {
    if (subjects.length === 0) return 0;
    const totalProgress = subjects.reduce(
      (acc, s) => acc + s.progressPercent,
      0,
    );
    return Math.round(totalProgress / subjects.length);
  }, [subjects]);

  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary px-4 py-8 md:px-8 max-w-6xl mx-auto font-sans antialiased selection:bg-accent-gold/20 flex flex-col gap-6">
      {/* 1. ACADEMY HEADER OVERVIEW PLATFORM MODULE */}
      <div className="w-full border-b border-border-subtle pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 select-none">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-text-secondary font-mono text-[10px] font-bold uppercase tracking-wider">
            <GraduationCap size={12} className="text-accent-gold" />
            <span>CoderRoute Core Repository</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary">
            Engineering DocHub
          </h1>
          <p className="text-xs text-text-secondary max-w-xl opacity-85 leading-relaxed">
            Deep-dive into structural platform internals, low-level OS
            structures, and architectural trade-offs written directly by
            technical staff.
          </p>
        </div>

        {/* METRICS DASHBOARD BANNER ROW */}
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <div className="px-3 py-2 rounded-xl border border-border-subtle bg-bg-secondary/30 flex items-center gap-2 shadow-3xs">
            <Flame
              size={12}
              className="text-orange-400 shrink-0 animate-pulse"
            />
            <span>
              Syllabus Modules:{" "}
              <span className="text-text-primary font-bold">
                {totalChapters}
              </span>
            </span>
          </div>
          <div className="px-3 py-2 rounded-xl border border-border-subtle bg-bg-secondary/30 flex items-center gap-2 shadow-3xs">
            <Trophy size={11} className="text-accent-gold shrink-0" />
            <span>
              Total Sync:{" "}
              <span className="text-accent-gold font-bold">
                {completedStats}%
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. LIVE QUERY SEARCH FILTER INPUT STRIP */}
      <div className="w-full relative font-mono text-[11px]">
        <Search
          size={12}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter subject indexes by structural keyword, target module namespaces..."
          className="w-full h-9 pl-9 pr-4 bg-bg-secondary/40 border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted/30 focus:outline-hidden focus:border-accent-gold/30 transition-colors shadow-3xs"
        />
      </div>

      {/* 3. CORE INTERACTIVE GRID LANES */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={`subject-skeleton-${i}`}
              className="h-48 rounded-xl border border-border-subtle bg-bg-secondary/20 animate-pulse"
            />
          ))}
        </div>
      ) : filteredSubjects.length === 0 ? (
        <div className="w-full py-16 text-center border border-dashed border-border-subtle rounded-xl font-mono text-text-muted select-none opacity-60">
          // No core curriculum paths match your execution filter parameters.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredSubjects.map((subject) => (
            <Link
              key={subject.id}
              /* 💎 FIX: Directs route matching to intermediate chapter overview catalog timeline path */
              to={`/learn/${subject.slug}`}
              className="group relative block rounded-xl border border-border-subtle bg-bg-secondary/20 hover:bg-bg-secondary/40 hover:border-accent-gold/20 transition-all duration-300 p-5 flex flex-col justify-between h-52 overflow-hidden shadow-3xs cursor-pointer focus:outline-hidden"
            >
              <div className="space-y-3.5">
                {/* HEAD LEVEL DATA STRIP */}
                <div className="flex items-center justify-between w-full font-mono text-[9px] font-bold tracking-wider uppercase text-text-secondary opacity-50 select-none">
                  <div className="w-6 h-6 rounded-md bg-bg-primary border border-border-subtle flex items-center justify-center text-text-muted group-hover:border-accent-gold/10 group-hover:text-text-primary transition-colors">
                    <BookOpen size={11} />
                  </div>
                  <span>{subject.chapterCount} Chapters</span>
                </div>

                {/* TEXT FIELDS BLOCKS */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold tracking-tight text-text-primary group-hover:text-accent-gold transition-colors duration-150 truncate">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 select-text opacity-85 font-sans">
                    {subject.description}
                  </p>
                </div>
              </div>

              {/* CARD FOOTER INTERACTIVE GAUGES BAR */}
              <div className="w-full pt-4 border-t border-border-subtle/40 flex items-center justify-between font-mono text-[10px] select-none z-10">
                {subject.progressPercent > 0 ? (
                  <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 font-bold">
                    <CheckCircle2 size={11} className="stroke-[2.5]" />
                    <span>{subject.progressPercent}% Calibrated</span>
                  </div>
                ) : (
                  <span className="text-text-muted font-bold opacity-60">
                    UNSTARTED
                  </span>
                )}

                <div className="h-5 w-5 rounded-md bg-bg-primary border border-border-subtle flex items-center justify-center text-text-secondary transition-all group-hover:border-accent-gold/20 group-hover:text-accent-gold">
                  <ChevronRight
                    size={11}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </div>

              {/* OPTICAL AMBIENT GRAPH HIGHLIGHT STRIP (FOOTER ACCENT LINE) */}
              <div
                className="absolute bottom-0 inset-x-0 h-[2px] bg-emerald-500/80 dark:bg-emerald-400/80 rounded-b-xl origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                style={{
                  transform: `scale-x(${subject.progressPercent / 100})`,
                  transformOrigin: "left",
                }}
                aria-hidden="true"
              />
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default memo(DocHubDashboardPage);
