import { z } from "zod";

export const messageSchema = z.object({
  body: z.string().min(1).max(2000),
  recipientId: z.string().min(1)
});

export type MessageInput = z.infer<typeof messageSchema>;
