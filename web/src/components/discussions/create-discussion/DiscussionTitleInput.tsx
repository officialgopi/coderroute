interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const DiscussionTitleInput = ({ value, onChange }: Props) => (
  <div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter discussion title..."
      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-neutral-600 transition"
    />
  </div>
);
