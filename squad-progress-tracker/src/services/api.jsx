



import axios from "axios";

// ✅ Load API URL from .env file (if available)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

// ✅ Attach token to protected routes automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Auth API Calls
export const signup = (userData) => API.post("/auth/signup", userData);
export const login = (userData) => API.post("/auth/login", userData);

// ✅ Progress API Calls
export const updateProgress = (progressData) => {
  // Calculate percentage based on solved problems and total questions (5 in this case)
  const percentage = (progressData.solved / 5) * 100;

  // Add percentage to progressData
  const updatedProgressData = { 
    ...progressData, 
    percentage
  };

  return API.post("/progress/update", updatedProgressData);
};

export const getProgress = () => API.get("/progress/myprogress");
