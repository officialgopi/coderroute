import { Plus, View } from "lucide-react";
import type { JSX } from "react";
import { FcManager } from "react-icons/fc";
import { Card, CardContent, CardHeader } from "./AdminFunctionalityCard";
import { Link } from "react-router-dom";

const AdminPanelFunctionalitisesList = () => {
  const functionalities: {
    title: string;
    description: string;
    icon: JSX.Element;
    href: string;
  }[] = [
    {
      title: "Create New Problem",
      description: "Add a new coding problem to the platform.",
      icon: <Plus />,
      href: "/admin-panel/create-problem",
    },
    {
      title: "Manage Problems",
      description: "Edit or delete existing problems.",
      icon: <FcManager />,
      href: "/admin-panel/manage-problems",
    },
    {
      title: "View Metrics",
      description: "Monitor and analyze platform performance.",
      icon: <View />,
      href: "/admin-panel/view-metrics",
    },
  ];
  return (
    <div className="w-full flex flex-wrap gap-4 py-4">
      {functionalities.map((func) => (
        <Link to={func.href} key={func.title}>
          <Card className="max-w-sm">
            <CardHeader className="text-xl font-bold">
              <div className="flex items-center gap-2 ">
                {func.icon}
                <h3 className="">{func.title}</h3>
              </div>
            </CardHeader>
            <CardContent className=" ">{func.description} </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default AdminPanelFunctionalitisesList;
