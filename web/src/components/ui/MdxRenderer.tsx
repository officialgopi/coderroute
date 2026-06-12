// src/components/ui/MdxRenderer.tsx
import React, { memo, type CSSProperties } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

import {
  MdxInterviewBox,
  MdxAnalogyCard,
  MdxNote,
  MdxComplexity,
  MdxCompare,
  MdxStep,
  MdxMetric,
} from "./MdxComponents";

interface MdxRendererProps {
  content: string;
  className?: string;
}

const syntaxStyle: { [key: string]: CSSProperties } | undefined = vscDarkPlus;

const mdxComponents: Components & Record<string, React.ComponentType<any>> = {
  h1: ({ children }) => (
    <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-5 mt-7 border-b border-border-subtle/50 pb-2 tracking-tight normal-case block">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg md:text-xl font-semibold text-text-primary mb-3 mt-6 tracking-tight normal-case block">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base md:text-lg font-medium text-text-primary mb-2 mt-5 normal-case block">
      {children}
    </h3>
  ),

  p: ({ children }) => {
    const childrenArray = React.Children.toArray(children);
    const hasBlockComponent = childrenArray.some((child) => {
      if (React.isValidElement(child)) {
        const typeStr =
          typeof child.type === "string"
            ? child.type
            : (child.type as any).displayName || "";
        return [
          "mdxinterviewbox",
          "mdxanalogycard",
          "mdxnote",
          "mdxcomplexity",
          "mdxcompare",
          "mdxstep",
          "mdxmetric",
          "MdxInterviewBox",
          "MdxAnalogyCard",
          "MdxNote",
          "MdxComplexity",
          "MdxCompare",
          "MdxStep",
          "MdxMetric",
        ].includes(typeStr);
      }
      return false;
    });

    return hasBlockComponent ? (
      <div className="w-full block normal-case text-left clear-both my-2">
        {children}
      </div>
    ) : (
      <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-4 normal-case text-justify block font-sans">
        {children}
      </p>
    );
  },

  // 💎 FIXED LIST MATRIX SPACING & PARAMETERS
  ul: ({ children }) => (
    <ul className="list-disc list-inside pl-5 mb-4 space-y-1.5 text-text-secondary normal-case block font-sans text-xs md:text-sm">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside pl-5 mb-4 space-y-1.5 text-text-secondary normal-case block font-sans text-xs md:text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="normal-case font-sans my-0.5 text-text-secondary/90 leading-relaxed">
      {children}
    </li>
  ),

  // 💎 FIXED STRUCTURAL TABLE LAYOUT ENGINE
  table: ({ children }) => (
    <div className="w-full my-6 overflow-x-auto rounded-xl border border-border-subtle bg-bg-secondary/10 shadow-3xs custom-scrollbar">
      <table className="w-full border-collapse text-left font-sans text-xs md:text-sm min-w-[28rem]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-bg-secondary/40 border-b border-border-subtle">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border-subtle/40">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-bg-secondary/20 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="p-3 font-mono text-[10px] md:text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="p-3 text-text-primary/90 leading-relaxed whitespace-normal break-words">
      {children}
    </td>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent-gold/60 bg-bg-secondary/30 px-5 py-2 my-5 rounded-r-xl italic text-text-secondary/90 normal-case block">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border-subtle/40 my-8 block" />,

  // Dynamic Component Library Hydration Bridges
  mdxinterviewbox: (props: any) => <MdxInterviewBox {...props} />,
  mdxanalogycard: ({ children, ...props }: any) => (
    <MdxAnalogyCard {...props}>{children}</MdxAnalogyCard>
  ),
  mdxnote: ({ children, ...props }: any) => (
    <MdxNote {...props}>{children}</MdxNote>
  ),
  mdxcomplexity: (props: any) => <MdxComplexity {...props} />,
  mdxcompare: (props: any) => <MdxCompare {...props} />,
  mdxstep: ({ children, ...props }: any) => (
    <MdxStep {...props}>{children}</MdxStep>
  ),
  mdxmetric: (props: any) => <MdxMetric {...props} />,

  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    return match ? (
      <div className="w-full rounded-xl border border-border-subtle overflow-hidden my-4 shadow-3xs text-[11px] font-mono select-text block">
        <SyntaxHighlighter
          style={syntaxStyle as any}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "var(--bg-secondary, #09090b)",
          }}
          {...(props as any)}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code
        className="font-mono text-[11px] text-accent-gold bg-bg-secondary/70 px-1.5 py-0.5 rounded-md break-words normal-case border border-border-subtle/30 inline-block"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export const MdxRenderer: React.FC<MdxRendererProps> = ({
  content,
  className,
}) => {
  return (
    <div className={cn("w-full max-w-full select-text block", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={mdxComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default memo(MdxRenderer);
