import { useState } from "react";

interface Props {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const DiscussionTagsInput = ({ tags, setTags }: Props) => {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2 bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2">
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 bg-neutral-700/70 text-neutral-200 text-xs px-2 py-1 rounded-lg"
        >
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className="text-neutral-400 hover:text-neutral-200"
          >
            ×
          </button>
        </div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTag(input.trim())}
        placeholder="Add tag..."
        className="bg-transparent outline-none text-sm text-neutral-300 placeholder-neutral-500"
      />
    </div>
  );
};
