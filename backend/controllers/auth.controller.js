import  { User }  from "../models/user.model.js"
import bcrypt from 'bcrypt'
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";


// Signup page
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required!");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 9000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationtokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    await user.save();

    // JWT
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });

  } catch (err) {
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
}

// Verify Email Page page
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationtokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code"
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationtokenExpiresAt = undefined;

    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "User Verified successfully!",
      user: {
        ...user._doc,
        password: undefined
      }
    });

  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Login page
export const login = async (req, res) => {
  // Implement login functionality
  res.send("Login functionality not implemented yet");
}

// Logout page
export const logout = (req, res) => {
  res.clearCookie("token", 
    { httpOnly: true, 
      secure:process.env.NODE_ENV === 'production', 
      samesite: 'strict' 
    }); 
  res.status(200).json({ 
    success: true, 
    message: "Logged out successfully" 
  }); 
};