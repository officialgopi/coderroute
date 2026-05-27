import { useEffect, useState, memo } from "react";
import { useThemeStore } from "@/lib/theme.lib";
import { useAuthStore } from "@/store/auth.store";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ShieldAlert } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  isAdmin?: boolean;
}

const NAV_ITEMS: NavItem[] = [
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

  // Guard Clause: Automatically collapse mobile drawer on route transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Compute clean text fallback characters if profile avatar strings return empty
  const getAvatarInitials = () => {
    if (!user?.username) return "CR";
    return user.username.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full   backdrop-blur-xl border-b border-border-subtle dark:border-zinc-800/60 transition-colors duration-200 select-none">
      {/* Decorative Top Accent Light Layer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 dark:via-amber-400/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* --- LEFT SEGMENT: IDENTITY --- */}
        <Link
          to="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 rounded-lg p-1"
        >
          <div className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-bg-canvas dark:bg-zinc-950 border border-border-subtle dark:border-zinc-800 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-xs">
              <img
                src="/coderroute.png"
                alt="CoderRoute Master Key Core"
                className="w-5 h-5 object-contain"
                loading="eager"
              />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary dark:text-text-primary font-sans">
              Coder
              <span className="font-mono bg-gradient-to-r from-neutral-900 via-amber-500 to-neutral-900 dark:from-zinc-100 dark:via-amber-400 dark:to-zinc-100 bg-clip-text text-transparent">
                Route
              </span>
            </h1>
          </div>
        </Link>

        {/* --- CENTER SEGMENT: DYNAMIC HORIZONTAL NAVIGATION --- */}
        <div
          className="hidden md:flex items-center gap-1.5"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {NAV_ITEMS.map(({ href, label, isAdmin }) => {
            // Role Permission Validation Hook
            if (isAdmin && user?.role?.toLowerCase() === "user") return null;

            const isActive = location.pathname.startsWith(href);

            return (
              <Link
                key={href}
                to={href}
                onMouseEnter={() => setHoveredTab(href)}
                className={`relative px-4 py-2 text-xs font-medium tracking-wide font-sans rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30 ${
                  isActive
                    ? "text-text-primary dark:text-text-primary font-semibold"
                    : "text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-text-primary"
                }`}
              >
                {/* Premium Background Hover Pill Tracker */}
                {hoveredTab === href && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    className="absolute inset-0 bg-surface-card dark:bg-zinc-800/60 border border-border-subtle dark:border-zinc-800/40 rounded-lg -z-10"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <div className="flex items-center gap-1.5">
                  {isAdmin && (
                    <ShieldAlert size={12} className="text-amber-500" />
                  )}
                  <span>{label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- RIGHT SEGMENT: SYSTEM ACTIONS DECK --- */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher Toggle */}
          <button
            onClick={() => toggleTheme()}
            className="p-2 rounded-xl border border-border-subtle dark:border-border-subtle 
              bg-bg-canvas dark:bg-zinc-950/40 text-text-secondary dark:text-text-secondary 
              hover:text-text-primary dark:hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700
              transition-all duration-150 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            aria-label="Toggle system interface style theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* User Account Navigation Gateway Block */}
          {user ? (
            <Link
              to={`/${user?.username}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 rounded-full"
              aria-label="View user profile workspace"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.username}'s Profile`}
                  className="w-8 h-8 rounded-full border border-border-subtle dark:border-zinc-800 object-cover shadow-xs transition-transform hover:scale-105"
                  onError={(e) => {
                    // Fallback to text initials rendering block if source fails
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                  {getAvatarInitials()}
                </div>
              )}
            </Link>
          ) : (
            <Link to="/login">
              <button className="h-8 px-3.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg bg-brand-primary text-bg-canvas dark:bg-zinc-100 dark:text-zinc-950 transition-all duration-150 hover:opacity-90 active:scale-[0.98] cursor-pointer shadow-xs">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Hamburger Expansion Toggle Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl md:hidden text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-text-primary cursor-pointer transition-colors"
            aria-label="Expand programmatic layout map index panel"
          >
            {isOpen ? (
              <X size={18} strokeWidth={2.5} />
            ) : (
              <Menu size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE DISPATCH CONTAINER DRAWER --- */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="md:hidden border-t border-border-subtle dark:border-zinc-800/80 bg-surface-panel dark:bg-zinc-950 backdrop-blur-2xl shadow-xl w-full"
        >
          <div className="flex flex-col px-4 py-4 space-y-2">
            {NAV_ITEMS.map(({ href, label, isAdmin }) => {
              if (isAdmin && user?.role?.toLowerCase() === "user") return null;

              const isActive = location.pathname.startsWith(href);

              return (
                <Link
                  key={`mobile-${href}`}
                  to={href}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-surface-card dark:bg-zinc-900 border border-border-subtle dark:border-zinc-800 text-text-primary dark:text-text-primary font-bold"
                      : "text-text-secondary dark:text-text-secondary hover:text-text-primary dark:hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <ShieldAlert size={14} className="text-amber-500" />
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
