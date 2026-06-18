import { db } from "../../../db";
import { ApiError } from "../../utils";

export const getUserOrThrow = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const getProfile = async (userId: string) => {
  return getUserOrThrow(userId);
};
export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    bio?: string;
  },
) => {
  await getUserOrThrow(userId);

  return db.user.update({
    where: {
      id: userId,
    },
    data,
  });
};
export const updateAvatar = async (userId: string, avatarUrl: string) => {
  await getUserOrThrow(userId);

  return db.user.update({
    where: {
      id: userId,
    },
    data: {
      avatar: avatarUrl,
    },
  });
};
export const getMetrics = async (userId: string) => {
  const stats = await db.dashboardStats.findUnique({
    where: {
      userId,
    },
  });

  const submissions = await db.submission.findMany({
    where: {
      userId,
    },
    select: {
      language: true,
    },
  });

  const languageMap = submissions.reduce(
    (acc, item) => {
      acc[item.language] = (acc[item.language] || 0) + 1;

      return acc;
    },
    {} as Record<string, number>,
  );

  const total = submissions.length || 1;

  const languageTelemetry = Object.entries(languageMap).map(
    ([language, count]) => ({
      language,
      percentage: (count / total) * 100,
    }),
  );

  return {
    solvedProblemsCount: stats?.problemsSolved ?? 0,

    currentStreak: 0,

    longestStreak: 0,

    points: stats?.problemsSolved ? stats.problemsSolved * 10 : 0,

    languageTelemetry,
  };
};

export const getSolvedProblems = async (userId: string) => {
  const solved = await db.problemSolved.findMany({
    where: {
      userId,
    },

    include: {
      problem: true,
    },
  });

  return {
    total: solved.length,

    easy: solved.filter((p) => p.problem.difficulty === "EASY").length,

    medium: solved.filter((p) => p.problem.difficulty === "MEDIUM").length,

    hard: solved.filter((p) => p.problem.difficulty === "HARD").length,

    problems: solved.map((p) => p.problem),
  };
};
export const getUserSubmissions = async (userId: string, query: any) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  return db.submission.findMany({
    where: {
      userId,

      ...(query.status && {
        status: query.status,
      }),

      ...(query.language && {
        language: query.language,
      }),
    },

    include: {
      problem: true,
    },

    skip: (page - 1) * limit,

    take: limit,

    orderBy: {
      createdAt: "desc",
    },
  });
};
export const getActivityHeatmap = async (userId: string) => {
  return db.userActivity.findMany({
    where: {
      userId,
    },

    orderBy: {
      date: "asc",
    },
  });
};
export const getPublicProfile = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },

    include: {
      dashboardStats: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
