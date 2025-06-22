import React from "react";

export const lazyImport = <T extends Record<string, never>>(
  factory: () => Promise<T>
) => {
  return React.lazy(() =>
    factory().then((module) => ({
      default: module.default || module,
    }))
  );
};

// Preload critical resources
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Debounce for performance optimization
export const debounce = <T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};
