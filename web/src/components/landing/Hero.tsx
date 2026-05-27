import { useRef, useState } from "react";
import { motion, useInView, type Transition } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Copy, Terminal } from "lucide-react";
import Glow from "../ui/Glow";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const smoothTransition: Transition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  };

  const rawCode = `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-20 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-200"
    >
      <Glow />

      {/* Subtle layout grid lines */}
      <div className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.02] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Atmospheric backlighting with a soft amber hue */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.03] dark:bg-amber-500/[0.01] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full pt-16">
        {/* --- LEFT: TEXT/ACTION CONTENT BLOCK --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={smoothTransition}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-950/60 bg-amber-50/50 dark:bg-amber-950/20 text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-6 backdrop-blur-sm font-mono">
            🚀 Early Access
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 leading-[1.1] font-sans">
            Practice. Learn. <br />
            <span className="bg-gradient-to-r from-neutral-900 via-amber-600 to-neutral-900 dark:from-zinc-50 dark:via-amber-400 dark:to-zinc-50 bg-clip-text text-transparent">
              Master Coding.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-zinc-400 max-w-xl tracking-tight">
            CoderRoute helps developers practice DSA, track progress, and master
            coding interviews through structured learning and real-time
            insights.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link to="/login" className="w-full sm:w-auto group">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-11 rounded-lg
                  bg-neutral-900 text-white hover:bg-neutral-800
                  dark:bg-zinc-900 dark:text-amber-400 dark:border dark:border-amber-950 dark:hover:border-amber-500/40 dark:hover:bg-zinc-900/80
                  text-xs font-semibold uppercase tracking-wider font-mono
                  transition-all duration-200 cursor-pointer shadow-sm"
              >
                Start Practicing
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 stroke-[2.5]"
                />
              </motion.button>
            </Link>

            <a href="#features" className="w-full sm:w-auto">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 h-11 rounded-lg border
                  border-neutral-200 dark:border-zinc-800
                  text-neutral-800 dark:text-zinc-300 bg-transparent
                  text-xs font-semibold uppercase tracking-wider font-mono
                  transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-zinc-900 cursor-pointer"
              >
                Explore Features
              </motion.button>
            </a>
          </div>

          <div className="flex gap-10 mt-12 pt-8 border-t border-neutral-100 dark:border-zinc-900">
            <div>
              <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans">
                200+
              </p>
              <p className="text-xs font-medium tracking-wide text-neutral-500 dark:text-zinc-500 uppercase font-mono mt-0.5">
                Problems
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans">
                10+
              </p>
              <p className="text-xs font-medium tracking-wide text-neutral-500 dark:text-zinc-500 uppercase font-mono mt-0.5">
                Sheets
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 font-sans">
                AI
              </p>
              <p className="text-xs font-medium tracking-wide text-neutral-500 dark:text-zinc-500 uppercase font-mono mt-0.5">
                Assistant
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: ENHANCED INTERACTIVE CODE PREVIEW CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full"
        >
          {/* Subtle glow behind the panel container */}
          <div className="absolute -z-10 w-[350px] h-[350px] bg-amber-500/[0.02] dark:bg-amber-500/[0.005] blur-[100px] rounded-full right-[-40px] bottom-[-40px]" />

          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-900/30 backdrop-blur-xl shadow-md transition-all duration-300 hover:border-neutral-300 dark:hover:border-amber-500/20 group/code">
            {/* Editor Meta Top Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 dark:border-zinc-800/80 bg-neutral-100/50 dark:bg-zinc-950/40 select-none">
              <div className="flex items-center gap-2">
                <Terminal
                  size={14}
                  className="text-neutral-400 dark:text-zinc-500"
                />
                <span className="text-[11px] font-mono font-medium tracking-tight text-neutral-600 dark:text-zinc-400">
                  twoSum.js
                </span>
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                  Optimal
                </span>
              </div>

              {/* Clean Interactive Action Snippet Copy Utility */}
              <button
                onClick={handleCopy}
                className="p-1 rounded bg-transparent hover:bg-neutral-200/60 dark:hover:bg-zinc-800 text-neutral-400 dark:text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                title="Copy snippet"
              >
                {copied ? (
                  <Check size={13} className="text-emerald-500" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
            </div>

            {/* Complete Tabular Editor Canvas Layer */}
            <div className="p-4 flex gap-4 overflow-x-auto text-[13px] font-mono leading-relaxed antialiased select-text">
              {/* Static Vertical Column Line Identifiers */}
              <div className="text-right text-neutral-300 dark:text-zinc-700 select-none flex flex-col pr-1 border-r border-neutral-200/50 dark:border-zinc-800/50">
                {Array.from({ length: 15 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="block text-[11px] h-[22px] min-w-[18px]"
                  >
                    {idx + 1}
                  </span>
                ))}
              </div>

              {/* Enhanced Semantic Syntax Highlighting Layer */}
              <pre className="text-neutral-700 dark:text-zinc-300 flex-1 scrollbar-none whitespace-pre selection:bg-amber-500/10">
                <div className="h-[22px]">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    function
                  </span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    twoSum
                  </span>
                  (nums, target) {"{"}
                </div>
                <div className="h-[22px]">
                  {" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    const
                  </span>{" "}
                  map ={" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    new
                  </span>{" "}
                  <span className="text-yellow-600 dark:text-yellow-500">
                    Map
                  </span>
                  ();
                </div>
                <div className="h-[22px]"></div>
                <div className="h-[22px]">
                  {" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    for
                  </span>{" "}
                  (
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    let
                  </span>{" "}
                  i ={" "}
                  <span className="text-orange-600 dark:text-orange-400">
                    0
                  </span>
                  ; i &lt; nums.length; i++) {"{"}
                </div>
                <div className="h-[22px]">
                  {" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    const
                  </span>{" "}
                  complement = target - nums[i];
                </div>
                <div className="h-[22px]"></div>
                <div className="h-[22px]">
                  {" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    if
                  </span>{" "}
                  (map.
                  <span className="text-blue-500 dark:text-blue-400">has</span>
                  (complement)) {"{"}
                </div>
                <div className="h-[22px]">
                  {" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    return
                  </span>{" "}
                  [map.
                  <span className="text-blue-500 dark:text-blue-400">get</span>
                  (complement), i];
                </div>
                <div className="h-[22px]"> {"}"}</div>
                <div className="h-[22px]"></div>
                <div className="h-[22px]">
                  {" "}
                  map.
                  <span className="text-blue-500 dark:text-blue-400">set</span>
                  (nums[i], i);
                </div>
                <div className="h-[22px]"> {"}"}</div>
                <div className="h-[22px]"></div>
                <div className="h-[22px]">
                  {" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    return
                  </span>{" "}
                  [];
                </div>
                <div className="h-[22px]">{"}"}</div>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
