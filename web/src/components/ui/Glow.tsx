import { memo } from "react";
import { motion } from "framer-motion";

export const Glow = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden select-none">
      {/* --- LAYER 1: NORTHERN PLASMA AMBIENT FIELD --- */}
      <motion.div
        animate={{
          transform: [
            "translate(0px, 0px) scale(1)",
            "translate(40px, -60px) scale(1.12)",
            "translate(-20px, 20px) scale(0.95)",
            "translate(0px, 0px) scale(1)",
          ],
          opacity: [0.25, 0.45, 0.3, 0.25],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[45rem] h-[45rem] rounded-full z-0 
          bg-gradient-to-br from-amber-400/30 via-orange-500/15 to-transparent
          dark:from-indigo-600/20 dark:via-purple-500/10 dark:to-transparent 
          blur-[140px] top-[-22rem] left-[-18rem] mix-blend-screen dark:mix-blend-normal"
      />

      {/* --- LAYER 2: SOUTHERN CHROMA COMPILER FIELD --- */}
      <motion.div
        animate={{
          transform: [
            "translate(0px, 0px) scale(1)",
            "translate(-50px, 40px) scale(1.08)",
            "translate(30px, -30px) scale(0.92)",
            "translate(0px, 0px) scale(1)",
          ],
          opacity: [0.2, 0.4, 0.25, 0.2],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute w-[50rem] h-[50rem] rounded-full z-0 
          bg-gradient-to-tr from-orange-500/15 via-amber-500/25 to-transparent
          dark:from-purple-900/20 dark:via-amber-500/10 dark:to-transparent 
          blur-[160px] bottom-[-24rem] right-[-18rem] mix-blend-screen dark:mix-blend-normal"
      />

      {/* --- LAYER 3: PREMIUM HIGH-CONTRAST CENTRAL NEON FLARE --- */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.15, 0.28, 0.18, 0.15],
          transform: [
            "rotate(0deg) translate(0px, 0px)",
            "rotate(120deg) translate(20px, -20px)",
            "rotate(240deg) translate(-20px, 20px)",
            "rotate(360deg) translate(0px, 0px)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[30rem] h-[20rem] rounded-full top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-0
          bg-gradient-to-r from-amber-500/15 to-orange-600/10
          dark:from-purple-500/10 dark:to-emerald-500/5
          blur-[110px] opacity-20 hidden lg:block mix-blend-overlay"
      />
    </div>
  );
};

export default memo(Glow);
