import { z } from "zod";

export const coachRequestSchema = z.object({
  message: z.string().min(3).max(500),
  context: z.object({
    focusArea: z.enum(["ORGANIZATION","ROUTINE","STUDY","WORK","HOME","MICRO_GOALS","DISTRACTIONS","MOTIVATION","GENERAL"]).optional(),
    energyLevel: z.enum(["LOW","MEDIUM","HIGH"]).optional(),
  }).optional(),
});

export type CoachRequestInput = z.infer<typeof coachRequestSchema>;
