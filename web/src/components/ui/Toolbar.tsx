import { Undo, Redo } from "lucide-react";

const Toolbar = ({ editor }: { editor: any }) => {
  const handleUndo = () => {
    if (editor) {
      editor.trigger("", "undo", null);
    }
  };

  const handleRedo = () => {
    if (editor) {
      editor.trigger("", "redo", null);
    }
  };

  return (
    <div className="flex gap-2 px-3 py-2 border-b border-neutral-700 bg-neutral-900">
      <button
        onClick={handleUndo}
        aria-label="Undo"
        title="Undo (Ctrl+Z)"
        className="p-2 rounded hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={handleRedo}
        aria-label="Redo"
        title="Redo (Ctrl+Y)"
        className="p-2 rounded hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
