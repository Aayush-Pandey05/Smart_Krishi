import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

import RightPanelSignup from "../components/RightPanelSignup";
import logo from '../assets/Logo.png';
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [message, setMessage] = useState(null);
  const { signUp, isSigningUp } = useAuthStore();
  const Navigate = useNavigate();

  // Custom message modal to replace alert()
  const MessageModal = ({ message, onClose, type }) => {
    const modalClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 ${
      type === 'success' ? 'bg-green-600/30' : 'bg-red-600/30'
    } backdrop-blur-sm`;
    const cardClasses = `bg-gray-800 p-6 rounded-lg shadow-xl border-2 ${
      type === 'success' ? 'border-green-500' : 'border-red-500'
    } text-white max-w-sm w-full space-y-4 text-center`;

    return (
      <div className={modalClasses}>
        <div className={cardClasses}>
          <p className="font-semibold">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 transition-colors py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setMessage({ text: "Full name is required", type: "error" });
      return false;
    }
    if (!formData.email.trim()) {
      setMessage({ text: "Email is required", type: "error" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ text: "Invalid email format", type: "error" });
      return false;
    }
    if (!formData.password) {
      setMessage({ text: "Password is required", type: "error" });
      return false;
    }
    if (formData.password.length < 6) {
      setMessage({ text: "Password must be at least 6 characters", type: "error" });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword: _, ...signUpData } = formData;
      try {
        await signUp(signUpData);
        Navigate("/");
      } catch (error) {
        console.error("Signup failed:", error);
        setMessage({ text: error.message || "An error occurred during signup.", type: "error" });
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleCloseMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-[Inter] overflow-hidden">
      {/* Left Panel with updated Green Gradient theme */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-green-900/20"></div>
        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
               <img
                src={logo}
                alt="AgroAI Logo"
                className="h-8 w-8 rounded-full"
              />
              <h1 className="text-2xl font-bold text-white">AgroAI</h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">
                Create your account
              </h2>
              <p className="text-gray-400 text-base">
                Join the future of intelligent farming
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onFocus={() => setFocusedInput("fullName")}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full bg-gray-800/60 border-2 ${
                    focusedInput === "fullName"
                      ? "border-green-500"
                      : "border-gray-700"
                  } rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all duration-300 backdrop-blur-sm`}
                  required
                />
              </div>
            </div>

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
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full bg-gray-800/60 border-2 ${
                    focusedInput === "confirmPassword"
                      ? "border-green-500"
                      : "border-gray-700"
                  } rounded-xl px-11 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all duration-300 backdrop-blur-sm pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors p-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.01] disabled:scale-100 disabled:cursor-not-allowed shadow-xl shadow-green-500/25 hover:shadow-green-500/40 disabled:shadow-none flex items-center justify-center space-x-2 mt-6"
            >
              {isSigningUp ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <span className="text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </span>
          </div>
        </div>
      </div>

      <RightPanelSignup />

      {message && <MessageModal message={message.text} onClose={handleCloseMessage} type={message.type} />}
    </div>
  );
};


export default Signup;