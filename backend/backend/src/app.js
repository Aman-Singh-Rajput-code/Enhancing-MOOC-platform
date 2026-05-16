import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan"  


const app = express()

app.use(helmet())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:8080", // your Vite frontend
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


// Routes import

import userRouter from './routes/user.routes.js'

// Routes declaration

app.use("/api/v1/users", userRouter)


export {app}
