import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/StateAuth/Action";

const Login = () => {
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
  return (
    <div className="rounded-lg p-4 shadow-2xl">
      <p className="text-center text-4xl font-bold  mb-8">Login</p>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              autoComplete="current-password"
              variant="outlined"
              className="bg-white rounded-lg"
            />
          </Grid>
          <Grid item xs={12} className="text-center">
            <Button
              type="submit"
              variant="contained"
              className="px-8 py-3 rounded-full shadow-xl bg-blue-700 hover:shadow-2xl active:translate-y-1 
              text-[navy] transition-all duration-300"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        Don't have an account?{" "}
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </div>
  );
};

export default Login;
