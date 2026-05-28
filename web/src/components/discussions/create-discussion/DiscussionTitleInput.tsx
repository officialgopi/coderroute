// src/components/discussions/create-discussion/DiscussionTitleInput.tsx
import React, { useState } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const DiscussionTitleInput: React.FC<Props> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Thread title..."
        className={`w-full bg-transparent text-text-primary placeholder:text-text-muted/30 
          font-sans text-lg md:text-xl font-medium tracking-tight outline-hidden border-b pb-2.5 transition-all duration-200 focus:outline-hidden ${
            isFocused
              ? "border-accent-gold/40 shadow-[0_1px_0_0_rgba(192,138,62,0.15)]"
              : "border-border-primary/10"
          }`}
        maxLength={100}
        spellCheck="false"
        autoComplete="off"
      />
    </div>
  );
};

export default DiscussionTitleInput;
