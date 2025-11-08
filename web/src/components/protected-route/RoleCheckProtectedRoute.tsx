import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const RoleBasedProtectedRoute = ({
  fallback = () => {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-medium">
          You do not have permission to access this page.
        </p>
      </div>
    );
  },
}: {
  fallback?: () => React.ReactNode;
}) => {
  const Fallback = fallback;
  const { user } = useAuthStore();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to={"/login"} replace />;
  }
  if (user.role?.toLowerCase() === "user") {
    toast.error("You do not have permission to access this page.");
    return <Fallback />;
  } else {
    return <Outlet />;
  }
};

export default RoleBasedProtectedRoute;
