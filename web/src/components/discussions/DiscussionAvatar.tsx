interface Props {
  src?: string;
  name: string;
}

export const DiscussionAvatar = ({ src, name }: Props) => (
  <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
    {src ? (
      <img src={src} alt={name} className="w-full h-full object-cover" />
    ) : (
      <span className="text-neutral-300 text-sm">
        {name.charAt(0).toUpperCase()}
      </span>
    )}
  </div>
);
