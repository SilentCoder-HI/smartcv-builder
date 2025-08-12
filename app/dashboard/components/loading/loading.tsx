import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-screen">
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-blue-600 text-sm font-medium tracking-wide opacity-80">
          Loading...
        </span>
      </div>
    </div>
  );
}
