import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";

// Signup page
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
    .status(400)
    .json({ success: false, message: "Please fil All fields they are required!" });
  }
  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      // console.log("User already exists");
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 9000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationtokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    // json web token (JWT) Generation for every new user
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
    console.log(err.message)
    res.status(500).json({ success: false, 
                          message: "Internal server error" });
  }
};

// Verify Email Page page
const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationtokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
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
        password: undefined,
      },
    });
  } catch (err) {
    // console.log("Error", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login page
const login = async (req, res) => {
  // Implement login functionality
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields!" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "The user doesn't exist!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return  res
        .status(400)
        .json({
          success: false,
          message: "Incorrect Password, pls try again!",
        });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log("Error in Login", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


// Logout page
const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Forgot password!
const forgotPassword = async (req, res) =>{
  const {email} = req.body;
  try{
    const user = await User.findOne({email})
    if(!user){
      return  res.status(400).json({success:false, message: "user not found!, pls make it sure"})
    }

    const resetToken = crypto.randomBytes(20).toLocaleString("hex")
    const resetTokenExpiresAt = Date.now() + 60 * 60* 1000; //one hour

    user.resetPasswordToken = resetToken; // from models/user.model.js
    user.resetPasswordExpiresAt = resetTokenExpiresAt; // from models/user.model.js
    await user.save();
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

    res.status(200).json({success: true, message: "Password reset link sent to your Email"})
  }catch(err){
    console.log("Error in forgot password", err)
    res.status(400).json({
      success: false, 
      message: err.message
    })
  }
}

//reset password
const resetPassword= async (req, res) => {
  try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: {$gt: Date.now()},
    });

    if(!user){
      return res.status(400).json({success: false, message: "Invalid or Expired reset token"})
    }

    //update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetSuccessEmail(user.email)

    res.status(200).json({success: true, message: "Password reset successfully!"})
  } catch (err) {
    console.log("Error in resetpassword", err);
    res.status(400).json({success: false, message:err.message})
  }
}
//check auth
const checkAuth = async (req, res) =>{ 
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false, message: "user not found!"
      })
    }
    res.status(200).json({
      success:true, user
    })
  } catch (err) {
    console.log("Error in checkAuth", err)
    res.status(400).json({success:false, message: err.message})
  }
}

export {forgotPassword, logout, login, verifyEmail, signup, resetPassword, checkAuth}
