import { motion } from "framer-motion";
import { DiscussionStats } from "./DiscussionStats";
import { DiscussionAvatar } from "./DiscussionAvatar";
import { DiscussionActions } from "./DiscussionActions";

export const DiscussionCard = ({ post }: { post: any }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(38,38,38,0.7)" }}
      className="border border-neutral-700/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 bg-neutral-800/60 hover:shadow-md hover:shadow-neutral-700/40 transition-colors"
    >
      <DiscussionAvatar name={post.author} src={post.avatar} />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{post.title}</h3>
        <p className="text-neutral-400 mt-1 line-clamp-2">{post.content}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-neutral-500">
            {post.author} • {post.time}
          </span>
          <DiscussionStats
            likes={post.upvotes}
            comments={post.comments}
            views={post.views}
          />
        </div>
      </div>
      <DiscussionActions />
    </motion.div>
  );
};
