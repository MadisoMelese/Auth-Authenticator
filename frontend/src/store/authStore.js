import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  err: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (name, email, password) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      set({
        user: response?.data?.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },

  updatePassword: async (password, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/update-password`, {
        password,
        token,
      });
      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error updating password",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({
      isCheckingAuth: true,
      err: null,
    });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        err: null,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error sending reset link",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (password, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },
}));
