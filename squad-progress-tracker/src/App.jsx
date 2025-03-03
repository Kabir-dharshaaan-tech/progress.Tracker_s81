import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard"; // ✅ Public Page
import ProgressUpdate from "./pages/ProgressUpdate"; // 🔒 Private Page
import MentorUpdate from "./pages/MentorUpdate"; // ✅ Public Page

// ✅ Private Route Wrapper (For Protected Pages)
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-blue-50 min-h-screen p-6">
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
          <Route path="/progress" element={<PrivateRoute element={<ProgressUpdate />} />} /> {/* 🔒 Private Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;



