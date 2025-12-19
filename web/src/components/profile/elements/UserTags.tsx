export function UserTags() {
  const tags = ["JAVA", "REACTJS", "DP", "SYSTEM_DESIGN"];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="text-xs px-2 py-1 bg-neutral-800 rounded-md">
          {tag}
        </span>
      ))}
    </div>
  );
}
