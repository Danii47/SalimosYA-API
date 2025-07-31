import { Router } from "express"
import { MeController } from "../controllers/me.controller"
import { validateBody } from "../middlewares/validateBody.middleware"
import { updateUserSchema } from "../schemas/me.schema"

const router = Router()

router.get("/", MeController.getUserInfo) // get user info
router.patch("/", validateBody(updateUserSchema), MeController.updateUserInfo) // update user info

router.get("/friends", MeController.getFriends) // get friends list

router.post("/friends/:id", MeController.sendFriendRequest) // send friend request
router.delete("/friends/:id", MeController.rejectFriendRequest) // reject friend request
router.post("/friends/:id/accept", MeController.acceptFriendRequest) // accept friend request

export default router
