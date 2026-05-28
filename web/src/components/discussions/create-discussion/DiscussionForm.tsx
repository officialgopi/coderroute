// src/components/discussions/create-discussion/DiscussionForm.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useDiscussionStore } from "@/store/discussion.store";
import { Loader2, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";

export const DiscussionForm: React.FC = () => {
  const { isDiscussionCreating, createDiscussion } = useDiscussionStore();
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const cleanContent = content.trim();
    if (!cleanContent) {
      toast.error("Discussion content cannot be empty.");
      return;
    }

    try {
      await createDiscussion({ content: cleanContent });
      setContent("");
      toast.success("Thread published successfully.");
    } catch {
      toast.error("Failed to broadcast discussion thread.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.altKey || e.shiftKey) {
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const text = el.value;

        const nextValue = text.substring(0, start) + "\n" + text.substring(end);
        setContent(nextValue);

        setTimeout(() => {
          el.selectionStart = el.selectionEnd = start + 1;
        }, 0);
      } else {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full flex flex-col "
    >
      {/* 
        SURFACE CANVAS INTEGRATION 
        Removed explicit double outlines entirely. Background shading handles depth adjustments 
      */}
      <div
        className={`w-full rounded-lg transition-all duration-300 ${
          isFocused ? "bg-bg-primary/30" : "bg-transparent"
        }`}
      >
        <textarea
          ref={textareaRef}
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What's on your mind? Propose an optimization track, link compiler telemetry, or ask a question..."
          className="w-full h-44 p-2 bg-transparent text-text-primary border-0 outline-hidden resize-none font-sans text-sm leading-relaxed placeholder:text-text-muted/30 focus:ring-0"
          spellCheck="false"
          disabled={isDiscussionCreating}
        />

        {/* BOTTOM UTILITY TRIMS - Faint 5% opacity divider line */}
        <div className="h-10 px-2 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted select-none font-mono mt-2">
          <div className="flex items-center gap-1.5 opacity-40">
            <Sparkles size={11} className="text-accent-gold/80" />
            <span className="text-[10px] tracking-tight">
              ↵ to publish | ⌥↵ next line
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] opacity-25">
              {content.length} chars
            </span>
            <span className="opacity-5 text-text-primary">|</span>
            <button
              onClick={handleSubmit}
              className="h-6 px-3 bg-accent-gold text-bg-primary font-bold rounded-md text-[11px] uppercase tracking-wider hover:bg-accent-primary active:bg-accent-border transition-all duration-150 cursor-pointer flex items-center gap-1.5 shadow-3xs disabled:opacity-20"
              disabled={isDiscussionCreating || !content.trim()}
            >
              {isDiscussionCreating ? (
                <>
                  <Loader2 size={11} className="animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Send size={10} />
                  <span>Publish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscussionForm;
