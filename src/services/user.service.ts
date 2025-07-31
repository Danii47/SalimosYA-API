import { Types } from "mongoose"
import { UserNotFoundError } from "../errors/UserNotFoundError"
import { UserModel } from "../models/user.model"

export class UserService {
  static async getById({ userId }: { userId: string }) {
    if (!Types.ObjectId.isValid(userId)) throw new UserNotFoundError()

    const user = await UserModel
      .findById(userId)
      .select("username realName avatar biography friends")

    if (!user) throw new UserNotFoundError()

    return {
      username: user.username,
      realName: user.realName,
      avatar: user.avatar,
      biography: user.biography,
      friendsLength: user.friends?.length ?? 0,
    }
  }

  static async getFriends({ userId }: { userId: string }) {
    if (!Types.ObjectId.isValid(userId)) throw new UserNotFoundError()

    const user = await UserModel.findById(userId)
      .select("friends")
      .populate("friends", "name avatar")

    if (!user) throw new UserNotFoundError()

    return user
  }
}
