import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import api from "../utils/api";
import { FaUsers, FaCode, FaPlus } from "react-icons/fa";

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Memoized chart component for optimized re-renders
const Chart = React.memo(({ data, type, options }) => {
  const ChartComponent = type === "bar" ? Bar : Pie;
  return <ChartComponent data={data} options={options} />;
});

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch stats from the API
  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Static or dynamic user/problem data
  const userProblemData = {
    labels: ["Users", "Problems"],
    datasets: [
      {
        data: [stats.totalUsers || 120, stats.totalProblems || 80],
        backgroundColor: ["#10B981", "#3B82F6"],
      },
    ],
  };

  // Static or dynamic difficulty data
  const difficultyData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          stats.easyProblems || 40,
          stats.mediumProblems || 20,
          stats.hardProblems || 10,
        ],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  // Chart options for consistent look and feel
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#D1D5DB",
        },
      },
    },
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const scaleButton = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  // Rendering the dashboard layout with animations
  const renderDashboard = () => (
    <motion.div
      className="flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.5 } },
      }}
    >
      <motion.h2
        className="text-3xl font-bold mb-12 text-green-400"
        variants={fadeInUp}
      >
        Dashboard Overview
      </motion.h2>

      {/* Chart Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 w-full"
        variants={fadeInLeft}
      >
        {/* Users vs Problems Chart */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          variants={fadeInUp}
        >
          <h3 className="text-xl font-semibold mb-4 text-green-400">
            Users vs Problems
          </h3>
          <div className="h-64">
            <Chart data={userProblemData} type="pie" options={chartOptions} />
          </div>
        </motion.div>

        {/* Problem Difficulty Chart */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          variants={fadeInUp}
        >
          <h3 className="text-xl font-semibold mb-4 text-green-400">
            Problem Difficulty
          </h3>
          <div className="h-64">
            <Chart data={difficultyData} type="pie" options={chartOptions} />
          </div>
        </motion.div>
      </motion.div>

      {/* Admin Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        variants={fadeInLeft}
      >
        <AdminButton
          icon={<FaUsers className="mr-2" />}
          text="Manage Users"
          onClick={() => navigate("/admin/manage-users")}
        />
        <AdminButton
          icon={<FaCode className="mr-2" />}
          text="Manage Problems"
          onClick={() => navigate("/admin/manage-problems")}
        />
        <AdminButton
          icon={<FaPlus className="mr-2" />}
          text="Add User"
          onClick={() => navigate("/admin/add-user")}
        />
        <AdminButton
          icon={<FaPlus className="mr-2" />}
          text="Add Problem"
          onClick={() => navigate("/admin/add-problem")}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <header className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-green-400">Admin Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderDashboard()}
      </main>
    </div>
  );
}

// AdminButton component
const AdminButton = ({ icon, text, onClick }) => (
  <motion.button
    onClick={onClick}
    className="w-full bg-gray-800 text-green-400 py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center"
  >
    {icon}
    {text}
  </motion.button>
);

export default AdminDashboard;
