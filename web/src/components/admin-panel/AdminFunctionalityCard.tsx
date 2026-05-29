import React, { memo } from "react";
import { cn } from "@/lib/utils";

export const Card = memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border-subtle/40 dark:border-zinc-900/60 bg-surface-card/20 dark:bg-zinc-950/10 backdrop-blur-xs shadow-3xs transition-all duration-200 hover:border-border-intense dark:hover:border-zinc-800 flex flex-col justify-between overflow-hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export const CardHeader = memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2.5 text-xs font-bold font-sans tracking-tight text-text-primary w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

export const CardContent = memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn(
          "text-[11px] leading-relaxed text-text-secondary opacity-70 mt-1.5 font-sans select-text",
          className,
        )}
        {...props}
      />
    );
  },
);
CardContent.displayName = "CardContent";

export const CardFooter = memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn(
          "mt-3 flex items-center justify-end font-mono text-[10px] text-text-secondary opacity-40 w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";
