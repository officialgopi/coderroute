import { useState, memo } from "react";
import { useAuthStore } from "@/store/auth.store";
import { motion, AnimatePresence } from "framer-motion";

export const UserAvatarCard = () => {
  const { user } = useAuthStore();
  const [imageError, setImageError] = useState(false);

  const resolvedName = user?.name || "Gopikanta Mondal";
  const resolvedHandle = user?.username || "HackerOG";

  // Keep the raw value clean to allow true initials fallback logic to execute
  const rawAvatarSrc = user?.avatar?.trim();
  const hasValidAvatar = !!rawAvatarSrc && !imageError;

  // Safe split parser builds clear initial tokens out of single or multi-segment names
  const initialsFallback =
    resolvedName
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase() || "?";

  return (
    <div className="w-full text-center flex flex-col items-center gap-3 select-none font-sans">
      {/* --- PREMIUM CONTENT AVATAR BOX HOOD --- */}
      <div className="relative group">
        {/* Soft decorative background ambient ring shadow */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-500/10 to-transparent blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"
          aria-hidden="true"
        />

        <div className="w-20 h-20 rounded-full border-2 border-border-subtle dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 overflow-hidden relative z-10 flex items-center justify-center shadow-2xs group-hover:border-border-intense dark:group-hover:border-zinc-700 transition-colors duration-200">
          <AnimatePresence mode="wait">
            {hasValidAvatar ? (
              <motion.img
                key="avatar-img-node"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={rawAvatarSrc}
                alt={`${resolvedName}'s profile avatar`}
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-104"
              />
            ) : (
              <motion.div
                key="avatar-initials-node"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full h-full flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-900 font-sans text-sm font-bold tracking-tight text-text-secondary dark:text-zinc-400 select-none cursor-default"
              >
                {initialsFallback}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- TEXT METADATA LABELS BLOCK --- */}
      <div className="space-y-0.5">
        <h2 className="font-bold text-base tracking-tight text-text-primary">
          {resolvedName}
        </h2>
        <p className="font-mono text-[11px] font-medium text-text-secondary opacity-60 leading-none tracking-tight">
          @{resolvedHandle.replace(/^@/, "")}
        </p>
      </div>
    </div>
  );
};

export default memo(UserAvatarCard);
