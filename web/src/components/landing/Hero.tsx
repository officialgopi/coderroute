import { motion, useInView } from "framer-motion";
import Glow from "../ui/Glow";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center  bg-white dark:bg-neutral-950 transition-colors "
      ref={sectionRef}
      id="hero"
    >
      {/* === Background Gradient Glow Layers === */}
      <Glow />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.95, filter: "blur(6px)" }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative flex items-center justify-center rounded-full p-[2px] overflow-hidden mb-4"
      >
        {/* Glowing conic border */}
        <span className="absolute inset-0 rounded-full bg-[conic-gradient(at_top_left,_#7f5af0,_#3b82f6,_#7f5af0)] opacity-60 blur-md animate-spin-slow" />

        {/* Badge text */}
        <span className="relative z-10 px-4 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-neutral-900 text-cyan-400 font-poppins shadow-[0_0_10px_rgba(63,191,255,0.5)]">
          Early Access
        </span>
      </motion.div>

      {/* Subtle radial glow behind hero content */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(140,140,180,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(160,160,220,0.08),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* --- Text Section --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:text-left flex-1 relative"
        >
          {/* Glow behind text */}
          <div className="absolute -z-10 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-500/10 blur-[100px] rounded-full top-[-4rem] left-1/2 md:left-1/4 -translate-x-1/2" />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
            Practice. Learn. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 via-indigo-500 to-neutral-600 dark:from-neutral-300 dark:via-indigo-400 dark:to-neutral-400">
              Master Coding.
            </span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto md:mx-0 font-sans">
            CoderRoute helps you learn, solve, and grow through structured
            coding problems, real-time feedback, and personalized roadmaps.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to={"/login"}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="relative px-6 py-3 rounded-xl font-medium text-sm bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 shadow-md transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200"
              >
                {/* subtle glow */}
                <span className="absolute inset-0 rounded-xl bg-indigo-500/30 dark:bg-indigo-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                Get Started
              </motion.div>
            </Link>
            <motion.a
              whileTap={{ scale: 0.97 }}
              href="#features"
              className="relative px-6 py-3 rounded-xl font-medium text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {/* subtle glow */}
              <span className="absolute inset-0 rounded-xl bg-purple-400/20 dark:bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* --- Illustration / Code Preview --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center md:justify-end relative"
        >
          {/* Glowing backdrop behind code block */}
          <div className="absolute -z-10 w-[18rem] h-[18rem] bg-indigo-400/10 dark:bg-indigo-500/10 blur-[90px] rounded-full bottom-[-3rem] right-[-2rem]" />

          <div className="relative w-[90%] max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md p-4 shadow-lg shadow-neutral-200/20 dark:shadow-neutral-900/20">
            <div className="flex gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-400/70"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400/70"></span>
              <span className="w-3 h-3 rounded-full bg-green-400/70"></span>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 overflow-x-auto">
              {`function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return [];
}`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
