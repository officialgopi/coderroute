import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "../ui/Container";

interface AdminPanelFunctionalitiesLayoutProps {
  title: string;
  children: React.ReactNode;
  backHref?: string;
  className?: string;
  containerVariant?: "copy" | "default" | "fluid";
}

export const AdminPanelFunctionalitiesLayout = ({
  containerVariant = "default",
  title,
  children,
  backHref = "/admin-panel",
  className,
}: AdminPanelFunctionalitiesLayoutProps) => {
  return (
    <Container
      variant={containerVariant}
      className={cn(
        "py-4 sm:py-6 font-sans text-text-primary antialiased selection:bg-amber-500/10",
        className,
      )}
    >
      {/* --- PREMIUM BACK ROUTING HEADER NAVIGATION HEADER --- */}
      <header className="w-full flex items-center gap-3.5 border-b border-border-subtle/20 dark:border-zinc-900/40 pb-4 select-none">
        <Link
          to={backHref}
          aria-label={`Return navigation link to previous view folder segment`}
          className="h-8 w-8 rounded-full border border-border-subtle/80 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/30 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700 transition-all shadow-3xs cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-amber-500/20"
        >
          <ArrowLeft
            size={14}
            className="stroke-[2.5] group-hover:-translate-x-[1px] transition-transform duration-150 ease-out"
          />
        </Link>

        {/* Dynamic Context Header text */}
        <div className="flex items-center gap-2 min-w-0">
          <LayoutDashboard
            size={13}
            className="text-text-secondary opacity-30 shrink-0 stroke-[2.2] hidden sm:block"
          />
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-text-primary truncate">
            {title || "Console Functionality Tab"}
          </h1>
        </div>
      </header>

      {/* --- REPOSITORIES INJECTED PANELS WORKSPACE --- */}
      <main className="w-full mt-5 animate-fade-in focus:outline-none">
        {children}
      </main>
    </Container>
  );
};

export default memo(AdminPanelFunctionalitiesLayout);
