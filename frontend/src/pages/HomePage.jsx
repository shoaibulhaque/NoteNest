import React from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <Navbar />

      {/* Hero Section */}
      <div className="hero min-h-[calc(100vh-4rem)] relative z-10">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
          <div className="hero-content text-center w-full">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                {/* Text above the main heading */}
                <p className="text-lg md:text-xl text-slate-400 mb-4 font-medium tracking-wide uppercase">
                  The most powerful
                </p>

                <div className="relative inline-block">
                  <h1 className="text-6xl md:text-7xl xl:8xl font-extrabold mb-6 leading-tight tracking-tight relative">
                    <span className="text-white">note-taking </span>
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      platform
                    </span>
                    <br />
                    <span className="text-white">for modern teams</span>
                  </h1>
                </div>

                {/* Text below the main heading */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-slate-300 mb-6">
                  Where Ideas Come to Life
                </h2>

                <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                  Your perfect digital sanctuary for thoughts, ideas, and
                  memories. Organize, create, and access your notes from
                  anywhere with our beautiful and intuitive note-taking
                  platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 lg:mb-20">
                <Link
                  to="/create"
                  className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-none btn-lg gap-2 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Your First Note
                </Link>
                <Link
                  to="/notes"
                  className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 btn-lg gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Browse All Notes
                </Link>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <div className="card bg-slate-800/60 backdrop-blur-sm shadow-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="card-body text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="card-title justify-center text-white">
                      Lightning Fast
                    </h3>
                    <p className="text-slate-300">
                      Create and access your notes instantly with our optimized
                      performance.
                    </p>
                  </div>
                </div>

                <div className="card bg-slate-800/60 backdrop-blur-sm shadow-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="card-body text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="card-title justify-center text-white">
                      Secure & Private
                    </h3>
                    <p className="text-slate-300">
                      Your notes are protected with enterprise-grade security
                      measures.
                    </p>
                  </div>
                </div>

                <div className="card bg-slate-800/60 backdrop-blur-sm shadow-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="card-body text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-pink-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="card-title justify-center text-white">
                      Beautiful Design
                    </h3>
                    <p className="text-slate-300">
                      Enjoy a clean, modern interface that makes note-taking a
                      pleasure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
