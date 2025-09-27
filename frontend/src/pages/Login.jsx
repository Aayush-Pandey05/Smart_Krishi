import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

import RightPannel from "../components/RightPannel";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [message, setMessage] = useState(null);

  // Custom message modal to replace alert()
  const MessageModal = ({ message, onClose, type }) => {
    const modalClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 ${
      type === 'success' ? 'bg-green-600/30' : 'bg-red-600/30'
    } backdrop-blur-sm`;
    const cardClasses = `bg-slate-800 p-6 rounded-lg shadow-xl border-2 ${
      type === 'success' ? 'border-green-500' : 'border-red-500'
    } text-white max-w-sm w-full space-y-4 text-center`;

    return (
      <div className={modalClasses}>
        <div className={cardClasses}>
          <p className="font-semibold">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-slate-700 hover:bg-slate-600 transition-colors py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate a brief delay to show the loading state
    setTimeout(() => {
      // Simple validation without a backend
      if (formData.email && formData.password) {
        setMessage({ text: "Login successful! Welcome to JalSetu!", type: "success" });
      } else {
        setMessage({ text: "Please enter both email and password.", type: "error" });
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-[Inter] overflow-hidden">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-700/50"></div>
        <div className="relative z-10 w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <h1 className="text-2xl font-bold text-white">JalSetu</h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Welcome back</h2>
              <p className="text-slate-400 text-base">
                Sign in to continue to your dashboard
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full bg-slate-800/60 border-2 ${focusedInput === 'email' ? 'border-cyan-500' : 'border-slate-700'} rounded-xl px-11 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all duration-300 backdrop-blur-sm`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full bg-slate-800/60 border-2 ${focusedInput === 'password' ? 'border-cyan-500' : 'border-slate-700'} rounded-xl px-11 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all duration-300 backdrop-blur-sm pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.01] disabled:scale-100 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:shadow-none flex items-center justify-center space-x-2"
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
            <span className="text-slate-400">
              Don't have an account?{" "}
              <a href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Create account
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Static Visual */}
      <RightPannel />
      
      {/* Message Modal */}
      {message && <MessageModal message={message.text} onClose={handleCloseMessage} type={message.type} />}

    </div>
  );
};

export default Login;