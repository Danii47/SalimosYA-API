import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { validateBody } from "../middlewares/validateBody.middleware"
import { loginSchema, registerSchema } from "../schemas/auth.schema"
import attachUserToRequest from "../middlewares/attachUserToRequest.middleware"
import { RequestWithUser } from "../types/custom-request"

const router = Router()

router.post("/login", validateBody(loginSchema), AuthController.login) // to handle user login
router.post("/register", validateBody(registerSchema), AuthController.register) // to handle user registration
router.post("/logout", AuthController.logout) // to handle user logout
router.get("/verify", (req, res, next) => attachUserToRequest(req as RequestWithUser, res, next), AuthController.verify) // to verify user authentication

export default router
