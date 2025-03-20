const Rating = require("../models/RatingModal");
const productService = require("../Services/ProductService");

async function createRating(req, user) {
  // Validate product existence
  const product = await productService.findProductById(req.productId);

  // Create a new rating
  const rating = new Rating({
    userId: user._id,
    productId: product._id,
    rating: req.rating,
    createdAt: new Date(),
  });

  // Save the rating
  return await rating.save();
}

async function getProductRating(productId) {
  // Fetch ratings for the product
  return await Rating.find({ productId });
}

module.exports = {
  createRating,
  getProductRating,
};
