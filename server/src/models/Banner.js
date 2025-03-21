const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Banner", BannerSchema);
