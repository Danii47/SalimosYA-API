import { AppError } from "./AppError"

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super("User already in use", 409)
  }
}