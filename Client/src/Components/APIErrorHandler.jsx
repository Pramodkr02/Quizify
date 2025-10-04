import React from "react";

const APIErrorHandler = ({ error, onRetry, isRetrying = false }) => {
  const isRateLimitError =
    error?.includes("Too many requests") || error?.includes("429");
  const isNetworkError =
    error?.includes("Failed to fetch") || error?.includes("NetworkError");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        {isRateLimitError ? (
          <>
            <div className="text-yellow-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Rate Limit Exceeded
            </h2>
            <p className="text-gray-600 mb-4">
              You've made too many requests to the quiz API. Please wait a
              moment before trying again.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Tip:</strong> The quiz will automatically use sample
                questions if the API is unavailable.
              </p>
            </div>
          </>
        ) : isNetworkError ? (
          <>
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Network Error
            </h2>
            <p className="text-gray-600 mb-4">
              Unable to connect to the quiz service. Please check your internet
              connection.
            </p>
          </>
        ) : (
          <>
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Failed to Load Quiz
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
          </>
        )}

        <div className="space-y-3">
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isRetrying ? "Retrying..." : "Try Again"}
          </button>

          <button
            onClick={() => (window.location.href = "/quiz-demo")}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Use Demo Mode
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>
            If the problem persists, the quiz will automatically use sample
            questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default APIErrorHandler;
