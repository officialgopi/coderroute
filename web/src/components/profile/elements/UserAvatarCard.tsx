export function UserAvatarCard() {
  return (
    <div className="text-center space-y-2">
      <img
        src="https://avatars.githubusercontent.com/u/583231?v=4"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <div>
        <p className="font-semibold">Gopikanta Mondal</p>
        <p className="text-xs text-neutral-400">@HackerOG</p>
      </div>
    </div>
  );
}
