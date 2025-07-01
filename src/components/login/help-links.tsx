import React, { memo } from "react";
import { motion } from "framer-motion";

export const HelpLinks: React.FC = memo(() => {
  return (
    <motion.div
      className="text-center mt-8 space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <p className="text-sm text-gray-500">
        Need help accessing your account?
      </p>
      <div className="flex justify-center space-x-4 text-sm">
        <motion.button
          className="text-blue-600 hover:text-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          IT Support
        </motion.button>
        <span className="text-gray-300">•</span>
        <motion.button
          className="text-blue-600 hover:text-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Help Desk
        </motion.button>
      </div>
    </motion.div>
  );
});

HelpLinks.displayName = "HelpLinks";
