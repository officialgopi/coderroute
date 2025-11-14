type TLanguage = "PYTHON" | "JAVASCRIPT";

export type { TLanguage };

import type { IUser } from "@/store/auth.store";
import type { IProblem } from "@/store/problem.store";
import type { IDiscussion } from "@/store/discussion.store";
import type { ISheet } from "@/store/sheet.store";
import type { ISubmission } from "@/store/submission.store";
import type { createProblemBodySchema } from "@/schemas/schemas";
import type z from "zod";

export type { IUser, IProblem, ISheet, IDiscussion, ISubmission };

export type CreateProblemBody = z.infer<typeof createProblemBodySchema>;
