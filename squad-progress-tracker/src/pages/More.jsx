import React from "react";
import { motion } from "framer-motion";
import myImages from "../../images/a.jpg"

const More = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-6">
      <motion.div 
        className="bg-white shadow-2xl rounded-lg p-8 max-w-3xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          My Contribution to My Squad 🚀
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          I contributed to my squad by developing this platform to help everyone
          update their daily progress efficiently. It also allows mentors to track
          our performance and guide us better.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          This initiative ensures that both students and mentors stay informed about
          progress, making our learning journey smoother and more productive.
        </p>
        
        <motion.img 
          src={myImages}
          alt="Your Name" 
          className="w-40 h-40 rounded-full shadow-lg border-4 border-blue-500 mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        <h2 className="text-2xl font-bold text-blue-600">Kabir Dharshaan</h2>
      </motion.div>
    </div>
  );
};


export default More;

