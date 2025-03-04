


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { updateProgress } from "../services/api"; 

const ProgressUpdate = () => {
  const [solvedProblems, setSolvedProblems] = useState("");
  const [beltLevel, setBeltLevel] = useState("Green"); 
  const [isAllowedTime, setIsAllowedTime] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/login"); 
    }

    
    const checkTimeRestriction = () => {
      const now = new Date();
      const currentHour = now.getHours();
      console.log("Current Hour:", currentHour); 

    
      if (currentHour >= 16 || currentHour < 13) {
        setIsAllowedTime(true);
      } else {
        setIsAllowedTime(false);
      }
    };

    checkTimeRestriction(); 
    const interval = setInterval(checkTimeRestriction, 60000); 

    return () => clearInterval(interval); 
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update progress.");
      navigate("/login");
      return;
    }

    if (!isAllowedTime) {
      alert("Progress can only be updated between 4 PM and 1 PM.");
      return;
    }


    const progressData = {
      solved: solvedProblems,
      belt: beltLevel, 
    };

    try {
   
      await updateProgress(progressData);
      alert("Progress updated successfully!");
      navigate("/student-dashboard"); 
    } catch (error) {
      alert("Failed to update progress.");
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Update Your Progress</h2>

      
        {!isAllowedTime && (
          <p className="text-red-500 text-center mb-4">
            Progress can only be updated between 4 PM and 1 PM.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="number" 
            min="0" 
            max="5" 
            placeholder="Problems solved today"
            className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
            value={solvedProblems}
            onChange={(e) => setSolvedProblems(e.target.value)}
            required
            disabled={!isAllowedTime} 
          />

    
          <select
            className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
            value={beltLevel}
            onChange={(e) => setBeltLevel(e.target.value)}
            disabled={!isAllowedTime} 
          >
            <option value="Green">Green</option>
            <option value="Purple">Purple</option>
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
          </select>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            type="submit"
            className={`w-full py-2 rounded-md transition ${
              isAllowedTime ? "bg-blue-600 text-white hover:bg-green-400" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isAllowedTime}
          >
            Submit
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProgressUpdate;
