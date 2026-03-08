import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Code,
  BarChart3,
  BookOpen,
  MessageSquare,
  Cpu,
  Rocket,
  Target,
} from "lucide-react";
import Glow from "../ui/Glow";

const features = [
  {
    title: "Ultimate Coding Workspace",
    desc: "Solve problems with an advanced coding environment, real-time execution, and powerful tools.",
    icon: <Code className="w-5 h-5" />,
    img: "/coding_workspace.png",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Public Sheet Library",
    desc: "Explore curated coding sheets shared by the community.",
    icon: <BookOpen className="w-5 h-5" />,
    img: "/sheet.png",
  },
  {
    title: "200+",
    desc: "Coding Problems Implemented",
    icon: <Rocket className="w-5 h-5" />,
    metric: true,
  },
  {
    title: "+15%",
    desc: "Performance Improvement",
    icon: <Target className="w-5 h-5" />,
    metric: true,
  },
  {
    title: "AI Discussions",
    desc: "Ask LeetBot to understand solutions and coding concepts.",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Performance Dashboard",
    desc: "Track your coding KPIs and progress visually.",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Track Progress",
    desc: "Monitor sheet completion and learning consistency.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Language Suite",
    desc: "Switch between Python, Java, C++, JS, and Go instantly.",
    icon: <Code className="w-5 h-5" />,
  },
  {
    title: "Coding Blogs",
    desc: "Read expert insights and coding strategies.",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-20 w-full"
      id="features"
    >
      <Glow />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2"
        >
          ✦ Features
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-50 font-[Poppins]"
        >
          Engineered for Excellence
        </motion.h2>
      </div>

      {/* Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={card}
            transition={{ duration: 0.5 }}
            className={`group relative rounded-2xl border border-neutral-200 dark:border-neutral-800
            bg-neutral-100/60 dark:bg-neutral-900/40 backdrop-blur-sm
            p-6 flex flex-col justify-between
            hover:shadow-[0_0_30px_rgba(150,150,150,0.15)]
            transition duration-300 overflow-hidden ${f.span || ""}`}
          >
            {/* Glow hover background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>

            <div className="relative z-10">
              {/* Icon + title */}
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-neutral-50 font-medium">
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {f.icon}
                </motion.span>

                <h3 className="text-lg sm:text-xl font-semibold font-[Poppins]">
                  {f.title}
                </h3>
              </div>

              {!f.metric && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-[Inter]">
                  {f.desc}
                </p>
              )}
            </div>

            {/* Image */}
            {f.img && (
              <div className="mt-5 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <motion.img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="object-cover w-full h-48 sm:h-56"
                />
              </div>
            )}

            {/* Metric */}
            {f.metric && (
              <div className="relative z-10 mt-6 text-center">
                <p className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 font-[Poppins]">
                  {f.title}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-[Inter]">
                  {f.desc}
                </p>
              </div>
            )}

            {/* Hover Arrow */}
            <motion.div
              initial={{ x: -5, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              className="absolute bottom-4 right-4"
            >
              <ArrowRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
