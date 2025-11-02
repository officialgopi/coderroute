import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//Store
import { useAuthStore } from "@/store/auth.store";

//Protected Route
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
//Layouts
import MainLayout from "@/components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import CodeEditorLayout from "@/components/layouts/CodeEditorLayout";

//Loaders
import PageLoader from "@/components/loaders/PageLoader";

// PAGES
const LandingPage = lazy(() => import("../pages/LandingPage"));

//Authentucatin Page
const LoginPage = lazy(() => import("../pages/(auth)/Login"));

//Problems Pages
const ProblemsPage = lazy(() => import("@/pages/(problems)/ProblemsPage"));
const CodeEditorPage = lazy(() => import("@/pages/(problems)/CodeEditorPage"));

//Discussion Pages
const DiscussionsPage = lazy(
  () => import("@/pages/(discussions)/DiscussionsPage")
);
const CreateDiscussionPage = lazy(
  () => import("@/pages/(discussions)/CreateDiscussionPage")
);

//Sheets Page
const SheetsPage = lazy(() => import("@/pages/(sheets)/SheetsPage"));

//Profile Page
const UserProfilePage = lazy(() => import("@/pages/(profile)/UserProfilePage"));

const Router = () => {
  const { isAuthLoading, getMe, user } = useAuthStore();

  useEffect(() => {
    getMe().then(() => {
      console.log(user);
    });
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {isAuthLoading && <Route path="*" element={<PageLoader />} />}
        {!isAuthLoading && (
          <>
            <Route element={<ProtectedRoute authenticationPage={true} />}>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute authenticationPage={false} />}>
              <Route element={<MainLayout />}>
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="/discussions" element={<DiscussionsPage />} />
                <Route
                  path="/discussions/create"
                  element={<CreateDiscussionPage />}
                />
                <Route path="/sheets" element={<SheetsPage />} />
              </Route>

              <Route element={<CodeEditorLayout />}>
                <Route
                  path="/problems/:problemId"
                  element={<CodeEditorPage />}
                />
              </Route>
              <Route element={<MainLayout />}>
                <Route path="/:username" element={<UserProfilePage />} />
              </Route>
            </Route>
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default Router;
