import { CommandModal } from "@/components/ui/CommandModal";
import { useAiStore } from "@/store/ai.store";
import type { CreateProblemBody } from "@/types/types";
import { useState } from "react";

const CreateProblemWithAIModal = ({
  open,
  onClose,
  setProblem,
}: {
  open: boolean;
  onClose: () => void;
  setProblem: React.Dispatch<React.SetStateAction<CreateProblemBody>>;
}) => {
  const { createProblemWithAI, isProblemCreatingWithAI } = useAiStore();
  const [prompt, setPrompt] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = await createProblemWithAI(prompt);

    if (problem) {
      setProblem(problem);
    }

    onClose();
  };
  return (
    <CommandModal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        <label className="font-semibold text-2xl" htmlFor="prompt">
          Prompt
        </label>
        <textarea
          name="promot"
          id="prompt"
          className="w-full h-40 border  rounded-md p-2 outline-none"
          placeholder="Describe the problem you want to create... "
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="border p-2 rounded-md hover:bg-neutral-500/50 transition "
          disabled={isProblemCreatingWithAI}
        >
          {isProblemCreatingWithAI ? "Creating Problem with AI..." : "Create"}
        </button>
      </form>
    </CommandModal>
  );
};

export default CreateProblemWithAIModal;
