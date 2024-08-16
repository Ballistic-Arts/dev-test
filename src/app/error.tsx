"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);

    // Initialize the click count in sessionStorage if it doesn't exist
    if (sessionStorage.getItem("clickCount") === null) {
      sessionStorage.setItem("clickCount", "0");
    }
  }, [error]);

  const handleClick = () => {
    // Retrieve the current click count from sessionStorage
    let clickCount = parseInt(sessionStorage.getItem("clickCount") || "0", 10);

    if (clickCount < 2) {
      // Increment the click count and update sessionStorage
      clickCount++;
      sessionStorage.setItem("clickCount", clickCount.toString());
      reset(); // Retry rendering the page
    } else {
      // Clean up click count and redirect to home page
      sessionStorage.removeItem("clickCount");
      window.location.href = "/"; // Redirect to home page after third click
    }
  };
  // TODO: Display appropriate error message from error prop.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Try again
      </button>
    </div>
  );
}
