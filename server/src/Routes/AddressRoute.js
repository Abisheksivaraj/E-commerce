const express = require("express");
const route = express.Router();
const Address = require("../models/Addressmodals"); // Adjust the path as needed
const authenticate = require("../Middleware/authenticate");

route.get("/userAddress", authenticate, async (req, res) => {
  try {
    // Fetch addresses for the authenticated user
    const addresses = await Address.find({ user: req.user._id });

    if (!addresses || addresses.length === 0) {
      return res
        .status(404)
        .json({ message: "No addresses found for this user" });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching user addresses:", error);
    res.status(500).json({
      message: "Server error while fetching addresses",
      error: error.message,
    });
  }
});

// Route to get a specific address by ID
route.get("/:addressId", authenticate, async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.addressId,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error("Error fetching specific address:", error);
    res.status(500).json({
      message: "Server error while fetching address",
      error: error.message,
    });
  }
});

// Route to get addresses with pagination and filtering
route.get("/", authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    // Optional filtering
    const filter = { user: req.user._id };
    if (req.query.city) filter.city = req.query.city;
    if (req.query.state) filter.state = req.query.state;

    const totalAddresses = await Address.countDocuments(filter);

    const addresses = await Address.find(filter)
      .sort({ createdAt: -1 }) // Most recent first
      .limit(limit)
      .skip(skipIndex);

    res.status(200).json({
      addresses,
      totalPages: Math.ceil(totalAddresses / limit),
      currentPage: page,
      totalAddresses,
    });
  } catch (error) {
    console.error("Error fetching paginated addresses:", error);
    res.status(500).json({
      message: "Server error while fetching addresses",
      error: error.message,
    });
  }
});

module.exports = route;
