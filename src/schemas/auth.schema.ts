import { z } from "zod"


export const registerSchema = z.object({
  email: z.email({ message: "Not a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  realName: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must be at most 50 characters long" }),
  username: z.string().min(1, { message: "Username is required" }).max(50, { message: "Username must be at most 50 characters long" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.email({ message: "Not a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})