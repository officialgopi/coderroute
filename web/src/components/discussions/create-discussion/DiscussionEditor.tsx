import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  content: string;
  onChange: (val: string) => void;
}

export const DiscussionEditor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your discussion content here...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[300px] px-3 py-2 bg-neutral-900 rounded-xl border border-neutral-800 focus:outline-none",
      },
    },
  });

  return (
    <div className="border border-neutral-800 rounded-xl bg-neutral-900">
      <EditorContent editor={editor} />
    </div>
  );
};
