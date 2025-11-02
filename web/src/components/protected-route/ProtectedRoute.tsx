import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  authenticationPage,
}: {
  authenticationPage: boolean;
}) => {
  const { user } = useAuthStore();

  if (authenticationPage) {
    return user ? <Navigate to="/problems" /> : <Outlet />;
  } else {
    return user ? <Outlet /> : <Navigate to="/auth" />;
  }
};

export default ProtectedRoute;
