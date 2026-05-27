import { motion } from "motion/react";

export const PageLoader = () => {
  return (
    // Fixed layout container that covers the full viewport window and prevents layout shifts
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-canvas dark:bg-bg-canvas select-none antialiased">
      {/* Decorative Structural Ambient Glow Layer */}
      <div
        className="absolute w-[350px] h-[350px] bg-amber-500/[0.03] dark:bg-amber-400/[0.01] blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center relative z-10">
        {/* Hardware-Accelerated Dynamic Brand Shell */}
        <motion.div
          animate={{
            scale: [0.98, 1.02, 0.98],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-panel dark:bg-zinc-950/40 border border-border-subtle dark:border-zinc-800/80 shadow-md"
        >
          <img
            src="/coderroute.png"
            alt="Initializing CoderRoute Core Platform Security Framework Assets..."
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            width={64}
            height={64}
            loading="eager"
          />
        </motion.div>

        {/* Minimalist Professional Typography Layer */}
        <div className="mt-6 text-center space-y-1">
          <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-text-secondary dark:text-text-secondary opacity-40">
            Initializing System
          </p>
          <h2 className="text-lg font-bold tracking-tight text-text-primary dark:text-text-primary font-sans">
            Coder
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent font-mono">
              Route
            </span>
          </h2>
        </div>

        {/* Premium Performance Loading Line Element */}
        <div
          className="w-32 h-[2px] bg-border-subtle dark:bg-zinc-800 rounded-full mt-5 overflow-hidden relative"
          aria-hidden="true"
        >
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-amber-500 dark:via-amber-400 to-transparent animate-[shimmer_1.5s_infinite] ease-in-out" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
