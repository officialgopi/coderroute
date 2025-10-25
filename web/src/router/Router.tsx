import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";

// PAGES
const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/(auth)/Login"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
};

export default Router;
