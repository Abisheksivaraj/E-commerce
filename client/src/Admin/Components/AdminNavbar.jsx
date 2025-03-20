import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import logo from "../../assets/logo.png";

export default function AdminNavbar() {
  const [isLoginPage, setIsLoginPage] = useState(false);

  const handleTogglePage = () => {
    setIsLoginPage((prev) => !prev);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black" }}
            >
              <div className="">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img alt="" src={logo} className="h-[4rem] mt-3 w-auto" />
                </a>
              </div>
            </Typography>
            <div className="flex items-center gap-3">
              <p className="text-black font-medium">
                {isLoginPage ? "New user?" : "Already an admin?"}
              </p>
              <Button
                onClick={handleTogglePage}
                sx={{ backgroundColor: "#190758", color: "white" }}
              >
                {isLoginPage ? "Register" : "Login"}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#190758",
        }}
      >
        {isLoginPage ? <AdminLogin /> : <AdminRegister />}
      </Box>
    </div>
  );
}
