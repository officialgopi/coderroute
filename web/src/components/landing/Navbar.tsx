import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Menu, X, Sun, Moon, Loader2 } from "lucide-react";
import { useThemeStore } from "@/lib/theme.lib";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

const NAV_LINKS = [
  { label: "Social Proofs", href: "#social-proofs" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Faqs", href: "#faqs" },
  { label: "CTA", href: "#cta" },
] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthLoading } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const smoothTransition: Transition = {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={smoothTransition}
      className="fixed top-0 left-0 w-full z-50 h-16 border-b border-neutral-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md font-sans antialiased selection:bg-neutral-900/10 dark:selection:bg-white/10 transition-colors duration-200"
    >
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between gap-4">
          {/* --- Brand & Logo Layout Area --- */}
          <a
            href="/#hero"
            className="group flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:focus-visible:outline-white rounded-sm"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
              <img
                src="/coderroute.png"
                alt="logo"
                className="w-[40px] h-[40px] object-contain"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-zinc-50">
              Coder
              <span className="font-medium text-neutral-500 dark:text-zinc-400 transition-colors duration-200 group-hover:text-neutral-900 dark:group-hover:text-zinc-50">
                Route
              </span>
            </h1>
          </a>

          {/* --- Structural Desktop Navigation Core --- */}
          <div
            className="hidden md:flex items-center gap-0.5"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-50 transition-colors duration-200 rounded-md focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white"
              >
                <span className="relative z-10">{link.label}</span>
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="navHoverPill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 26,
                      }}
                      className="absolute inset-0 z-0 rounded-md bg-neutral-100/70 dark:bg-zinc-900/50 border border-neutral-200/40 dark:border-zinc-800/30"
                    />
                  )}
                </AnimatePresence>
              </a>
            ))}
          </div>

          {/* --- Global Controls & User Action Context Engine --- */}
          <div className="hidden md:flex items-center gap-3">
            {/* Custom Theme Toggle preserving your exact execution callback syntax */}
            <button
              onClick={() => toggleTheme()}
              aria-label="Toggle platform theme"
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-50 hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="dark-icon"
                    initial={{ y: 12, opacity: 0, rotate: -20 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -12, opacity: 0, rotate: 20 }}
                    transition={smoothTransition}
                  >
                    <Moon size={15} className="stroke-[2.2]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="light-icon"
                    initial={{ y: 12, opacity: 0, rotate: 20 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -12, opacity: 0, rotate: -20 }}
                    transition={smoothTransition}
                  >
                    <Sun size={15} className="stroke-[2.2]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <div className="h-4 w-px bg-neutral-200 dark:bg-zinc-800" />

            {isAuthLoading ? (
              <div className="flex h-9 w-9 items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
              </div>
            ) : user ? (
              <Link
                to={`/${user.username}`}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white rounded-full"
              >
                <motion.img
                  whileHover={{
                    borderColor: theme === "dark" ? "#52525b" : "#d4d4d8",
                  }}
                  transition={smoothTransition}
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  className="h-8 w-8 rounded-full border border-neutral-200 dark:border-zinc-800 object-cover transition-colors"
                />
              </Link>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ opacity: 0.85 }}
                  transition={smoothTransition}
                  className="h-8 cursor-pointer px-3 text-[12px] font-semibold tracking-wider uppercase rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white font-mono"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* --- Responsive Mobile Trigger Interface --- */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => toggleTheme()}
              className="p-2 rounded-lg border border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 bg-white dark:bg-zinc-950"
            >
              {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="p-2 rounded-lg border border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 bg-white dark:bg-zinc-950 hover:bg-neutral-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile View Drawer Canvas Engine --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={smoothTransition}
            className="md:hidden border-b border-neutral-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[14px] font-medium tracking-tight text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-50 hover:bg-neutral-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {!user && !isAuthLoading && (
                <div className="pt-4 px-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-9 text-xs font-semibold uppercase tracking-wider rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-mono">
                      Sign In to Platform
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
