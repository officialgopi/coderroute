import { motion } from "motion/react";
import {
  FileCode,
  Braces,
  Coffee,
  Server,
  Atom,
  Container,
  Boxes,
  Cpu,
} from "lucide-react";

const techIcons = [
  { name: "JavaScript", icon: FileCode, meta: "V8 Engine v12" },
  { name: "Python", icon: Cpu, meta: "CPython v3.12" },
  { name: "C++", icon: Braces, meta: "GCC v13.2" },
  { name: "Java", icon: Coffee, meta: "OpenJDK v21" },
  { name: "Node.js", icon: Server, meta: "Node LTS v20" },
  { name: "React", icon: Atom, meta: "React v19" },
  { name: "Docker", icon: Container, meta: "Isolated Sandbox" },
  { name: "Kubernetes", icon: Boxes, meta: "Cluster Orchestration" },
];

interface TechMarqueeProps {
  reverse?: boolean;
}

const TechMarquee = ({ reverse = false }: TechMarqueeProps) => {
  // Triple the array elements to handle wide desktop monitors smoothly without snapping
  const items = [...techIcons, ...techIcons, ...techIcons];

  return (
    <div
      className="flex w-full overflow-hidden select-none group/marquee"
      id="social-proofs"
    >
      <motion.div
        className="flex gap-4 pr-4 py-3 flex-shrink-0 whitespace-nowrap min-w-full"
        animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        // Pause the infinite scroll translation when user hovers over the track
        whileHover={{ animationPlayState: "paused" }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="group flex flex-col justify-center px-5 py-3 rounded-xl
                border border-neutral-200 dark:border-zinc-900/80
                bg-neutral-50/40 dark:bg-zinc-900/20 backdrop-blur-sm
                hover:border-amber-500/30 dark:hover:border-amber-500/20 
                hover:bg-white dark:hover:bg-zinc-900/50 hover:shadow-md
                hover:-translate-y-0.5 hover:skew-x-1
                transition-all duration-300 cursor-pointer min-w-[170px] relative overflow-hidden"
            >
              {/* Subtle accent hover line indicator at the top of the card */}
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Core Component Row Layout */}
              <div className="flex items-center gap-3">
                <div className="text-neutral-500 dark:text-zinc-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                  <Icon size={18} className="stroke-[2]" />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold tracking-tight text-neutral-700 dark:text-zinc-300 group-hover:text-neutral-900 dark:group-hover:text-zinc-100 transition-colors duration-200">
                    {item.name}
                  </span>

                  {/* Context Meta Subtext String */}
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-zinc-600 mt-0.5 group-hover:text-neutral-500 dark:group-hover:text-zinc-400 transition-colors duration-200">
                    {item.meta}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export const SocialProof = () => {
  return (
    <section
      id="tech-stack"
      className="relative px-6 sm:px-10 lg:px-20 py-24 overflow-hidden bg-white dark:bg-zinc-950 border-t border-neutral-100 dark:border-zinc-900/60 transition-colors duration-200"
    >
      {/* Background ambient lighting nodes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[200px]  blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[200px] bg-orange-500/[0.01] dark:bg-orange-500/[0.002] blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Minimal Header Branding */}
        <div className="text-center mb-16">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
            Supported Ecosystem
          </p>
          <h2 className="mt-2 text-sm text-neutral-500 dark:text-zinc-400 font-sans tracking-tight">
            Practice, benchmark, and optimize your algorithms inside a
            real-world compiler stack.
          </h2>
        </div>

        {/* Marquee Outer Bounds Mask Frame */}
        <div className="relative w-full space-y-2 overflow-hidden">
          {/* Linear Gradient Edge Blur Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-20 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-20 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80" />

          {/* Interlocking Alternating Translation Tracks */}
          <TechMarquee />
          <TechMarquee reverse />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
