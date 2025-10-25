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
    desc: "We offer a rich workspace for solving coding problems with a wide range of tools and features to enhance your experience.",
    icon: <Code className="w-5 h-5" />,
    img: "/images/workspace.png", // replace with your image
    span: "col-span-2 row-span-2",
  },
  {
    title: "Public Sheet Library",
    desc: "Access a vast, community-driven library of coding sheets and challenges to sharpen your problem-solving skills.",
    icon: <BookOpen className="w-5 h-5" />,
    img: "/images/sheets.png",
  },
  {
    title: "200+",
    desc: "Successfully Implemented Coding Problems",
    icon: <Rocket className="w-5 h-5" />,
    metric: true,
  },
  {
    title: "+15%",
    desc: "Increase in Performance and Problem-Solving Success Rate",
    icon: <Target className="w-5 h-5" />,
    metric: true,
  },
  {
    title: "AI Discussions",
    desc: "Engage with LeetBot, your AI coding companion to elevate your skills.",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Performance Dashboard",
    desc: "Monitor your coding KPIs, track problem-solving stats, sheet progress, and skill growth in one glance.",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Track Progress",
    desc: "Effortlessly monitor your sheet completion and learning progress.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Language Suite",
    desc: "Explore coding in Python, Java, C++, JS, and Go with seamless language switching.",
    icon: <Code className="w-5 h-5" />,
  },
  {
    title: "Coding Blogs",
    desc: "Stay updated with insights and best practices from top coders and experts.",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative  px-6 sm:px-10 lg:px-20  transition-colors duration-300 "
    >
      {/* background glow */}
      {/* <div className="absolute inset-0 flex justify-center">
        <div className="w-[700px] h-[700px] bg-gradient-to-r from-neutral-200 via-slate-300 to-neutral-400 dark:from-neutral-800 dark:via-slate-800 dark:to-neutral-900 blur-[140px] opacity-20 rounded-full"></div>
      </div> */}
      <Glow />
      <div className="relative z-10 text-center mb-14">
        <motion.p
          initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2"
        >
          ✦ Features
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-50 font-[Poppins]"
        >
          Engineered for Excellence
        </motion.h2>
      </div>

      <div className="relative z-10 grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
            animate={
              inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className={`group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 
              bg-neutral-100/60 dark:bg-neutral-900/40 backdrop-blur-sm p-4 sm:p-6 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(150,150,150,0.15)] 
              transition duration-300 ${f.span || ""} h-full`}
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-neutral-50 font-medium">
                <span className="text-neutral-600 dark:text-neutral-400">
                  {f.icon}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold font-[Poppins]">
                  {f.title}
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-[Inter]">
                {f.desc}
              </p>
            </div>

            {f.img && (
              <div className="mt-5 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <img
                  src={f.img}
                  alt={f.title}
                  className="object-cover w-full h-48 sm:h-56"
                />
              </div>
            )}

            {f.metric && (
              <div className="mt-6 text-center">
                <p className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 font-[Poppins]">
                  {f.title}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-[Inter]">
                  {f.desc}
                </p>
              </div>
            )}

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300">
              <ArrowRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default FeaturesSection;
