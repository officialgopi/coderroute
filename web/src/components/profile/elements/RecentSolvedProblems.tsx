export function RecentSolvedProblems({ problems }: { problems: any[] }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
      <div className="p-4 border-b border-neutral-800">
        <p className="text-sm font-medium">Recent Solved</p>
      </div>

      <ul className="divide-y divide-neutral-800">
        {problems.map((p) => (
          <li key={p.id} className="px-4 py-3 flex justify-between text-sm">
            <span>{p.title}</span>
            <span
              className={`text-xs ${
                p.difficulty === "EASY"
                  ? "text-green-400"
                  : p.difficulty === "MEDIUM"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {p.difficulty}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
