import { motion } from "framer-motion";
import { DiscussionHeader } from "./DiscussionHeader";
import { DiscussionAvatar } from "./DiscussionAvatar";
import { DiscussionStats } from "./DiscussionStats";
// import { DiscussionActions } from "./DiscussionActions";
import { Link } from "react-router-dom";

const discussions = [
  {
    id: 1,
    user: "LeetCode",
    time: "Sep 23, 2025",
    title: "What to ✨ Ask Leet. Share Story and Win Prizes 🎁",
    content:
      "Hello LeetCoders! We're excited to introduce a new feature to your coding experience...",
    likes: 145,
    views: 17400,
    comments: 1100,
  },
  {
    id: 2,
    user: "Sumeet Rayat",
    time: "1h ago",
    title: "Rank not updating from 2 days anyone facing same issue?",
    content: "Rank not updating from 2 days anyone facing same issue?",
    likes: 0,
    views: 29,
    comments: 1,
  },
];

export const DiscussionList = () => {
  return (
    <div className=" mx-auto">
      <DiscussionHeader />
      <div className=" flex flex-col gap-2 px-5">
        {discussions.map((d) => (
          <Link to={"d.id"}>
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="flex items-start justify-between border border-neutral-500/50 group hover:bg-neutral-500/10 rounded-2xl p-4 transition-all"
            >
              <div className="flex gap-3 ">
                <DiscussionAvatar name={d.user} />
                <div>
                  <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1">
                    <span className="font-medium">{d.user}</span>• {d.time}
                  </div>
                  <h2 className="font-semibold  mb-1  group-hover:scale-[0.99] transition">
                    {d.title}
                  </h2>
                  <p className=" text-sm line-clamp-2 max-w-xl group-hover:scale-[0.99] transition">
                    {d.content}
                  </p>
                  <div className="mt-2">
                    <DiscussionStats
                      likes={d.likes}
                      views={d.views}
                      comments={d.comments}
                    />
                  </div>
                </div>
              </div>
              {/* <DiscussionActions /> */}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
