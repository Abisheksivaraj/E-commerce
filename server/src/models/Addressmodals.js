const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true, // Street is required
    trim: true, // Removes extra spaces
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
  },
});

const Address = mongoose.model("address", addressSchema);

module.exports = Address;
