import { env } from "@/env";
import { useThemeStore } from "@/lib/theme.lib";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Moon,
  Sun,
  ShieldCheck,
  Github,
  Sparkles,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export const LoginPage = () => {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    window.location.href = `${env.VITE_API_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-canvas dark:bg-bg-canvas px-4 relative overflow-hidden transition-colors duration-300">
      {/* --- PREMIUM ATMOSPHERIC BACKDROPS & LIGHTING --- */}

      {/* Dynamic Grid Mesh with subtle gradient mask for edge fading */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.015] bg-[linear-gradient(to_right,var(--text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-muted)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Primary Ultra-Soft Amber Core Aurora Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 to-orange-500/5 dark:from-amber-500/[0.02] dark:to-transparent blur-[140px] pointer-events-none rounded-full z-0"
        aria-hidden="true"
      />

      {/* High-Fidelity Secondary Radial Laser Pass (Orbital Aesthetic) */}
      <div
        className="absolute -top-40 right-10 w-[400px] h-[400px] bg-blue-500/[0.02] dark:bg-zinc-400/[0.01] blur-[100px] pointer-events-none rounded-full z-0 animate-pulse duration-[6000ms]"
        aria-hidden="true"
      />

      {/* --- GLOBAL NAVIGATION INTERFACE HEADER --- */}
      <nav className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
        <button
          onClick={() => navigate("/")}
          className="p-2.5 rounded-xl border border-border-subtle dark:border-border-subtle 
            bg-surface-panel/80 dark:bg-surface-panel/40 backdrop-blur-md text-text-secondary dark:text-text-secondary 
            hover:text-text-primary dark:hover:text-text-primary hover:border-border-intense dark:hover:border-border-intense
            hover:bg-surface-card dark:hover:bg-surface-card transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          aria-label="Navigate back to landing page"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
        </button>

        <button
          onClick={() => toggleTheme()}
          className="p-2.5 rounded-xl border border-border-subtle dark:border-border-subtle 
            bg-surface-panel/80 dark:bg-surface-panel/40 backdrop-blur-md text-text-secondary dark:text-text-secondary 
            hover:text-text-primary dark:hover:text-text-primary hover:border-border-intense dark:hover:border-border-intense
            hover:bg-surface-card dark:hover:bg-surface-card transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          aria-label="Toggle visual theme state"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>

      {/* --- THE CODERROUTE PREMIUM AUTHENTICATION CARD CONTAINER --- */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-surface-panel/70 dark:bg-surface-panel/35 backdrop-blur-xl 
          border border-border-subtle dark:border-zinc-800/60
          hover:border-neutral-300 dark:hover:border-zinc-700/80
          rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)]
          p-8 sm:p-10 flex flex-col items-center gap-8 relative z-10 transition-all duration-500"
      >
        {/* Decorative Top Radial Border Highlight (Glow Effect) */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 dark:via-amber-400/20 to-transparent pointer-events-none" />

        {/* Brand Meta & Identity Segment */}
        <div className="flex flex-col items-center gap-4 text-center w-full">
          {/* Enhanced Cyber-Style Logo Container Box */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl 
            bg-bg-canvas dark:bg-zinc-950 border border-border-subtle dark:border-zinc-800
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-amber-500/5 dark:bg-amber-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <img
              src="/coderroute.png"
              alt="CoderRoute Premium Identity Mark"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain relative z-10"
              loading="eager"
            />
          </div>

          <div className="space-y-2">
            {/* Contextual Accent Label */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-amber-500/10 dark:border-amber-400/10 bg-amber-500/[0.03] text-[10px] font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
              <Sparkles size={10} className="animate-spin duration-3000" />
              <span>Developer Portal</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-text-primary dark:text-text-primary font-sans">
              Welcome to{" "}
              <span className="font-mono bg-gradient-to-r from-neutral-900 via-amber-500 to-neutral-900 dark:from-zinc-100 dark:via-amber-400 dark:to-zinc-100 bg-clip-text text-transparent">
                CoderRoute
              </span>
            </h1>

            <p className="text-sm text-text-secondary dark:text-text-secondary max-w-xs leading-relaxed opacity-85">
              Sign in to sync your dashboard tracking, practice metrics, and
              algorithmic history layers.
            </p>
          </div>
        </div>

        {/* Third-Party Authentication Platform Providers Stack */}
        <div className="w-full space-y-3.5">
          {/* Active Provider: Google Identity Action Node */}
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 px-5 h-12 
              bg-bg-canvas dark:bg-zinc-950/60 border border-border-subtle dark:border-zinc-800/80
              text-text-primary dark:text-text-primary font-medium rounded-xl
              shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none
              hover:bg-surface-card dark:hover:bg-zinc-900 hover:border-border-intense dark:hover:border-zinc-700
              hover:shadow-[0_0_20px_rgba(245,158,11,0.06)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.03)]
              active:scale-[0.985] transition-all duration-200 cursor-pointer text-sm font-sans
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
          >
            <FcGoogle className="w-5 h-5 flex-shrink-0" />
            <span>Continue with Google</span>
          </button>

          {/* Locked Provider Pipeline: GitHub Identity Node */}
          <div className="relative group/disabled cursor-not-allowed w-full">
            <button
              disabled
              type="button"
              className="w-full flex items-center justify-center gap-3 px-5 h-12 
                bg-bg-canvas/50 dark:bg-zinc-950/20 border border-border-subtle/60 dark:border-zinc-900/60 
                text-text-primary/30 dark:text-text-primary/20
                font-medium rounded-xl opacity-50 pointer-events-none text-sm"
            >
              <Github
                size={18}
                className="text-text-primary/30 dark:text-text-primary/20 flex-shrink-0"
              />
              <span>Continue with GitHub</span>
            </button>

            {/* Context Coming Soon Miniature Indicator Badge */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-wider text-text-secondary dark:text-text-secondary font-bold opacity-40 select-none pointer-events-none uppercase">
              Soon
            </span>
          </div>

          {/* Encryption Protocol Trust Metric Row */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-semibold text-text-secondary dark:text-text-secondary opacity-50 pt-1.5 tracking-wide uppercase">
            <ShieldCheck
              size={12}
              className="text-brand-success dark:text-brand-success stroke-[2.5]"
            />
            <span>Secure TLS Sandbox Instance</span>
          </div>
        </div>

        {/* Footnote Regulatory Policy Compliance Links */}
        <p className="text-xs text-text-secondary dark:text-text-secondary opacity-60 text-center max-w-[300px] leading-relaxed border-t border-border-subtle dark:border-zinc-800/80 w-full pt-5">
          By authentication, you accept our platform{" "}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-medium"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-medium"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
