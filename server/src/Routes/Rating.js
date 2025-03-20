const express = require("express");
const route = express.Router();

const ratingController = require("../Controller/RatingController");
const authenticate = require("../Middleware/authenticate");

route.get("/product/:productId", authenticate, ratingController.getAllRating);

route.post("/product/:productId", authenticate, ratingController.createRating);

module.exports = route;
