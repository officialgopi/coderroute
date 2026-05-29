import { useState, memo, useMemo } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  color?: string; // Hex variable placeholder string
  className?: string;
}

export const UserAvatar = ({
  name,
  avatar,
  color = "#facc15",
  className,
}: UserAvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const resolvedName = name?.trim() || "Anonymous User";

  const hasValidAvatar = !!avatar?.trim() && !imageError;

  // Stable token parsing blocks whitespace segment leak vulnerabilities cleanly
  const initialsFallback = useMemo(() => {
    return resolvedName
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [resolvedName]);

  // Accessible text color calculator checks background luminosity dynamically
  const isBackgroundLight = useMemo(() => {
    const cleanHex = color.replace("#", "");
    if (cleanHex.length !== 6) return false;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // HSP color model formula equation to determine perceived brightness
    const brightnessScore = Math.sqrt(
      0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
    );
    return brightnessScore > 127.5;
  }, [color]);

  return (
    <div
      title={resolvedName}
      className={cn(
        "w-8 h-8 rounded-full border-2 shrink-0 overflow-hidden relative flex items-center justify-center select-none shadow-3xs group transition-colors duration-200",
        className,
      )}
      style={{
        borderColor: color,
        backgroundColor: hasValidAvatar ? "transparent" : color,
      }}
    >
      {hasValidAvatar ? (
        <img
          src={avatar.trim()}
          alt={`${resolvedName}'s user portal profile avatar`}
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center font-sans text-xs font-bold tracking-tight animate-fade-in",
            isBackgroundLight ? "text-zinc-950" : "text-white",
          )}
        >
          {initialsFallback || (
            <User
              size={13}
              className={
                isBackgroundLight ? "text-zinc-950/70" : "text-white/80"
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(UserAvatar);
