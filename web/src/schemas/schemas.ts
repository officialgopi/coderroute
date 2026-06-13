import z from "zod";

const LANGUAGE = {
  PYTHON: "PYTHON",
  JAVASCRIPT: "JAVASCRIPT",
} as const;

export const TAGS = {
  // 🔹 Data Structures
  ARRAY: "ARRAY",
  STRING: "STRING",
  LINKED_LIST: "LINKED_LIST",
  STACK: "STACK",
  QUEUE: "QUEUE",
  HASHING: "HASHING",
  HEAP: "HEAP",
  TREE: "TREE",
  BINARY_TREE: "BINARY_TREE",
  BST: "BST",
  GRAPH: "GRAPH",
  TRIE: "TRIE",

  // 🔹 Algorithms
  SORTING: "SORTING",
  SEARCHING: "SEARCHING",
  TWO_POINTERS: "TWO_POINTERS",
  SLIDING_WINDOW: "SLIDING_WINDOW",
  GREEDY: "GREEDY",
  BACKTRACKING: "BACKTRACKING",
  DIVIDE_AND_CONQUER: "DIVIDE_AND_CONQUER",
  RECURSION: "RECURSION",

  // 🔹 Dynamic Programming
  DP: "DP",
  DP_1D: "DP_1D",
  DP_2D: "DP_2D",
  DP_BITMASK: "DP_BITMASK",

  // 🔹 Graph Algorithms
  BFS: "BFS",
  DFS: "DFS",
  DIJKSTRA: "DIJKSTRA",
  BELLMAN_FORD: "BELLMAN_FORD",
  FLOYD_WARSHALL: "FLOYD_WARSHALL",
  MST: "MST",
  TOPOLOGICAL_SORT: "TOPOLOGICAL_SORT",
  UNION_FIND: "UNION_FIND",

  // 🔹 Mathematics
  MATH: "MATH",
  NUMBER_THEORY: "NUMBER_THEORY",
  COMBINATORICS: "COMBINATORICS",
  PROBABILITY: "PROBABILITY",
  MODULAR_ARITHMETIC: "MODULAR_ARITHMETIC",

  // 🔹 Bit Manipulation
  BIT_MANIPULATION: "BIT_MANIPULATION",

  // 🔹 CS Core
  OS: "OS",
  DBMS: "DBMS",
  CN: "CN",
  COA: "COA",
  COMPILER: "COMPILER",

  // 🔹 System Design
  SYSTEM_DESIGN: "SYSTEM_DESIGN",
  LOW_LEVEL_DESIGN: "LOW_LEVEL_DESIGN",
  HIGH_LEVEL_DESIGN: "HIGH_LEVEL_DESIGN",

  // 🔹 Language / Platform
  C: "C",
  CPP: "CPP",
  JAVA: "JAVA",
  PYTHON: "PYTHON",
  JAVASCRIPT: "JAVASCRIPT",

  // 🔹 Interview / Practice
  INTERVIEW: "INTERVIEW",
  LEETCODE_STYLE: "LEETCODE_STYLE",
  CODEFORCES_STYLE: "CODEFORCES_STYLE",

  // 🔹 Misc
  IMPLEMENTATION: "IMPLEMENTATION",
  SIMULATION: "SIMULATION",
} as const;
export type TAG = (typeof TAGS)[keyof typeof TAGS];

export const createProblemBodySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.enum(TAGS)),
  constraints: z.array(z.string()),
  hints: z.array(z.string()).optional(),
  editorial: z.string().optional(),
  args: z.array(z.string()),
  output_format: z.enum(["PLAIN", "JSON", "FLOAT"]),
  testcases: z.array(
    z.object({
      std: z.object({
        stdin: z.array(z.any()),
        stdout: z.coerce.string(),
      }),
      explanation: z.string().optional(),
    }),
  ),
  details: z.array(
    z.object({
      language: z.enum(Object.values(LANGUAGE)),
      codeSnippet: z.string(),
      backgroundCode: z.string(),
      referenceSolution: z.string(),
    }),
  ),
});

const TopicStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
};

const DIFFICULTY = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};
const SectionType = {
  THEORY: "THEORY",
  EXAMPLE: "EXAMPLE",
  ANALOGY: "ANALOGY",
  DIAGRAM: "DIAGRAM",
  INTERVIEW: "INTERVIEW",
  REVISION: "REVISION",
};

// enum SectionType {
// THEORY
// EXAMPLE
// ANALOGY
// DIAGRAM
// INTERVIEW
// REVISION
// }

/* -------------------------------------------------------------------------- */
/* SUBJECTS                                  */
/* -------------------------------------------------------------------------- */

export const createSubjectBodySchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  order: z.number().default(0).optional(),
});

export const updateSubjectParamsSchema = z.object({
  subjectId: z.string().uuid("Invalid Subject UUID format"),
});

export const updateSubjectBodySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});

export const getSubjectByIdParamsSchema = z.object({
  subjectId: z.string().uuid("Invalid Subject UUID format"),
});

export const deleteSubjectParamsSchema = z.object({
  subjectId: z.string().uuid("Invalid Subject UUID format"),
});

/* -------------------------------------------------------------------------- */
/* CHAPTERS                                  */
/* -------------------------------------------------------------------------- */

export const createChapterParamsSchema = z.object({
  subjectId: z.string().uuid("Invalid Subject UUID format"),
});

export const createChapterBodySchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  order: z.number(),
});

export const updateChapterParamsSchema = z.object({
  chapterId: z.string().uuid("Invalid Chapter UUID format"),
});

export const updateChapterBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});

export const getChapterByIdParamsSchema = z.object({
  chapterId: z.string().uuid("Invalid Chapter UUID format"),
});

export const deleteChapterParamsSchema = z.object({
  chapterId: z.string().uuid("Invalid Chapter UUID format"),
});

/* -------------------------------------------------------------------------- */
/* TOPICS                                   */
/* -------------------------------------------------------------------------- */

export const createTopicParamsSchema = z.object({
  chapterId: z.string().uuid("Invalid Chapter UUID format"),
});

export const createTopicBodySchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  summary: z.string().optional(),
  difficulty: z
    .enum(Object.values(DIFFICULTY) as [string, ...string[]])
    .optional(),
  estimatedTime: z.number().optional(),
  order: z.number(),
  status: z
    .enum(Object.values(TopicStatus) as [string, ...string[]])
    .optional(),
});

export const updateTopicParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

export const updateTopicBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  summary: z.string().optional(),
  difficulty: z
    .enum(Object.values(DIFFICULTY) as [string, ...string[]])
    .optional(),
  estimatedTime: z.number().optional(),
  order: z.number().optional(),
});

export const updateTopicStatusParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

export const updateTopicStatusBodySchema = z.object({
  status: z.enum(Object.values(TopicStatus) as [string, ...string[]]),
});

export const getTopicByIdParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

export const deleteTopicParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

/* -------------------------------------------------------------------------- */
/* SECTIONS                                  */
/* -------------------------------------------------------------------------- */

export const createSectionParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

export const createSectionBodySchema = z.object({
  title: z.string().min(1).max(255),
  type: z.enum(Object.values(SectionType) as [string, ...string[]]),
  content: z.any(),
  order: z.number(),
});

export const updateSectionParamsSchema = z.object({
  sectionId: z.string().uuid("Invalid Section UUID format"),
});

export const updateSectionBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  type: z.enum(Object.values(SectionType) as [string, ...string[]]).optional(),
  content: z.any().optional(),
  order: z.number().optional(),
});

export const getSectionByIdParamsSchema = z.object({
  sectionId: z.string().uuid("Invalid Section UUID format"),
});

export const deleteSectionParamsSchema = z.object({
  sectionId: z.string().uuid("Invalid Section UUID format"),
});

/* -------------------------------------------------------------------------- */
/* TOPIC PROBLEMS                               */
/* -------------------------------------------------------------------------- */

export const addProblemToTopicParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

export const addProblemToTopicBodySchema = z.object({
  problemId: z.string().uuid("Invalid Problem UUID format"),
});

export const removeProblemFromTopicParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
  problemId: z.string().uuid("Invalid Problem UUID format"),
});

/* -------------------------------------------------------------------------- */
/* PROGRESS                                  */
/* -------------------------------------------------------------------------- */

export const updateTopicProgressParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

export const updateTopicProgressBodySchema = z.object({
  completed: z.boolean(),
});

export const getSubjectProgressParamsSchema = z.object({
  subjectId: z.string().uuid("Invalid Subject UUID format"),
});

export const getChapterProgressParamsSchema = z.object({
  chapterId: z.string().uuid("Invalid Chapter UUID format"),
});

export const getTopicProgressParamsSchema = z.object({
  topicId: z.string().uuid("Invalid Topic UUID format"),
});

/* -------------------------------------------------------------------------- */
/* SEARCH                                   */
/* -------------------------------------------------------------------------- */

export const searchTopicsQuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  difficulty: z
    .enum(Object.values(DIFFICULTY) as [string, ...string[]])
    .optional(),
  status: z
    .enum(Object.values(TopicStatus) as [string, ...string[]])
    .optional(),
});
