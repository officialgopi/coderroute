import { TopicStatus } from "@prisma/client";
import { db } from "../../../db";
import { ApiError } from "../../utils";

import {
  getSubjectOrThrow,
  getChapterOrThrow,
  getTopicOrThrow,
  getSectionOrThrow,
  validateSubjectSlug,
  validateChapterSlug,
  validateTopicSlug,
  validateProblemExists,
  getTopicProblemOrThrow,
} from "./doc-hub.helper";

/* -------------------------------------------------------------------------- */
/*                                  SUBJECTS                                  */
/* -------------------------------------------------------------------------- */
export const createSubject = async (data: any) => {
  await validateSubjectSlug(data.slug);

  return db.subject.create({
    data: {
      ...data,
      order: data.order ?? 0,
    },
  });
};

export const getSubjects = async () => {
  return db.subject.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      _count: {
        select: {
          chapters: true,
        },
      },
    },
  });
};

export const getSubjectById = async (subjectId: string) => {
  await getSubjectOrThrow(subjectId);

  return db.subject.findFirst({
    where: {
      id: subjectId,
      deletedAt: null,
    },
    include: {
      chapters: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const updateSubject = async (subjectId: string, data: any) => {
  const subject = await getSubjectOrThrow(subjectId);

  if (data.slug) {
    await validateSubjectSlug(data.slug, subject.id);
  }

  return db.subject.update({
    where: {
      id: subjectId,
    },
    data,
  });
};

export const deleteSubject = async (subjectId: string) => {
  await getSubjectOrThrow(subjectId);

  return db.subject.update({
    where: {
      id: subjectId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
/* -------------------------------------------------------------------------- */
/*                                  CHAPTERS                                  */
/* -------------------------------------------------------------------------- */

export const createChapter = async (subjectId: string, data: any) => {
  await getSubjectOrThrow(subjectId);

  await validateChapterSlug(subjectId, data.slug);

  return db.chapter.create({
    data: {
      ...data,
      subjectId,
    },
  });
};

export const getChapterById = async (chapterId: string) => {
  await getChapterOrThrow(chapterId);

  return db.chapter.findFirst({
    where: {
      id: chapterId,
      deletedAt: null,
    },
    include: {
      topics: {
        where: {
          deletedAt: null,
          status: TopicStatus.PUBLISHED,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const updateChapter = async (chapterId: string, data: any) => {
  const chapter = await getChapterOrThrow(chapterId);

  if (data.slug) {
    await validateChapterSlug(chapter.subjectId, data.slug, chapter.id);
  }

  return db.chapter.update({
    where: {
      id: chapterId,
    },
    data,
  });
};

export const deleteChapter = async (chapterId: string) => {
  await getChapterOrThrow(chapterId);

  return db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                   TOPICS                                   */
/* -------------------------------------------------------------------------- */
export const createTopic = async (chapterId: string, data: any) => {
  await getChapterOrThrow(chapterId);

  await validateTopicSlug(chapterId, data.slug);

  return db.topic.create({
    data: {
      ...data,
      chapterId,
      status: TopicStatus.DRAFT,
    },
  });
};

export const getTopicById = async (topicId: string) => {
  await getTopicOrThrow(topicId);

  return db.topic.findFirst({
    where: {
      id: topicId,
      deletedAt: null,
    },
    include: {
      chapter: true,
      sections: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          order: "asc",
        },
      },
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });
};

export const updateTopic = async (topicId: string, data: any) => {
  const topic = await getTopicOrThrow(topicId);

  if (data.slug) {
    await validateTopicSlug(topic.chapterId, data.slug, topic.id);
  }

  return db.topic.update({
    where: {
      id: topicId,
    },
    data,
  });
};

export const updateTopicStatus = async (
  topicId: string,
  status: TopicStatus,
) => {
  await getTopicOrThrow(topicId);

  return db.topic.update({
    where: {
      id: topicId,
    },
    data: {
      status,
    },
  });
};

export const deleteTopic = async (topicId: string) => {
  await getTopicOrThrow(topicId);

  return db.topic.update({
    where: {
      id: topicId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                  SECTIONS                                  */
/* -------------------------------------------------------------------------- */
export const createSection = async (topicId: string, data: any) => {
  await getTopicOrThrow(topicId);

  return db.topicSection.create({
    data: {
      ...data,
      topicId,
    },
  });
};

export const getSectionById = async (sectionId: string) => {
  return getSectionOrThrow(sectionId);
};

export const updateSection = async (sectionId: string, data: any) => {
  await getSectionOrThrow(sectionId);

  return db.topicSection.update({
    where: {
      id: sectionId,
    },
    data,
  });
};

export const deleteSection = async (sectionId: string) => {
  await getSectionOrThrow(sectionId);

  return db.topicSection.update({
    where: {
      id: sectionId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                               TOPIC PROBLEMS                               */
/* -------------------------------------------------------------------------- */
export const getTopicProblems = async (topicId: string) => {
  await getTopicOrThrow(topicId);

  return db.topicProblem.findMany({
    where: {
      topicId,
    },
    include: {
      problem: true,
    },
  });
};

export const addProblemToTopic = async (topicId: string, problemId: string) => {
  await getTopicOrThrow(topicId);

  await validateProblemExists(problemId);

  const existing = await db.topicProblem.findFirst({
    where: {
      topicId,
      problemId,
    },
  });

  if (existing) {
    throw new ApiError(409, "Problem already linked");
  }

  return db.topicProblem.create({
    data: {
      topicId,
      problemId,
    },
  });
};

export const removeProblemFromTopic = async (
  topicId: string,
  problemId: string,
) => {
  const mapping = await getTopicProblemOrThrow(topicId, problemId);

  return db.topicProblem.delete({
    where: {
      id: mapping.id,
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                   SEARCH                                   */
/* -------------------------------------------------------------------------- */

export const searchTopics = async ({
  q,
  page,
  limit,
  difficulty,
  status,
}: any) => {
  const skip = (page - 1) * limit;

  return db.topic.findMany({
    where: {
      deletedAt: null,

      ...(q && {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            summary: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(difficulty && { difficulty }),
      ...(status && { status }),
    },

    skip,
    take: limit,

    orderBy: {
      order: "asc",
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                  PROGRESS                                  */
/* -------------------------------------------------------------------------- */
export const getProgress = async (userId: string) => {
  const completed = await db.userTopicProgress.count({
    where: {
      userId,
      completed: true,
    },
  });

  const total = await db.topic.count({
    where: {
      deletedAt: null,
      status: TopicStatus.PUBLISHED,
    },
  });

  return {
    completed,
    total,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};

export const getTopicProgress = async (userId: string, topicId: string) => {
  return db.userTopicProgress.findUnique({
    where: {
      userId_topicId: {
        userId,
        topicId,
      },
    },
  });
};

export const updateTopicProgress = async (
  userId: string,
  topicId: string,
  completed: boolean,
) => {
  await getTopicOrThrow(topicId);

  return db.userTopicProgress.upsert({
    where: {
      userId_topicId: {
        userId,
        topicId,
      },
    },
    update: {
      completed,
      completedAt: completed ? new Date() : null,
      lastViewedAt: new Date(),
    },
    create: {
      userId,
      topicId,
      completed,
      completedAt: completed ? new Date() : null,
      lastViewedAt: new Date(),
    },
  });
};

export const getChapterProgress = async (userId: string, chapterId: string) => {
  await getChapterOrThrow(chapterId);

  const totalTopics = await db.topic.count({
    where: {
      chapterId,
      deletedAt: null,
      status: TopicStatus.PUBLISHED,
    },
  });

  const completedTopics = await db.userTopicProgress.count({
    where: {
      userId,
      completed: true,
      topic: {
        chapterId,
        deletedAt: null,
      },
    },
  });

  return {
    totalTopics,
    completedTopics,
    percentage:
      totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100),
  };
};
export const getSubjectProgress = async (userId: string, subjectId: string) => {
  await getSubjectOrThrow(subjectId);

  const totalTopics = await db.topic.count({
    where: {
      deletedAt: null,
      chapter: {
        subjectId,
        deletedAt: null,
      },
      status: TopicStatus.PUBLISHED,
    },
  });

  const completedTopics = await db.userTopicProgress.count({
    where: {
      userId,
      completed: true,
      topic: {
        deletedAt: null,
        chapter: {
          subjectId,
          deletedAt: null,
        },
      },
    },
  });

  return {
    totalTopics,
    completedTopics,
    percentage:
      totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100),
  };
};
