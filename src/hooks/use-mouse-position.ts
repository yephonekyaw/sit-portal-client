import { useState, useEffect, useRef } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Cancel previous frame if it hasn't been processed yet
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return mousePosition;
};
