import { motion } from "framer-motion";
import { DiscussionHeader } from "./DiscussionHeader";
import { DiscussionAvatar } from "./DiscussionAvatar";
import { DiscussionStats } from "./DiscussionStats";
import { Link } from "react-router-dom";
import { useDiscussionStore } from "@/store/discussion.store";
import { useEffect } from "react";

const DiscussionList = () => {
  const { discussions, isDiscussionsLoading, getDiscussions } =
    useDiscussionStore();
  useEffect(() => {
    getDiscussions();
  }, []);
  useEffect(() => {
    console.log(discussions);
  }, [discussions]);

  return (
    <div className=" mx-auto">
      <DiscussionHeader />
      <div className=" flex flex-col gap-2 px-5">
        {discussions.map((d) => (
          <Link to={d.id} key={d.id}>
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="flex items-start justify-between border border-neutral-500/50 group hover:bg-neutral-500/10 rounded-2xl p-4 transition-all"
            >
              <div className="flex gap-3 ">
                <DiscussionAvatar src={d.user.avatar} name={d.user.name} />
                <div>
                  <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1">
                    <span className="font-medium">{d.user.name}</span>•{" "}
                    {new Date(d.createdAt).toLocaleDateString()}-
                    {new Date(d.createdAt).toLocaleTimeString()}
                  </div>

                  <p className=" text-sm line-clamp-2 max-w-xl group-hover:scale-[0.99] transition">
                    {d.content}
                  </p>
                  <div className="mt-2">
                    <DiscussionStats replies={d._count?.replies!} />
                  </div>
                </div>
              </div>
              {/* <DiscussionActions /> */}
            </motion.div>
          </Link>
        ))}
        {!isDiscussionsLoading && discussions.length === 0 && (
          <div className="text-center text-neutral-400  mt-10">
            No discussions found.
          </div>
        )}
        {isDiscussionsLoading && (
          <div className="flex flex-col w-full gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-24 bg-neutral-500/10 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionList;
