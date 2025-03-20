const express = require("express");
const route = express.Router();

const cartItemController = require("../Controller/CartItemController");
const authenticate = require("../Middleware/authenticate");

route.put("/updateCart/:id", authenticate, cartItemController.updateCartItem);

route.delete("/removeCart/:id", authenticate, cartItemController.removeCartItem);

module.exports = route;
