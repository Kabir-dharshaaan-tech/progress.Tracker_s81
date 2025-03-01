// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const Signup = () => {
//   const [formData, setFormData] = useState({ email: "", password: "", name: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signup Attempted", formData);
//   };

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center bg-gray-100"
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white shadow-lg rounded-lg p-8 w-96">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input 
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
//             onChange={handleChange}
//             required
//           />
//           <input 
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
//             onChange={handleChange}
//             required
//           />
//           <input 
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-md focus:border-blue-500"
//             onChange={handleChange}
//             required
//           />
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-400 transition"
//           >
//             Sign Up
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed: " + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2 border rounded-md" />
          <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="w-full px-4 py-2 border rounded-md" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-400 transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
