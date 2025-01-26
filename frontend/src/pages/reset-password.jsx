
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLloading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('')
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    try {
      await login(email, password);
      navigate("/");

    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
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
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          
         
        </form>
      </div>

     
    </motion.div>
  );
};
export default Login;
