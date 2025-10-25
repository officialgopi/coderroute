import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/theme.lib";

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Community", href: "#community" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, filter: "blur(6px)", scale: 0.97 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* --- Logo Area --- */}
          <div className="flex items-center gap-3 w-1/3 ">
            <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              {/* Replace this with your logo */}
              <img
                src="/coderroute.png"
                alt="logo"
                className="w-[40px] h-[40px]"
              />
            </div>
            <h1 className="text-xl font-display tracking-tight text-neutral-800 dark:text-neutral-100">
              Coder
              <span className="text-neutral-500 dark:text-neutral-400">
                Route
              </span>
            </h1>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center gap-8 w-1/3 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors font-sans"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-8 w-1/3 justify-end">
            {/* --- Theme Toggle --- */}
            <button
              onClick={() => toggleTheme()}
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => toggleTheme()}
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", scale: 0.98 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800"
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
