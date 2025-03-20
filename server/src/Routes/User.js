const express = require("express");

const route = express.Router();

const UserController = require("../Controller/UserController");

route.get("/profile", UserController.getUserProfile);

route.get("/getAllUsers", UserController.getAllUsers);

module.exports = route;
