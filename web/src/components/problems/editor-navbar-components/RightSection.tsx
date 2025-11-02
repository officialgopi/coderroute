import { useThemeStore } from "@/lib/theme.lib";
import { useAuthStore } from "@/store/auth.store";
import { Moon, Settings, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const RightSection = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();
  return (
    <div className="flex items-center gap-4 flex-1 justify-end">
      <div className=" md:flex items-center gap-8   ">
        {/* --- Theme Toggle --- */}
        <button
          onClick={() => toggleTheme()}
          className="p-2 rounded-md border border-neutral-200 dark:border-neutral-700 x text-neutral-700 dark:text-neutral-300 transition-colors"
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
      <button
        onClick={onOpenSettings}
        className="p-2 rounded-md  transition-colors border cursor-pointer"
      >
        <Settings className="w-5 h-5 " />
      </button>
      <Link to={`/{user?.username}`}>
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="w-8 h-8 rounded-full border border-neutral-700"
        />
      </Link>
    </div>
  );
};

export default RightSection;
