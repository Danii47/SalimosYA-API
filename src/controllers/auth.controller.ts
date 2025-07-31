import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError"
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError"
import { ACCESS_JWT_EXPIRATION_SECONDS, COOKIE_SAME_SITE, NODE_ENV, REFRESH_JWT_EXPIRATION_SECONDS, SECRET_ACCESS_JWT_KEY, SECRET_REFRESH_JWT_KEY } from "../config/globalConfig"
import jwt from "jsonwebtoken"
import { RefreshTokenModel } from "../models/refreshToken.model"
import { RequestWithUser } from "../types/custom-request"
import { UserModel } from "../models/user.model"
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError"
import { CookieSameSite } from "../types/cookies-types"

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    const userAgent = req.headers["user-agent"] || "unknown"
    const ipAddress = req.ip

    try {
      const userId = await AuthService.login({ email, password })
      const refreshTokenDoc = await RefreshTokenModel.findOne({ userId, userAgent, ipAddress })
      let tokenId: string

      if (refreshTokenDoc) {
        tokenId = refreshTokenDoc.tokenId
      } else {
        tokenId = crypto.randomUUID()
        await RefreshTokenModel.create({
          userId,
          tokenId,
          userAgent,
          ipAddress,
        })
      }

      const accessToken = jwt.sign({ userId }, SECRET_ACCESS_JWT_KEY, {
        expiresIn: ACCESS_JWT_EXPIRATION_SECONDS
      })

      const refreshToken = jwt.sign({ userId, tokenId }, SECRET_REFRESH_JWT_KEY, {
        expiresIn: REFRESH_JWT_EXPIRATION_SECONDS
      })

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: COOKIE_SAME_SITE as CookieSameSite,
          maxAge: ACCESS_JWT_EXPIRATION_SECONDS * 1000 // Convert to milliseconds
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: COOKIE_SAME_SITE as CookieSameSite,
          maxAge: REFRESH_JWT_EXPIRATION_SECONDS * 1000 // Convert to milliseconds
        })
        .end()

    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(401).json({ error: error.message })
      }

      return res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async register(req: Request, res: Response) {
    const { email, password, username, realName } = req.body

    try {
      const newUserId = await AuthService.register({ email, password, username, realName })
      res.status(201).json({ userId: newUserId })

    } catch (error) {
      if (error instanceof UserAlreadyExistsError || error instanceof EmailAlreadyExistsError) {
        return res.status(409).json({ error: error.message })
      }

      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refresh_token

    if (refreshToken) {
      try {
        const { tokenId } = jwt.verify(refreshToken, SECRET_REFRESH_JWT_KEY) as { tokenId: string }
        await RefreshTokenModel.deleteOne({ tokenId })
      } catch { }
    }

    res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .json({ message: "Logged out successfully" })
  }

  static async verify(req: Request, res: Response) {
    const userId = (req as RequestWithUser).session?.userId

    if (userId) {
      const user = await UserModel.findById(userId).select("realName username biography email avatar")

      return res.json({ user })
    }

    return res.status(401).json({ error: "Invalid token" })
  }
}