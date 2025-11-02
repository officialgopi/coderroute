import { useThemeStore } from "@/lib/theme.lib";
import { useAuthStore } from "@/store/auth.store";
import { motion, type Variants } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [open, setOpen] = useState(false);

  const navItems: {
    href: string;
    label: string;
  }[] = [
    {
      href: "/problems",
      label: "Problems",
    },
    {
      href: "/discussions",
      label: "Discussions",
    },
    {
      href: "/sheets",
      label: "Sheets",
    },
  ];
  const fadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="fixed  top-0 z-50 w-full backdrop-blur-md  border-b border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src="/coderroute.png" // replace with your logo
              alt="CoderRoute Logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl  text-neutral-900 dark:text-neutral-100 font-poppins">
              Coder
              <span className="text-neutral-500 dark:text-neutral-400">
                Route
              </span>
            </h1>
          </div>
        </Link>

        {/* Center - Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(({ href, label }: { href: string; label: string }) => (
            <Link key={href} to={href}>
              <motion.div
                whileHover={{ opacity: 0.8 }}
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {label}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Right - Avatar */}
        <div className="flex items-center gap-3">
          <div className=" md:flex items-center gap-8   ">
            {/* --- Theme Toggle --- */}
            <button
              onClick={() => toggleTheme()}
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-700 x text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
          <Link to={`/${user?.username}`}>
            <motion.img
              whileHover={{ opacity: 0.9 }}
              src={user?.avatar}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700"
            />
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-neutral-800 dark:text-neutral-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center py-3 space-y-3">
            {navItems.map(
              ({ href, label }: { href: string; label: string }) => (
                <Link
                  key={href}
                  to={href}
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default MainNavbar;
