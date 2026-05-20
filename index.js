import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import jwt from "jsonwebtoken"
import authenticateUser from './middlewares/authenticate.js'
import productRouter from './routers/productRouter.js'
import dotenv from 'dotenv'
dotenv.config()

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    (error)=>{
        console.error("Error connecting to MongoDB:", error)
    }
)

const app = express()

app.use( express.json() )
//Authentication
//Auth
app.use(authenticateUser)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.listen(3000 ,
    ()=>{
        console.log("The Server is running")
        console.log("Hi User!!")
    }
)