import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "", // email or mobile number
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:2288/adminLogin`, // Make sure this endpoint is correctly set up
        formData
      );
      console.log("Login Successful:", response.data);
      navigate("/admin/dashboard"); // Redirect to admin dashboard on success
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response ? error.response.data.error : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#190758",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="identifier"
                name="identifier"
                label="Enter email "
                fullWidth
                value={formData.identifier} // Bind value to the state
                onChange={handleChange} // Handle input changes
                autoComplete="username"
                variant="outlined"
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
                value={formData.password} // Bind value to the state
                onChange={handleChange} // Handle input changes
                autoComplete="current-password"
                variant="outlined"
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  padding: "10px 20px",
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "#190758",
                }}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;
