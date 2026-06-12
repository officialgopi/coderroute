import { ApiError, ApiResponse, AsyncHandler } from "../../utils";

import * as DocHubService from "./doc-hub.service";

import {
  createSubjectBodySchema,
  updateSubjectBodySchema,
  updateSubjectParamsSchema,
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
  updateTopicBodySchema,
  updateTopicParamsSchema,
  updateTopicStatusBodySchema,
  updateTopicStatusParamsSchema,
  getTopicByIdParamsSchema,
  deleteTopicParamsSchema,
  createSectionBodySchema,
  createSectionParamsSchema,
  updateSectionBodySchema,
  updateSectionParamsSchema,
  getSectionByIdParamsSchema,
  deleteSectionParamsSchema,
  addProblemToTopicBodySchema,
  addProblemToTopicParamsSchema,
  removeProblemFromTopicParamsSchema,
  updateTopicProgressBodySchema,
  updateTopicProgressParamsSchema,
  getSubjectProgressParamsSchema,
  getChapterProgressParamsSchema,
  getTopicProgressParamsSchema,
  searchTopicsQuerySchema,
} from "./doc-hub.schema";

/* -------------------------------------------------------------------------- */
/*                                  SUBJECTS                                  */
/* -------------------------------------------------------------------------- */
export const getSubjects = AsyncHandler(async (req, res) => {
  const subjects = await DocHubService.getSubjects();

  return new ApiResponse(
    200,
    { subjects },
    "Subjects fetched successfully",
  ).send(res);
});

export const getSubjectById = AsyncHandler(async (req, res) => {
  const { success, data } = getSubjectByIdParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const subject = await DocHubService.getSubjectById(data.subjectId);

  return new ApiResponse(200, { subject }, "Subject fetched successfully").send(
    res,
  );
});

export const createSubject = AsyncHandler(async (req, res) => {
  const { success, data } = createSubjectBodySchema.safeParse(req.body);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const subject = await DocHubService.createSubject(data);

  return new ApiResponse(201, { subject }, "Subject created successfully").send(
    res,
  );
});

export const updateSubject = AsyncHandler(async (req, res) => {
  const params = updateSubjectParamsSchema.safeParse(req.params);

  const body = updateSubjectBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const subject = await DocHubService.updateSubject(
    params.data.subjectId,
    body.data,
  );

  return new ApiResponse(200, { subject }, "Subject updated successfully").send(
    res,
  );
});

export const deleteSubject = AsyncHandler(async (req, res) => {
  const { success, data } = deleteSubjectParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  await DocHubService.deleteSubject(data.subjectId);

  return new ApiResponse(200, {}, "Subject deleted successfully").send(res);
});
/* -------------------------------------------------------------------------- */
/*                                  CHAPTERS                                  */
/* -------------------------------------------------------------------------- */
export const getChapterById = AsyncHandler(async (req, res) => {
  const { success, data } = getChapterByIdParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const chapter = await DocHubService.getChapterById(data.chapterId);

  return new ApiResponse(200, { chapter }, "Chapter fetched successfully").send(
    res,
  );
});

export const createChapter = AsyncHandler(async (req, res) => {
  const params = createChapterParamsSchema.safeParse(req.params);

  const body = createChapterBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const chapter = await DocHubService.createChapter(
    params.data.subjectId,
    body.data,
  );

  return new ApiResponse(201, { chapter }, "Chapter created successfully").send(
    res,
  );
});

export const updateChapter = AsyncHandler(async (req, res) => {
  const params = updateChapterParamsSchema.safeParse(req.params);

  const body = updateChapterBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const chapter = await DocHubService.updateChapter(
    params.data.chapterId,
    body.data,
  );

  return new ApiResponse(200, { chapter }, "Chapter updated successfully").send(
    res,
  );
});

export const deleteChapter = AsyncHandler(async (req, res) => {
  const { success, data } = deleteChapterParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  await DocHubService.deleteChapter(data.chapterId);

  return new ApiResponse(200, {}, "Chapter deleted successfully").send(res);
});
/* -------------------------------------------------------------------------- */
/*                                   TOPICS                                   */
/* -------------------------------------------------------------------------- */
export const getTopicById = AsyncHandler(async (req, res) => {
  const { success, data } = getTopicByIdParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const topic = await DocHubService.getTopicById(data.topicId);

  return new ApiResponse(200, { topic }, "Topic fetched successfully").send(
    res,
  );
});

export const createTopic = AsyncHandler(async (req, res) => {
  const params = createTopicParamsSchema.safeParse(req.params);

  const body = createTopicBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const topic = await DocHubService.createTopic(
    params.data.chapterId,
    body.data,
  );

  return new ApiResponse(201, { topic }, "Topic created successfully").send(
    res,
  );
});

export const updateTopic = AsyncHandler(async (req, res) => {
  const params = updateTopicParamsSchema.safeParse(req.params);

  const body = updateTopicBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const topic = await DocHubService.updateTopic(params.data.topicId, body.data);

  return new ApiResponse(200, { topic }, "Topic updated successfully").send(
    res,
  );
});

export const updateTopicStatus = AsyncHandler(async (req, res) => {
  const params = updateTopicStatusParamsSchema.safeParse(req.params);

  const body = updateTopicStatusBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const topic = await DocHubService.updateTopicStatus(
    params.data.topicId,
    body.data.status,
  );

  return new ApiResponse(
    200,
    { topic },
    "Topic status updated successfully",
  ).send(res);
});

export const deleteTopic = AsyncHandler(async (req, res) => {
  const { success, data } = deleteTopicParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  await DocHubService.deleteTopic(data.topicId);

  return new ApiResponse(200, {}, "Topic deleted successfully").send(res);
});
/* -------------------------------------------------------------------------- */
/*                                  SECTIONS                                  */
/* -------------------------------------------------------------------------- */
export const getSectionById = AsyncHandler(async (req, res) => {
  const { success, data } = getSectionByIdParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const section = await DocHubService.getSectionById(data.sectionId);

  return new ApiResponse(200, { section }, "Section fetched successfully").send(
    res,
  );
});

export const createSection = AsyncHandler(async (req, res) => {
  const params = createSectionParamsSchema.safeParse(req.params);

  const body = createSectionBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const section = await DocHubService.createSection(
    params.data.topicId,
    body.data,
  );

  return new ApiResponse(201, { section }, "Section created successfully").send(
    res,
  );
});

export const updateSection = AsyncHandler(async (req, res) => {
  const params = updateSectionParamsSchema.safeParse(req.params);

  const body = updateSectionBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const section = await DocHubService.updateSection(
    params.data.sectionId,
    body.data,
  );

  return new ApiResponse(200, { section }, "Section updated successfully").send(
    res,
  );
});

export const deleteSection = AsyncHandler(async (req, res) => {
  const { success, data } = deleteSectionParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  await DocHubService.deleteSection(data.sectionId);

  return new ApiResponse(200, {}, "Section deleted successfully").send(res);
});

/* -------------------------------------------------------------------------- */
/*                               TOPIC PROBLEMS                               */
/* -------------------------------------------------------------------------- */

export const getTopicProblems = AsyncHandler(async (req, res) => {
  const { success, data } = getTopicByIdParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const problems = await DocHubService.getTopicProblems(data.topicId);

  return new ApiResponse(
    200,
    { problems },
    "Topic problems fetched successfully",
  ).send(res);
});
export const addProblemToTopic = AsyncHandler(async (req, res) => {
  const params = addProblemToTopicParamsSchema.safeParse(req.params);

  const body = addProblemToTopicBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const mapping = await DocHubService.addProblemToTopic(
    params.data.topicId,
    body.data.problemId,
  );

  return new ApiResponse(201, { mapping }, "Problem linked successfully").send(
    res,
  );
});
export const removeProblemFromTopic = AsyncHandler(async (req, res) => {
  const { success, data } = removeProblemFromTopicParamsSchema.safeParse(
    req.params,
  );

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  await DocHubService.removeProblemFromTopic(data.topicId, data.problemId);

  return new ApiResponse(200, {}, "Problem removed successfully").send(res);
});

/* -------------------------------------------------------------------------- */
/*                                   SEARCH                                   */
/* -------------------------------------------------------------------------- */
export const searchTopics = AsyncHandler(async (req, res) => {
  const { success, data } = searchTopicsQuerySchema.safeParse(req.query);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const result = await DocHubService.searchTopics(data);

  return new ApiResponse(200, result, "Topics fetched successfully").send(res);
});

/* -------------------------------------------------------------------------- */
/*                                  PROGRESS                                  */
/* -------------------------------------------------------------------------- */
export const getProgress = AsyncHandler(async (req, res) => {
  const progress = await DocHubService.getProgress(req.user.id);

  return new ApiResponse(200, progress, "Progress fetched successfully").send(
    res,
  );
});

export const updateTopicProgress = AsyncHandler(async (req, res) => {
  const params = updateTopicProgressParamsSchema.safeParse(req.params);

  const body = updateTopicProgressBodySchema.safeParse(req.body);

  if (!params.success || !body.success) {
    throw new ApiError(400, "Invalid request data");
  }

  const progress = await DocHubService.updateTopicProgress(
    req.user.id,
    params.data.topicId,
    body.data.completed,
  );

  return new ApiResponse(
    200,
    { progress },
    "Progress updated successfully",
  ).send(res);
});

export const getSubjectProgress = AsyncHandler(async (req, res) => {
  const { success, data } = getSubjectProgressParamsSchema.safeParse(
    req.params,
  );

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const progress = await DocHubService.getSubjectProgress(
    req.user.id,
    data.subjectId,
  );

  return new ApiResponse(
    200,
    { progress },
    "Subject progress fetched successfully",
  ).send(res);
});

export const getChapterProgress = AsyncHandler(async (req, res) => {
  const { success, data } = getChapterProgressParamsSchema.safeParse(
    req.params,
  );

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const progress = await DocHubService.getChapterProgress(
    req.user.id,
    data.chapterId,
  );

  return new ApiResponse(
    200,
    { progress },
    "Chapter progress fetched successfully",
  ).send(res);
});

export const getTopicProgress = AsyncHandler(async (req, res) => {
  const { success, data } = getTopicProgressParamsSchema.safeParse(req.params);

  if (!success || !data) {
    throw new ApiError(400, "Invalid request data");
  }

  const progress = await DocHubService.getTopicProgress(
    req.user.id,
    data.topicId,
  );

  return new ApiResponse(
    200,
    { progress },
    "Topic progress fetched successfully",
  ).send(res);
});
