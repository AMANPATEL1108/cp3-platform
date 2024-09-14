import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-gray-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-green-400 hover:text-green-300 transition duration-300"
          >
            AceDSA
          </Link>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-green-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/problems"
                className="hover:text-green-400 transition duration-300"
              >
                Problems
              </Link>
            </li>
            <li>
              <Link
                to="/topics"
                className="hover:text-green-400 transition duration-300"
              >
                Topics
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-green-400 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
