



import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://progress-tracker-backend-j7k4.onrender.com/api",
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const signup = (userData) => API.post("/auth/signup", userData);
export const login = (userData) => API.post("/auth/login", userData);


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
