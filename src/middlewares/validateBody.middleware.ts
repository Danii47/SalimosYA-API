import { Request, Response, NextFunction } from "express"
import { ZodType } from "zod"

export const validateBody = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error: any) {
    return res.status(400).json({
      error: error.issues.map((e: any) => `${e.message}`).join("\n")
    })
  }
}