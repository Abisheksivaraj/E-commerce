const Review = require("../models/ReviewModals");
const ProductServices = require("../Services/ProductService");

async function createReview(reqData, user) {
  const product = await ProductServices.findProductById(reqData.productId);

  const review = new Review({
    user: user._id,
    product: product._id,
    review: reqData.review,
    createdAt: new Date(),
  });
  await product.save();
  return await review.save();
}

async function getAllReviews(productId) {
  const product = await ProductServices.findProductById(reqData.productId);

  return await Review.find({ product: productId }).populate("user");
}

module.exports = {
  createReview,
  getAllReviews,
};
