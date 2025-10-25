import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Glow from "../ui/Glow";

export const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const fadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center py-32 px-6 sm:px-10 lg:px-20 text-center 
               transition-colors duration-300  font-[Inter]"
    >
      {/* Background glow gradients */}
      <Glow />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight"
        >
          Build. Practice.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-slate-500 dark:from-neutral-100 dark:to-slate-400">
            Land the Job.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed"
        >
          Every great developer starts with small, consistent steps. <br />
          Begin your journey today at{" "}
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            CoderRoute
          </span>
          .
        </motion.p>

        {/* Button */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="flex justify-center"
        >
          <Button
            asChild
            className="rounded-full px-7 py-3 text-sm font-medium font-[Poppins]
                   bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900
                   shadow-[0_0_20px_rgba(120,120,120,0.3)]
                   hover:shadow-[0_0_40px_rgba(160,160,160,0.45)]
                   hover:bg-neutral-800 dark:hover:bg-neutral-200
                   transition duration-300"
          >
            <Link to="/sign-up">✦ Start Training</Link>
          </Button>
        </motion.div>

        {/* Small Note */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
          className="text-sm text-neutral-500 dark:text-neutral-500 mt-4 font-[Inter]"
        >
          No credit card needed. Join and explore freely.
        </motion.p>
      </div>
    </section>
  );
};
