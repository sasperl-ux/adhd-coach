import { z } from "zod";
import { userRoles } from "@/lib/roles";

export const userRoleSchema = z.enum(userRoles);

export const userRegistrationSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  role: userRoleSchema
});

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
