import React, { memo } from "react";
import { motion } from "framer-motion";

export const FloatingElements: React.FC = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-blue-400/20 dark:bg-blue-300/20"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-32 w-6 h-6 bg-purple-400/20 dark:bg-purple-300/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-32 left-32 w-5 h-5 bg-indigo-400/20 dark:bg-indigo-300/20 transform rotate-45"
        animate={{
          rotate: [45, 225, 405],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-20 right-40 w-4 h-4 bg-cyan-400/20 dark:bg-cyan-300/20"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
});

FloatingElements.displayName = "FloatingElements";
