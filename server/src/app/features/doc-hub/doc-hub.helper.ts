import { db } from "../../../db";
import { ApiError } from "../../utils";

/* -------------------------------------------------------------------------- */
/*                               ENTITY HELPERS                               */
/* -------------------------------------------------------------------------- */

export const getSubjectOrThrow = async (subjectId: string) => {
  const subject = await db.subject.findFirst({
    where: {
      id: subjectId,
      deletedAt: null,
    },
  });

  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }

  return subject;
};

export const getChapterOrThrow = async (chapterId: string) => {
  const chapter = await db.chapter.findFirst({
    where: {
      id: chapterId,
      deletedAt: null,
    },
  });

  if (!chapter) {
    throw new ApiError(404, "Chapter not found");
  }

  return chapter;
};

export const getTopicOrThrow = async (topicId: string) => {
  const topic = await db.topic.findFirst({
    where: {
      id: topicId,
      deletedAt: null,
    },
  });

  if (!topic) {
    throw new ApiError(404, "Topic not found");
  }

  return topic;
};

export const getSectionOrThrow = async (sectionId: string) => {
  const section = await db.topicSection.findFirst({
    where: {
      id: sectionId,
      deletedAt: null,
    },
  });

  if (!section) {
    throw new ApiError(404, "Section not found");
  }

  return section;
};

/* -------------------------------------------------------------------------- */
/*                              SLUG VALIDATORS                               */
/* -------------------------------------------------------------------------- */

export const validateSubjectSlug = async (slug: string, subjectId?: string) => {
  const subject = await db.subject.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  });

  if (subject && subject.id !== subjectId) {
    throw new ApiError(409, "Subject with this slug already exists");
  }
};

export const validateChapterSlug = async (
  subjectId: string,
  slug: string,
  chapterId?: string,
) => {
  const chapter = await db.chapter.findFirst({
    where: {
      subjectId,
      slug,
      deletedAt: null,
    },
  });

  if (chapter && chapter.id !== chapterId) {
    throw new ApiError(409, "Chapter with this slug already exists");
  }
};

export const validateTopicSlug = async (
  chapterId: string,
  slug: string,
  topicId?: string,
) => {
  const topic = await db.topic.findFirst({
    where: {
      chapterId,
      slug,
      deletedAt: null,
    },
  });

  if (topic && topic.id !== topicId) {
    throw new ApiError(409, "Topic with this slug already exists");
  }
};

/* -------------------------------------------------------------------------- */
/*                           TOPIC PROBLEM HELPERS                            */
/* -------------------------------------------------------------------------- */

export const getTopicProblemOrThrow = async (
  topicId: string,
  problemId: string,
) => {
  const mapping = await db.topicProblem.findFirst({
    where: {
      topicId,
      problemId,
    },
  });

  if (!mapping) {
    throw new ApiError(404, "Topic problem mapping not found");
  }

  return mapping;
};

export const validateProblemExists = async (problemId: string) => {
  const problem = await db.problem.findUnique({
    where: {
      id: problemId,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  return problem;
};

/* -------------------------------------------------------------------------- */
/*                            PROGRESS HELPERS                                */
/* -------------------------------------------------------------------------- */

export const getTopicProgressOrThrow = async (
  userId: string,
  topicId: string,
) => {
  const progress = await db.userTopicProgress.findUnique({
    where: {
      userId_topicId: {
        userId,
        topicId,
      },
    },
  });

  if (!progress) {
    throw new ApiError(404, "Progress not found");
  }

  return progress;
};
