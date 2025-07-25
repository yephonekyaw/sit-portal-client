import React, { useState, useEffect, useMemo, memo } from "react";

interface AnimatedDot {
  id: string;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
  animationDelay: number;
  animationDuration: number;
}

const AnimatedDot = memo(({ dot }: { dot: AnimatedDot }) => {
  return (
    <div
      className="absolute rounded-full animate-pulse"
      style={{
        left: dot.x,
        top: dot.y,
        width: dot.size,
        height: dot.size,
        backgroundColor: dot.color,
        opacity: dot.opacity,
        animationDelay: `${dot.animationDelay}s`,
        animationDuration: `${dot.animationDuration}s`,
      }}
    />
  );
});

AnimatedDot.displayName = "AnimatedDot";

export const AnimatedBackgroundDots: React.FC = memo(() => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const dots = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];

    const dotsArray: AnimatedDot[] = [];
    const spacing = 70; // Slightly larger spacing for animated version
    const rows = Math.ceil(dimensions.height / spacing) + 2;
    const cols = Math.ceil(dimensions.width / spacing) + 2;

    // Subtle blue variations for gentle animations
    const blueVariations = [
      "rgb(59, 130, 246, 0.1)",   // blue-500
      "rgb(37, 99, 235, 0.08)",   // blue-600
      "rgb(29, 78, 216, 0.06)",   // blue-700  
      "rgb(147, 197, 253, 0.09)",  // blue-300
      "rgb(96, 165, 250, 0.07)",   // blue-400
    ];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacing;
        const y = i * spacing;
        
        // Calculate distance from edges for fade effect
        const distanceFromLeft = x / dimensions.width;
        const distanceFromRight = (dimensions.width - x) / dimensions.width;
        const distanceFromTop = y / dimensions.height;
        const distanceFromBottom = (dimensions.height - y) / dimensions.height;
        
        const minDistanceFromEdge = Math.min(
          distanceFromLeft,
          distanceFromRight,
          distanceFromTop,
          distanceFromBottom
        );

        // Fade out dots near edges
        const edgeFadeMultiplier = Math.min(minDistanceFromEdge * 4, 1);
        
        // Random variations for natural look
        const baseOpacity = 0.3 + Math.random() * 0.4; // 0.3 to 0.7
        const finalOpacity = baseOpacity * edgeFadeMultiplier;
        
        // Skip dots that would be too faint
        if (finalOpacity < 0.05) continue;

        // Slight size variations
        const baseSize = 2.5;
        const sizeVariation = 0.6 + Math.random() * 0.8; // 0.6 to 1.4
        const finalSize = baseSize * sizeVariation;

        // Random color from blue variations
        const colorIndex = Math.floor(Math.random() * blueVariations.length);

        // Animation parameters for subtle pulsing
        const animationDelay = Math.random() * 8; // 0-8 seconds delay
        const animationDuration = 4 + Math.random() * 6; // 4-10 seconds duration

        dotsArray.push({
          id: `${i}-${j}`,
          x,
          y,
          opacity: finalOpacity,
          size: finalSize,
          color: blueVariations[colorIndex],
          animationDelay,
          animationDuration,
        });
      }
    }
    return dotsArray;
  }, [dimensions]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        willChange: "auto",
      }}
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-blue-50/15 to-indigo-50/25"
      />
      
      {/* Animated dots */}
      {dots.map((dot) => (
        <AnimatedDot key={dot.id} dot={dot} />
      ))}
    </div>
  );
});

AnimatedBackgroundDots.displayName = "AnimatedBackgroundDots";