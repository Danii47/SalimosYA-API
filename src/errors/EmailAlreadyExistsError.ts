import { AppError } from "./AppError"

export class EmailAlreadyExistsError extends AppError {
  constructor() {
    super("Email already in use", 409)
  }
}
