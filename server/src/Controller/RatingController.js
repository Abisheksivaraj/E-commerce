const Product = require("../models/ProductModals");
const Rating = require("../Services/RatingServices");

const createRating = async (req, res) => {
  const user = req.user;
  try {
    const review = await Rating.createRating(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllRating = async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;
  try {
    const review = await Rating.getProductRating(productId);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllRating,
  createRating,
};
