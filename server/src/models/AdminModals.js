const mongoose = require("mongoose");

const adminAuthSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminAuth = mongoose.model("admins", adminAuthSchema);

module.exports = AdminAuth;
