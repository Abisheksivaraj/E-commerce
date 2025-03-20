const orderController = require("../Controller/AdminOrderController");
const authenticate = require("../Middleware/authenticate");
const express = require("express");
const route = express.Router();

route.get("/getOrder", authenticate, orderController.getAllOrders);

route.get("/:orderId/confirmed", authenticate, orderController.confirmOrder);

route.get("/:orderId/ship", authenticate, orderController.shipOrder);

route.get("/:orderId/deliverd", authenticate, orderController.deliverOrder);

route.get("/:orderId/cancelled", authenticate, orderController.cancelOrder);
route.get("/:orderId/delete", authenticate, orderController.deleteOrder);

module.exports = route;
