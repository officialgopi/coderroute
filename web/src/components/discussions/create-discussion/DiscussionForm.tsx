import { useState } from "react";
import { DiscussionTitleInput } from "./DiscussionTitleInput";
import { DiscussionTagsInput } from "./DiscussionTagsInput";
import { DiscussionEditor } from "./DiscussionEditor";
import { motion } from "framer-motion";

export const DiscussionForm = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log({ title, tags, content });
    // TODO: submit to API
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <DiscussionTitleInput value={title} onChange={setTitle} />
      <DiscussionTagsInput tags={tags} setTags={setTags} />
      <DiscussionEditor content={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        className="self-end mt-4 px-5 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl text-sm text-neutral-100 transition-colors"
      >
        Publish Discussion
      </button>
    </motion.div>
  );
};
