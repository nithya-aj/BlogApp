import express from "express";
import mongoose from 'mongoose'
import userRouter from "./routes/userRoutes.js";
import blogRouter from './routes/blogRoutes.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

mongoose.connect(
    'mongodb+srv://nithya:mongodb7@cluster0.2npjnyh.mongodb.net/blog_app?retryWrites=true&w=majority')
    .then(() => app.listen(5000))
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err)
    )