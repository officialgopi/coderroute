import { motion, useInView } from "framer-motion";
import Glow from "../ui/Glow";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-20 overflow-hidden bg-white dark:bg-neutral-950"
    >
      {/* glow */}
      <Glow />

      {/* subtle grid background */}
      <div className="absolute inset-0 -z-10 opacity-[0.06] bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* radial glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/20 blur-[140px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-6 backdrop-blur">
            🚀 Early Access
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Practice. Learn. <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Master Coding.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
            CoderRoute helps developers practice DSA, track progress, and master
            coding interviews through structured learning and real-time
            insights.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl
                bg-neutral-900 text-white
                dark:bg-white dark:text-neutral-900
                text-sm font-medium shadow-lg hover:shadow-xl transition"
              >
                Start Practicing
                <ArrowRight size={16} />
              </motion.button>
            </Link>

            <a href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl border
                border-neutral-300 dark:border-neutral-700
                text-sm font-medium
                hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                Explore Features
              </motion.button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-10 text-sm">
            <div>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                200+
              </p>
              <p className="text-neutral-500">Problems</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                10+
              </p>
              <p className="text-neutral-500">Coding Sheets</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                AI
              </p>
              <p className="text-neutral-500">Assistant</p>
            </div>
          </div>
        </motion.div>

        {/* CODE PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -z-10 w-[320px] h-[320px] bg-purple-500/20 blur-[120px] rounded-full right-[-60px] bottom-[-40px]" />

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl p-5 shadow-xl">
            {/* window buttons */}
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <pre className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
              {`function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
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
