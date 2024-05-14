export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Oops! Page not found.</p>
        <p className="mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 transition-colors">Go to Home</a>
      </div>
    );
  }
  