import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { username, password });
    // Add authentication logic here
  };

  // Colors derived from the logo
  const colors = {
    primaryMain: "#c776af", // Medium pink/purple from the logo
    primaryLight: "#e5a7d3", // Lighter pink from the logo
    primaryDark: "#9c4d7d", // Darker pink/purple from the logo
    secondary: "#8b6240", // Brown color from the logo text
    background: "#f8f0f5", // Very light pink background
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-pink-50"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-lg">
        {/* Logo section */}
        <div className="text-center mb-6">
          <div className="max-w-[200px] mx-auto mb-4">
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              {/* Rainbow shape */}
              <path
                d="M200 200 A 80 80 0 0 1 280 120 A 80 80 0 0 1 360 200"
                fill="none"
                stroke={colors.primaryLight}
                strokeWidth="25"
              />
              <path
                d="M200 200 A 60 60 0 0 1 260 140 A 60 60 0 0 1 320 200"
                fill="none"
                stroke={colors.primaryMain}
                strokeWidth="25"
              />
              <path
                d="M200 200 A 40 40 0 0 1 240 160 A 40 40 0 0 1 280 200"
                fill="none"
                stroke={colors.primaryDark}
                strokeWidth="25"
              />

              {/* Casual Lit Tees text */}
              <text
                x="200"
                y="80"
                fontFamily="Arial"
                fontSize="24"
                fontWeight="bold"
                fill={colors.secondary}
                textAnchor="middle"
              >
                Casual Lit Tees
              </text>

              {/* Little rays */}
              <line
                x1="320"
                y1="90"
                x2="330"
                y2="75"
                stroke={colors.secondary}
                strokeWidth="4"
              />
              <line
                x1="335"
                y1="95"
                x2="350"
                y2="85"
                stroke={colors.secondary}
                strokeWidth="4"
              />
              <line
                x1="340"
                y1="105"
                x2="360"
                y2="100"
                stroke={colors.secondary}
                strokeWidth="4"
              />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: colors.primaryDark }}
          >
            Admin Dashboard
          </h1>
          <p
            className="text-sm italic mb-4"
            style={{ color: colors.secondary }}
          >
            Embrace Effortless Elegance
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                focusRing: `${colors.primaryMain}`,
              }}
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 pr-10"
                style={{
                  focusRing: `${colors.primaryMain}`,
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md font-medium text-white"
            style={{
              backgroundColor: colors.primaryMain,
            }}
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm"
              style={{ color: colors.primaryMain }}
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
