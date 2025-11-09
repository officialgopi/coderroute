import { useEffect, useState } from "react";
import hljs from "highlight.js";
import type { IProblem } from "@/store/problem.store";
import "highlight.js/styles/a11y-dark.min.css"; // Import the default Highlight.js style

const ProblemSolution = ({ problem }: { problem: IProblem | undefined }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const nodes = document.querySelectorAll("pre code");
    nodes.forEach((node) => hljs.highlightElement(node as HTMLElement));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full p-4">
        <h2 className="text-2xl font-semibold mb-2">Solutions</h2>
        <div className="w-full my-4">
          <h3 className="font-medium">Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-2">Solutions</h2>
      {problem?.problemDetails?.map((p, i) => (
        <div key={i} className="w-full my-4">
          <h3 className="font-medium">{p.language}</h3>
          <pre className="rounded-md">
            <code className="rounded-md">{p.referenceSolution}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};

export default ProblemSolution;
