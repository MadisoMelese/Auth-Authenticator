import {create} from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true
const API_URL = "http://localhost:3000/api/auth"
export const useAuthStore = create((set) => ({
  user:null,
  isAuthenticated:false,
  isLoading:false,
  isCheckingAuth:true,
  error:null,

  signUp: async (name, email, password) => {
    set({
      isLoading:true,
       error:null
    });
    try {
      const response = await axios.post(`${API_URL}/signUp`, {name, email, password})
      set({
        user:response.data.user, 
        isAuthenticated:true, 
        isLoading:false
      })
    } catch (err) {
      set({err:err.response.data.message || "Error signing up", isLoading:false})
      console.log("Error in signUp", err)
      throw err;
    }
  },
}))