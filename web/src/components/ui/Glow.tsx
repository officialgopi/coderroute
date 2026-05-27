import { motion } from "motion/react";

export const Glow = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
      {/* --- Top Left Atmospheric Ambient Orb --- */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.45, 0.3],
          x: [0, 15, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[35rem] h-[35rem] rounded-full z-0 
          bg-gradient-to-br from-amber-400/20 to-orange-500/10 
          dark:from-indigo-600/15 dark:to-purple-500/5 
          blur-[130px] top-[-18rem] left-[-15rem]"
      />

      {/* --- Bottom Right Atmospheric Ambient Orb --- */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1, // Desynchronizes animations so they feel natural
        }}
        className="absolute w-[40rem] h-[40rem] rounded-full z-0 
          bg-gradient-to-tr from-orange-400/10 to-amber-500/20 
          dark:from-purple-900/10 dark:to-amber-500/5 
          blur-[150px] bottom-[-20rem] right-[-15rem]"
      />
    </div>
  );
};

export default Glow;
