// src/components/layout/MainNavbar.tsx
import { useEffect, useState, memo } from "react";
import { useThemeStore } from "@/lib/theme.lib";
import { useAuthStore } from "@/store/auth.store";
import { motion } from "framer-motion"; // Cleaned namespace reference matching framer updates
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ShieldAlert, GraduationCap } from "lucide-react";
import { UserAvatarDropdown } from "./UserAvatarDropdown";

interface NavItem {
  href: string;
  label: string;
  isAdmin?: boolean;
  isAcademy?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  /* 💎 ENHANCED: DOCHUB ACADEMY ENTRY POINT ADDED AT POSITION 0 */
  { href: "/learn", label: "Learn", isAcademy: true },
  { href: "/problems", label: "Problems" },
  { href: "/discussions", label: "Discussions" },
  { href: "/sheets", label: "Sheets" },
  { href: "/admin-panel", label: "Admin Panel", isAdmin: true },
];

export const MainNavbar = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle transition-colors duration-200 select-none">
      {/* Decorative Top Accent Light Layer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* --- LEFT SEGMENT: IDENTITY --- */}
        <Link
          to="/"
          className="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-gold/40 rounded-lg p-1"
        >
          <div className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-3xs">
              <img
                src="/coderroute.png"
                alt="CoderRoute Master Key Core"
                className="w-5 h-5 object-contain"
                loading="eager"
              />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary font-sans">
              Coder
              <span className="font-mono bg-gradient-to-r from-text-primary via-accent-gold to-text-primary bg-clip-text text-transparent">
                Route
              </span>
            </h1>
          </div>
        </Link>

        {/* --- CENTER SEGMENT: DYNAMIC NAVIGATION --- */}
        <div
          className="hidden md:flex items-center gap-1.5"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {NAV_ITEMS.map(({ href, label, isAdmin, isAcademy }) => {
            if (isAdmin && user?.role?.toLowerCase() === "user") return null;

            const isActive = location.pathname.startsWith(href);

            return (
              <Link
                key={href}
                to={href}
                onMouseEnter={() => setHoveredTab(href)}
                className={`relative px-4 py-2 text-xs font-medium tracking-wide font-sans rounded-lg transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-gold/30 ${
                  isActive
                    ? "text-text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {hoveredTab === href && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    className="absolute inset-0 bg-bg-secondary border border-border-subtle rounded-lg -z-10"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <div className="flex items-center gap-1.5">
                  {isAdmin && (
                    <ShieldAlert size={12} className="text-accent-crimson" />
                  )}
                  {isAcademy && (
                    <GraduationCap
                      size={12}
                      className={
                        isActive ? "text-accent-gold" : "text-text-muted"
                      }
                    />
                  )}
                  <span>{label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- RIGHT SEGMENT: ACTIONS DECK --- */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleTheme()}
            className="p-2 rounded-xl border border-border-subtle bg-bg-secondary text-text-secondary hover:text-text-primary hover:border-text-muted/20 transition-all duration-150 cursor-pointer shadow-3xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-gold/40"
            aria-label="Toggle system interface style theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* INTEGRATED PORTAL DROPDOWN SUITE ENTRY POINT */}
          {user ? (
            <UserAvatarDropdown user={user} />
          ) : (
            <Link to="/login">
              <button className="h-8 px-3.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg bg-text-primary text-bg-primary transition-all duration-150 hover:opacity-90 active:scale-98 cursor-pointer shadow-3xs">
                Login
              </button>
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl md:hidden text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
            aria-label="Toggle mobile menu drawer"
          >
            {isOpen ? (
              <X size={18} strokeWidth={2.5} />
            ) : (
              <Menu size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE DRAWERS --- */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="md:hidden border-t border-border-subtle bg-bg-secondary backdrop-blur-2xl shadow-xl w-full"
        >
          <div className="flex flex-col px-4 py-4 space-y-2">
            {NAV_ITEMS.map(({ href, label, isAdmin, isAcademy }) => {
              if (isAdmin && user?.role?.toLowerCase() === "user") return null;

              const isActive = location.pathname.startsWith(href);

              return (
                <Link
                  key={`mobile-${href}`}
                  to={href}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                    isActive
                      ? "bg-bg-primary border-border-subtle text-text-primary font-bold shadow-3xs"
                      : "border-transparent text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <ShieldAlert size={14} className="text-accent-crimson" />
                    )}
                    {isAcademy && (
                      <GraduationCap size={14} className="text-accent-gold" />
                    )}
                    <span>{label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default memo(MainNavbar);
