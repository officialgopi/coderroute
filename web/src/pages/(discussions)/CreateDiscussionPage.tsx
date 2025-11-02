import { motion } from "framer-motion";
import { DiscussionForm } from "@/components/discussions/create-discussion/DiscussionForm";

const CreateDiscussionPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=" flex flex-col items-center px-4 py-10"
    >
      <div className="w-full max-w-3xl  border border-neutral-800 rounded-2xl p-6 backdrop-blur-md shadow-xl">
        <h1 className="text-2xl font-semibold mb-4 text-neutral-100">
          Start a New Discussion
        </h1>
        <p className="text-neutral-400 mb-8 text-sm">
          Ask questions, share insights, or start a topic with the community.
        </p>
        <DiscussionForm />
      </div>
    </motion.div>
  );
};
export default CreateDiscussionPage;
