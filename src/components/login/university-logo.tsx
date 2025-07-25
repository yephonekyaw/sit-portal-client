import React, { memo } from "react";
import { motion } from "framer-motion";

export const UniversityLogo: React.FC = memo(() => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="p-2 flex items-center justify-center">
        <img src="/logos/temp_logo.svg" className="w-12 h-12" />
      </div>
      <motion.h1
        className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        SIT Portal
      </motion.h1>
      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Access your academic resources and services
      </motion.p>
    </motion.div>
  );
});

UniversityLogo.displayName = "UniversityLogo";
