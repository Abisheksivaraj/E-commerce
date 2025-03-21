import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { api } from "../../../config/apiConfig";

import ChangePasswordDialog from "../Carousal/Password";
import { getUser, logout } from "../../../State/StateAuth/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/userAddress");
        setProfileData(response.data);
        setLoading(false);
        console.log("profile-data", response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle scroll event to update sidebar position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  // Get user data from profile data if available
  const userAddress = profileData?.addresses?.[0] || {};
  const {
    firstName = "",
    lastName = "",
    street = "",
    city = "",
    state = "",
    country = "",
    postalCode = "",
    MobileNumber = "",
    email = "",
  } = userAddress;

  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : "No Name";
  const fullAddress =
    street && city
      ? `${street}, ${city}, ${state}, ${country} - ${postalCode}`
      : "No address available";
  const initials =
    firstName && lastName ? `${firstName[0]}${lastName[0]}` : "NA";

  if (loading) {
    return <Typography variant="body1">Loading profile data...</Typography>;
  }

  // Calculate maximum height for sidebar to prevent overlap with footer
  const maxContentHeight = "calc(100vh - 48px)"; // Adjust basedon your layout

  const handleLogout = () => {
    // handleCloseUserMenu();
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              position: "sticky",
              top: 24,
              maxHeight: maxContentHeight,
              overflowY: "auto",
            }}
          >
            <Paper
              elevation={1}
              sx={{
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#a35a8f",
                    color: "white",
                    fontSize: "1.5rem",
                    mb: 2,
                  }}
                >
                  {initials}
                </Avatar>
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {email ? `${email}` : "Not available"}
                </Typography>
              </Box>

              <Divider />

              <List component="nav" sx={{ p: 1 }}>
                <ListItemButton selected sx={{ borderRadius: 1 }}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton sx={{ borderRadius: 1 }}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </ListItemButton>

                <ListItemButton sx={{ borderRadius: 1 }}>
                  <ListItemIcon>
                    <ShoppingBagIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>

                <Divider sx={{ my: 2 }} />

                <ListItemButton
                  onClick={handleLogout}
                  sx={{ borderRadius: 1, color: "error.main" }}
                >
                  <ListItemIcon sx={{ color: "error.main" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText onClick={handleLogout} primary="Logout" />
                </ListItemButton>
              </List>
            </Paper>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9} ref={contentRef}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Personal Information */}
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Personal Information</Typography>
                  </Box>
                }
                sx={{ borderBottom: 1, borderColor: "divider" }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#a35a8f", mr: 2 }}>
                        <PersonIcon color="white" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Full Name
                        </Typography>
                        <Typography variant="body1">{fullName}</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#a35a8f", mr: 2 }}>
                        <EmailIcon color="white" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email Address
                        </Typography>
                        <Typography variant="body1">
                          {email ? `${email}` : "Not available"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#a35a8f", mr: 2 }}>
                        <PhoneIcon color="white" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Mobile Number
                        </Typography>
                        <Typography variant="body1">
                          {MobileNumber ? `+${MobileNumber}` : "Not available"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#a35a8f", mr: 2 }}>
                        <LocationOnIcon color="white" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Shipping Address
                        </Typography>
                        <Typography variant="body1">{fullAddress}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SettingsIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Account Settings</Typography>
                  </Box>
                }
                sx={{ borderBottom: 1, borderColor: "divider" }}
              />
              <CardContent>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={handleOpenPasswordDialog}>
                      <ChevronRightIcon />
                    </IconButton>
                  }
                  disablePadding
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemButton onClick={handleOpenPasswordDialog}>
                    <Avatar sx={{ bgcolor: "#a35a8f", mr: 2 }}>
                      <LockIcon color="white" />
                    </Avatar>
                    <ListItemText
                      primary="Change Password"
                      secondary="Update your password regularly"
                    />
                  </ListItemButton>
                </ListItem>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ShoppingBagIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Recent Orders</Typography>
                  </Box>
                }
                action={
                  <Button color="primary" size="small">
                    View All
                  </Button>
                }
                sx={{ borderBottom: 1, borderColor: "divider" }}
              />
              <List sx={{ p: 0 }}>
                <ListItem
                  sx={{
                    py: 2,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body1" fontWeight="medium">
                          #123456
                        </Typography>
                        <Chip
                          label="Delivered"
                          size="small"
                          color="success"
                          sx={{ fontWeight: "medium" }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          10th Aug 2025
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹1,299.00
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>

                <Divider />

                <ListItem
                  sx={{
                    py: 2,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body1" fontWeight="medium">
                          #123455
                        </Typography>
                        <Chip
                          label="Shipped"
                          size="small"
                          color="info"
                          sx={{ fontWeight: "medium" }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          5th Aug 2025
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹2,499.00
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />

                <ListItem
                  sx={{
                    py: 2,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body1" fontWeight="medium">
                          #123455
                        </Typography>
                        <Chip
                          label="Pending"
                          size="small"
                          color="error"
                          sx={{ fontWeight: "medium" }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          5th Aug 2025
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹2,499.00
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        open={openPasswordDialog}
        handleClose={handleClosePasswordDialog}
      />
    </Box>
  );
};

export default ProfilePage;
