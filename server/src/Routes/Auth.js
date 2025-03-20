const express = require("express");

const route = express.Router();

const AuthController = require("../Controller/AuthController");

route.post("/signUp", AuthController.register);

route.post("/signIn", AuthController.login);

module.exports = route;
