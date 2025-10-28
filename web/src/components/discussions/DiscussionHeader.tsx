import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SortDropdown } from "./SortDropdown";
import { FilterDropdown } from "./FilterDropdown";
import { Button } from "../ui/button";

export const DiscussionHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row justify-between items-center gap-3  rounded-2xl  mb-6"
    >
      {/* Left Section */}
      <h1 className="text-2xl font-semibold">Discussions</h1>
      {/* Right Section */}
      <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3 ">
        <div className="flex items-center gap-2">
          <SortDropdown />
          <FilterDropdown />
        </div>
        <Button
          variant={"outline"}
          onClick={() => navigate("/discussion/create")}
          className="flex items-center gap-2 text-sm "
        >
          ✨ Start Discussion
        </Button>{" "}
      </div>
    </motion.div>
  );
};
