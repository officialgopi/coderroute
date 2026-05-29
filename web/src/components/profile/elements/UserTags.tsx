import { memo } from "react";

export const UserTags = () => {
  // Ordered array matrix representing verified repository engineering skill pillars
  const tags = ["JAVA", "REACTJS", "DP", "SYSTEM_DESIGN"];

  return (
    <div className="flex flex-wrap gap-1.5 select-none">
      {tags.map((tag) => (
        <span
          key={`skill-tag-${tag}`}
          className="inline-flex items-center justify-center h-5 px-2 rounded font-mono text-[10px] font-bold tracking-wide border border-border-subtle/50 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 text-text-secondary hover:text-text-primary hover:border-border-intense dark:hover:border-zinc-700 transition-all duration-150 uppercase"
        >
          {tag.replace("_", " ")}
        </span>
      ))}
    </div>
  );
};

export default memo(UserTags);
