// src/components/discussions/create-discussion/DiscussionTagsInput.tsx
import React, { useState, useRef } from "react";
import { X } from "lucide-react";

interface Props {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const DiscussionTagsInput: React.FC<Props> = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase(); // Normalize tags to lowercase for database consistency
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
    }
    setInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Professional Tag Key Listener Matrix
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    }
    // If the input buffer is entirely empty, backspace destroys the preceding index item safely
    else if (e.key === "Backspace" && !input && tags.length > 0) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`flex flex-wrap items-center gap-1.5 w-full rounded-lg px-3 py-2 border transition-all duration-150 cursor-text select-none ${
        isFocused
          ? "border-accent-gold/20 bg-bg-primary/40 ring-1 ring-accent-gold/5"
          : "border-border-primary/10 bg-bg-primary/10"
      }`}
    >
      {/* RENDER ACTIVE TAG LIST ARRAY */}
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 bg-bg-secondary border border-border-primary/10 text-text-secondary font-mono text-[11px] px-2 py-0.5 rounded-md transition-colors hover:border-border-primary/30 group"
        >
          <span>#{tag}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Avoid triggering container focus recalculation loop
              removeTag(tag);
            }}
            className="text-text-muted hover:text-accent-crimson transition-colors duration-100 p-0.5 cursor-pointer rounded"
          >
            <X size={10} className="stroke-[2.5]" />
          </button>
        </div>
      ))}

      {/* CORE HIDDEN ENTRY CONTROL TERMINAL */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={
          tags.length === 0
            ? "Filter categories or append tags..."
            : "Add tag..."
        }
        className="flex-1 min-w-[70px] bg-transparent outline-hidden text-xs text-text-primary placeholder:text-text-muted/30 font-sans py-0.5 focus:ring-0 focus:outline-hidden"
      />
    </div>
  );
};
