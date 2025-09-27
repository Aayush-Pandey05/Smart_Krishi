import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import RightPanelSignup from "../components/RightPanelSignup"; // Corrected component name
import logo from "../assets/Logo.png";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedInput, setFocusedInput] = useState(null);
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }
    try {
      await login(formData);
      navigate("/"); // Redirect to dashboard on successful login
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
      console.error("Login failed:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-[Inter] overflow-hidden">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-green-900/20"></div>
        <div className="relative z-10 w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-8">
              <img
                src={logo}
                alt="AgroAI Logo"
                className="h-8 w-8 rounded-full"
              />
              <h1 className="text-2xl font-bold text-white">AgroAI</h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-400 text-base">
                Sign in to continue to your dashboard
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full bg-gray-800/60 border-2 ${
                    focusedInput === "email"
                      ? "border-green-500"
                      : "border-gray-700"
                  } rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all duration-300 backdrop-blur-sm`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full bg-gray-800/60 border-2 ${
                    focusedInput === "password"
                      ? "border-green-500"
                      : "border-gray-700"
                  } rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all duration-300 backdrop-blur-sm pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.01] disabled:scale-100 disabled:cursor-not-allowed shadow-xl shadow-green-500/25 hover:shadow-green-500/40 disabled:shadow-none flex items-center justify-center space-x-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <span className="text-gray-400">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Create account
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Static Visual */}
      <RightPanelSignup />
    </div>
  );
};

export default Login;
