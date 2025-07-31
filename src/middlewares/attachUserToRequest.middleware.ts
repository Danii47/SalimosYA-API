import { Response, NextFunction } from "express"
import { RequestWithUser } from "../types/custom-request"
import { ACCESS_JWT_EXPIRATION_SECONDS, COOKIE_SAME_SITE, NODE_ENV, SECRET_ACCESS_JWT_KEY, SECRET_REFRESH_JWT_KEY } from "../config/globalConfig"
import jwt from "jsonwebtoken"
import { CookieSameSite } from "../types/cookies-types"

export default function attachUserToRequest(req: RequestWithUser, res: Response, next: NextFunction) {
  const accessToken = req.cookies.access_token
  const refreshToken = req.cookies.refresh_token
  console.log(req.url)
  req.session = { userId: null }

  try {
    const data = jwt.verify(accessToken, SECRET_ACCESS_JWT_KEY)
    req.session.userId = (data as any).userId
    next()
  } catch {
    try {
      const data = jwt.verify(refreshToken, SECRET_REFRESH_JWT_KEY)
      const userId = (data as any).userId

      const newAccessToken = jwt.sign({ userId }, SECRET_ACCESS_JWT_KEY, {
        expiresIn: ACCESS_JWT_EXPIRATION_SECONDS
      })

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: COOKIE_SAME_SITE as CookieSameSite,
        maxAge: ACCESS_JWT_EXPIRATION_SECONDS * 1000 // Convert seconds to milliseconds
      })

      req.session.userId = userId
      next()
    } catch {
      res.clearCookie("access_token")
      res.clearCookie("refresh_token")
      
      return res.status(401).json({ error: "Invalid token" })
    }
  }
}