import { memo } from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    // Hardened viewport baseline locks down background layers on desktop systems
    <div className="h-screen w-full relative flex flex-col bg-bg-canvas dark:bg-zinc-950 overflow-hidden antialiased select-none selection:bg-amber-500/20">
      {/* --- PREMIUM AMBIENT GLOW SYSTEM --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden mix-blend-normal"
        aria-hidden="true"
      >
        {/* Primary Soft Amber Glow Vector - Top Right */}
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-amber-500/10 dark:bg-amber-500/[0.03] blur-[120px] animate-pulse duration-4000" />

        {/* Secondary Deep Neutral Halo - Bottom Left */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-zinc-400/10 dark:bg-zinc-800/[0.05] blur-[100px]" />

        {/* Dynamic Center Backdrop Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      {/* --- STRUCTURAL HUB WITH RESPONSIVE BREAKPOINT SCROLL CONTROLS --- */}
      {/* 
        - Mobile default: overflow-y-auto allows users to scroll through long forms easily.
        - Desktop (md and up): md:overflow-hidden cuts off manual track scrolling completely.
      */}
      <main className="flex-1 w-full relative z-10 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto md:overflow-hidden custom-scrollbar">
        {/* my-auto works seamlessly with the flex container to handle top-alignment safety on tiny devices */}
        <div className="w-full max-w-md transition-all duration-300 transform my-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default memo(AuthLayout);
