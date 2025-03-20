const express = require("express");
const route = express.Router();

const cartController = require("../Controller/CartController");
const authenticate = require("../Middleware/authenticate");

route.get("/getCart", authenticate, cartController.findUserCart);

route.put("/addCart", authenticate, cartController.addItemCart);

module.exports = route;
