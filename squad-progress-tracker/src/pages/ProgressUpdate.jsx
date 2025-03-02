

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { updateProgress } from "../services/api"; // Import the updateProgress function

// const ProgressUpdate = () => {
//   const [solvedProblems, setSolvedProblems] = useState("");
//   const [beltLevel, setBeltLevel] = useState("Green"); // Default belt level is set to "Green"
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to access this page.");
//       navigate("/login"); // Redirect to login page if not logged in
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check authentication again before updating progress
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to update progress.");
//       navigate("/login");
//       return;
//     }

//     // Prepare progress data
//     const progressData = {
//       solved: solvedProblems,
//       belt: beltLevel, // Include the selected belt level in the progress data
//     };

//     try {
//       // Call the updateProgress function and pass the progress data
//       await updateProgress(progressData);
//       alert("Progress updated successfully!");
//       navigate("/student-dashboard"); // Navigate to the student's dashboard after successful submission
//     } catch (error) {
//       alert("Failed to update progress.");
//     }
//   };

//   return (
//     <motion.div className="min-h-screen flex items-center justify-center bg-gray-100"
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white shadow-lg rounded-lg p-8 w-96">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Update Your Progress</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input 
//             type="number" 
//             min="0" 
//             max="5" 
//             placeholder="Problems solved today"
//             className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
//             value={solvedProblems}
//             onChange={(e) => setSolvedProblems(e.target.value)}
//             required
//           />

//           {/* Dropdown to select the current belt level */}
//           <select
//             className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
//             value={beltLevel}
//             onChange={(e) => setBeltLevel(e.target.value)}
//           >
//             <option value="Green">Green</option>
//             <option value="Purple">Purple</option>
//             <option value="Blue">Blue</option>
//             <option value="Brown">Brown</option>
//           </select>

//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-400 transition"
//           >
//             Submit
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default ProgressUpdate;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { updateProgress } from "../services/api"; // Import the updateProgress function

const ProgressUpdate = () => {
  const [solvedProblems, setSolvedProblems] = useState("");
  const [beltLevel, setBeltLevel] = useState("Green"); // Default belt level is set to "Green"
  const [isAllowedTime, setIsAllowedTime] = useState(false); // Check if updating is allowed
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/login"); // Redirect to login page if not logged in
    }

    // ✅ Function to check if the current time is within 4 PM - Next Day 1 PM
    const checkTimeRestriction = () => {
      const now = new Date();
      const currentHour = now.getHours();
      console.log("Current Hour:", currentHour); // Debugging Log

      // ✅ Allowed Time: Between 4 PM (16:00) and Next Day 1 PM (13:00)
      if (currentHour >= 16 || currentHour < 13) {
        setIsAllowedTime(true);
      } else {
        setIsAllowedTime(false);
      }
    };

    checkTimeRestriction(); // Run initially
    const interval = setInterval(checkTimeRestriction, 60000); // Check every 1 minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check authentication again before updating progress
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

    // Prepare progress data
    const progressData = {
      solved: solvedProblems,
      belt: beltLevel, // Include the selected belt level in the progress data
    };

    try {
      // Call the updateProgress function and pass the progress data
      await updateProgress(progressData);
      alert("Progress updated successfully!");
      navigate("/student-dashboard"); // Navigate to the student's dashboard after successful submission
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

        {/* Display a warning if outside the allowed time */}
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
            disabled={!isAllowedTime} // Disable input outside allowed time
          />

          {/* Dropdown to select the current belt level */}
          <select
            className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
            value={beltLevel}
            onChange={(e) => setBeltLevel(e.target.value)}
            disabled={!isAllowedTime} // Disable dropdown outside allowed time
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
            disabled={!isAllowedTime} // Disable button outside allowed time
          >
            Submit
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProgressUpdate;
