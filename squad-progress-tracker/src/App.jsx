

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ProgressUpdate from "./pages/ProgressUpdate";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="text-center text-3xl font-bold mt-10">Welcome to Squad Progress Tracker</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* Publicly accessible */}
        <Route path="/progress" element={<PrivateRoute element={<ProgressUpdate />} />} /> {/* Requires login */}
      </Routes>
    </Router>
  );
};

export default App;
