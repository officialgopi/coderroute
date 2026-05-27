import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  BarChart3,
  BookOpen,
  MessageSquare,
  Cpu,
  Rocket,
  Target,
  Terminal,
} from "lucide-react";
import Glow from "../ui/Glow";

const featuresData = [
  {
    title: "Ultimate Coding Workspace",
    desc: "Solve problems with an advanced coding environment, real-time execution, and powerful tools.",
    icon: <Code2 size={18} />,
    img: "/coding_workspace.png",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Public Sheet Library",
    desc: "Explore curated coding sheets shared by the community.",
    icon: <BookOpen size={18} />,
    img: "/sheet.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "200+",
    desc: "Coding Problems Implemented",
    icon: <Rocket size={18} />,
    metric: true,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "+15%",
    desc: "Performance Improvement",
    icon: <Target size={18} />,
    metric: true,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "AI Discussions",
    desc: "Ask LeetBot to understand solutions and coding concepts.",
    icon: <MessageSquare size={18} />,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Performance Dashboard",
    desc: "Track your coding KPIs and progress visually.",
    icon: <BarChart3 size={18} />,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Track Progress",
    desc: "Monitor sheet completion and learning consistency.",
    icon: <Cpu size={18} />,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Language Suite",
    desc: "Switch between Python, Java, C++, JS, and Go instantly.",
    icon: <Terminal size={18} />,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Coding Blogs",
    desc: "Read expert insights and coding strategies.",
    icon: <BookOpen size={18} />,
    span: "lg:col-span-1 lg:row-span-1",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isCurrentlyInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  // Track specific mouse positional coordinates inside individual grid panels
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-6 sm:px-10 lg:px-20 py-28 w-full bg-white dark:bg-zinc-950 transition-colors duration-200"
      id="features"
    >
      <Glow />

      {/* --- SECTION HEADER --- */}
      <div className="relative z-10 text-center mb-20 max-w-2xl mx-auto">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mb-3">
          ✦ Platform Matrix
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans">
          Engineered for{" "}
          <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            Excellence.
          </span>
        </h2>
      </div>

      {/* --- BENTO CARD CORE GRID --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isCurrentlyInView ? "show" : "hidden"}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto"
      >
        {featuresData.map((f, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative rounded-xl border border-neutral-200 dark:border-zinc-900/80
              bg-neutral-50/40 dark:bg-zinc-900/20 backdrop-blur-md
              p-5 flex flex-col justify-between select-none
              hover:border-neutral-300 dark:hover:border-amber-500/20
              hover:bg-white dark:hover:bg-zinc-900/40
              transition-all duration-300 overflow-hidden ${f.span || ""}`}
          >
            {/* --- MAGNETIC CURSOR SPOTLIGHT TRACKER --- */}
            {hoveredIndex === i && (
              <div
                className="pointer-events-none absolute rounded-full bg-amber-500/[0.06] dark:bg-amber-400/[0.03] blur-xl transition-all duration-150 ease-out z-0"
                style={{
                  width: "250px",
                  height: "250px",
                  left: `${coords.x - 125}px`,
                  top: `${coords.y - 125}px`,
                }}
              />
            )}

            {/* Subtle, premium amber radial border gradient mask follow-effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
              style={{
                background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(245, 158, 11, 0.04), transparent 80%)`,
              }}
            />

            <div className="relative z-10 w-full">
              {/* Header Icon + Title Line layout */}
              <div className="flex items-center gap-2.5 mb-3 text-neutral-900 dark:text-zinc-100 font-bold">
                <span className="text-neutral-500 dark:text-zinc-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                  {f.icon}
                </span>
                <h3 className="text-sm font-mono font-bold uppercase tracking-tight">
                  {f.metric ? "Platform Metric" : f.title}
                </h3>
              </div>

              {/* Description copy blocks */}
              {!f.metric && (
                <p className="text-neutral-500 dark:text-zinc-400 text-xs sm:text-[13px] leading-relaxed tracking-tight">
                  {f.desc}
                </p>
              )}
            </div>

            {/* Nested Media Panel Slots */}
            {f.img && (
              <div className="mt-4 rounded-lg overflow-hidden border border-neutral-200 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-950 flex-1 min-h-[160px] max-h-[220px] relative z-10">
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  className="object-cover w-full h-full opacity-85 dark:opacity-75 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-300"
                />
              </div>
            )}

            {/* Clean Data Metric Layout Display */}
            {f.metric && (
              <div className="relative z-10 my-4 text-left">
                <p className="text-4xl font-extrabold tracking-tighter text-neutral-900 dark:text-zinc-50 font-sans bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-zinc-50 dark:to-zinc-400 group-hover:from-amber-600 group-hover:to-amber-400 bg-clip-text text-transparent transition-all duration-300">
                  {f.title}
                </p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-600 mt-1 font-bold">
                  {f.desc}
                </p>
              </div>
            )}

            {/* Corner Action Arrow Indicator */}
            <div className="absolute bottom-3 right-3 text-neutral-300 dark:text-zinc-800 group-hover:text-amber-500/60 dark:group-hover:text-amber-400/60 transform translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-10">
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
