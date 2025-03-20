const express = require("express");
const route = express.Router();

const reviewController = require("../Controller/ReviewController");
const authenticate = require("../Middleware/authenticate");

route.get("/product/:productId", authenticate, reviewController.getAllReview);

route.post("/product/:productId", authenticate, reviewController.createReview);

module.exports = route;
