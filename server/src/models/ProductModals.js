const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  image: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
