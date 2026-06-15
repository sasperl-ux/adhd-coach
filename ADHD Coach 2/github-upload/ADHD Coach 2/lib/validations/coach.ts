import { z } from "zod";

export const coachRequestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  context: z
    .object({
      energyLevel: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
      focusArea: z
        .enum(["ORGANIZATION", "ROUTINE", "STUDY", "MICRO_GOALS", "DISTRACTIONS", "MOTIVATION"])
        .optional()
    })
    .optional()
});

export type CoachRequestInput = z.infer<typeof coachRequestSchema>;
