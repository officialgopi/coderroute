import { DIFFICULTY, TopicStatus, SectionType } from "@prisma/client";
import z from "zod";

/* -------------------------------------------------------------------------- */
/*                                  SUBJECTS                                  */
/* -------------------------------------------------------------------------- */

const createSubjectBodySchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  order: z.number().default(0).optional(),
});

const updateSubjectParamsSchema = z.object({
  subjectId: z.string(),
});

const updateSubjectBodySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});

const getSubjectByIdParamsSchema = z.object({
  subjectId: z.string(),
});

const deleteSubjectParamsSchema = z.object({
  subjectId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                  CHAPTERS                                  */
/* -------------------------------------------------------------------------- */

const createChapterParamsSchema = z.object({
  subjectId: z.string(),
});

const createChapterBodySchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  order: z.number(),
});

const updateChapterParamsSchema = z.object({
  chapterId: z.string(),
});

const updateChapterBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});

const getChapterByIdParamsSchema = z.object({
  chapterId: z.string(),
});

const deleteChapterParamsSchema = z.object({
  chapterId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                   TOPICS                                   */
/* -------------------------------------------------------------------------- */

const createTopicParamsSchema = z.object({
  chapterId: z.string(),
});

const createTopicBodySchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),

  summary: z.string().optional(),

  difficulty: z.enum(Object.values(DIFFICULTY)).optional(),

  estimatedTime: z.number().optional(),

  order: z.number(),

  status: z.enum(Object.values(TopicStatus)).optional(),
});

const updateTopicParamsSchema = z.object({
  topicId: z.string(),
});

const updateTopicBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),

  summary: z.string().optional(),

  difficulty: z.enum(Object.values(DIFFICULTY)).optional(),

  estimatedTime: z.number().optional(),

  order: z.number().optional(),
});

const updateTopicStatusParamsSchema = z.object({
  topicId: z.string(),
});

const updateTopicStatusBodySchema = z.object({
  status: z.enum(Object.values(TopicStatus)),
});

const getTopicByIdParamsSchema = z.object({
  topicId: z.string(),
});

const deleteTopicParamsSchema = z.object({
  topicId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                  SECTIONS                                  */
/* -------------------------------------------------------------------------- */

const createSectionParamsSchema = z.object({
  topicId: z.string(),
});

const createSectionBodySchema = z.object({
  title: z.string().min(1).max(255),

  type: z.enum(Object.values(SectionType)),

  content: z.any(),

  order: z.number(),
});

const updateSectionParamsSchema = z.object({
  sectionId: z.string(),
});

const updateSectionBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),

  type: z.enum(Object.values(SectionType)).optional(),

  content: z.any().optional(),

  order: z.number().optional(),
});

const getSectionByIdParamsSchema = z.object({
  sectionId: z.string(),
});

const deleteSectionParamsSchema = z.object({
  sectionId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                               TOPIC PROBLEMS                               */
/* -------------------------------------------------------------------------- */

const addProblemToTopicParamsSchema = z.object({
  topicId: z.string(),
});

const addProblemToTopicBodySchema = z.object({
  problemId: z.string(),
});

const removeProblemFromTopicParamsSchema = z.object({
  topicId: z.string(),
  problemId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                  PROGRESS                                  */
/* -------------------------------------------------------------------------- */

const updateTopicProgressParamsSchema = z.object({
  topicId: z.string(),
});

const updateTopicProgressBodySchema = z.object({
  completed: z.boolean(),
});

const getSubjectProgressParamsSchema = z.object({
  subjectId: z.string(),
});

const getChapterProgressParamsSchema = z.object({
  chapterId: z.string(),
});

const getTopicProgressParamsSchema = z.object({
  topicId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                   SEARCH                                   */
/* -------------------------------------------------------------------------- */

const searchTopicsQuerySchema = z.object({
  q: z.string().optional(),

  page: z.coerce.number().default(1),

  limit: z.coerce.number().default(10),

  difficulty: z.enum(Object.values(DIFFICULTY)).optional(),

  status: z.enum(Object.values(TopicStatus)).optional(),
});

export {
  createSubjectBodySchema,
  updateSubjectParamsSchema,
  updateSubjectBodySchema,
  getSubjectByIdParamsSchema,
  deleteSubjectParamsSchema,
  createChapterBodySchema,
  createChapterParamsSchema,
  updateChapterBodySchema,
  updateChapterParamsSchema,
  getChapterByIdParamsSchema,
  deleteChapterParamsSchema,
  createTopicBodySchema,
  createTopicParamsSchema,
  updateTopicParamsSchema,
  updateTopicBodySchema,
  updateTopicStatusParamsSchema,
  updateTopicStatusBodySchema,
  getTopicByIdParamsSchema,
  deleteTopicParamsSchema,
  createSectionParamsSchema,
  createSectionBodySchema,
  updateSectionParamsSchema,
  updateSectionBodySchema,
  getSectionByIdParamsSchema,
  deleteSectionParamsSchema,
  addProblemToTopicParamsSchema,
  addProblemToTopicBodySchema,
  removeProblemFromTopicParamsSchema,
  updateTopicProgressParamsSchema,
  updateTopicProgressBodySchema,
  getSubjectProgressParamsSchema,
  getChapterProgressParamsSchema,
  getTopicProgressParamsSchema,
  searchTopicsQuerySchema,
};
