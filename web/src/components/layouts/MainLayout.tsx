import { Outlet } from "react-router-dom";
import MainNavbar from "../shared/MainNavbar";
import Container from "../ui/Container";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full  flex flex-col justify-center items-center overflow-x-hidden relative  mx-auto">
      <MainNavbar />
      <AnimatedGridPattern
        toLeft
        className="hidden  sm:block fixed z-0 left-0  top-0 sm:w-[100px] xl:w-[200px] "
      />
      <div className="w-full flex mt-16 ">
        <Container className="min-h-[calc(100vh-64px)] pt-8 border-x  ">
          {children ? children : <Outlet />}
        </Container>
      </div>
      <AnimatedGridPattern className="hidden sm:block fixed z-0  sm:left-[calc(100%-100px)] xl:left-[calc(100%-200px)]     top-0 sm:w-[100px] xl:w-[200px]" />
    </div>
  );
};

export default MainLayout;
