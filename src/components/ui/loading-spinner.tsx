import React from "react";

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600 text-sm">
        Loading...
      </p>
    </div>
  </div>
);
