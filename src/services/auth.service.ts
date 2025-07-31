import { Types } from "mongoose"
import { SALT_ROUNDS } from "../config/globalConfig"
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError"
import { UserModel } from "../models/user.model"
import bcrypt from "bcrypt"
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError"
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError"

export class AuthService {
  static async login({ email, password }: { email: string, password: string }): Promise<Types.ObjectId> {
    const user = await UserModel.findOne({ email })
    if (!user) throw new InvalidCredentialsError()

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new InvalidCredentialsError()

    return user._id
  }

  static async register({ email, password, username, realName }: { email: string, password: string, username: string, realName: string }): Promise<Types.ObjectId> {

    const emailExists = await UserModel.exists({ email })
    if (emailExists) {
      throw new EmailAlreadyExistsError()
    }

    const usernameExists = await UserModel.exists({ username })
    if (usernameExists) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = new UserModel({ email, password: hashedPassword, username, realName })
    await user.validate()

    await user.save()

    return user._id
  }
}
