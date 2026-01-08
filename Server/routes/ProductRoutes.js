const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel.js");
const Vendors = require("../models/VendorModel.js");
const { jwtAuth,vendorOnly } = require("../jwt.js");

/**
 * Public: Get all products
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Public: Get single product by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate();
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Vendor Only: Delete product
 */
router.delete("/:id", jwtAuth,vendorOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // check vendor ownership
    const vendor = await Vendors.findOne({ user: req.user.id });
    if (!vendor || product.vendor.toString() !== vendor._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully",success:true });
  } catch (err) {
    res.status(500).json({ message: err.message,success:false });
  }
});

module.exports = router;
