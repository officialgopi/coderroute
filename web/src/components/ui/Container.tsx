import { cn } from "../../lib/utils";
const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        " mx-auto px-4 ",
        "lg:max-w-5xl  md:max-w-3xl sm:max-w-xl w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
