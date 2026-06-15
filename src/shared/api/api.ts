import { useAuthStore } from "@/entities/auth/model/store";
import axios from "axios";
import { logger } from "@/shared/lib/logger";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.error("API Error", error, { 
      url: error.config?.url, 
      method: error.config?.method,
      status: error.response?.status 
    });

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
