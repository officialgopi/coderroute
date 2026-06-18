// src/components/shared/ProfileSidebar.tsx
import { useState, memo } from "react";
import { AnimatePresence } from "motion/react";
import { UserAvatarCard } from "./elements/UserAvatarCard";
import { EditProfileButton } from "./elements/EditProfileButton";
import { UserLinks } from "./elements/UserLinks";
import { UserTags } from "./elements/UserTags";

// 💎 BIND PRESERVED WORKSPACE COMPILATION WINDOWS
import { EditProfileModal } from "./elements/EditProfileModal";

export const ProfileSidebar = () => {
  // 💎 LOCAL LIFECYCLE OPEN STATE TRACKER
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-text-primary relative">
      {/* --- IDENTITY FOCUS SECTION --- */}
      <div className="w-full pb-1">
        <UserAvatarCard />
      </div>

      {/* --- ACTION GATEWAYS --- */}
      <div className="w-full">
        {/* Pass down modal trigger handle to catch active button click bounds */}
        <EditProfileButton onTriggerAction={() => setIsEditModalOpen(true)} />
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

      {/* --- 💎 SEAMLESS WORKSPACE DIALOG LIFECYCLE DECK --- */}
      <AnimatePresence>
        {isEditModalOpen && (
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ProfileSidebar);
