import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/auth/user", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setUser(res.data);
        setSolvedProblems(res.data.solvedProblems);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        User Dashboard
      </h2>
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h3>
          <p className="text-gray-600 mb-4">Email: {user.email}</p>
          <p className="text-gray-600 mb-6">
            Solved Problems: {solvedProblems.length}
          </p>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/problems"
                  className="text-indigo-500 hover:underline"
                >
                  Problems
                </Link>
              </li>
              <li>
                <Link to="/topics" className="text-indigo-500 hover:underline">
                  Topics
                </Link>
              </li>
              <li>
                <Link
                  to="/edit-profile"
                  className="text-indigo-500 hover:underline"
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link to="/logout" className="text-indigo-500 hover:underline">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
