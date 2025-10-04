import React from "react";
import { HomeIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
          404
        </h1>
        <p className="mt-4 text-lg font-medium text-gray-700">Page Not Found</p>
        <p className="mt-2 text-sm text-gray-500">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        <a
          href="/"
          className="mt-6 inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <HomeIcon className="w-4 h-4 mr-2" />
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
