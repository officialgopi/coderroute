import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { Star, CheckCircle2 } from "lucide-react";

const testimonialsData = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    role: "Software Engineer",
    text: "CoderRoute completely changed how I practice coding. The structured sheets are amazing.",
    handle: "rahul_dev",
  },
  {
    name: "Priya Patel",
    initials: "PP",
    role: "Backend Developer",
    text: "The progress tracking and analytics helped me stay consistent with problem solving.",
    handle: "priya_codes",
  },
  {
    name: "Arjun Mehta",
    initials: "AM",
    role: "CS Student",
    text: "Finally a platform where coding practice actually feels organized and motivating.",
    handle: "arjunm_git",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
      className="relative px-6 sm:px-10 lg:px-20 py-36 w-full bg-white dark:bg-zinc-950 border-t border-neutral-100 dark:border-zinc-900/60 transition-colors duration-200"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* --- LEFT SIDEBAR: METRICS & FIXED CONTEXT BRANDING --- */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mb-3">
              ✦ Community Echo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans leading-tight">
              Backed by the next generation of{" "}
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                engineers.
              </span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-neutral-500 dark:text-zinc-400 tracking-tight">
            See how developers leverage CoderRoute's compiler framework and
            diagnostic metrics to build consistency and accelerate their
            platform preparation.
          </p>

          {/* Minimalist Trust Metric Pill Block */}
          <div className="inline-flex flex-col gap-1.5 p-4 rounded-xl border border-neutral-200/80 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-900/10 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  size={14}
                  fill="currentColor"
                  className="stroke-none"
                />
              ))}
            </div>
            <p className="text-xs font-mono font-bold tracking-tight text-neutral-800 dark:text-zinc-400">
              4.9/5 Rating across 2,000+ Git-authenticated members
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR: ASYMMETRIC STACKED FEED ARCHITECTURE --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="lg:col-span-8 space-y-4 w-full"
        >
          {testimonialsData.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setHoveredIndex(null)}
              // Dynamic left margin offsets create a sleek, premium cascading layout on desktop viewports
              className={`group relative rounded-xl border-l-2 border-y border-r border-neutral-200 dark:border-zinc-900/80
                bg-neutral-50/30 dark:bg-zinc-900/15 backdrop-blur-md
                p-6 flex flex-col justify-between text-left select-none
                border-l-neutral-300 dark:border-l-zinc-800
                hover:border-l-amber-500 dark:hover:border-l-amber-500
                hover:border-y-neutral-300 dark:hover:border-y-amber-500/10
                hover:border-r-neutral-300 dark:hover:border-r-amber-500/10
                hover:bg-white dark:hover:bg-zinc-900/30 hover:shadow-sm
                transition-all duration-300 overflow-hidden
                ${i === 1 ? "md:ml-6" : i === 2 ? "md:ml-12" : ""}`}
            >
              {/* Dynamic Magnetic Cursor Spotlight Track */}
              {hoveredIndex === i && (
                <div
                  className="pointer-events-none absolute rounded-full bg-amber-500/[0.04] dark:bg-amber-400/[0.015] blur-xl transition-all duration-150 ease-out z-0"
                  style={{
                    width: "250px",
                    height: "250px",
                    left: `${coords.x - 125}px`,
                    top: `${coords.y - 125}px`,
                  }}
                />
              )}

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                {/* Left block: Text Statement Content */}
                <p className="text-neutral-600 dark:text-zinc-300 text-[13px] sm:text-sm leading-relaxed tracking-tight font-medium max-w-xl">
                  "{t.text}"
                </p>

                {/* Right block: User Identity Matrix Layout */}
                <div className="flex items-center gap-3 sm:text-right sm:flex-row-reverse flex-shrink-0">
                  {/* Monospace Code Initials Pill Box */}
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 text-xs font-mono font-bold text-neutral-400 dark:text-zinc-600 transition-colors duration-300 group-hover:border-amber-500/30 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    [{t.initials}]
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-sans text-neutral-900 dark:text-zinc-100">
                        {t.name}
                      </span>
                      <CheckCircle2
                        size={12}
                        className="text-amber-500 dark:text-amber-400/80 stroke-[2.5]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 sm:flex-row-reverse mt-0.5 text-[10px] font-mono font-medium text-neutral-400 dark:text-zinc-600">
                      <span>{t.role}</span>
                      <span>•</span>
                      <span className="lowercase group-hover:text-neutral-500 dark:group-hover:text-zinc-400 transition-colors duration-150">
                        @{t.handle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
