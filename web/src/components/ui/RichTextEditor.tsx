// src/components/ui/RichTextEditor.tsx
import { Suspense, memo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Enforce stylesheet baseline bindings
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

// Optimized toolbar choices built for drafting documentation literature cleanly
const modules = {
  toolbar: [
    [{ header: [3, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["code", "clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "code",
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full text-text-primary rounded-xl border border-border-subtle bg-bg-secondary/20 dark:bg-zinc-950/20 overflow-hidden shadow-3xs group",
        "focus-within:border-accent-gold/40 focus-within:shadow-[0_0_15px_-3px_rgba(234,179,8,0.12)] transition-all duration-200",
        className,
      )}
    >
      <Suspense
        fallback={
          <div className="h-48 w-full bg-bg-secondary/10 animate-pulse border border-dashed border-border-subtle rounded-xl flex items-center justify-center font-mono text-[10px] text-text-muted select-none">
            // Initializing rich text compiler layers...
          </div>
        }
      >
        {/* 💎 CUSTOM CSS TAILWIND LAYER OVERRIDES OVER REACTER-QUILL TOKENS */}
        <div
          className={cn(
            "w-full font-sans text-xs text-text-primary",
            // Toolbar Custom Aesthetics Overrides
            "[&_.ql-toolbar.ql-snow]:border-none [&_.ql-toolbar.ql-snow]:bg-bg-secondary/40 [&_.ql-toolbar]:p-2.5 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-border-subtle/60",
            "[&_.ql-stroke]:stroke-text-secondary [&_.ql-fill]:fill-text-secondary [&_.ql-picker]:text-text-secondary [&_.ql-picker-label]:font-mono [&_.ql-picker-label]:text-[10px] [&_.ql-picker-label]:font-bold",
            "[&_.ql-stroke]:group-hover:stroke-text-primary [&_.ql-fill]:group-hover:fill-text-primary [&_.ql-picker]:group-hover:text-text-primary",
            // Dropdown Picker Context Menus
            "[&_.ql-snow_.ql-picker-options]:bg-bg-primary [&_.ql-snow_.ql-picker-options]:border-border-subtle [&_.ql-snow_.ql-picker-options]:rounded-lg [&_.ql-snow_.ql-picker-options]:shadow-md",
            // Active Hover Micro-Interactions Inside Toolbar Buttons
            "[&_.ql-snow.ql-toolbar_button:hover]:text-accent-gold [&_.ql-snow.ql-toolbar_button:hover_.ql-stroke]:stroke-accent-gold [&_.ql-snow.ql-toolbar_button:hover_.ql-fill]:fill-accent-gold",
            "[&_.ql-snow.ql-toolbar_button.ql-active]:text-accent-gold [&_.ql-snow.ql-toolbar_button.ql-active_.ql-stroke]:stroke-accent-gold [&_.ql-snow.ql-toolbar_button.ql-active_.ql-fill]:fill-accent-gold",
            // Editing Area Layout Gutter Tweaks
            "[&_.ql-container.ql-snow]:border-none [&_.ql-editor]:min-h-[16rem] [&_.ql-editor]:p-4 [&_.ql-editor]:leading-relaxed [&_.ql-editor]:text-xs [&_.ql-editor]:md:text-sm",
            "[&_.ql-editor.ql-blank::before]:text-text-muted/30 [&_.ql-editor.ql-blank::before]:font-sans [&_.ql-editor.ql-blank::before]:italic [&_.ql-editor.ql-blank::before]:text-xs",
            // Code Presentation Inline Tweaks
            "[&_.ql-editor_code]:font-mono [&_.ql-editor_code]:text-accent-gold [&_.ql-editor_code]:bg-bg-secondary/60 [&_.ql-editor_code]:px-1.5 [&_.ql-editor_code]:py-0.5 [&_.ql-editor_code]:rounded-sm",
          )}
        >
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder={
              placeholder ||
              "Compose clean markdown prose details or block lines..."
            }
            modules={modules}
            formats={formats}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default memo(RichTextEditor);
