import React, { memo, useMemo } from "react";

interface MouseSpotlightProps {
  mousePosition: { x: number; y: number };
}

export const MouseSpotlight: React.FC<MouseSpotlightProps> = memo(
  ({ mousePosition }) => {
    // Memoize gradient definitions to prevent recreation
    const gradientDefs = useMemo(
      () => (
        <defs>
          <radialGradient id="spotlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
            <stop offset="25%" stopColor="rgba(59, 130, 246, 0.08)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.04)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
          <radialGradient id="spotlightDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.2)" />
            <stop offset="25%" stopColor="rgba(147, 197, 253, 0.1)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.05)" />
            <stop offset="100%" stopColor="rgba(147, 197, 253, 0)" />
          </radialGradient>
        </defs>
      ),
      []
    );

    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        {gradientDefs}

        <circle
          cx={mousePosition.x}
          cy={mousePosition.y}
          r="250"
          fill="url(#spotlight)"
          className="opacity-100 dark:opacity-0"
          style={{
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
        <circle
          cx={mousePosition.x}
          cy={mousePosition.y}
          r="250"
          fill="url(#spotlightDark)"
          className="opacity-0 dark:opacity-100"
          style={{
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
      </svg>
    );
  }
);

MouseSpotlight.displayName = "MouseSpotlight";
