// src/components/sheets/SheetCard.tsx
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Terminal, Code2, Layers, Binary, ArrowUpRight } from "lucide-react";

interface ISheet {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

const DECORATION_ICONS = [Terminal, Code2, Layers, Binary];

export const SheetsCard: React.FC<{ sheet: ISheet }> = ({ sheet }) => {
  // Stable Icon Hash Resolver
  const StableIcon = useMemo(() => {
    if (!sheet.id) return DECORATION_ICONS[0];
    const charCodeSum = sheet.id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return DECORATION_ICONS[charCodeSum % DECORATION_ICONS.length];
  }, [sheet.id]);

  return (
    /* FIXED INTENT:
      - Changed the base motion block into a semantic, block-level Router 'Link' 
      - The entire card body boundary acts as a click gateway.
      - Preserved framer/motion animation props cleanly.
    */
    <Link
      to={`/sheets/${sheet.id}`}
      className="block w-full text-left focus:outline-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -1 }} // Subtle premium micro-lift interaction behavior
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="group w-full h-full bg-bg-secondary/40 border border-border-subtle hover:border-accent-gold/20 hover:bg-bg-secondary rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-3xs cursor-pointer"
      >
        {/* 1. COMPACT GRAPHIC HEADER ROW BLOCK */}
        <div className="h-24 bg-bg-primary/20 border-b border-border-subtle/40 flex items-center justify-between px-5 relative overflow-hidden select-none">
          <div className="w-8 h-8 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-secondary shadow-3xs z-10 group-hover:border-accent-gold/10 transition-colors">
            <StableIcon size={14} className="opacity-80 text-text-secondary" />
          </div>

          <StableIcon
            size={96}
            className="absolute -right-4 -bottom-6 text-text-primary/[0.02] dark:text-text-primary/[0.01] -rotate-12 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-0"
          />
        </div>

        {/* 2. TEXT DESCRIPTION AREA CHANNELS */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold tracking-tight text-text-primary line-clamp-1 group-hover:text-accent-gold transition-colors duration-150">
              {sheet.name}
            </h3>
            {sheet.description ? (
              <p className="text-xs text-text-secondary leading-relaxed tracking-tight line-clamp-2">
                {sheet.description}
              </p>
            ) : (
              <p className="text-xs text-text-muted/40 font-mono italic">
                // No descriptions defined
              </p>
            )}
          </div>

          {/* 3. FOOTER META ACTIONS CONTROL ROW */}
          <div className="flex items-center justify-between text-[10px] font-mono text-text-muted select-none pt-5 mt-6 border-t border-border-subtle/5">
            <span>
              {new Date(sheet.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>

            {/* FIXED SEMANTICS:
              - Swapped '<button>' to an illustrative '<div>' shell structure wrapper.
              - Links nested inside buttons are invalid HTML and fail tracking tests.
              - The icon now glides up-right seamlessly using the global card group hover state token.
            */}
            <div className="w-6 h-6 rounded-md bg-bg-primary border border-border-subtle flex items-center justify-center text-text-secondary transition-all duration-150 shadow-3xs group-hover:border-accent-gold/20 group-hover:text-accent-gold group-hover:bg-bg-secondary">
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default SheetsCard;
