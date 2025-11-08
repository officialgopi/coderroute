import { ArrowLeft } from "lucide-react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";

const AdminPanelFunctionalitiesLayout = ({
  title,
  children,
  backHref = "/admin-panel",
}: {
  title: string;
  children: React.ReactNode;
  backHref?: string;
}) => {
  return (
    <Container className="py-8">
      <div className="flex items-center gap-4">
        <Link to={backHref}>
          <ArrowLeft className="w-6 h-6 cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="mt-6">{children}</div>
    </Container>
  );
};

export default AdminPanelFunctionalitiesLayout;
