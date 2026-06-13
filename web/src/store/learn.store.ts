// src/stores/learn.store.ts
import { create } from "zustand";
import { toast } from "sonner";

import { apiCallHandler } from "../utils/api-call-handler.util";
import type { IProblem } from "./problem.store";

// 💎 SYNCED WITH PRISMA OBJECT TYPING SCHEMAS
export type TopicStatus = "DRAFT" | "PUBLISHED";

export type SectionType =
  | "THEORY"
  | "EXAMPLE"
  | "ANALOGY"
  | "DIAGRAM"
  | "INTERVIEW"
  | "REVISION";

export interface ITopicSection {
  id: string;
  topicId: string;
  title: string;
  type: SectionType;
  content: any; // Dynamic content payloads matching schema expectations
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITopic {
  id: string;
  chapterId: string;
  title: string;
  slug: string;
  summary?: string;
  difficulty?: string;
  estimatedTime?: number;
  status: TopicStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
  sections?: ITopicSection[];
  problems?: IProblem[];
}

export interface IChapter {
  id: string;
  subjectId: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  topics?: ITopic[];
}

export interface ISubject {
  id: string;
  name: string;
  slug: string;
  order: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  chapters?: IChapter[];
}

export interface ITopicProgress {
  completed: boolean;
  completedAt?: string;
  lastViewedAt?: string;
}

interface LearnState {
  isSubjectsLoading: boolean;
  isTopicLoading: boolean;
  isSectionLoading: boolean;

  subjects: Record<string, ISubject>;
  chapters: Record<string, IChapter>;
  topics: Record<string, ITopic>;
  sections: Record<string, ITopicSection>;
  topicProblems: Record<string, IProblem[]>;
  progress: Record<string, ITopicProgress>;

  // Public/User Reading Actions
  getSubjects: () => Promise<void>;
  getSubjectById: (subjectId: string) => Promise<ISubject | undefined>;
  getChapterById: (chapterId: string) => Promise<IChapter | undefined>;
  getTopicById: (topicId: string) => Promise<ITopic | undefined>;
  getSectionById: (sectionId: string) => Promise<ITopicSection | undefined>;
  getTopicProblems: (topicId: string) => Promise<IProblem[]>;
  getProgress: () => Promise<void>;
  getSubjectProgress: (subjectId: string) => Promise<any>;
  getChapterProgress: (chapterId: string) => Promise<any>;
  getTopicProgress: (topicId: string) => Promise<ITopicProgress | undefined>;
  updateTopicProgress: (topicId: string, completed: boolean) => Promise<void>;
  clearCache: () => void;
  updateTopicStatus: (
    chapterId: string,
    topicId: string,
    status: TopicStatus,
  ) => Promise<boolean>;

  // 💎 ADMIN ROUTING ACTIONS (CONNECTED TO EXPRESS /ADMIN PRE_MOUNTS)
  createSubject: (payload: {
    name: string;
    slug: string;
    description: string | null;
    order: number;
  }) => Promise<boolean>;
  deleteSubject: (subjectId: string) => Promise<boolean>;
  createChapter: (
    subjectId: string,
    payload: { title: string; slug: string; order: number },
  ) => Promise<boolean>;
  deleteChapter: (chapterId: string) => Promise<boolean>;
  createTopic: (
    chapterId: string,
    payload: {
      title: string;
      slug: string;
      summary: string | null;
      estimatedTime: number;
      status: TopicStatus;
      order: number;
    },
  ) => Promise<boolean>;
  deleteTopic: (topicId: string) => Promise<boolean>;
  createSection: (
    topicId: string,
    payload: { title: string; order: number; markdownContent: string },
  ) => Promise<boolean>;
  deleteSection: (topicId: string, sectionId: string) => Promise<boolean>;
  updateSubject: (
    subjectId: string,
    payload: {
      name?: string;
      slug?: string;
      description?: string | null;
      order?: number;
    },
  ) => Promise<boolean>;
  updateChapter: (
    chapterId: string,
    payload: { title?: string; slug?: string; order?: number },
  ) => Promise<boolean>;
  updateSection: (
    topicId: string,
    sectionId: string,
    payload: {
      title?: string;
      type?: SectionType;
      order?: number;
      content?: any;
    },
  ) => Promise<boolean>;
}

export const useLearnStore = create<LearnState>((set, get) => ({
  isSubjectsLoading: false,
  isTopicLoading: false,
  isSectionLoading: false,

  subjects: {},
  chapters: {},
  topics: {},
  sections: {},
  topicProblems: {},
  progress: {},

  /* -------------------------------------------------------------------------- */
  /*                            PUBLIC READING INFRA                            */
  /* -------------------------------------------------------------------------- */

  getSubjects: async () => {
    if (Object.keys(get().subjects).length > 0) return;
    set({ isSubjectsLoading: true });
    try {
      const response = await apiCallHandler<
        undefined,
        { subjects: ISubject[] }
      >("/doc-hub/learn/subjects", "GET", undefined);
      if (response.success && response.data) {
        const subjects = response.data.subjects.reduce(
          (acc, subject) => {
            acc[subject.id] = subject;
            return acc;
          },
          {} as Record<string, ISubject>,
        );
        set({ subjects });
      }
    } catch {
      toast.error("Failed to fetch subjects");
    } finally {
      set({ isSubjectsLoading: false });
    }
  },

  getSubjectById: async (subjectId: string) => {
    const cached = get().subjects[subjectId];
    if (cached?.chapters && cached.chapters.length > 0) return cached;
    try {
      const response = await apiCallHandler<undefined, { subject: ISubject }>(
        `/doc-hub/learn/subjects/${subjectId}`,
        "GET",
        undefined,
      );
      if (response.success && response.data) {
        const subject = response.data.subject;
        const nextChapters = { ...get().chapters };
        subject.chapters?.forEach((chapter) => {
          nextChapters[chapter.id] = chapter;
        });
        set({
          subjects: { ...get().subjects, [subject.id]: subject },
          chapters: nextChapters,
        });
        return subject;
      }
    } catch {
      toast.error("Failed to fetch subject details");
    }
  },

  getChapterById: async (chapterId: string) => {
    const cached = get().chapters[chapterId];
    if (cached?.topics && cached.topics.length > 0) return cached;
    try {
      const response = await apiCallHandler<undefined, { chapter: IChapter }>(
        `/doc-hub/learn/chapters/${chapterId}`,
        "GET",
        undefined,
      );
      if (response.success && response.data) {
        const chapter = response.data.chapter;
        const nextTopics = { ...get().topics };
        chapter.topics?.forEach((topic) => {
          nextTopics[topic.id] = topic;
        });
        set({
          chapters: { ...get().chapters, [chapter.id]: chapter },
          topics: nextTopics,
        });
        return chapter;
      }
    } catch {
      toast.error("Failed to fetch chapter details");
    }
  },

  getTopicById: async (topicId: string) => {
    const cached = get().topics[topicId];
    if (cached?.sections && cached.sections.length > 0) return cached;
    set({ isTopicLoading: true });
    try {
      const response = await apiCallHandler<undefined, { topic: ITopic }>(
        `/doc-hub/learn/topics/${topicId}`,
        "GET",
        undefined,
      );
      if (response.success && response.data) {
        const topic = response.data.topic;
        const nextSections = { ...get().sections };
        topic.sections?.forEach((section) => {
          nextSections[section.id] = section;
        });
        set({
          topics: { ...get().topics, [topic.id]: topic },
          sections: nextSections,
        });
        return topic;
      }
    } catch {
      toast.error("Failed to fetch topic modules");
    } finally {
      set({ isTopicLoading: false });
    }
  },

  getSectionById: async (sectionId: string) => {
    const cached = get().sections[sectionId];
    if (cached) return cached;
    set({ isSectionLoading: true });
    try {
      const response = await apiCallHandler<
        undefined,
        { section: ITopicSection }
      >(`/doc-hub/learn/sections/${sectionId}`, "GET", undefined);
      if (response.success && response.data) {
        const section = response.data.section;
        set({ sections: { ...get().sections, [section.id]: section } });
        return section;
      }
    } catch {
      toast.error("Failed to fetch content section block");
    } finally {
      set({ isSectionLoading: false });
    }
  },

  getTopicProblems: async (topicId: string) => {
    const cached = get().topicProblems[topicId];
    if (cached) return cached;
    try {
      const response = await apiCallHandler<
        undefined,
        { problems: IProblem[] }
      >(`/doc-hub/learn/topics/${topicId}/problems`, "GET", undefined);
      if (response.success && response.data) {
        const problems = response.data.problems;
        set({ topicProblems: { ...get().topicProblems, [topicId]: problems } });
        return problems;
      }
    } catch {
      toast.error("Failed to fetch linked practice problems");
    }
    return [];
  },

  /* -------------------------------------------------------------------------- */
  /*                            USER TELEMETRY PROGRESS                         */
  /* -------------------------------------------------------------------------- */

  getProgress: async () => {
    try {
      const response = await apiCallHandler<
        undefined,
        { progress: Record<string, ITopicProgress> }
      >("/doc-hub/progress", "GET", undefined);
      if (response.success && response.data) {
        set({ progress: response.data.progress });
      }
    } catch {
      toast.error("Failed to load user course progress analytics");
    }
  },

  getSubjectProgress: async (subjectId: string) => {
    try {
      const response = await apiCallHandler(
        `/doc-hub/progress/subjects/${subjectId}`,
        "GET",
        undefined,
      );
      if (response.success && response.data) return response.data;
    } catch {
      toast.error("Failed to load subject progress tracker");
    }
  },

  getChapterProgress: async (chapterId: string) => {
    try {
      const response = await apiCallHandler(
        `/doc-hub/progress/chapters/${chapterId}`,
        "GET",
        undefined,
      );
      if (response.success && response.data) return response.data;
    } catch {
      toast.error("Failed to load chapter progress tracker");
    }
  },

  getTopicProgress: async (topicId: string) => {
    const cached = get().progress[topicId];
    if (cached) return cached;
    try {
      const response = await apiCallHandler<
        undefined,
        { progress: ITopicProgress }
      >(`/doc-hub/progress/topics/${topicId}`, "GET", undefined);
      if (response.success && response.data) {
        const progress = response.data.progress;
        set({ progress: { ...get().progress, [topicId]: progress } });
        return progress;
      }
    } catch {
      toast.error("Failed to load topic progress flag");
    }
  },

  updateTopicProgress: async (topicId: string, completed: boolean) => {
    try {
      const response = await apiCallHandler<
        { completed: boolean },
        { progress?: ITopicProgress }
      >(`/doc-hub/progress/topics/${topicId}`, "PATCH", { completed });
      if (response.success) {
        const now = new Date().toISOString();
        set({
          progress: {
            ...get().progress,
            [topicId]: {
              completed,
              completedAt: completed ? now : undefined,
              lastViewedAt: now,
            },
          },
        });
        toast.success(completed ? "Topic completed" : "Progress sync updated");
      }
    } catch {
      toast.error("Failed to save progress completion matrix");
    }
  },

  clearCache: () => {
    set({
      subjects: {},
      chapters: {},
      topics: {},
      sections: {},
      topicProblems: {},
      progress: {},
    });
  },

  /* -------------------------------------------------------------------------- */
  /*                           ADMINISTRATIVE PANEL MUTATIONS                    */
  /* -------------------------------------------------------------------------- */

  createSubject: async (payload) => {
    try {
      const response = await apiCallHandler<any, { subject: ISubject }>(
        "/doc-hub/admin/subjects",
        "POST",
        payload,
      );
      if (response.success && response.data) {
        const newSubject = response.data.subject;
        set({ subjects: { ...get().subjects, [newSubject.id]: newSubject } });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },

  deleteSubject: async (subjectId) => {
    try {
      const response = await apiCallHandler<undefined, undefined>(
        `/doc-hub/admin/subjects/${subjectId}`,
        "DELETE",
        undefined,
      );
      if (response.success) {
        const nextSubjects = { ...get().subjects };
        delete nextSubjects[subjectId];
        set({ subjects: nextSubjects });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },

  createChapter: async (subjectId, payload) => {
    try {
      const response = await apiCallHandler<any, { chapter: IChapter }>(
        `/doc-hub/admin/subjects/${subjectId}/chapters`,
        "POST",
        payload,
      );
      if (response.success && response.data) {
        const newChapter = response.data.chapter;
        const nextChapters = { ...get().chapters, [newChapter.id]: newChapter };

        const nextSubjects = { ...get().subjects };
        if (nextSubjects[subjectId]) {
          const existingChapters = nextSubjects[subjectId].chapters || [];
          nextSubjects[subjectId] = {
            ...nextSubjects[subjectId],
            chapters: [...existingChapters, newChapter].sort(
              (a, b) => (a.order || 0) - (b.order || 0),
            ),
          };
        }
        set({ chapters: nextChapters, subjects: nextSubjects });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },

  deleteChapter: async (chapterId) => {
    try {
      const response = await apiCallHandler<undefined, undefined>(
        `/doc-hub/admin/chapters/${chapterId}`,
        "DELETE",
        undefined,
      );
      if (response.success) {
        const nextChapters = { ...get().chapters };
        const targetChapter = nextChapters[chapterId];
        delete nextChapters[chapterId];

        const nextSubjects = { ...get().subjects };
        if (targetChapter && nextSubjects[targetChapter.subjectId]) {
          nextSubjects[targetChapter.subjectId] = {
            ...nextSubjects[targetChapter.subjectId],
            chapters: (
              nextSubjects[targetChapter.subjectId].chapters || []
            ).filter((ch) => ch.id !== chapterId),
          };
        }
        set({ chapters: nextChapters, subjects: nextSubjects });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },

  createTopic: async (chapterId, payload) => {
    try {
      const response = await apiCallHandler<any, { topic: ITopic }>(
        `/doc-hub/admin/chapters/${chapterId}/topics`,
        "POST",
        payload,
      );
      if (response.success && response.data) {
        const newTopic = response.data.topic;
        const nextTopics = { ...get().topics, [newTopic.id]: newTopic };

        const nextChapters = { ...get().chapters };
        if (nextChapters[chapterId]) {
          const existingTopics = nextChapters[chapterId].topics || [];
          nextChapters[chapterId] = {
            ...nextChapters[chapterId],
            topics: [...existingTopics, newTopic].sort(),
          };
        }
        set({ topics: nextTopics, chapters: nextChapters });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },

  deleteTopic: async (topicId) => {
    try {
      const response = await apiCallHandler<undefined, undefined>(
        `/doc-hub/admin/topics/${topicId}`,
        "DELETE",
        undefined,
      );
      if (response.success) {
        const nextTopics = { ...get().topics };
        const targetTopic = nextTopics[topicId];
        delete nextTopics[topicId];

        const nextChapters = { ...get().chapters };
        if (targetTopic && nextChapters[targetTopic.chapterId]) {
          nextChapters[targetTopic.chapterId] = {
            ...nextChapters[targetTopic.chapterId],
            topics: (nextChapters[targetTopic.chapterId].topics || []).filter(
              (tp) => tp.id !== topicId,
            ),
          };
        }
        set({ topics: nextTopics, chapters: nextChapters });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },

  createSection: async (topicId, payload) => {
    try {
      const response = await apiCallHandler<any, { section: ITopicSection }>(
        `/doc-hub/admin/topics/${topicId}/sections`,
        "POST",
        {
          title: payload.title,
          type: "THEORY", // Matches validation baseline conditions schema
          order: payload.order,
          content: { value: payload.markdownContent },
        },
      );
      if (response.success && response.data) {
        const newSection = response.data.section;
        const updatedSections = {
          ...get().sections,
          [newSection.id]: newSection,
        };

        const updatedTopics = { ...get().topics };
        if (updatedTopics[topicId]) {
          const existingSections = updatedTopics[topicId].sections || [];
          updatedTopics[topicId] = {
            ...updatedTopics[topicId],
            sections: [...existingSections, newSection].sort(
              (a, b) => (a.order || 0) - (b.order || 0),
            ),
          };
        }
        set({ sections: updatedSections, topics: updatedTopics });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },

  deleteSection: async (topicId, sectionId) => {
    try {
      const response = await apiCallHandler<undefined, undefined>(
        `/doc-hub/admin/sections/${sectionId}`,
        "DELETE",
        undefined,
      );
      if (response.success) {
        const nextSections = { ...get().sections };
        delete nextSections[sectionId];

        const nextTopics = { ...get().topics };
        if (nextTopics[topicId]) {
          nextTopics[topicId] = {
            ...nextTopics[topicId],
            sections: (nextTopics[topicId].sections || []).filter(
              (sec) => sec.id !== sectionId,
            ),
          };
        }
        set({ sections: nextSections, topics: nextTopics });
        return true;
      }
    } catch {
      // Caught at form components layer
    }
    return false;
  },
  updateTopicStatus: async (
    chapterId: string,
    topicId: string,
    status: TopicStatus,
  ) => {
    try {
      const response = await apiCallHandler<
        { status: TopicStatus },
        { topic: ITopic }
      >(`/doc-hub/admin/topics/${topicId}/status`, "PATCH", { status });

      if (response.success && response.data) {
        const updatedTopic = response.data.topic;

        // 💎 IMMUTABLE STATE UPDATE
        const nextTopics = { ...get().topics, [topicId]: updatedTopic };

        // Synchronize parent chapter arrays to prevent layout mismatch drops
        const nextChapters = { ...get().chapters };
        if (nextChapters[chapterId]) {
          nextChapters[chapterId] = {
            ...nextChapters[chapterId],
            topics: (nextChapters[chapterId].topics || [])
              .map((tp) => (tp.id === topicId ? updatedTopic : tp))
              .sort(),
          };
        }

        set({ topics: nextTopics, chapters: nextChapters });
        return true;
      }
    } catch {
      // Graceful error fallback
    }
    return false;
  },
  updateSubject: async (
    subjectId: string,
    payload: {
      name?: string;
      slug?: string;
      description?: string | null;
      order?: number;
    },
  ) => {
    try {
      const response = await apiCallHandler<any, { subject: ISubject }>(
        `/doc-hub/admin/subjects/${subjectId}`,
        "PATCH",
        payload,
      );

      if (response.success && response.data) {
        const updatedSubject = response.data.subject;

        set({
          subjects: {
            ...get().subjects,
            [subjectId]: updatedSubject,
          },
        });
        return true;
      }
    } catch {
      // Handled at form UI layers
    }
    return false;
  },
  updateChapter: async (
    chapterId: string,
    payload: { title?: string; slug?: string; order?: number },
  ) => {
    try {
      const response = await apiCallHandler<any, { chapter: IChapter }>(
        `/doc-hub/admin/chapters/${chapterId}`,
        "PATCH",
        payload,
      );

      if (response.success && response.data) {
        const updatedChapter = response.data.chapter;

        // Immutably refresh flat chapters cache dictionary
        const nextChapters = { ...get().chapters, [chapterId]: updatedChapter };

        // Synchronize parent subject nested array schemas to block UI inconsistencies
        const nextSubjects = { ...get().subjects };
        const subjectId = updatedChapter.subjectId;
        if (nextSubjects[subjectId]) {
          nextSubjects[subjectId] = {
            ...nextSubjects[subjectId],
            chapters: (nextSubjects[subjectId].chapters || [])
              .map((ch) => (ch.id === chapterId ? updatedChapter : ch))
              .sort((a, b) => (a.order || 0) - (b.order || 0)),
          };
        }

        set({ chapters: nextChapters, subjects: nextSubjects });
        return true;
      }
    } catch {
      // Caught gracefully at component form layers
    }
    return false;
  },
  updateSection: async (topicId, sectionId, payload) => {
    try {
      const response = await apiCallHandler<any, { section: ITopicSection }>(
        `/doc-hub/admin/sections/${sectionId}`,
        "PUT",
        payload,
      );

      if (response.success && response.data) {
        const updatedSection = response.data.section;

        // 💎 IMMUTABLE CACHE MERGING STAGE
        // Update the flat section record mapping block slice directly
        const nextSections = {
          ...get().sections,
          [sectionId]: updatedSection,
        };

        // If the parent topic exists in-memory, swap the modified child node element safely
        const nextTopics = { ...get().topics };
        if (nextTopics[topicId]) {
          const targetTopicSections = nextTopics[topicId].sections || [];

          nextTopics[topicId] = {
            ...nextTopics[topicId],
            sections: targetTopicSections
              .map((section) =>
                section.id === sectionId ? updatedSection : section,
              )
              .sort((a, b) => (a.order || 0) - (b.order || 0)),
          };
        }

        set({
          sections: nextSections,
          topics: nextTopics,
        });

        return true;
      }
    } catch {
      // Caught cleanly down stream inside management component sheets
    }
    return false;
  },
}));
