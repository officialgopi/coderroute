import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const RoleBasedProtectedRoute = ({
  fallback = "/problems",
}: {
  fallback?: string;
}) => {
  const { user } = useAuthStore();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to={"/login"} replace />;
  }
  if (user.role?.toLowerCase() === "user") {
    toast.error("You do not have permission to access this page.");
    return <Navigate to={fallback} replace />;
  } else {
    return <Outlet />;
  }
};

export default RoleBasedProtectedRoute;
