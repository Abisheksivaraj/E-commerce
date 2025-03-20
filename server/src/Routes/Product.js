const express = require("express");
const route = express.Router();

const productController = require("../Controller/ProductController");
const authenticate = require("../Middleware/authenticate");
const Product = require("../models/ProductModals");

route.get("/allProducts", authenticate, productController.getAllProducts);

route.get("/product/id/:id", authenticate, productController.findProductById);

// route.get("/search", async (req, res) => {
//   try {
//     const { query } = req.query; // Extract the search query from the URL
//     if (!query) {
//       return res.status(400).json({ message: "Query parameter is required" });
//     }

//     const products = await Product.find({
//       $or: [
//         { title: { $regex: query, $options: "i" } },
//         { brand: { $regex: query, $options: "i" } },
//         { color: { $regex: query, $options: "i" } },
//         { price: !isNaN(Number(query)) ? Number(query) : undefined },
//       ].filter(Boolean), // Remove undefined conditions
//     });

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = route;
