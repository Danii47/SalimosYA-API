import { Types } from "mongoose"
import { UserModel } from "../models/user.model"
import { UserNotFoundError } from "../errors/UserNotFoundError"

export class MeService {
  static async getUserInfo({ userId }: { userId: Types.ObjectId }) {
    const user = await UserModel.findById(userId)

    if (!user) throw new UserNotFoundError()

    return {
      username: user.username,
      realName: user.realName,
      friendRequestsLength: user.friendRequests?.length ?? 0,
      friendsLength: user.friends?.length ?? 0,
      avatar: user?.avatar
    }
  }

  static async updateUserInfo({ userId, username, realName, biography, avatar }: { userId: Types.ObjectId, username?: string, realName?: string, biography?: string, avatar?: string }) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { username, realName, biography, avatar },
      { new: true }
    )

    if (!user) throw new UserNotFoundError()

    return {
      username: user.username,
      realName: user.realName,
      biography: user.biography,
      avatar: user.avatar
    }
  }

  static async getFriends({ userId }: { userId: Types.ObjectId }) {
    const user = await UserModel.findById(userId)
      .select("friends")
      .populate("friends", "name avatar")

    if (!user) throw new UserNotFoundError()

    return user
  }
}
