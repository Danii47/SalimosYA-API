import cors from "cors"

// TODO: Uncomment and configure the accepted origins as needed
export default function comprobateCors() {
  return cors({
    origin: (origin: string | undefined, cb) => {
      // console.log("COMPROBANDO CORS")
      // return cb(null, true)
      const ACCEPTED_ORIGINS = [
        "http://localhost:3000",
      ]

      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return cb(null, true)
      }
      
      return cb(new Error("Not allowed by CORS"))
    },
    credentials: true
  })
}
