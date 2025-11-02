const SheetsPage = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center ">
        <h1 className="text-2xl font-semibold">Sheets</h1>
        <button className="px-4 py-2  border rounded-sm  hover:bg-neutral-500/20  transition-colors">
          + Create New Sheet
        </button>
      </div>
    </div>
  );
};

export default SheetsPage;
