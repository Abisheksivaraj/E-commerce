import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../State/StateAuth/Action";
import logo from "../../assets/elakiya.png";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form validation states
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Colors from the original design
  const colors = {
    primaryMain: "#c776af",
    primaryLight: "#e5a7d3",
    primaryDark: "#9c4d7d",
    secondary: "#8b6240",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Simple validation rules
    if (!formData.firstName.trim()) {
      errors.firstName = true;
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = true;
      isValid = false;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = true;
      isValid = false;
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      errors.password = true;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    dispatch(register(userData));
    console.log("Register-Data:", userData);
  };

  return (
    <div>
      <div className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        {/* Logo and Header Section */}
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 text-center h-[14rem] flex flex-col items-center justify-center">
          <img src={logo} alt="" className="h-[10rem] w-auto mb-1" />

          <h1
            className="text-2xl font-bold"
            style={{ color: colors.primaryDark }}
          >
            Register
          </h1>
          <p className="text-sm italic text-gray-600 mt-0.5">
            Embrace Effortless Elegance
          </p>
        </div>

        {/* Rest of the code remains the same */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-2 space-y-2">
          {/* Form inputs remain unchanged */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formErrors.firstName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-pink-200"
                }`}
                placeholder="Enter first name"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  First name is required
                </p>
              )}
            </div>
            {/* Rest of the form remains the same */}
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formErrors.lastName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-pink-200"
                }`}
                placeholder="Enter last name"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  Last name is required
                </p>
              )}
            </div>
          </div>

          {/* Remaining form elements stay the same */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-pink-200"
              }`}
              placeholder="Enter email address"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">
                Valid email is required
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 pr-10 ${
                  formErrors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-pink-200"
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold text-white transition-colors duration-300 ease-in-out"
            style={{
              backgroundColor: colors.primaryMain,
              "&:hover": { backgroundColor: colors.primaryDark },
            }}
          >
            Create Account
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-pink-600 hover:underline font-semibold"
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
