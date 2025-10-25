"use client";

import { motion, type Variants } from "framer-motion";

export const Footer = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const glowVariants: Variants = {
    initial: { opacity: 0.25, scale: 1 },
    animate: {
      opacity: [0.25, 0.5, 0.25],
      scale: [1, 1.1, 1],
      transition: { duration: 6, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <footer
      id="footer"
      className="relative p-2 px-6 pt-20 pb-12 border-t border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 transition-colors"
    >
      {/* background glows */}
      <motion.div
        className="absolute bottom-[-120px] left-[55%] h-[350px] w-[450px] rounded-full blur-[130px] bg-blue-400/20 dark:bg-blue-500/40"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute top-[-120px] right-[50%] h-[350px] w-[450px] rounded-full blur-[130px] bg-purple-400/20 dark:bg-purple-600/40"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      {/* main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {/* Explore */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
            Explore
          </h3>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
            {["Features", "Testimonials", "Pricing", "FAQs"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
            Company
          </h3>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
            {["About Us", "Careers", "Contact", "Privacy Policy"].map(
              (item) => (
                <li
                  key={item}
                  className="cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
            Connect
          </h3>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
            {[
              {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/officialgopi/",
              },
              { name: "Twitter", href: "https://x.com/officialgopi" },
              { name: "GitHub", href: "https://github.com/officialgopi" },
              {
                name: "YouTube",
                href: "https://www.youtube.com/@officialgopi",
              },
            ].map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Subscribe */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
            Join the League
          </h3>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Get exclusive access and coding updates straight to your inbox.
          </p>
          <div className="flex gap-2 items-center">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500 dark:placeholder-neutral-600 transition-colors"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-neutral-50 font-semibold rounded-md shadow-md hover:shadow-[0_0_20px_rgba(100,100,255,0.3)] transition-all text-sm"
            >
              Join
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* divider */}
      <div className="w-full h-px bg-neutral-300 dark:bg-neutral-800 my-10 transition-colors" />

      {/* copyright */}
      <motion.div
        className="text-center text-sm relative z-10 text-neutral-600 dark:text-neutral-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p>
          &copy; {new Date().getFullYear()} CoderRoute. All rights reserved.
        </p>
        <motion.p
          animate={{
            textShadow: [
              "0 0 0px rgba(150,150,255,0)",
              "0 0 8px rgba(150,150,255,0.4)",
              "0 0 0px rgba(150,150,255,0)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="mt-1"
        >
          Built with 💻 by{" "}
          <a
            href="https://www.linkedin.com/in/gopikanta-mondal/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            OfficialGopi
          </a>
        </motion.p>
      </motion.div>

      {/* background brand text */}
      <motion.h1
        className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-[16vw] md:text-[10vw] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-neutral-200 dark:to-neutral-600 opacity-[0.05] select-none pointer-events-none z-0 transition-colors"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        CODERROUTE
      </motion.h1>
    </footer>
  );
};

export default Footer;
