const express = require("express");

const authenticate = require("../Middleware/authenticate.js")
const route = express.Router();
const paymentController = require("../Controller/PaymentController.js");


route.post("/payment/:id",authenticate,paymentController.createPaymentLink)

route.get("/getPayment", authenticate, paymentController.updatePaymentInformation);


module.exports = route;