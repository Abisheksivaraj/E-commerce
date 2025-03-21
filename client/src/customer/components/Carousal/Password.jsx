import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { api } from "../../../config/apiConfig";

const steps = ["Verify Identity", "Enter OTP", "Update Password"];

const ChangePasswordDialog = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("johndoe@example.com");
  const [mobile, setMobile] = useState("+91 9876543210");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      await api.post("/send-otp", { email, mobile });
      setOtpSent(true);
      setActiveStep(1);
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      await api.post("/verify-otp", { email, otp });
      setActiveStep(2);
    } catch (error) {
      setError("Invalid OTP. Please try again.");
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    // Validate passwords
    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      await api.post("/update-password", {
        email,
        otp,
        newPassword,
      });

      // Reset the state and close the dialog
      setActiveStep(0);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setOtpSent(false);
      handleClose();
    } catch (error) {
      setError("Failed to update password. Please try again.");
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      handleSendOtp();
    } else if (activeStep === 1) {
      handleVerifyOtp();
    } else if (activeStep === 2) {
      handleUpdatePassword();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError("");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <DialogContentText>
              To change your password, we need to verify your identity. We'll
              send an OTP to your registered email and mobile number.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Mobile Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={loading}
            />
          </>
        );
      case 1:
        return (
          <>
            <DialogContentText>
              We've sent a one-time password (OTP) to your email and mobile
              number. Please enter it below.
            </DialogContentText>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 2,
              }}
            >
              <TextField
                margin="dense"
                label="Enter OTP"
                type="text"
                fullWidth
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                sx={{ mb: 2 }}
              />
              <Button
                color="primary"
                onClick={handleSendOtp}
                disabled={loading}
                variant="text"
              >
                Resend OTP
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <DialogContentText>
              Please enter your new password.
            </DialogContentText>
            <TextField
              margin="dense"
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <LockIcon color="primary" sx={{ mr: 1 }} />
        Change Password
      </DialogTitle>
      <Divider />

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 2, pb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "error.light",
              color: "error.dark",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Paper>
        )}

        {renderStepContent(activeStep)}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={loading}>
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {activeStep === steps.length - 1
            ? "Update Password"
            : activeStep === 0
            ? "Send OTP"
            : "Verify"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
