import { debounce } from "@/utils/performance";
import React, { useState, useEffect, useMemo, memo } from "react";

interface DotGridProps {
  mousePosition: { x: number; y: number };
}

interface Dot {
  id: string;
  x: number;
  y: number;
}

const OptimizedDot = memo(
  ({
    dot,
    mousePosition,
  }: {
    dot: Dot;
    mousePosition: { x: number; y: number };
  }) => {
    const distance = useMemo(() => {
      const dx = mousePosition.x - dot.x;
      const dy = mousePosition.y - dot.y;
      return Math.sqrt(dx * dx + dy * dy);
    }, [mousePosition.x, mousePosition.y, dot.x, dot.y]);

    const isNearMouse = distance < 150;
    const opacity = isNearMouse ? 0.8 : 0.25;
    const scale = isNearMouse ? 1.3 : 1;

    return (
      <div
        className="absolute w-1 h-1 rounded-full bg-gray-400/20 transition-all duration-300 ease-out"
        style={{
          left: dot.x,
          top: dot.y,
          opacity,
          transform: `scale(${scale})`,
          willChange: "transform, opacity",
        }}
      />
    );
  }
);

OptimizedDot.displayName = "OptimizedDot";

export const DotGrid: React.FC<DotGridProps> = memo(({ mousePosition }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    const debouncedResize = debounce(updateDimensions, 150);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const dots = useMemo(() => {
    const dotsArray: Dot[] = [];
    const spacing = 50;
    const rows = Math.ceil(dimensions.height / spacing) + 2;
    const cols = Math.ceil(dimensions.width / spacing) + 2;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        dotsArray.push({
          id: `${i}-${j}`,
          x: j * spacing,
          y: i * spacing,
        });
      }
    }
    return dotsArray;
  }, [dimensions]);

  const visibleDots = useMemo(() => {
    const buffer = 200; // Only render dots within 200px of mouse
    return dots.filter((dot) => {
      const dx = Math.abs(mousePosition.x - dot.x);
      const dy = Math.abs(mousePosition.y - dot.y);
      return dx < buffer && dy < buffer;
    });
  }, [dots, mousePosition]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {visibleDots.map((dot) => (
        <OptimizedDot key={dot.id} dot={dot} mousePosition={mousePosition} />
      ))}
    </div>
  );
});

DotGrid.displayName = "DotGrid";
