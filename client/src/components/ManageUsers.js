import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing Framer Motion for animations
import api from "../utils/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Token has expired, redirecting to login.");
        navigate("/admin/login");
      } else {
        console.error("Error fetching users:", error);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="p-8 bg-gray-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }, // Staggered animations
      }}
    >
      <motion.h2
        className="text-3xl font-semibold mb-6 text-gray-800"
        variants={fadeInUp} // Animate the heading
      >
        Manage Users
      </motion.h2>

      {users.length > 0 ? (
        <motion.table
          className="min-w-full bg-white rounded-lg shadow-lg table-auto"
          variants={fadeInUp} // Animate the table
        >
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left w-1/3">Username</th>
              <th className="p-4 text-center w-1/3">Email</th>
              <th className="p-4 text-center w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                className="border-t"
                variants={fadeInUp} // Animate each row
              >
                <td className="p-4 text-left">{user.username}</td>
                <td className="p-4 text-center">{user.email}</td>
                <td className="p-4 text-center">
                  <motion.button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    whileHover={{ scale: 1.05 }} // Animation on hover
                    whileTap={{ scale: 0.95 }} // Animation on click
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      ) : (
        <motion.p
          className="text-gray-600"
          variants={fadeInUp} // Animate the no users found message
        >
          No users found.
        </motion.p>
      )}

      <motion.button
        className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
        whileHover={{ scale: 1.05 }} // Animation on hover
        whileTap={{ scale: 0.95 }} // Animation on click
        onClick={() => navigate("/admin")}
        variants={fadeInUp} // Animate the go back button
      >
        Go Back
      </motion.button>
    </motion.div>
  );
}

export default ManageUsers;
