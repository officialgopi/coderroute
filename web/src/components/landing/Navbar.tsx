// src/pages/(landing)/Navbar.tsx
import { useState, memo } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Menu, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { UserAvatarDropdown } from "@/components/shared/UserAvatarDropdown";

// 💎 INGEST REUSABLE TRANSACT THEME SWITCH LAYER
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";

const NAV_LINKS = [
  { label: "Social Proofs", href: "#social-proofs" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Faqs", href: "#faqs" },
  { label: "CTA", href: "#cta" },
] as const;

export const Navbar = () => {
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
      className="fixed top-0 left-0 w-full z-50 h-16 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl font-sans antialiased transition-colors duration-200"
    >
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between gap-4">
          {/* LOGO & PLATFORM TITLE CHANNELS */}
          <a
            href="/#hero"
            className="group flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-gold rounded-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-[1.02] shadow-3xs">
              <img
                src="/coderroute.png"
                alt="logo"
                className="w-5 h-5 object-contain"
              />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary">
              Coder
              <span className="font-medium text-text-muted transition-colors duration-200 group-hover:text-text-primary">
                Route
              </span>
            </h1>
          </a>

          {/* DESKTOP ROUTE SECTIONS RAILS */}
          <div
            className="hidden md:flex items-center gap-0.5"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative px-3.5 py-1.5 text-xs font-medium tracking-wide text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-md focus-visible:outline-2 focus-visible:outline-accent-gold"
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
                      className="absolute inset-0 z-0 rounded-lg bg-bg-secondary border border-border-subtle/50"
                    />
                  )}
                </AnimatePresence>
              </a>
            ))}
          </div>

          {/* GLOBAL CONFIGURATION HUB RAIL ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {/* 💎 FIXED MODULARIZED ATOMIC THEME TRIGGER CONTROLLER */}
            <ThemeToggleButton />

            <div className="h-3.5 w-px bg-border-subtle" />

            {isAuthLoading ? (
              <div className="flex h-8 w-8 items-center justify-center">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-text-muted" />
              </div>
            ) : user ? (
              /* ISOLATED MEMOIZED PROFILE DROPDOWN COMPONENT ENTRY */
              <UserAvatarDropdown user={user} />
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ opacity: 0.9 }}
                  className="h-8 cursor-pointer px-4 text-[10px] font-bold tracking-widest uppercase rounded-lg bg-white text-black hover:bg-neutral-200 font-mono shadow-md border-none active:scale-95 transition-all outline-hidden"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* RESPONSIVE HAMBURGER TRIGGERS */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Component Integration */}
            <ThemeToggleButton />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="p-2 rounded-xl border border-border-subtle text-text-secondary bg-bg-secondary hover:bg-bg-primary transition-colors outline-hidden cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X size={14} strokeWidth={2.5} />
              ) : (
                <Menu size={14} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE EXPANSION DRAWERS CANVAS */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={smoothTransition}
            className="md:hidden border-b border-border-subtle bg-bg-secondary backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-0.5 select-none">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium tracking-tight text-text-secondary hover:text-text-primary hover:bg-bg-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {!user && !isAuthLoading && (
                <div className="pt-4 px-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-9.5 text-[10px] font-bold uppercase tracking-widest rounded-xl bg-white text-black font-mono border-none outline-hidden cursor-pointer active:scale-95 hover:bg-neutral-200 transition-all">
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
};

export default memo(Navbar);
