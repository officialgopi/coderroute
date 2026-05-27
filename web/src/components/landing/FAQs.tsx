import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import Glow from "../ui/Glow";

const faqItems = [
  {
    question: "Which programming languages are supported?",
    answer:
      "CoderRoute natively structures sandboxed loops for JavaScript, Python, C++, Java, and Go — with real-time compilation metrics built-in.",
  },
  {
    question: "Can I join if I'm new to coding?",
    answer:
      "Absolutely. Our curriculum pipeline features adaptive pathways starting from structural fundamentals before bridging into algorithmic complexities.",
  },
  {
    question: "How fast can I expect results?",
    answer:
      "Most developers tracking metrics daily notice measurable shifts in quantitative pattern recognition and timing optimization within 3 to 4 weeks.",
  },
  {
    question: "Is there job placement included?",
    answer:
      "While we aren't a direct recruitment agency, finishing our curated core sheets gives you verified platform portfolio benchmarks that yield higher visibility.",
  },
  {
    question: "Is this better than LeetCode?",
    answer:
      "LeetCode serves as an unguided dictionary. CoderRoute acts as a targeted structural compiler map — stripping out clutter to prioritize cognitive flow.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Dynamic tracking variables
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="relative flex flex-col items-center justify-center py-36 px-6 sm:px-10 lg:px-20 bg-white dark:bg-zinc-950 transition-colors duration-200"
    >
      <Glow />

      <div className="relative z-10 w-full max-w-3xl">
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mb-3">
            ✦ Diagnostic Index
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Questions.
            </span>
          </h2>
        </div>

        {/* --- FAQ ACCORDION ENGINE --- */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="space-y-3"
        >
          {faqItems.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index + 2}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative rounded-xl border border-neutral-200 dark:border-zinc-900/80
                  bg-neutral-50/30 dark:bg-zinc-900/15 backdrop-blur-md overflow-hidden
                  transition-all duration-300 select-none border-l-2
                  ${
                    isOpen
                      ? "border-l-amber-500 dark:border-l-amber-500 bg-white dark:bg-zinc-900/30 shadow-sm"
                      : "border-l-neutral-300 dark:border-l-zinc-800 hover:border-l-neutral-400 dark:hover:border-l-zinc-700"
                  }`}
              >
                {/* Magnetic Hover Box Tracker Overlay */}
                {hoveredIndex === index && (
                  <div
                    className="pointer-events-none absolute rounded-full bg-amber-500/[0.03] dark:bg-amber-400/[0.015] blur-xl transition-all duration-150 ease-out z-0"
                    style={{
                      width: "200px",
                      height: "200px",
                      left: `${coords.x - 100}px`,
                      top: `${coords.y - 100}px`,
                    }}
                  />
                )}

                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left relative z-10 cursor-pointer"
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-neutral-800 dark:text-zinc-200 group-hover:text-neutral-900 dark:group-hover:text-zinc-50 transition-colors duration-150">
                    {faq.question}
                  </span>

                  {/* Premium Chevron Rotator */}
                  <div className="flex-shrink-0 text-neutral-400 dark:text-zinc-600 group-hover:text-neutral-500 dark:group-hover:text-zinc-400 transition-colors duration-150 ml-4">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown size={16} className="stroke-[2.5]" />
                    </motion.div>
                  </div>
                </button>

                {/* --- COLLAPSIBLE CONTENT CONTAINER --- */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <div className="px-6 pb-5 text-[13px] sm:text-sm text-neutral-500 dark:text-zinc-400 leading-relaxed tracking-tight max-w-2xl relative z-10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;
