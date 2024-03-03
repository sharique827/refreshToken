import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import {authenticationRouter} from './routes/authentication'
import {blogPostRouter} from './routes/blogPosts'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/auth', authenticationRouter)
app.use('/blog', blogPostRouter)

mongoose
.connect(String(process.env.MONGO_DB_URL))
.then(() => console.log("MongoDB Connection Successfull"))
.catch((error: Error)=> console.error(error))

app.listen(process.env.PORT||4000, () => {
console.log(`Server is running at ${process.env.PORT}`)
})