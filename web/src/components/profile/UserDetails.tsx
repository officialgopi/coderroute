// pages/UserProfilePage.tsx
import { UserAvatarCard } from "./UserAvatarCard";
import { UserTags } from "./UserTags";
import { UserLinks } from "./UserLinks";
import { ActivityHeatmap } from "./UserActivityHeatmap";

export default function UserProfilePage() {
  const user = {
    name: "Gopikanta Mondal",
    username: "HackerOG",
    rank: 966660,
    location: "India",
    bio: "Interested in Coding. Specially DSA and Web Development",
    avatar: "https://avatars.githubusercontent.com/u/583231?v=4",
    links: {
      website: "https://officialgopi.me",
      github: "https://github.com/officialgopi",
      linkedin: "https://linkedin.com/in/gopikanta-mondal",
    },
    tags: ["java", "javascript", "sql", "mongodb", "reactjs"],
  };

  const activity = Array.from({ length: 365 }, () =>
    Math.floor(Math.random() * 5)
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <UserAvatarCard user={user as any} />
      <p className="text-sm opacity-80 mt-2">{user.bio}</p>
      <UserLinks links={user.links} />
      <UserTags tags={user.tags} />
      <ActivityHeatmap activity={activity} />
    </div>
  );
}
