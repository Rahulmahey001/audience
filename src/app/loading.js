export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Animated Logo/Brand */}
      <div className="mb-8">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse rounded-full w-1/2"></div>
        </div>
      </div>

      {/* Loading Text with Dots Animation */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Loading your content
          <span className="inline-block ml-1">
            {['.', '..', '...'].map((dot, i) => (
              <span
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {dot}
              </span>
            ))}
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please wait while we prepare everything for you
        </p>
      </div>

      {/* Responsive Size Indicators */}
      <div className="mt-8 text-xs text-gray-400 dark:text-gray-500 text-center">
        <div className="hidden sm:block md:hidden">Mobile View</div>
        <div className="hidden md:block lg:hidden">Tablet View</div>
        <div className="hidden lg:block xl:hidden">Desktop View</div>
        <div className="hidden xl:block">Large Desktop View</div>
      </div>
    </div>
  );
}