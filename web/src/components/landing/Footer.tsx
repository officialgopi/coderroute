import { motion, type Transition, type Variants } from "motion/react";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    {
      icon: <Linkedin size={16} className="stroke-[2]" />,
      href: "https://www.linkedin.com/in/gopikanta-mondal/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={16} className="stroke-[2]" />,
      href: "https://x.com/devofficialgopi",
      label: "Twitter / X",
    },
    {
      icon: <Github size={16} className="stroke-[2]" />,
      href: "https://github.com/officialgopi",
      label: "GitHub",
    },
  ];

  const smoothTransition: Transition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: smoothTransition,
    },
  };

  return (
    // Changed overflow-hidden to explicit visibility tracking configurations
    <footer className="relative px-6 pt-24 pb-12 border-t border-neutral-200 dark:border-zinc-900 bg-neutral-50 dark:bg-zinc-950 transition-colors duration-200">
      {/* 
      <div className="bg-red-500 text-white p-4 text-center text-xl font-bold z-[9999] relative">
        TESTING VISIBILITY: OFFICIALGOPI IS HERE
      </div> */}
      {/* Soft, blended atmospheric amber lighting layer */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/[0.03] dark:bg-amber-500/[0.01] blur-[120px] pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* --- BRAND BLOCK --- */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50 font-sans">
            CoderRoute
          </h2>
          <p className="text-sm text-neutral-600 dark:text-zinc-400 max-w-xs leading-relaxed tracking-tight">
            A developer platform to master DSA, build projects and crack top
            tech interviews.
          </p>
          <div className="flex gap-2 pt-2">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex items-center justify-center w-9 h-9 rounded-lg 
                  bg-neutral-200/60 dark:bg-zinc-900/80 
                  text-neutral-600 dark:text-zinc-400 
                  hover:text-neutral-900 dark:hover:text-amber-400
                  hover:bg-neutral-200 dark:hover:bg-zinc-900
                  border border-transparent dark:hover:border-amber-500/20
                  transition-all duration-200 cursor-pointer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* --- PRODUCT LINKS --- */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-neutral-900 dark:text-zinc-400 mb-4">
            Product
          </h3>
          <ul className="space-y-2.5 text-sm font-medium text-neutral-500 dark:text-zinc-500">
            {["Features", "Roadmap", "Practice", "Leaderboard"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-neutral-900 dark:hover:text-zinc-300 transition-colors duration-150 cursor-pointer"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* --- COMPANY LINKS --- */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-neutral-900 dark:text-zinc-400 mb-4">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm font-medium text-neutral-500 dark:text-zinc-500">
            {["About", "Careers", "Contact", "Privacy"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase()}`}
                  className="hover:text-neutral-900 dark:hover:text-zinc-300 transition-colors duration-150 cursor-pointer"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* --- NEWSLETTER BLOCK --- */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-neutral-900 dark:text-zinc-400 mb-4">
            Stay Updated
          </h3>
          <p className="text-sm text-neutral-600 dark:text-zinc-400 mb-4 leading-relaxed tracking-tight">
            Get coding tips and interview prep resources directly in your inbox.
          </p>
          <div className="flex gap-2 max-w-sm">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 px-3 h-10 text-sm rounded-lg border 
                border-neutral-200 dark:border-zinc-800 
                bg-white dark:bg-zinc-950 
                text-neutral-900 dark:text-zinc-100
                placeholder-neutral-400 dark:placeholder-zinc-600
                focus:outline-none focus:border-amber-500 dark:focus:border-amber-500/50
                transition-colors duration-200"
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-4 h-10 rounded-lg 
                bg-neutral-900 text-white dark:bg-zinc-900 dark:text-amber-400 dark:border dark:border-amber-950/60 dark:hover:border-amber-500/30
                text-xs font-semibold uppercase tracking-wider font-mono
                transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-zinc-900/60 cursor-pointer shadow-sm"
            >
              Join
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* --- REFINED LOWER BAR (FIXED VISIBILITY VIA HIGH Z-INDEX LAYER) --- */}
      {/* --- REFINED LOWER METRIC & BRANDING BAR --- */}
      <div className="max-w-7xl mx-auto mt-16 border-t border-neutral-200 dark:border-zinc-900 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs font-medium tracking-wide text-neutral-400 dark:text-zinc-600 uppercase font-mono relative z-20 select-none">
        {/* Copyright Metadata */}
        <p>© {new Date().getFullYear()} CoderRoute. All rights reserved.</p>

        {/* High-End Engineering Signature Badge */}
        <div className="flex items-center gap-2.5 lowercase">
          <span className="text-[11px] text-neutral-400 dark:text-zinc-500 font-sans tracking-tight">
            Designed & engineered by
          </span>

          <a
            href="https://github.com/officialgopi"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-3 py-1.5 rounded-lg
              bg-white dark:bg-zinc-900/30 
              border border-neutral-200 dark:border-zinc-800/80
              hover:border-amber-500/30 dark:hover:border-amber-500/20
              transition-all duration-300 shadow-sm overflow-hidden cursor-pointer z-30"
          >
            {/* Ambient background hover gradient flare */}
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.04] to-orange-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Micro-shimmer light flare effect across the text */}
            <span className="absolute -inset-x-full top-0 bottom-0 bg-gradient-to-r from-transparent via-neutral-200/20 dark:via-zinc-700/10 to-transparent group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />

            {/* Branded Tabular Typography String */}
            <span className="relative text-[11px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-neutral-600 via-neutral-700 to-neutral-600 dark:from-zinc-400 dark:via-zinc-300 dark:to-zinc-400 group-hover:from-amber-500 group-hover:to-orange-400 bg-clip-text text-transparent transition-all duration-300">
              OFFICIALGOPI
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
