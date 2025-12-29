import { User } from "lucide-react";

export const UserAvatar = ({
  name,
  avatar,
  color = "#facc15",
}: {
  name?: string;
  avatar?: string;
  color?: string;
}) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div
      title={name}
      className="w-8 h-8 rounded-full border-2 shrink-0"
      style={{
        borderColor: color,
        backgroundColor: avatar ? "transparent" : color,
        backgroundImage: avatar ? `url(${avatar})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!avatar && (
        <div className="w-full h-full flex items-center justify-center text-white text-xs font-semibold">
          {initials || <User size={16} />}
        </div>
      )}
    </div>
  );
};
