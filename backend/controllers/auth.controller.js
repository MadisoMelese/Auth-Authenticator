import  {User}  from "../models/user.model.js"
import bcrypt from 'bcrypt'
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signup = async (req, res)=>{
  const {email, password, name} = req.body;

  try{
    if(!email || !password || !name){
      throw new Error("All fileds are required!")
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
    res.status(400).json({success: false, message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = Math.floor(100000+Math.random()*9000).toString() ; 

    const user = new User({
      email,
      password:hashedPassword,
      name,
      verificationToken,
      verificationtokenExpiresAt: Date.now() +24*60*60*1000 //24 hours
    })
    await user.save();

    //JWT
    generateTokenAndSetCookie(res, user._id); 
    await sendVerificationEmail(user.email, verificationToken)

    res.status(201).json({
      success:true,
      message: "User created successfully",
      user:{
        ...user._doc,
        password: undefined,
      }

    })

  }catch(err){
    res.status(400).json({success: false, message: err.message})
  }
}





export const login = async (req, res)=>{
  res.send("ýuuy7uy")
}
export const logout = async (req, res)=>{
  res.send("ýuuy7uy")
}




// export {signup, login, logout}