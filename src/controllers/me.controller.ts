import { Request, Response } from "express"
import { RequestWithUser } from "../types/custom-request"
import { MeService } from "../services/me.service"
import { UserNotFoundError } from "../errors/UserNotFoundError"

export class MeController {
  static async getUserInfo(req: Request, res: Response) {
    const userId = (req as RequestWithUser).session.userId

    try {
      const userInfo = await MeService.getUserInfo({ userId })
  
      res.json(userInfo)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ error: error.message })
      }

      return res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async updateUserInfo(req: Request, res: Response) {
    const userId = (req as RequestWithUser).session.userId
    const data = req.body

    try {
      const updatedUserInfo = await MeService.updateUserInfo({ userId, ...data })
  
      res.json(updatedUserInfo)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ error: error.message })
      }

      return res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async getFriends(req: Request, res: Response) {
    const userId = (req as RequestWithUser).session.userId

    try {
      const friends = await MeService.getFriends({ userId })
  
      res.json(friends)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ error: error.message })
      }

      return res.status(500).json({ error: "Internal Server Error" })
    }
  }
  
  static async getFriendById(req: Request, res: Response) {

  }

  static async sendFriendRequest(req: Request, res: Response) {

  }

  static async rejectFriendRequest(req: Request, res: Response) {

  }
  
  static async acceptFriendRequest(req: Request, res: Response) {

  }
}
