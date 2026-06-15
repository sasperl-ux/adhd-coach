import { z } from "zod";

export const routineSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(1000).optional(),
  frequency: z.string().min(2).max(80),
  timeOfDay: z.string().max(20).optional(),
  visibility: z.enum(["PRIVATE", "THERAPIST_SHARED", "PARENT_SHARED"])
});

export type RoutineInput = z.infer<typeof routineSchema>;
