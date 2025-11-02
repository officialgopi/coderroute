import { ProblemSearchModal } from "@/components/problems/ProblemSearchModal";
import { ProblemsList } from "@/components/problems/ProblemsList";
import type { IProblem } from "@/store/problem.store";
const ProblemsPage = () => {
  const problems: IProblem[] = [
    {
      id: "1",
      title: "Two Sum",
      description: "",
      difficulty: "EASY",
      tags: ["Array", "HashMap"],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "Add Two Numbers",
      description: "",
      difficulty: "MEDIUM",
      tags: ["Linked List", "Math"],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      title: "Median of Two Sorted Arrays",
      description: "",
      difficulty: "HARD",
      tags: ["Array", "Binary Search"],
      createdAt: "",
      updatedAt: "",
    },
  ];

  return (
    <div className="w-full    ">
      <div className=" mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
          <h1 className="text-2xl font-semibold  ">Problems</h1>
          <ProblemSearchModal problems={problems} />
        </div>

        <ProblemsList problems={problems} />
      </div>
    </div>
  );
};

export default ProblemsPage;
