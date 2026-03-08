import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-6 sm:px-10 lg:px-20 flex justify-center overflow-hidden mt-20"
      id="cta"
    >
      {/* background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10" />

      {/* floating blur lights */}
      <div className="absolute -top-32 left-20 w-80 h-80 bg-indigo-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-20 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-4xl w-full text-center"
      >
        {/* heading */}
        <motion.h2
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
          Ready to Become a{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Better Developer?
          </span>
        </motion.h2>

        {/* description */}
        <motion.p
          variants={item}
          className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          Practice coding problems, follow structured roadmaps, and prepare for
          top tech interviews with{" "}
          <span className="font-semibold text-neutral-900 dark:text-white">
            CoderRoute
          </span>
          .
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/login">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl
    bg-neutral-900 text-white
    dark:bg-white dark:text-neutral-900
    border border-neutral-800 dark:border-neutral-200
    text-sm font-medium
    transition-all duration-200
    hover:bg-neutral-800 dark:hover:bg-neutral-200"
            >
              Start Practicing
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>
          </Link>
          <Link to="/roadmap">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 rounded-xl
    border border-neutral-300 dark:border-neutral-700
    text-neutral-800 dark:text-neutral-200
    text-sm font-medium
    transition-all duration-200
    hover:bg-neutral-700/50 dark:hover:bg-neutral-800"
            >
              View Roadmap
            </motion.button>
          </Link>
        </motion.div>

        {/* trust note */}
        <motion.p variants={item} className="mt-6 text-sm text-neutral-500">
          Free forever. No credit card required.
        </motion.p>
      </motion.div>
    </section>
  );
};
