export function TabHeader({ tabs }: { tabs: string[] }) {
  return (
    <div className="flex gap-6 border-b border-neutral-800 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="pb-2 text-sm text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-white"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
