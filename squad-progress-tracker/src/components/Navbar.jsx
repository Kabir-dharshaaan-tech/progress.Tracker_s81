






import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const handleLogout = () => {
    localStorage.removeItem("token"); 
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
        
        {/* Show "Update Progress" only if logged in */}
        {token && <li><Link className="hover:text-green-400 transition" to="/progress">Update Progress</Link></li>}

        {/* Show "Mentor Update" only if logged in */}
        {token && <li><Link className="hover:text-yellow-400 transition" to="/mentor-update">Mentor Update</Link></li>}

        {/* Show "Student Today's Work" for everyone */}
        <li><Link className="hover:text-purple-400 transition" to="/student-todays-work">Student Today's Work</Link></li>

        {/* Show Logout if logged in, else show Login */}
        {token ? (
          <li>
            <button className="hover:text-red-400 transition" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li><Link className="hover:text-green-400 transition" to="/login">Login</Link></li>
        )}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
