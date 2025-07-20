import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-slate-900/80 backdrop-blur-md shadow-2xl border-b border-slate-800/50 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
        <div className="flex justify-between items-center w-full">
          {/* Logo and Project Name */}
          <div className="flex-none">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Note
                </span>
                Nest
              </h1>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="menu menu-horizontal px-1 space-x-2">
              <li>
                <Link
                  to="/"
                  className="btn btn-ghost text-slate-300 hover:bg-slate-800 hover:text-white btn-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="btn btn-ghost text-slate-300 hover:bg-slate-800 hover:text-white btn-sm"
                >
                  All Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Add Note Button and Mobile Menu */}
          <div className="flex-none">
            {/* Mobile Dropdown */}
            <div className="dropdown dropdown-end lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-slate-300 hover:bg-slate-800 btn-sm"
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-slate-800/95 backdrop-blur-md rounded-box w-52 border border-slate-700/50"
              >
                <li>
                  <Link
                    to="/"
                    className="text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notes"
                    className="text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    All Notes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className="text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    Create Note
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop Create Button */}
            <Link
              to="/create"
              className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-none btn-sm gap-2 ml-2 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              Add Note
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
