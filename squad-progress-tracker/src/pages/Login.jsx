


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../services/api"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const emailRegex = /^[a-zA-Z0-9._%+-]+\.s81@kalvium\.community$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email. Use a valid '.s81@kalvium.community' email.");
      return;
    }

    try {
    
      const { data } = await login({ email, password });

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("studentEmail", email);
      localStorage.setItem("userId", data.userId);

      navigate("/progress"); 
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || "Server error"));
      console.error("Login Error:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Student Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email (e.g., kabirdharshaan.u.s81@kalvium.community)"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-400 transition"
          >
            Login
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-2 text-blue-600 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
