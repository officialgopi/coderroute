import {
  type ComponentPropsWithoutRef,
  useEffect,
  useId,
  useRef,
  useState,
  useMemo,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<"svg"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string | number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 40,
  className,
  maxOpacity = 0.4,
  duration = 4,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle container resizing cleanly via a structured Observer loop
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(currentContainer);
    return () => {
      if (currentContainer) resizeObserver.unobserve(currentContainer);
    };
  }, []);

  // Performance Gains: Memoize the grid layout generation matrix.
  // The layout recalculates ONLY when viewport dimensions scale or structural configurations shift.
  const gridSquares = useMemo(() => {
    if (!dimensions.width || !dimensions.height) return [];

    const columns = Math.ceil(dimensions.width / width);
    const rows = Math.ceil(dimensions.height / height);

    return Array.from({ length: numSquares }, (_, i) => ({
      id: `grid-sq-${i}`,
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows),
      // Randomize animation timelines so tiles pulse out of phase smoothly
      delay: Math.random() * duration,
      duration: duration + (Math.random() * 2 - 1),
    }));
  }, [dimensions, width, height, numSquares, duration]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full stroke-border-subtle/30 fill-border-subtle/10 text-text-secondary/10 transition-colors duration-300",
        "[mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      {/* Background Grid Canvas Base Layer */}
      <rect width="100%" height="100%" fill={`url(#${id})`} strokeWidth={0} />

      {/* Dynamic Hardware-Accelerated Shimmer Tiles Overlay */}
      <svg x={x} y={y} className="overflow-visible">
        {gridSquares.map((square) => (
          <motion.rect
            key={square.id}
            width={width - 1}
            height={height - 1}
            x={square.x * width + 1}
            y={square.y * height + 1}
            fill="currentColor"
            strokeWidth="0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, maxOpacity, 0],
            }}
            transition={{
              duration: square.duration,
              delay: square.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </svg>
  );
}
