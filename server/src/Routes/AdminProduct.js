const express = require("express");
const route = express.Router();

const productController = require("../Controller/ProductController");
const authenticate = require("../Middleware/authenticate");

route.post("/newProduct", authenticate, productController.createProduct);

route.post("/addMultipleProducts", authenticate, productController.createMultipleProducts);

route.put("/updateProduct/:id", authenticate, productController.updateProduct);

route.delete("/deleteProduct/:id/delete", authenticate, productController.deleteProduct);

module.exports = route;
