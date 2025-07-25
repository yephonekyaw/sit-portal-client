import React, { useState, useEffect, useMemo, memo } from "react";

interface Dot {
  id: string;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
}

const StaticDot = memo(({ dot }: { dot: Dot }) => {
  return (
    <div
      className="absolute rounded-full transition-opacity duration-500"
      style={{
        left: dot.x,
        top: dot.y,
        width: dot.size,
        height: dot.size,
        backgroundColor: dot.color,
        opacity: dot.opacity,
      }}
    />
  );
});

StaticDot.displayName = "StaticDot";

export const BackgroundDotGrid: React.FC = memo(() => {
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

    const dotsArray: Dot[] = [];
    const spacing = 65; // Larger spacing for cleaner look
    const rows = Math.ceil(dimensions.height / spacing) + 2;
    const cols = Math.ceil(dimensions.width / spacing) + 2;

    // Blue color variations for subtle depth
    const blueVariations = [
      "rgb(59, 130, 246, 0.08)",   // blue-500 with low opacity
      "rgb(37, 99, 235, 0.06)",    // blue-600 with lower opacity  
      "rgb(29, 78, 216, 0.04)",    // blue-700 with very low opacity
      "rgb(147, 197, 253, 0.07)",  // blue-300 with low opacity
      "rgb(96, 165, 250, 0.05)",   // blue-400 with low opacity
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
        
        // Minimum distance from any edge (0 = at edge, 0.5 = center)
        const minDistanceFromEdge = Math.min(
          distanceFromLeft,
          distanceFromRight,
          distanceFromTop,
          distanceFromBottom
        );

        // Fade out dots near edges
        const edgeFadeMultiplier = Math.min(minDistanceFromEdge * 4, 1);
        
        // Random variations for natural look
        const baseOpacity = 0.4 + Math.random() * 0.3; // 0.4 to 0.7
        const finalOpacity = baseOpacity * edgeFadeMultiplier;
        
        // Skip dots that would be too faint
        if (finalOpacity < 0.05) continue;

        // Slight size variations
        const baseSize = 2.5;
        const sizeVariation = 0.5 + Math.random() * 0.8; // 0.5 to 1.3
        const finalSize = baseSize * sizeVariation;

        // Random color from blue variations
        const colorIndex = Math.floor(Math.random() * blueVariations.length);

        dotsArray.push({
          id: `${i}-${j}`,
          x,
          y,
          opacity: finalOpacity,
          size: finalSize,
          color: blueVariations[colorIndex],
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
      {/* Subtle gradient overlay for extra depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-blue-50/20 to-indigo-50/30"
      />
      
      {/* Dots */}
      {dots.map((dot) => (
        <StaticDot key={dot.id} dot={dot} />
      ))}
    </div>
  );
});

BackgroundDotGrid.displayName = "BackgroundDotGrid";