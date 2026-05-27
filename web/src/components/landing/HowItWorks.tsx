import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { Code2, Brain, BarChart3, ChevronRight } from "lucide-react";

const stepsData = [
  {
    stepNumber: "01",
    title: "Choose a Coding Sheet",
    desc: "Pick highly curated, targeted DSA sheets explicitly designed to replicate premium tech interview loops.",
    icon: <Code2 size={20} />,
  },
  {
    stepNumber: "02",
    title: "Solve Problems",
    desc: "Dive into our sandboxed IDE space to benchmark real-time execution speeds and syntax optimizations.",
    icon: <Brain size={20} />,
  },
  {
    stepNumber: "03",
    title: "Track Progress",
    desc: "Visualize your key diagnostic metrics, daily streaks, and quantitative performance analytics.",
    icon: <BarChart3 size={20} />,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Mouse tracking matrix states
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
      className="relative px-6 sm:px-10 lg:px-20 py-32 w-full bg-white dark:bg-zinc-950 border-t border-neutral-100 dark:border-zinc-900/60 transition-colors duration-200"
      id="how-it-works"
    >
      {/* Soft atmospheric amber center background node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.015] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mb-3">
            ✦ Preparation Pipeline
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans">
            Your Blueprint to{" "}
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Mastery.
            </span>
          </h2>
        </div>

        {/* --- STEPS CONTAINER ARCHITECTURE --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {stepsData.map((step, i) => (
            <div key={i} className="relative flex items-center w-full">
              {/* Core Step Card Element */}
              <motion.div
                variants={cardVariants}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative w-full rounded-xl border border-neutral-200 dark:border-zinc-900/80
                  bg-neutral-50/40 dark:bg-zinc-900/20 backdrop-blur-md
                  p-6 flex flex-col justify-between select-none
                  hover:border-neutral-300 dark:hover:border-amber-500/20
                  hover:bg-white dark:hover:bg-zinc-900/40 hover:shadow-md
                  transition-all duration-300 overflow-hidden"
              >
                {/* Magnetic Spotlight Canvas Glow */}
                {hoveredIndex === i && (
                  <div
                    className="pointer-events-none absolute rounded-full bg-amber-500/[0.05] dark:bg-amber-400/[0.02] blur-xl transition-all duration-150 ease-out z-0"
                    style={{
                      width: "200px",
                      height: "200px",
                      left: `${coords.x - 100}px`,
                      top: `${coords.y - 100}px`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Top Line: Icon wrapper accompanied by beautiful modern structural numeric tracker string */}
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 shadow-sm transition-all duration-300 group-hover:border-amber-500/30 text-neutral-500 dark:text-zinc-500 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      {step.icon}
                    </div>

                    <span className="text-xs font-mono font-bold tracking-widest text-neutral-300 dark:text-zinc-800 group-hover:text-amber-500/40 dark:group-hover:text-amber-400/40 transition-colors duration-300">
                      // {step.stepNumber}
                    </span>
                  </div>

                  {/* Core Typography Layout */}
                  <h3 className="text-base font-sans font-bold tracking-tight text-neutral-900 dark:text-zinc-100 group-hover:text-neutral-900 dark:group-hover:text-zinc-50 transition-colors duration-200">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed font-sans text-neutral-500 dark:text-zinc-400 tracking-tight">
                    {step.desc}
                  </p>
                </div>
              </motion.div>

              {/* Dynamic Connecting Arrow Vector (Hidden on final card element & mobile screens) */}
              {i < stepsData.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 pointer-events-none text-neutral-300 dark:text-zinc-800 group-hover:text-amber-500/50 transition-colors duration-300">
                  <ChevronRight size={16} className="stroke-[1.5]" />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
