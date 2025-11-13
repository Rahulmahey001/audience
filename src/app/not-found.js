import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto relative">
            {/* Custom SVG Illustration */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full text-gray-300 dark:text-gray-600"
              fill="currentColor"
            >
              <path d="M100,20a80,80 0 1,0 80,80a80,80 0 0,0 -80,-80zm0,150a70,70 0 1,1 70,-70a70,70 0 0,1 -70,70z" />
              <circle cx="80" cy="80" r="10" />
              <circle cx="120" cy="80" r="10" />
              <path d="M60,120a40,40 0 0,1 80,0" fill="none" stroke="currentColor" strokeWidth="8" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-gray-900 dark:text-white mb-4">
            4o4
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Oh You really?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
            The page you're looking for seems to have drifted off into the digital cosmos. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Homepage
          </Link>
          
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Popular pages you might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="text-blue-500 hover:text-blue-600 text-sm">
              About Us
            </Link>
            <Link href="/services" className="text-blue-500 hover:text-blue-600 text-sm">
              Services
            </Link>
            <Link href="/blog" className="text-blue-500 hover:text-blue-600 text-sm">
              Blog
            </Link>
            <Link href="/help" className="text-blue-500 hover:text-blue-600 text-sm">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}   