import { EditProfileButton } from "./elements/EditProfileButton";
import { UserAvatarCard } from "./elements/UserAvatarCard";
import { UserLinks } from "./elements/UserLinks";
import { UserTags } from "./elements/UserTags";

export function ProfileSidebar() {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 space-y-4">
      <UserAvatarCard />
      <EditProfileButton />
      <UserLinks />
      <UserTags />
    </div>
  );
}
