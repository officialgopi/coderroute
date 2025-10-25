import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import Glow from "../ui/Glow";

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleToggle = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const faqItems = [
    {
      question: "Which programming languages are supported?",
      answer:
        "CoderRoute supports JavaScript, Python, and Java — with more languages coming soon.",
    },
    {
      question: "Can I join if I'm new to coding?",
      answer:
        "Absolutely. CoderRoute is built for beginners. You'll progress through guided challenges that steadily build confidence and skill.",
    },
    {
      question: "How fast can I expect results?",
      answer:
        "Most learners notice solid interview performance improvements within 3–4 weeks of consistent effort and daily practice.",
    },
    {
      question: "Is there job placement included?",
      answer:
        "We don’t directly place you, but completing our roadmap gives you a proven edge. Alumni report a 70% higher interview success rate.",
    },
    {
      question: "Is this better than LeetCode?",
      answer:
        "LeetCode is for practice. CoderRoute is for transformation — less distraction, more structure, and a motivating learning flow.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="relative flex flex-col items-center justify-center py-32 px-6 sm:px-10 lg:px-20
               transition-colors duration-300"
    >
      <Glow />
      {/* Background accents */}{" "}
      <div className="relative z-10 w-full max-w-3xl">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-4xl sm:text-5xl font-semibold text-center mb-4"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="text-center text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-10"
        >
          Common questions answered by the CoderRoute team.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="space-y-4"
        >
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index + 2}
              className={`rounded-xl border border-neutral-200 dark:border-neutral-800 
                      backdrop-blur-sm  overflow-hidden
                      transition-colors duration-300`}
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="font-medium text-base sm:text-lg">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="text-2xl font-light text-neutral-500"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      transition: { duration: 0.4, ease: "easeInOut" },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: { duration: 0.3, ease: "easeInOut" },
                    }}
                  >
                    <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
