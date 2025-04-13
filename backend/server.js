import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB, PORT } from "./db/connectDB.js";
import authroutes from './routes/auth.route.js';
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);


app.listen(PORT, ()=>{
  connectDB()
  console.log(`Server is running on port: http://localhost:${PORT}`)
});