import { memo } from "react";
import { Settings2 } from "lucide-react";

interface EditProfileButtonProps {
  onTriggerAction?: () => void; // Optional handler slot prepared for opening modal management states
}

export const EditProfileButton = ({
  onTriggerAction,
}: EditProfileButtonProps) => {
  return (
    <button
      type="button"
      onClick={onTriggerAction}
      className="w-full h-8 px-3 rounded-lg border border-border-subtle/60 dark:border-zinc-800 bg-surface-card dark:bg-zinc-900/40 text-text-primary hover:border-border-intense dark:hover:border-zinc-700 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs font-mono font-medium shadow-3xs group select-none outline-none focus:border-border-intense"
    >
      <Settings2
        size={12}
        className="text-text-secondary opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-200 ease-out stroke-[2.2] shrink-0"
      />
      <span>Edit Profile</span>
    </button>
  );
};

export default memo(EditProfileButton);
