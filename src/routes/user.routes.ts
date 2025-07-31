import { Router } from "express"
import { UserController } from "../controllers/user.controller"

const router = Router()

router.get("/:id", UserController.getById)
router.get("/:id/friends", UserController.getFriends)

export default router
