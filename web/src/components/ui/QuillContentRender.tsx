import DOMPurify from "dompurify";

interface Props {
  htmlContent: string;
}

const QuillContentRenderer: React.FC<Props> = ({ htmlContent }) => {
  const cleanHTML = DOMPurify.sanitize(htmlContent);

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default QuillContentRenderer;
