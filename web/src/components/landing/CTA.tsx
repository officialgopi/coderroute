import { useRef } from "react";
import {
  motion,
  useInView,
  type Transition,
  type Variants,
} from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const smoothTransition: Transition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
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

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 sm:px-10 lg:px-20 flex justify-center overflow-hidden border-t border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors duration-200"
      id="cta"
    >
      {/* Background gradients featuring a localized, faint crimson warm glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50 dark:from-zinc-900/10 dark:via-zinc-950 dark:to-zinc-950" />

      {/* Soft, blended atmospheric lighting including a warm accent node */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-red-500/5 dark:bg-red-500/[0.02] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-neutral-100/60 dark:bg-zinc-900/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-3xl w-full text-center"
      >
        {/* Heading Layout */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans"
        >
          Ready to Become a{" "}
          <span className="bg-gradient-to-r from-neutral-900 via-red-600 to-neutral-900 dark:from-zinc-100 dark:via-red-400 dark:to-zinc-100 bg-clip-text text-transparent">
            Better Developer?
          </span>
        </motion.h2>

        {/* Description Text */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-zinc-400 max-w-xl mx-auto tracking-tight"
        >
          Practice coding problems, follow structured roadmaps, and prepare for
          top tech interviews with{" "}
          <span className="font-semibold text-neutral-900 dark:text-zinc-100">
            CoderRoute
          </span>
          .
        </motion.p>

        {/* Action Button Controls */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {/* Primary Action Button Featuring Red Accent Architecture */}
          <Link to="/login" className="w-full sm:w-auto group">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-11 rounded-lg
                bg-red-600 text-white hover:bg-red-700
                dark:bg-zinc-900 dark:text-red-400 dark:border dark:border-red-950 dark:hover:border-red-500/40 dark:hover:bg-zinc-900/80
                text-xs font-semibold uppercase tracking-wider font-mono
                transition-all duration-200 cursor-pointer shadow-sm shadow-red-600/10 dark:shadow-none"
            >
              Start Practicing
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1 stroke-[2.5]"
              />
            </motion.button>
          </Link>

          <Link to="/roadmap" className="w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 h-11 rounded-lg
                border border-neutral-200 dark:border-zinc-800
                text-neutral-800 dark:text-zinc-300 bg-transparent
                text-xs font-semibold uppercase tracking-wider font-mono
                transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-zinc-900 cursor-pointer"
            >
              View Roadmap
            </motion.button>
          </Link>
        </motion.div>

        {/* Minimalist Trust Indicator */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-xs text-neutral-400 dark:text-zinc-500 font-sans tracking-wide"
        >
          Free forever. No credit card required.
        </motion.p>
      </motion.div>
    </section>
  );
};
