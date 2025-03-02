


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBelt, setSelectedBelt] = useState("All"); // Default filter is "All"

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/progress/all");

        console.log("Fetched Progress Data:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setProgressData(response.data);
          setFilteredData(response.data); // Initially set filtered data same as progress data
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
    console.log("Updated Progress Data:", progressData);
  }, [progressData]);

  // 🔥 Function to filter students by belt level
  const handleFilterChange = (event) => {
    const belt = event.target.value;
    setSelectedBelt(belt);

    if (belt === "All") {
      setFilteredData(progressData);
    } else {
      const filtered = progressData.filter((student) => student.belt === belt);
      setFilteredData(filtered);
    }
  };

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

      {/* 🔥 Belt Level Filter Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          className="px-4 py-2 border rounded-md focus:border-blue-500"
          value={selectedBelt}
          onChange={handleFilterChange}
        >
          <option value="All">All Belts</option>
          <option value="Green">Green</option>
          <option value="Purple">Purple</option>
          <option value="Blue">Blue</option>
          <option value="Brown">Brown</option>
        </select>
      </div>

      {/* Display User Progress in Animated Circles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
        {filteredData.map((student, index) => {
          const solved = student.solved ? Number(student.solved) : 0;
          const total = student.total ? Number(student.total) : 5; // Default to 5 if no total is provided
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
