const express = require("express");
const route = express.Router();

const orderController = require("../Controller/OrderController");
const authenticate = require("../Middleware/authenticate");
const Address = require("../models/Addressmodals");

route.post("/newOrder", authenticate, orderController.createOrder);

route.get("/user", authenticate, orderController.orderHistory);

route.get("/userAddress", authenticate, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });

    if (!addresses || addresses.length === 0) {
      return res.status(200).json({ addresses: [] });
    }

    res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Server error while fetching addresses" });
  }
});

route.get("/order/:id", authenticate, orderController.findOrderById);

module.exports = route;
