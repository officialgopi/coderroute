import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";
import ProblemsPage from "@/pages/(problems)/ProblemsPage";
import CodeEditorLayout from "@/components/layouts/CodeEditorLayout";
import CodeEditorPage from "@/pages/(problems)/CodeEditorPage";

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
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/problems" element={<ProblemsPage />} />
        </Route>
      </Route>
      <Route element={<CodeEditorLayout />}>
        <Route path="/problems/:problemId" element={<CodeEditorPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
