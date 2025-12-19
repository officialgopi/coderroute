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
        stdin: z.array(z.string()),
        stdout: z.string(),
      }),
      explanation: z.string().optional(),
    })
  ),
  details: z.array(
    z.object({
      language: z.enum(Object.values(LANGUAGE)),
      codeSnippet: z.string(),
      backgroundCode: z.string(),
      referenceSolution: z.string(),
    })
  ),
});
