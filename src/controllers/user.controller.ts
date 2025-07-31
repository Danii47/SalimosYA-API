import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { UserNotFoundError } from "../errors/UserNotFoundError"

export class UserController {
  static async getById(req: Request, res: Response) {
    const userId = req.params.id

    try {
      const user = await UserService.getById({ userId })

      res.json(user)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ error: error.message })
      }

      return res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async getFriends(req: Request, res: Response) {
      const userId = req.params.id
  
      try {
        const friends = await UserService.getFriends({ userId })
    
        res.json(friends)
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          return res.status(404).json({ error: error.message })
        }
  
        return res.status(500).json({ error: "Internal Server Error" })
      }
    }
}
