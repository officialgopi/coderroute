import { Outlet } from "react-router-dom";
import { MainNavbar } from "../shared/MainNavbar";
import { Container } from "../ui/Container";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";

export const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    // Base layout canvas covering the full screen view
    <div className="min-h-screen w-full flex flex-col bg-bg-canvas dark:bg-bg-canvas text-text-primary dark:text-text-primary relative transition-colors duration-200 overflow-x-hidden">
      {/* --- HIGH-VISIBILITY BACKGROUND PATTERN LAYERS --- */}

      {/* LEFT COL GRID: Increased width to w-96 and solid stop to 65% to pull the grid out of hiding */}
      <div
        className="hidden md:block absolute left-0 top-0 bottom-0 w-96 z-0 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
        }}
      >
        <AnimatedGridPattern
          width={32}
          height={32}
          numSquares={20}
          maxOpacity={0.7} // Bumping max pulsing tile opacity up to 70%
          className="w-full h-full text-border-intense/50 dark:text-border-intense/30"
        />
      </div>

      {/* RIGHT COL GRID: Increased width to w-96 and solid stop to 65% to pull the grid out of hiding */}
      <div
        className="hidden md:block absolute right-0 top-0 bottom-0 w-96 z-0 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
        }}
      >
        <AnimatedGridPattern
          width={32}
          height={32}
          numSquares={20}
          maxOpacity={0.7} // Bumping max pulsing tile opacity up to 70%
          className="w-full h-full text-border-intense/50 dark:text-border-intense/30"
        />
      </div>

      {/* --- PLATFORM NAVIGATION OVERLAY --- */}
      <MainNavbar />

      {/* --- CONTENT WORKSPACE LAYER --- */}
      <div className="flex-1 flex flex-col pt-16 relative z-10 w-full bg-transparent dark:bg-transparent pointer-events-none">
        <Container
          variant="default"
          className="flex-1 flex flex-col bg-transparent dark:bg-transparent  border-border-subtle dark:border-border-subtle/40 pt-8 pointer-events-auto"
        >
          {children ? children : <Outlet />}
        </Container>
      </div>
    </div>
  );
};

export default MainLayout;
