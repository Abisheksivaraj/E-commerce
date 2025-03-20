const express = require("express");
const route = express.Router();

const orderController = require("../Controller/OrderController");
const authenticate = require("../Middleware/authenticate");

route.post("/newOrder", authenticate, orderController.createOrder);

route.get("/user", authenticate, orderController.orderHistory);

route.get("/order/:id", authenticate, orderController.findOrderById);

module.exports = route;
