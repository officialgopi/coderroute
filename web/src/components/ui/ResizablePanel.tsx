import React from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface ResizablePanelProps {
  width: number;
  minConstraints?: [number, number];
  maxConstraints?: [number, number];
  children: React.ReactNode;
}

export const ResizablePanel = ({
  width,
  minConstraints = [300, 0],
  maxConstraints = [800, Infinity],
  children,
}: ResizablePanelProps) => {
  return (
    <ResizableBox
      width={width}
      height={Infinity}
      axis="x"
      minConstraints={minConstraints}
      maxConstraints={maxConstraints}
      handle={
        <div className="w-1 z-20 absolute top-0 right-0  h-full active:bg-neutral-500/50 transition-colors   hover:bg-neutral-600/50 cursor-col-resize" />
      }
    >
      <div className="h-full overflow-y-auto  border-r ">{children}</div>
    </ResizableBox>
  );
};
