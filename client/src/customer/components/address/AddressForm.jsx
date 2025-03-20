import React, { useState } from "react";
import SavedAddress from "./SavedAddress";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Form submitted", formData);

    const orderData = { formData, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <Box display="flex" justifyContent="space-between" gap={4} p={4}>
      {/* Saved Address Section */}
      <Box flex={1} p={3} bgcolor="white" borderRadius={2} boxShadow={2}>
        <Typography variant="h6" gutterBottom>
          Saved Address
        </Typography>
        <Box maxHeight={400} overflow="auto">
          {auth.user?.address.map((item, index) => (
            <SavedAddress key={index} address={item} />
          ))}
        </Box>
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
