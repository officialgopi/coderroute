import { motion, type Variants } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/gopikanta-mondal/",
    },
    {
      icon: <Twitter size={18} />,
      href: "https://x.com/devofficialgopi",
    },
    {
      icon: <Github size={18} />,
      href: "https://github.com/officialgopi",
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative px-6 pt-24 pb-12 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-500/20 blur-[160px]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand */}
        <motion.div variants={item}>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            CoderRoute
          </h2>

          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
            A developer platform to master DSA, build projects and crack top
            tech interviews.
          </p>

          <div className="flex gap-4 mt-5">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:scale-110 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Product */}
        <motion.div variants={item}>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
            Product
          </h3>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            {["Features", "Roadmap", "Practice", "Leaderboard"].map((link) => (
              <li
                key={link}
                className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div variants={item}>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
            Company
          </h3>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            {["About", "Careers", "Contact", "Privacy"].map((link) => (
              <li
                key={link}
                className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={item}>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
            Stay Updated
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Get coding tips and interview prep resources.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium"
            >
              Join
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-6 flex flex-col md:flex-row justify-between text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} CoderRoute. All rights reserved.</p>

        <p>
          Built by{" "}
          <a
            href="https://github.com/officialgopi"
            className="underline hover:text-neutral-900 dark:hover:text-white"
          >
            OfficialGopi
          </a>
        </p>
      </div>
    </footer>
  );
};
