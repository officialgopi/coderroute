// components/UserTags.tsx
export function UserTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs mt-2">
      {tags.map((t) => (
        <span
          key={t}
          className="px-2 py-1 rounded-lg  border border-neutral-700"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
