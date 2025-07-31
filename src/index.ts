import express from "express"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import meRoutes from "./routes/me.routes"
import attachUserToRequest from "./middlewares/attachUserToRequest.middleware"
import comprobateCors from "./middlewares/cors.middleware"
import { RequestWithUser } from "./types/custom-request"
import { connectDB } from "./config/db"

const PORT = process.env.PORT || 4700

connectDB()

const app = express()

app.disable("x-powered-by")

app.use(express.json())
app.use(comprobateCors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.use((req, res, next) => attachUserToRequest(req as RequestWithUser, res, next))

app.use("/api/me", meRoutes)
app.use("/api/users", userRoutes)
// app.use("/api/locals", localRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
