import { memo } from "react";
import { UserAvatarCard } from "./elements/UserAvatarCard";
import { EditProfileButton } from "./elements/EditProfileButton";
import { UserLinks } from "./elements/UserLinks";
import { UserTags } from "./elements/UserTags";

export const ProfileSidebar = () => {
  return (
    <div className="w-full flex flex-col gap-4 font-sans text-text-primary">
      {/* --- IDENTITY FOCUS SECTION --- */}
      <div className="w-full pb-1">
        <UserAvatarCard />
      </div>

      {/* --- ACTION GATEWAYS --- */}
      <div className="w-full">
        <EditProfileButton />
      </div>

      {/* --- EXTERNAL CHANNELS BLOCK INDEX --- */}
      <div className="pt-4 border-t border-border-subtle/30 dark:border-zinc-900/40 space-y-3">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
          Network Connectivity
        </h3>
        <UserLinks />
      </div>

      {/* --- REPOSITORY SKILLS BADGES MATRIX --- */}
      <div className="pt-4 border-t border-border-subtle/30 dark:border-zinc-900/40 space-y-3">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-secondary opacity-40 select-none">
          Verified Taxonomy Tags
        </h3>
        <UserTags />
      </div>
    </div>
  );
};

export default memo(ProfileSidebar);
