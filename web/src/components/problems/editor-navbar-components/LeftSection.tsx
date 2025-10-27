import { Menu } from "lucide-react";

const LeftSection = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <div className="flex items-center gap-3 flex-1">
      <img
        src="/coderroute.png"
        alt="CoderRoute"
        className="w-[40px] h-[40px] rounded"
      />
      <button
        onClick={onToggleSidebar}
        className=" transition-colors flex items-center gap-2 border p-2 rounded-md hover:bg-neutral-300/50 dark:hover:bg-neutral-900/50 cursor-pointer"
      >
        <Menu className="w-4 h-4" />
        <span className="text-sm font-medium">Daily Questions</span>
      </button>
    </div>
  );
};

export default LeftSection;
