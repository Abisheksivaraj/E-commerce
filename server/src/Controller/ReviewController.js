const Product = require("../models/ProductModals");
const Review = require("../Services/ReviewServices");

const createReview = async (req, res) => {
  const user = req.user;
  try {
    const review = await Review.createReview(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllReview = async (req, res) => {
  const productId = req.params.productId
  const user = req.user;
  try {
    const review = await Review.getAllReviews(productId);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};



module.exports = {
  getAllReview,
  createReview,
};