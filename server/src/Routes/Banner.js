const express = require("express");
const Banner = require("../models/Banner");
const mongoose = require("mongoose");

const route = express.Router();

// Set a consistent ID for all banners
const BANNER_ID = new mongoose.Types.ObjectId();

// Upload Banner (Base64)
route.post("/upload", async (req, res) => {
  try {
    const { image, imageName } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Get banner count to determine the image number
    const bannerCount = await Banner.countDocuments();

    if (bannerCount >= 5) {
      return res
        .status(400)
        .json({ error: "Maximum number of banners reached" });
    }

    // Use the consistent ID but with a suffix for uniqueness in database
    const uniqueId = BANNER_ID + `-${bannerCount + 1}`;

    const newBanner = new Banner({
      _id: uniqueId,
      image: image,
      name: imageName || `image ${bannerCount + 1}`,
    });

    await newBanner.save();

    res.json({
      message: "Banner uploaded successfully",
      banner: newBanner,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Banners
route.get("/banners", async (req, res) => {
  try {
    // Sort banners to maintain the order
    const banners = await Banner.find().sort({ name: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

// Delete a Banner
route.delete("/banners/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);

    // After deletion, renumber the remaining banners
    const remainingBanners = await Banner.find().sort({ name: 1 });

    // Update the names to ensure sequential numbering
    for (let i = 0; i < remainingBanners.length; i++) {
      await Banner.findByIdAndUpdate(remainingBanners[i]._id, {
        name: `image ${i + 1}`,
      });
    }

    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

module.exports = route;
