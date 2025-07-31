import { z } from "zod"

export const updateUserSchema = z.object({
  realName: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must be at most 50 characters long" }).optional(),
  username: z.string().min(1, { message: "Username is required" }).max(50, { message: "Username must be at most 50 characters long" }).optional(),
  biography: z.string().max(160).optional(),
  avatar: z.url().nullable().optional()
})