import { z } from "zod";

const score = z.coerce.number().int().min(1).max(10);

export const checkInSchema = z.object({
  moodScore: score,
  energyScore: score,
  focusScore: score,
  stressScore: score,
  sleepHours: z.coerce.number().min(0).max(24).optional(),
  notes: z.string().max(1000).optional()
});

export type CheckInInput = z.infer<typeof checkInSchema>;
