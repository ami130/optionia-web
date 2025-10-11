"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 mb-4 animate-bounce">
            404
          </h1>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-4 w-full max-w-xs"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg 
              className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        </button>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-block border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 w-full max-w-xs"
        >
          Back to Home
        </Link>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: `${num * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Disable static generation
export const dynamic = "force-dynamic";