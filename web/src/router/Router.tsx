import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//Store
import { useAuthStore } from "@/store/auth.store";

//Protected Route
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import RoleBasedProtectedRoute from "@/components/protected-route/RoleCheckProtectedRoute";

//Layouts
import MainLayout from "@/components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";

//Loaders
import PageLoader from "@/components/loaders/PageLoader";
import AdminPanelFunctionalitiesLayout from "@/components/layouts/AdminPanelFunctionalitiesLayout";
import CodeEditorPageLayout from "@/components/layouts/CodeEditorPageLayout";

// PAGES
const LandingPage = lazy(() => import("../pages/LandingPage"));

//Authentucatin Page
const LoginPage = lazy(() => import("../pages/(auth)/Login"));

//Problems Pages
const ProblemsPage = lazy(() => import("@/pages/(problems)/ProblemsPage"));
const ProblemDescriptionPage = lazy(
  () => import("@/pages/(problems)/ProblemDescriptionPage")
);
const ProblemEditorialPage = lazy(
  () => import("@/pages/(problems)/ProblemEditorialPage")
);
const ProblemSolutionPage = lazy(
  () => import("@/pages/(problems)/ProblemSolutionPage")
);
const ProblemSubmissionPage = lazy(
  () => import("@/pages/(problems)/ProblemSubmissionPage")
);
const ProblemSubmissionDetailsPage = lazy(
  () => import("@/pages/(problems)/ProblemSubmissionDetailsPage")
);

//Discussion Pages
const DiscussionsPage = lazy(
  () => import("@/pages/(discussions)/DiscussionsPage")
);
const CreateDiscussionPage = lazy(
  () => import("@/pages/(discussions)/CreateDiscussionPage")
);
const DiscussionDetailPage = lazy(
  () => import("@/pages/(discussions)/DiscussionDetailPage")
);

//Sheets Page
const SheetsPage = lazy(() => import("@/pages/(sheets)/SheetsPage"));
const SheetsDetailsPage = lazy(
  () => import("@/pages/(sheets)/SheetsDetailsPage")
);

//Profile Page
const UserProfilePage = lazy(() => import("@/pages/(profile)/UserProfilePage"));

//ADMIN PAGES
const AdminPanelPage = lazy(() => import("@/pages/(admin)/AdminPanelPage"));
const CreateProblemPage = lazy(
  () => import("@/pages/(admin)/CreateProblemPage")
);
const ManageProblemsPage = lazy(
  () => import("@/pages/(admin)/ManageProblemsPage")
);
const ViewMetricsPage = lazy(() => import("@/pages/(admin)/ViewMetricsPage"));
const Router = () => {
  const { isAuthLoading, getMe } = useAuthStore();

  useEffect(() => {
    getMe();
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
              <Route
                element={
                  <RoleBasedProtectedRoute
                    fallback={() => (
                      <MainLayout key={"main-layout"}>
                        <div className="flex justify-center items-center">
                          <p className="text-lg font-medium">
                            You do not have permission to access this page.
                          </p>
                        </div>
                      </MainLayout>
                    )}
                  />
                }
              >
                <Route
                  path="/admin-panel/create-problem"
                  element={
                    <AdminPanelFunctionalitiesLayout title="Create Problem">
                      <CreateProblemPage />
                    </AdminPanelFunctionalitiesLayout>
                  }
                />
                <Route
                  path="/admin-panel/manage-problem"
                  element={<ManageProblemsPage />}
                />
                <Route path="/admin-panel/manage-problem/:problemId" />
                <Route
                  path="/admin-panel/view-metrics"
                  element={<ViewMetricsPage />}
                />
              </Route>
              <Route element={<CodeEditorPageLayout key={"main-layout"} />}>
                <Route
                  path="/problems/:slug"
                  element={<Navigate to={`description`} />}
                />
                <Route
                  path="/problems/:slug/description"
                  element={<ProblemDescriptionPage key={"code-editor"} />}
                />
                <Route
                  path="/problems/:slug/editorial"
                  element={<ProblemEditorialPage key={"code-editor"} />}
                />
                <Route
                  path="/problems/:slug/solution"
                  element={<ProblemSolutionPage key={"code-editor"} />}
                />
                <Route
                  path="/problems/:slug/submissions"
                  element={<ProblemSubmissionPage key={"code-editor"} />}
                />
                <Route
                  path="/problems/:slug/submissions/:submissionId"
                  element={<ProblemSubmissionDetailsPage key={"code-editor"} />}
                />
              </Route>
              <Route element={<MainLayout key={"main-layout"} />}>
                <Route path="/problems" element={<ProblemsPage />} />

                <Route path="/discussions" element={<DiscussionsPage />} />
                <Route
                  path="/discussions/create"
                  element={<CreateDiscussionPage />}
                />
                <Route
                  path="/discussions/:discussionId"
                  element={<DiscussionDetailPage />}
                />
                <Route path="/sheets" element={<SheetsPage />} />
                <Route
                  path="/sheets/:sheetId"
                  element={<SheetsDetailsPage />}
                />
                <Route element={<RoleBasedProtectedRoute />}>
                  <Route path="/admin-panel" element={<AdminPanelPage />} />
                </Route>

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
