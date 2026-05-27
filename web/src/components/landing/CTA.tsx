import { useRef, useState } from "react";
import {
  motion,
  useInView,
  type Transition,
  type Variants,
} from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";

const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-36 px-6 sm:px-10 lg:px-20 flex justify-center overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-200"
      id="cta"
    >
      {/* Structural Atmospheric Ambient Backdrops adjusted to unified Amber token */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.015] dark:bg-amber-500/[0.01] blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative rounded-2xl border border-neutral-200 dark:border-zinc-900/80
            bg-neutral-50/40 dark:bg-zinc-900/10 backdrop-blur-md
            px-6 py-16 sm:p-16 text-center select-none overflow-hidden
            hover:border-neutral-300 dark:hover:border-amber-500/20
            hover:bg-white dark:hover:bg-zinc-900/30 shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Spotlight matches Amber identity matrix */}
          {isHovered && (
            <div
              className="pointer-events-none absolute rounded-full bg-amber-500/[0.04] dark:bg-amber-400/[0.015] blur-2xl transition-all duration-150 ease-out z-0"
              style={{
                width: "400px",
                height: "400px",
                left: `${coords.x - 200}px`,
                top: `${coords.y - 200}px`,
              }}
            />
          )}

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 text-neutral-400 dark:text-zinc-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:border-amber-500/20 transition-all duration-300 mb-6 shadow-xs"
            >
              <Terminal size={16} className="stroke-[2.5]" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans leading-tight">
              Ready to Become a{" "}
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                Better Developer?
              </span>
            </h2>

            <p className="mt-4 text-sm text-neutral-500 dark:text-zinc-400 leading-relaxed tracking-tight">
              Practice high-frequency coding problems, follow precision
              structured algorithmic roadmaps, and clear technical interview
              loops with{" "}
              <span className="font-semibold text-neutral-800 dark:text-zinc-200">
                CoderRoute
              </span>
              .
            </p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto"
            >
              <Link to="/login" className="w-full sm:w-auto group/btn">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-11 rounded-lg
                    bg-neutral-950 text-white dark:bg-zinc-100 dark:text-zinc-950
                    hover:bg-neutral-800 dark:hover:bg-white
                    text-xs font-mono font-bold uppercase tracking-wider
                    transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Start Practicing</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5 stroke-[2.5]"
                  />
                </motion.button>
              </Link>

              <Link to="/roadmap" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 h-11 rounded-lg
                    border border-neutral-200 dark:border-zinc-800
                    text-neutral-800 dark:text-zinc-300 bg-transparent
                    text-xs font-mono font-bold uppercase tracking-wider
                    transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-zinc-900/60 cursor-pointer"
                >
                  View Roadmap
                </motion.button>
              </Link>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-[11px] font-mono font-medium text-neutral-400 dark:text-zinc-600 tracking-wider uppercase"
            >
              // Free forever. No card required.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
