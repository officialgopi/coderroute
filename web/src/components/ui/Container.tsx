import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Layout profile presets:
   * - `copy`: Narrow layout optimized for readable, single-column reading text surfaces (Discussions, Articles).
   * - `default`: Balanced layout wrapper for standard landing blocks and platform page sections.
   * - `fluid`: Full-width wrapper with horizontal padding, ideal for data dashboards and split code workspaces.
   */
  variant?: "copy" | "default" | "fluid";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    const baseStyles = "w-full mx-auto px-4 sm:px-6 lg:px-8 box-border";

    const variantStyles = {
      copy: "max-w-3xl", // Optimized typographic column width (~65-75 characters per line)
      default: "max-w-7xl", // Standard corporate dashboard width cap (1280px)
      fluid: "max-w-[100vw] text-inherit", // Edge-to-edge layout mode for dense workspaces
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export default Container;
