import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const { forgotPassword, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mt-10 p-8 bg-gray-900  bg-opacity-50 
    backdrop-filter backdrop-blur-2xl
     rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center 
        bg-gradient-to-r from-green-400
         to-emerald-500 text-transparent bg-clip-text"
        >
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="">
            <p className="text-gray-300 mb-6 text-center">
              Enter your email address we'll send you a password reset link
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500
               to-emerald-600 text-white font-bold rounded-lg shadow-lg 
               hover:from-green-600 hover:to-emerald-700 
               focus:outline-none focus:ring-2 focus:ring-green-500 
               focus:ring-offset-2 focus:ring-offset-gray-900 transition 
               duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 mx-auto bg-green-500 bg-opacity-50 
           flex justify-center items-center mb-4
            rounded-full"
            >
              <Mail className="size-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6 text-xl">
              If account exists for  
              <span className="text-xl underline"> {email}</span>,
               you will receive an email with a
              password reset link
            </p>
          </div>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex 
      justify-center">
        <Link
          to={"/login"}
          className="text-green-400 font-semibold 
          flex items-center
           hover:underline"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
