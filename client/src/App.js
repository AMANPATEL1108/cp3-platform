import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Problems from "./components/Problems";
import Topics from "./components/Topics";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AddUser from "./components/AddUser";
import AddProblem from "./components/AddProblem";
import ManageUsers from "./components/ManageUsers";
import ManageProblems from "./components/ManageProblems";
import TopicDetail from "./components/TopicDetail"; // Import the new TopicDetail component
import "./App.css";

function ProtectedAdminRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? children : <Navigate to="/admin/login" />;
}

function ProtectedUserRoute({ children }) {
  const userToken = localStorage.getItem("token");
  return userToken ? children : <Navigate to="/login" />;
}

function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <Router>
      <div className="App">
        {!isAdminRoute && <Navbar />}{" "}
        {/* Only show Navbar if not on admin routes */}
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* User Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedUserRoute>
                <UserDashboard />
              </ProtectedUserRoute>
            }
          />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/add-problem" element={<AddProblem />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-problems" element={<ManageProblems />} />
          {/* New Route for Topic Details */}
          <Route path="/topic/:topicId" element={<TopicDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
