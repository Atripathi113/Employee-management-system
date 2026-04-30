import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Placeholder — wire to your backend reset endpoint when ready
    setForgotMsg("If this email exists, a reset link has been sent.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-700 flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-teal-700 rounded-sm" />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">Employee MS</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-snug mb-4">
            Manage your team<br />with confidence.
          </h1>
          <p className="text-teal-200 text-base leading-relaxed max-w-sm">
            A unified platform for attendance, leaves, salary, and employee records — all in one place.
          </p>
        </div>

        {/* Bottom stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Employees Managed", value: "100+" },
            { label: "Departments",        value: "10+"  },
            { label: "Leave Requests",     value: "Fast" },
            { label: "Uptime",             value: "99%"  },
          ].map(({ label, value }) => (
            <div key={label} className="bg-teal-800 bg-opacity-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-teal-300 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-teal-600 rounded-lg" />
            <span className="font-bold text-gray-800 text-lg">Employee MS</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-teal-600" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => { setShowForgot(true); setForgotMsg(""); }}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium transition"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-sm mt-2"
            >
              Sign In
            </button>

          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">

            {/* Close */}
            <button
              onClick={() => setShowForgot(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-1">Reset Password</h3>
            <p className="text-gray-400 text-sm mb-6">
              Enter your email and we'll send you a reset link.
            </p>

            {forgotMsg ? (
              <div className="px-4 py-3 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-teal-700 text-sm">{forgotMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
                >
                  Send Reset Link
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Login;