import { useState } from "react";
// import { DiscussionTitleInput } from "./DiscussionTitleInput";
// import { DiscussionTagsInput } from "./DiscussionTagsInput";
import { motion } from "framer-motion";
import { useDiscussionStore } from "@/store/discussion.store";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const DiscussionForm = () => {
  const { isDiscussionCreating, createDiscussion } = useDiscussionStore();

  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Discussion content cannot be empty.");
    }
    await createDiscussion({ content });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <textarea
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your discussion content here..."
        className="w-full h-40 p-4 border border-neutral-500/50 rounded-lg focus:outline-none resize-y "
      />

      <button
        onClick={handleSubmit}
        className="self-end mt-4 px-5 py-2  border  rounded-xl text-sm  transition-colors hover:bg-neutral-500/10 border-neutral-500/50"
        disabled={isDiscussionCreating}
      >
        {isDiscussionCreating ? (
          <div className="w-full flex items-center justify-center gap-1">
            <Loader2 className="animate-spin " />
            <span>Publishing...</span>
          </div>
        ) : (
          "Publish Discussion"
        )}
      </button>
    </motion.div>
  );
};

export default DiscussionForm;
