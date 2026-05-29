import { useRef, useState, memo, useCallback, useMemo } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Copy,
  Terminal,
  TerminalSquare,
  Cpu,
  Radio,
  Code2,
} from "lucide-react";
import Glow from "../ui/Glow";
import { Button } from "../ui/button";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const smoothTransition: Transition = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  };

  const codeSnippetLines = [
    {
      text: "function twoSum(nums, target) {",
      indent: 0,
      tokens: [
        { val: "function", type: "keyword" },
        { val: " twoSum", type: "function" },
        { val: "(nums, target) {", type: "text" },
      ],
    },
    {
      text: "  const map = new Map();",
      indent: 0,
      tokens: [
        { val: "  const", type: "keyword" },
        { val: " map = ", type: "text" },
        { val: "new", type: "keyword" },
        { val: " Map", type: "class" },
        { val: "();", type: "text" },
      ],
    },
    { text: "", indent: 0, tokens: [] },
    {
      text: "  for (let i = 0; i < nums.length; i++) {",
      indent: 0,
      tokens: [
        { val: "  for", type: "keyword" },
        { val: " (", type: "text" },
        { val: "let", type: "keyword" },
        { val: " i = 0; i < nums.length; i++) {", type: "text" },
      ],
    },
    {
      text: "    const complement = target - nums[i];",
      indent: 0,
      tokens: [
        { val: "    const", type: "keyword" },
        { val: " complement = target - nums[i];", type: "text" },
      ],
    },
    { text: "", indent: 0, tokens: [] },
    {
      text: "    if (map.has(complement)) {",
      indent: 0,
      tokens: [
        { val: "    if", type: "keyword" },
        { val: " (map.", type: "text" },
        { val: "has", type: "method" },
        { val: "(complement)) {", type: "text" },
      ],
    },
    {
      text: "      return [map.get(complement), i];",
      indent: 0,
      tokens: [
        { val: "      return", type: "keyword" },
        { val: " [map.", type: "text" },
        { val: "get", type: "method" },
        { val: "(complement), i];", type: "text" },
      ],
    },
    { text: "    }", indent: 0, tokens: [{ val: "    }", type: "text" }] },
    { text: "", indent: 0, tokens: [] },
    {
      text: "    map.set(nums[i], i);",
      indent: 0,
      tokens: [
        { val: "    map.", type: "text" },
        { val: "set", type: "method" },
        { val: "(nums[i], i);", type: "text" },
      ],
    },
    { text: "  }", indent: 0, tokens: [{ val: "  }", type: "text" }] },
    { text: "", indent: 0, tokens: [] },
    {
      text: "  return [];",
      indent: 0,
      tokens: [
        { val: "  return", type: "keyword" },
        { val: " [];", type: "text" },
      ],
    },
    { text: "}", indent: 0, tokens: [{ val: "}", type: "text" }] },
  ];

  const rawCodeString = useMemo(() => {
    return codeSnippetLines.map((l) => l.text).join("\n");
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(rawCodeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard capture exception:", err);
    }
  }, [rawCodeString]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24 overflow-hidden bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      <Glow />

      {/* Modern crisp layout grid infrastructure */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.015] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* High-fidelity architectural radial split backdrop alignment */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none select-none -z-10">
        <div className="absolute top-[-10%] left-[5%] w-[45%] h-[50%] bg-gradient-to-br from-amber-500/[0.04] to-transparent blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[50%] h-[60%] bg-gradient-to-tl from-amber-500/[0.03] to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full pt-24 pb-16">
        {/* --- LEFT SIDE: TYPOGRAPHY BRAND CONSOLE --- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={smoothTransition}
          className="lg:col-span-6 space-y-6 text-left"
        >
          {/* Enhanced Premium Early Access Beacon Badge */}
          <div className="inline-flex items-center gap-2 px-3 h-6 rounded-full border border-amber-500/20 bg-amber-500/5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 select-none shadow-3xs shadow-amber-500/2 backdrop-blur-xs">
            <Radio
              size={10}
              className="animate-pulse stroke-[3] text-amber-500"
            />
            <span>Beta Phase Node: Early Access</span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-sans tracking-tight text-text-primary leading-[1.05]">
            Practice. Trace.
            <br />
            <span className="bg-gradient-to-r from-text-primary via-amber-500 to-text-primary bg-size-200 bg-clip-text text-transparent dark:from-zinc-100 dark:via-amber-400 dark:to-zinc-100">
              Master Execution.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-text-secondary opacity-80 max-w-lg leading-relaxed tracking-tight select-text">
            Architect computational schemas, audit execution profiles in
            real-time, and crack algorithmic evaluations through
            telemetry-driven compiler diagnostics.
          </p>

          {/* Core Action Rail Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              asChild
              variant="mono"
              size="lg"
              className="group rounded-xl cursor-pointer font-sans text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Link to="/login">
                <span>Launch Console</span>
                <ArrowRight
                  size={13}
                  className="ml-1.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-border-subtle/80 bg-surface-card/40 dark:bg-zinc-900/10 hover:bg-neutral-100 dark:hover:bg-zinc-900 font-sans text-xs font-bold uppercase tracking-wider transition-all"
            >
              <a href="#features">Explore Architecture</a>
            </Button>
          </div>

          {/* Interactive Statistics Grid Cluster */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border-subtle/20 dark:border-zinc-900/40 max-w-md select-none">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 opacity-40">
                <Code2 size={11} className="text-text-secondary stroke-[2.2]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                  Problems
                </span>
              </div>
              <p className="text-2xl font-bold font-sans tracking-tight text-text-primary">
                200
                <span className="text-amber-500 font-mono text-lg font-medium">
                  +
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 opacity-40">
                <TerminalSquare
                  size={11}
                  className="text-text-secondary stroke-[2.2]"
                />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                  Curated
                </span>
              </div>
              <p className="text-2xl font-bold font-sans tracking-tight text-text-primary">
                12
                <span className="text-amber-500 font-mono text-lg font-medium">
                  {" "}
                  Tracks
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 opacity-40">
                <Cpu size={11} className="text-amber-500 stroke-[2.5]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-500">
                  Telemetry
                </span>
              </div>
              <p className="text-2xl font-bold font-sans tracking-tight text-text-primary">
                AI{" "}
                <span className="text-text-secondary opacity-40 font-sans text-xs font-normal">
                  Core
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: WORKSPACE SANDBOX SIMULATOR --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-6 relative w-full"
        >
          {/* Decorative back-glowing atmospheric element node */}
          <div className="absolute w-[400px] h-[400px] bg-amber-500/[0.015] dark:bg-amber-500/[0.003] blur-[120px] rounded-full -right-12 -bottom-12 pointer-events-none select-none -z-10" />

          <div className="overflow-hidden rounded-2xl border border-border-subtle/80 dark:border-zinc-900/80 bg-surface-card/40 dark:bg-zinc-950/20 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-border-intense dark:hover:border-zinc-800/80 group/code relative">
            {/* Top Interactive Code Terminal Header strip */}
            <div className="flex items-center justify-between px-4 h-10 border-b border-border-subtle/40 dark:border-zinc-900/40 bg-neutral-100/40 dark:bg-zinc-950/40 select-none">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-zinc-800" />
                </div>
                <div className="h-4 w-px bg-border-subtle/20 dark:bg-zinc-800 mx-0.5" />
                <div className="flex items-center gap-1.5 text-text-secondary opacity-60">
                  <Terminal size={11} className="stroke-[2.2]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    twoSum.js
                  </span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 dark:border-emerald-400/10">
                  Optimal
                </span>
              </div>

              {/* Action Snippet Copy trigger link */}
              <button
                type="button"
                onClick={handleCopy}
                className="h-6 w-6 rounded-md border border-transparent hover:border-border-subtle/40 dark:hover:border-zinc-800 text-text-secondary opacity-50 hover:opacity-100 flex items-center justify-center transition-all cursor-pointer outline-none"
                title="Copy snippet buffer code"
              >
                {copied ? (
                  <Check size={11} className="text-emerald-500 stroke-[3]" />
                ) : (
                  <Copy size={11} className="stroke-[2.2]" />
                )}
              </button>
            </div>

            {/* Complete Tabular Editor Canvas Layer */}
            <div className="p-4 flex gap-4 overflow-x-auto text-[12px] font-mono leading-[22px] antialiased select-text max-h-[380px] scrollbar-none">
              {/* Core Left Line Indexing Sidebar */}
              <div className="text-right text-text-secondary opacity-20 select-none flex flex-col pr-3 border-r border-border-subtle/20 dark:border-zinc-800/60 font-mono text-[11px]">
                {codeSnippetLines.map((_, idx) => (
                  <span
                    key={`line-index-${idx}`}
                    className="block h-[22px] min-w-[14px]"
                  >
                    {idx + 1}
                  </span>
                ))}
              </div>

              {/* Secure Syntax Element Serialization Block */}
              <pre className="text-text-primary flex-1 whitespace-pre selection:bg-amber-500/10 font-mono">
                {codeSnippetLines.map((line, lineIdx) => (
                  <div
                    key={`code-row-${lineIdx}`}
                    className="h-[22px] flex items-center"
                  >
                    {line.tokens.length === 0 ? (
                      <span className="inline-block w-full h-full" />
                    ) : (
                      line.tokens.map((token, tokenIdx) => {
                        let tokenColorClass = "text-text-primary";
                        if (token.type === "keyword")
                          tokenColorClass =
                            "text-purple-600 dark:text-purple-400 font-semibold";
                        if (token.type === "function")
                          tokenColorClass = "text-blue-600 dark:text-blue-400";
                        if (token.type === "class")
                          tokenColorClass =
                            "text-amber-600 dark:text-amber-400 font-bold";
                        if (token.type === "method")
                          tokenColorClass = "text-sky-500 dark:text-sky-400";

                        return (
                          <span
                            key={`token-${tokenIdx}`}
                            className={tokenColorClass}
                          >
                            {token.val}
                          </span>
                        );
                      })
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
