




import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard"; // ✅ Public Page
import ProgressUpdate from "./pages/ProgressUpdate"; // 🔒 Private Page
import MentorUpdate from "./pages/MentorUpdate"; // ✅ Public Page
import StudentTodaysWork from "./pages/StudentTodaysWork"; // ✅ Public Page
import More from "./pages/More"; // ✅ Public Page
import StudentStatistics from "./pages/StudentStatistics"; // ✅ Public Page

// ✅ Private Route Wrapper (For Protected Pages)
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-blue-50 min-h-screen p-6 relative">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center text-3xl font-bold mt-10 text-blue-700">
                Welcome to Squad Progress Tracker 🚀
              </h1>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* ✅ Public Page */}
          <Route path="/mentor-update" element={<MentorUpdate />} /> {/* ✅ Public Page */}
          <Route path="/student-todays-work" element={<StudentTodaysWork />} /> {/* ✅ Public Page */}
          <Route path="/progress" element={<PrivateRoute element={<ProgressUpdate />} />} /> {/* 🔒 Private Page */}
          <Route path="/more" element={<More />} /> {/* ✅ Public Page */}
          <Route path="/statistics" element={<StudentStatistics />} /> {/* ✅ Public Page */}
        </Routes>
        
        {/* More & Statistics Buttons Positioned in the Middle of Right Side */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col gap-4">
        <Link to='/more'>
        <button 
            
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
          >
            More
          </button>
        </Link>
         
          <Link to="/statistics">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
          >
            Statistics
          </button>
          </Link>
          
        </div>
      </div>
    </Router>
  );
};

export default App;



//hi