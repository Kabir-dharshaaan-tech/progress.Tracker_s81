


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Fetching the progress data from the backend API
        const response = await axios.get("http://localhost:8080/api/progress/all");

        // Debugging: Log response to check if belt is present
        console.log("Fetched Progress Data:", response.data);

        // Ensure the response has data and it's in the expected format
        if (response.data && Array.isArray(response.data)) {
          setProgressData(response.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
      setLoading(false);
    };

    fetchProgress();
  }, []);

  useEffect(() => {
    // Debugging: Log progress data after it updates
    console.log("Updated Progress Data:", progressData);
  }, [progressData]);

  if (loading) {
    return <h2 className="text-center text-blue-500 mt-10">Loading...</h2>;
  }

  if (progressData.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">No Progress Data Yet</h2>
        <Link to="/progress" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition">
          Update Progress
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Student Progress Dashboard</h2>

      {/* Display User Progress in Animated Circles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
        {progressData.map((student, index) => {
          // Ensure that solved and total are valid numbers
          const solved = student.solved ? Number(student.solved) : 0;
          const total = student.total ? Number(student.total) : 5; // Default to 5 if no total is provided

          // Calculate the progress out of 5 instead of 100
          const progressOutOf5 = total > 0 ? (solved / total) * 5 : 0;

          return (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Progress Circle */}
              <motion.div
                className="relative w-24 h-24 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 text-xl font-bold mt-2"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {Math.round(progressOutOf5)} / 5
              </motion.div>

              {/* Submission Date */}
              <p className="text-gray-600 mt-2">{student.date || "Date Not Available"}</p>

              {/* Display Student Name below the Date */}
              <h3 className="text-lg font-semibold text-blue-700 mt-2">{student.name || "Unknown"}</h3>

              {/* Display the Current Belt Level */}
              <div className="mt-2 text-sm text-gray-500">
                <strong>Belt Level:</strong> {student.belt ? student.belt : "Not Assigned"}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <Link to="/" className="text-blue-600 font-bold hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
