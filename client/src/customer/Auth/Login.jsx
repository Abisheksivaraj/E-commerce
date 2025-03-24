import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../State/StateAuth/Action";
import logo from "../../assets/elakiya.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));

    console.log("Login-Data:", userData);
    navigate("/");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Colors derived from the logo
  const colors = {
    primaryMain: "#c776af",
    primaryLight: "#e5a7d3",
    primaryDark: "#9c4d7d",
    secondary: "#8b6240",
  };

  return (
    <div>
      <div
        className="w-full max-w-md p-8 flex flex-col gap-4  rounded-xl shadow-2xl"
        style={{ maxHeight: "600px" }}
      >
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 text-center h-[14.5rem] flex flex-col items-center justify-center rounded-lg">
          <div className="max-w-[180px] mx-auto mb-4">
            <img src={logo} alt="" />
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: colors.primaryDark }}
          >
            Login
          </h1>
          <p className="text-sm italic text-gray-600 mb-6">
            Embrace Effortless Elegance
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              required
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <div className="relative">
              <input
                required
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
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
            className="w-full py-3 rounded-md font-semibold text-white transition-colors duration-300 ease-in-out"
            style={{
              backgroundColor: colors.primaryMain,
              "&:hover": { backgroundColor: colors.primaryDark },
            }}
          >
            Login
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-pink-600 hover:underline"
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-pink-600 hover:underline font-semibold"
                >
                  Register
                </button>
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
