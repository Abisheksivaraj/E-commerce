import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/StateAuth/Action";
import { useMediaQuery, useTheme } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store.auth);
  const theme = useTheme();

  // Multiple breakpoints for better responsiveness
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
    }
  }, [jwt, auth?.jwt, dispatch]);

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
    <Container maxWidth="sm" className="py-4 md:py-8 lg:py-12">
      <Paper
        elevation={isMdScreen ? 3 : 6}
        className="overflow-hidden transition-all duration-300"
      >
        <Box className="max-w-full mx-auto p-4 sm:p-6 md:p-8 rounded-lg bg-white">
          <Typography
            variant={isSmScreen ? "h5" : "h4"}
            component="h1"
            className="text-center font-bold mb-4 md:mb-6"
          >
            Register
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Grid container spacing={isSmScreen ? 2 : 3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  className="bg-white rounded-lg"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={formErrors.firstName}
                  helperText={
                    formErrors.firstName ? "First name is required" : ""
                  }
                  size={isSmScreen ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  className="bg-white rounded-lg"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={formErrors.lastName}
                  helperText={
                    formErrors.lastName ? "Last name is required" : ""
                  }
                  size={isSmScreen ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="E-mail"
                  fullWidth
                  autoComplete="email"
                  variant="outlined"
                  className="bg-white rounded-lg"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  helperText={formErrors.email ? "Valid email is required" : ""}
                  size={isSmScreen ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  autoComplete="new-password"
                  variant="outlined"
                  className="bg-white rounded-lg"
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  helperText={
                    formErrors.password
                      ? "Password must be at least 6 characters"
                      : ""
                  }
                  size={isSmScreen ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} className="flex justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  className={`w-full ${
                    isSmScreen ? "py-2" : "sm:w-auto py-3"
                  } px-4 sm:px-6 rounded-full 
                  shadow-md hover:shadow-xl active:translate-y-1 bg-blue-700 text-white 
                  transition-all duration-300`}
                  size={isSmScreen ? "medium" : "large"}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>

          <Box className="mt-4 pt-2 text-center flex flex-col sm:flex-row justify-center items-center gap-2">
            <Typography variant="body2" className="text-gray-600">
              Already have an account?
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              size={isSmScreen ? "small" : "medium"}
              className="text-blue-600 min-w-0 p-1"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
