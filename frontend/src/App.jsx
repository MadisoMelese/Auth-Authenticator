import Floatingshape from "./components/Floatingshape";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
const App = () => {
  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
    <Floatingshape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
    <Floatingshape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
    <Floatingshape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />


    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signUp" element={<SignUp />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/verify-email" element={<EmailVerification />}/>
    </Routes>


  </div>  
)};

export default App;
