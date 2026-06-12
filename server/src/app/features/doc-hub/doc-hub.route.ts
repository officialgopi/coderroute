import { Router } from "express";
import { checkAdmin, isAuthenticated } from "../../middlewares/auth.middleware";

import {
  // Subjects
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,

  // Chapters
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,

  // Topics
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  updateTopicStatus,

  // Sections
  getSectionById,
  createSection,
  updateSection,
  deleteSection,

  // Topic Problems
  getTopicProblems,
  addProblemToTopic,
  removeProblemFromTopic,

  // Search
  searchTopics,

  // Progress
  getProgress,
  getSubjectProgress,
  getChapterProgress,
  getTopicProgress,
  updateTopicProgress,
} from "./doc-hub.controller";

const router = Router();
const adminRouter = Router();

/* -------------------------------------------------------------------------- */
/*                               AUTHENTICATION                               */
/* -------------------------------------------------------------------------- */

router.use(isAuthenticated);

/* -------------------------------------------------------------------------- */
/*                               PUBLIC ROUTES                                */
/* -------------------------------------------------------------------------- */

/**
 * Subjects
 */
router.get("/learn/subjects", getSubjects);
router.get("/learn/subjects/:subjectId", getSubjectById);

/**
 * Chapters
 */
router.get("/learn/chapters/:chapterId", getChapterById);

/**
 * Topics
 */
router.get("/learn/topics/:topicId", getTopicById);
router.get("/learn/topics/:topicId/problems", getTopicProblems);

/**
 * Sections
 */
router.get("/learn/sections/:sectionId", getSectionById);

/**
 * Search
 */
router.get("/learn/search", searchTopics);

/* -------------------------------------------------------------------------- */
/*                                USER PROGRESS                               */
/* -------------------------------------------------------------------------- */

router.get("/progress", getProgress);

router.get("/progress/subjects/:subjectId", getSubjectProgress);

router.get("/progress/chapters/:chapterId", getChapterProgress);

router.get("/progress/topics/:topicId", getTopicProgress);

router.patch("/progress/topics/:topicId", updateTopicProgress);

/* -------------------------------------------------------------------------- */
/*                                ADMIN ROUTES                                */
/* -------------------------------------------------------------------------- */

adminRouter.use(checkAdmin);

/**
 * Subjects
 */
adminRouter.post("/subjects", createSubject);
adminRouter.patch("/subjects/:subjectId", updateSubject);
adminRouter.delete("/subjects/:subjectId", deleteSubject);

/**
 * Chapters
 */
adminRouter.post("/subjects/:subjectId/chapters", createChapter);

adminRouter.patch("/chapters/:chapterId", updateChapter);

adminRouter.delete("/chapters/:chapterId", deleteChapter);

/**
 * Topics
 */
adminRouter.post("/chapters/:chapterId/topics", createTopic);

adminRouter.patch("/topics/:topicId", updateTopic);

adminRouter.delete("/topics/:topicId", deleteTopic);

adminRouter.patch("/topics/:topicId/status", updateTopicStatus);

/**
 * Sections
 */
adminRouter.post("/topics/:topicId/sections", createSection);

adminRouter.put("/sections/:sectionId", updateSection);

adminRouter.delete("/sections/:sectionId", deleteSection);

/**
 * Topic Problems
 */
adminRouter.post("/topics/:topicId/problems", addProblemToTopic);

adminRouter.delete(
  "/topics/:topicId/problems/:problemId",
  removeProblemFromTopic,
);

router.use("/admin", adminRouter);

export { router as dochubRouter };
