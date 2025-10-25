const Glow = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full   mix-blend-visible">
      {/* Soft Indigo Glow */}
      <div className="absolute w-[25rem]  z-0 h-[25rem] bg-green-400/20 dark:bg-indigo-500/20 blur-[140px] rounded-full top-[-15rem] left-[-15rem]" />
      {/* Soft Purple Glow */}
      <div className="absolute w-[30rem] z-0  h-[30rem] bg-green-400/20 dark:bg-purple-700/20 blur-[120px] rounded-full bottom-[-10rem] right-[-10rem]" />
    </div>
  );
};

export default Glow;
