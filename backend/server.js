import express from 'express'
import { connectDB, PORT } from "./db/connectDB.js"
const app = express()
import authroutes from './routes/auth.route.js'

app.use(express.json())

app.use('/api/auth', authroutes)











app.listen(PORT, ()=>{
  connectDB()
  console.log(`Server is running on port ${PORT}`)
})