import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

interface Props {
  htmlContent: string;
  className?: string;
}

const QuillContentRenderer: React.FC<Props> = ({ htmlContent, className }) => {
  const cleanHTML = DOMPurify.sanitize(htmlContent);

  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed",
        className
      )}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default QuillContentRenderer;
