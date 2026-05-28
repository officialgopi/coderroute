import { memo } from "react";

interface DiscussionAvatarProps {
  src?: string;
  name?: string; // Optional type protection to prevent backend parsing failures
}

export const DiscussionAvatar = ({
  src,
  name = "Anonymous",
}: DiscussionAvatarProps) => {
  // Defensive validation ensures that empty strings do not crash the view layout track
  const resolvedInitial =
    name && name.trim().length > 0 ? name.trim().charAt(0).toUpperCase() : "?";

  return (
    <div className="w-7.5 h-7.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-border-subtle/40 dark:border-zinc-800 flex items-center justify-center overflow-hidden select-none shrink-0 shadow-3xs">
      {src && src.trim().length > 0 ? (
        <img
          src={src}
          alt={`${name}'s profile avatar`}
          loading="lazy" // Native hardware lazy-loading increases feed rendering speeds
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-text-secondary dark:text-zinc-400 font-sans text-xs font-bold tracking-tight">
          {resolvedInitial}
        </span>
      )}
    </div>
  );
};

export default memo(DiscussionAvatar);
