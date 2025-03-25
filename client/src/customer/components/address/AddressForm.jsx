import React, { useEffect, useState } from "react";
import SavedAddress from "./SavedAddress";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { api } from "../../../config/apiConfig";

const AddressForm = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    MobileNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // State for saved addresses
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user addresses when component mounts
  useEffect(() => {
    const fetchUserAddresses = async () => {
      // Ensure user is authenticated
      if (!auth.user) return;

      setIsLoading(true);
      try {
        const response = await api.get("/userAddress");

        // Ensure savedAddresses is an array
        const addressData = Array.isArray(response.data)
          ? response.data
          : response.data.addresses || [];

        setSavedAddresses(addressData);
        setError(null);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError(err.response?.data?.message || "Failed to fetch addresses");
        setSavedAddresses([]); // Ensure it's an array even on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAddresses();
  }, [auth.user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Form submitted", formData);

    const orderData = { formData, navigate };
    dispatch(createOrder(orderData));
  };

  const handleSelectAddress = (address) => {
    setFormData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      MobileNumber: address.MobileNumber || "",
    });
  };

  return (
    <Box display="flex" justifyContent="space-between" gap={4} p={4}>
      {/* Saved Address Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 2,
          padding: 2,
          maxWidth: "40%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Saved Addresses
        </Typography>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : savedAddresses.length === 0 ? (
          <Typography variant="body2">No saved addresses</Typography>
        ) : (
          <Box
            sx={{
              overflowY: "auto",
              height: "100%",
            }}
          >
            {savedAddresses.map((address, index) => (
              <Box
                key={index}
                onClick={() => handleSelectAddress(address)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <SavedAddress address={address} />
              </Box>
            ))}
            <Button sx={{ mt: 2, bgcolor: "#a35a8f", color: "white" }}>
              Deliver Here
            </Button>
          </Box>
        )}
        <Button sx={{ mt: 2, bgcolor: "#a35a8f", color: "white" }}>
          Deliver Here
        </Button>
      </Box>

      {/* Delivery Address Form */}
      <Box flex={2} p={4} bgcolor="white" borderRadius={2} boxShadow={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Delivery Address
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Name and Last Name */}
            {[
              {
                name: "firstName",
                label: "First Name",
                value: formData.firstName,
              },
              {
                name: "lastName",
                label: "Last Name",
                value: formData.lastName,
              },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}

            {/* Street Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                name="street"
                label="Street Address"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* City and State */}
            {[
              { name: "city", label: "City", value: formData.city },
              { name: "state", label: "State", value: formData.state },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}

            {/* Postal Code and Mobile Number */}
            {[
              {
                name: "postalCode",
                label: "Postal Code",
                value: formData.postalCode,
              },
              {
                name: "MobileNumber",
                label: "Mobile Number",
                value: formData.MobileNumber,
              },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Deliver To This Address
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddressForm;
