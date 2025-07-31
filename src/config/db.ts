import mongoose from "mongoose"
import { MONGOOSE_CONNECT } from "./globalConfig"

export const connectDB = async () => {
  if (!MONGOOSE_CONNECT) {
    console.error("❌ MONGOOSE_CONNECT is not defined")
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGOOSE_CONNECT)
    console.log("✅ Conectado a MongoDB")
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error)
    process.exit(1)
  }
}