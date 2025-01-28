import { motion } from "framer-motion";
import { Mail, Lock, Loader, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, isLoading, message,  } = useAuthStore();
  const [err, setErr] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isLloading, setIsLoading] = useState(false);
  const {token} = useParams()
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErr("");
    if (password !== ConfirmPassword) {
      return setErr("Password do not match");
    }

    try {
      await resetPassword(password, token);
      navigate("/login");
      toast.success("Password reset successfully, redirecting to login page...");

      setTimeout(() =>{
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Error resetting password");
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword} className="">
          <Input
            required
            icon={Lock}
            type="password"
            placeholder="New Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            required
            icon={Lock}
            type="password"
            placeholder="Confirm-Password"
            autoComplete="new-password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {err && (
            <p
              className="text-red-500
           font-semibold mb-4"
            >
              {err}
            </p>
          )}
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            {isLloading ? (
              <Loader className="size-6 animate-spin mx-auto" />
            ) : (
              "Set New Password"
            )}
          </motion.button>
        </form>
      </div>

      <div
        className="px-8 py-4 bg-gray-900 bg-opacity-50 flex 
      justify-center"
      >
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
export default ResetPassword;
