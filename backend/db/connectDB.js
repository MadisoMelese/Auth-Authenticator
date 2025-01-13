import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT||300

const connectDB = async () =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected successfully")
  } catch(err){
    console.log("Error connection to MongoDB:", err.message)
    process.exit(1)
  }
}
export {PORT, connectDB}