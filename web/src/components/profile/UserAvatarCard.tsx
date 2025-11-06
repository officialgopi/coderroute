import type { IUser } from "@/store/auth.store";

export function UserAvatarCard({ user }: { user: IUser }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-xl  backdrop-blur-sm">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover border border-neutral-700 shadow-md"
      />
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-wide">{user.name}</h1>
        <p className="text-sm opacity-70">@{user.username}</p>
      </div>
    </div>
  );
}
