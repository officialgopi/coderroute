const PageLoader = () => {
  return (
    <div className="fixed top-[50%] left-[50%] animate-pulse transform -translate-x-1/2 -translate-y-1/2">
      <img src="/coderroute.png" alt="Loading..." className="  w-32 h-32 " />
      <div className="text-center mt-4 text-2xl ">
        <h2>Welcome to </h2>
        <h3 className="font-bold">
          <span className="">Coder</span>
          <span className="text-">Route</span>
        </h3>
      </div>
    </div>
  );
};

export default PageLoader;
