import React, { memo, useMemo } from "react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
// Import core layout rules to parse text alignments and indents correctly
import "react-quill-new/dist/quill.bubble.css";

interface QuillContentRendererProps {
  htmlContent: string;
  className?: string;
}

export const QuillContentRenderer: React.FC<QuillContentRendererProps> = ({
  htmlContent,
  className,
}) => {
  // Memoize sanitize pass to block redundant parsing loops on parent state changes
  const sanitizedCleanHTML = useMemo(() => {
    return DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "pre",
        "code",
        "ol",
        "ul",
        "li",
        "a",
        "blockquote",
      ],
      ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
    });
  }, [htmlContent]);

  return (
    <div
      className={cn(
        // ql-editor maps core classes; prose-pre override hands code-block styling to your editor layout
        "ql-editor !p-0 prose prose-neutral dark:prose-invert max-w-none text-xs leading-relaxed text-text-primary select-text prose-pre:bg-transparent prose-pre:p-0",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitizedCleanHTML }}
    />
  );
};

export default memo(QuillContentRenderer);
