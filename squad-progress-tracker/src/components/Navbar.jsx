
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Ensure token is removed on logout
    navigate("/login");
  };

  return (
    <motion.nav
      className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold"><Link to="/">Squad Progress</Link></h1>
      <ul className="flex space-x-6">
        <li><Link className="hover:text-green-400 transition" to="/">Home</Link></li>
        <li><Link className="hover:text-green-400 transition" to="/student-dashboard">Student Dashboard</Link></li>
        {token && <li><Link className="hover:text-green-400 transition" to="/progress">Update Progress</Link></li>}
        {token ? (
          <li><button className="hover:text-red-400 transition" onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><Link className="hover:text-green-400 transition" to="/login">Login</Link></li>
        )}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
