// src/routes/Router.tsx
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Store
import { useAuthStore } from "@/store/auth.store";

// Protected Route
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import RoleBasedProtectedRoute from "@/components/protected-route/RoleCheckProtectedRoute";

// Layouts
import MainLayout from "@/components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";

// Loaders
import PageLoader from "@/components/loaders/PageLoader";
import AdminPanelFunctionalitiesLayout from "@/components/layouts/AdminPanelFunctionalitiesLayout";
import CodeEditorPageLayout from "@/components/layouts/CodeEditorPageLayout";
import DocHubViewerLayout from "@/components/layouts/DocHubViewerLayout";

// PAGES
const LandingPage = lazy(() => import("../pages/LandingPage"));

// Authentication Page
const LoginPage = lazy(() => import("../pages/(auth)/Login"));

// Problems Pages
const ProblemsPage = lazy(() => import("@/pages/(problems)/ProblemsPage"));
const ProblemDescriptionPage = lazy(
  () => import("@/pages/(problems)/ProblemDescriptionPage"),
);
const ProblemEditorialPage = lazy(
  () => import("@/pages/(problems)/ProblemEditorialPage"),
);
const ProblemSolutionPage = lazy(
  () => import("@/pages/(problems)/ProblemSolutionPage"),
);
const ProblemSubmissionPage = lazy(
  () => import("@/pages/(problems)/ProblemSubmissionPage"),
);
const ProblemSubmissionDetailsPage = lazy(
  () => import("@/pages/(problems)/ProblemSubmissionDetailsPage"),
);

// Discussion Pages
const DiscussionsPage = lazy(
  () => import("@/pages/(discussions)/DiscussionsPage"),
);
const CreateDiscussionPage = lazy(
  () => import("@/pages/(discussions)/CreateDiscussionPage"),
);
const DiscussionDetailPage = lazy(
  () => import("@/pages/(discussions)/DiscussionDetailPage"),
);

// Sheets Page
const SheetsPage = lazy(() => import("@/pages/(sheets)/SheetsPage"));
const SheetsDetailsPage = lazy(
  () => import("@/pages/(sheets)/SheetsDetailsPage"),
);

// Profile Page
const UserProfilePage = lazy(() => import("@/pages/(profile)/UserProfilePage"));

// 📚 DOCHUB PAGES
const DocHubDashboardPage = lazy(
  () => import("@/pages/(doc-hub)/DocHubDashboardPage"),
);
const DocHubTopicReadingPage = lazy(
  () => import("@/pages/(doc-hub)/DocHubTopicReadingPage"),
);
const DocHubSubjectDetailsPage = lazy(
  () => import("@/pages/(doc-hub)/DocHubSubjectDetailsPage"),
);

// ADMIN PAGES
const AdminPanelPage = lazy(() => import("@/pages/(admin)/AdminPanelPage"));
const CreateProblemPage = lazy(
  () => import("@/pages/(admin)/CreateProblemPage"),
);
const ManageProblemsPage = lazy(
  () => import("@/pages/(admin)/ManageProblemsPage"),
);
const ViewMetricsPage = lazy(() => import("@/pages/(admin)/ViewMetricsPage"));

// 🛠️ ADMIN DOCHUB CURRICULUM MANAGEMENT PAGES
const ManageSubjectsPage = lazy(
  () => import("@/pages/(admin)/(doc-hub)/ManageSubjectsPage"),
);
const ManageChaptersPage = lazy(
  () => import("@/pages/(admin)/(doc-hub)/ManageChaptersPage"),
);
const ManageTopicsPage = lazy(
  () => import("@/pages/(admin)/(doc-hub)/ManageTopicsPage"),
);
const ManageSectionsPage = lazy(
  () => import("@/pages/(admin)/(doc-hub)/ManageSectionsPage"),
);
const CreateSectionPage = lazy(
  () => import("@/pages/(admin)/(doc-hub)/CreateSectionPage"),
);

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
                {/* --- STANDARD CORE CODE-SANDBOX ADMIN ROUTING BLOCKS --- */}
                <Route
                  path="/admin-panel/create-problem"
                  element={
                    <AdminPanelFunctionalitiesLayout title="Create Problem">
                      <CreateProblemPage />
                    </AdminPanelFunctionalitiesLayout>
                  }
                />
                <Route
                  path="/admin-panel/manage-problems"
                  element={<ManageProblemsPage />}
                />
                <Route path="/admin-panel/manage-problems/:problemId" />
                <Route
                  path="/admin-panel/view-metrics"
                  element={<ViewMetricsPage />}
                />

                {/* 🛠️ DOCHUB CONTENT CURRICULUM MANAGEMENT ADMIN ROUTES */}
                <Route
                  path="/admin-panel/dochub/subjects"
                  element={
                    <AdminPanelFunctionalitiesLayout title="Manage Learning Subjects">
                      <ManageSubjectsPage />
                    </AdminPanelFunctionalitiesLayout>
                  }
                />
                <Route
                  path="/admin-panel/dochub/subjects/:subjectId/chapters"
                  element={
                    <AdminPanelFunctionalitiesLayout title="Syllabus Module Chapters">
                      <ManageChaptersPage />
                    </AdminPanelFunctionalitiesLayout>
                  }
                />
                <Route
                  path="/admin-panel/dochub/chapters/:chapterId/topics"
                  element={
                    <AdminPanelFunctionalitiesLayout title="Manage Core Blog Topics">
                      <ManageTopicsPage />
                    </AdminPanelFunctionalitiesLayout>
                  }
                />
                <Route
                  path="/admin-panel/dochub/topics/:topicId/sections"
                  element={
                    <AdminPanelFunctionalitiesLayout title="Edit Dynamic Content Blocks">
                      <ManageSectionsPage />
                    </AdminPanelFunctionalitiesLayout>
                  }
                />
                <Route
                  path="/admin-panel/dochub/topics/:topicId/sections/create"
                  element={
                    <AdminPanelFunctionalitiesLayout
                      containerVariant="fluid"
                      title="Write Content Section Block"
                    >
                      <CreateSectionPage />
                    </AdminPanelFunctionalitiesLayout>
                  }
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
                  path="/problems/:slug/solutions"
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
              {/* 💎 📚 SHAREABLE DEEP-LINKED DOCHUB BLOG READER OVERLAY WORKSPACE
                  - Tracks both the parent subject, active topic ID, and optional sub-topic section tracking tokens
                  - Bypasses MainLayout to support a clean full-screen view without unwanted navbar padding spaces
              */}
              // src/routes/Router.tsx
              {/* Immersive DocHub Workspace */}
              <Route element={<DocHubViewerLayout />}>
                {/* The specific topic/section being read */}
                <Route
                  path="/learn/:subjectSlug/:topicId/:sectionId?"
                  element={<DocHubTopicReadingPage />}
                />
              </Route>
              <Route element={<MainLayout key={"main-layout"} />}>
                <Route path="/problems" element={<ProblemsPage />} />
                // src/routes/Router.tsx
                {/* 📚 PUBLIC DOCHUB PROGRESSION PATHWAY VECTORS */}
                <Route path="/learn" element={<DocHubDashboardPage />} />
                {/* 💎 NEW: The intermediate table of contents view */}
                <Route
                  path="/learn/:subjectSlug"
                  element={<DocHubSubjectDetailsPage />}
                />
                {/* The sharing-isolated, full-bleed blog reader environment */}
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
