import { useSheetStore } from "@/store/sheet.store";
import { CommandModal } from "../ui/CommandModal";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const CreateSheetModal = ({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { createSheet, isSheetCreating } = useSheetStore();
  const [sheetForm, setSheetForm] = useState<{
    name: string;
    description?: string;
  }>({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSheet(sheetForm);
    setSheetForm({ name: "", description: "" });
    onClose();
  };

  return (
    <CommandModal onClose={onClose} open={open}>
      <form
        className="p-6 flex flex-col  justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">Create Sheet</h1>
        <div className=" mb-4 flex flex-col gap-2 ">
          <label htmlFor="name" className="text-lg">
            Name of the Sheet
          </label>
          <input
            className="w-full border px-2 py-2 outline-0 rounded-sm text-sm "
            value={sheetForm.name}
            placeholder="Example : Dynamic Programming "
            onChange={(e) =>
              setSheetForm({ ...sheetForm, name: e.target.value })
            }
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className=" mb-4 flex flex-col gap-2 ">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <textarea
            value={sheetForm.description}
            placeholder="Example : A sheet on Dynamic Programming problems"
            onChange={(e) =>
              setSheetForm({ ...sheetForm, description: e.target.value })
            }
            name="description"
            id="description"
            className="w-full border px-2 py-2 rounded-sm  outline-0 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSheetCreating}
          className="w-full border rounded-md py-1 hover:bg-neutral-900/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {!isSheetCreating ? (
            <span className="">Create</span>
          ) : (
            <div className="flex items-center gap-2 animate-pulse justify-center ">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Creating...</span>
            </div>
          )}
        </button>
      </form>
    </CommandModal>
  );
};

export default CreateSheetModal;
