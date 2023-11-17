import React from "react";
import { motion } from "framer-motion";

const DashboardNumbers = ({ data }) => {
  const { number, info, icon, bgClass, iColor } = data;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`flex justify-between items-center bg-green-600 p-3 rounded-lg ${bgClass}`}
    >
      <div className={`p-4 text-xl ${iColor} text-white rounded-full`}>
        {icon}
      </div>
      <div className="text-right">
        <h2 className=" text-3xl font-semibold text-white">{number}</h2>
        <h5 className="text-sm font-medium text-white">{info}</h5>
      </div>
    </motion.div>
  );
};

export default DashboardNumbers;
