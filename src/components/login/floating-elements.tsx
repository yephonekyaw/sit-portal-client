import React, { memo } from "react";
import { motion } from "framer-motion";

export const FloatingElements: React.FC = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Triangle */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-blue-400/20"
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

      {/* Circle */}
      <motion.div
        className="absolute top-40 right-32 w-6 h-6 bg-purple-400/20 rounded-full"
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

      {/* Rotating Square */}
      <motion.div
        className="absolute bottom-32 left-32 w-5 h-5 bg-indigo-400/20 transform rotate-45"
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

      {/* Hexagon */}
      <motion.div
        className="absolute bottom-20 right-40 w-4 h-4 bg-cyan-400/20"
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

      {/* Small Bubble */}
      <motion.div
        className="absolute top-10 right-10 w-3 h-3 bg-pink-400/20 rounded-full"
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Floating Diamond */}
      <motion.div
        className="absolute bottom-10 left-10 w-4 h-4 bg-green-400/20 transform rotate-45"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
      />

      {/* Wavy Rectangle */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-6 h-3 bg-yellow-400/20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />

      {/* Large Soft Circle */}
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-red-400/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
});

FloatingElements.displayName = "FloatingElements";
