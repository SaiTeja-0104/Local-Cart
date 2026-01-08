const express = require("express");
const router = express.Router();
// const cloudinary = require("../config/cloudinary");
const Product = require("../models/ProductModel");
const Vendors = require("../models/VendorModel");
const {jwtAuth,vendorOnly} = require('../jwt.js')

/**
 * Create vendor profile (only if role = vendor)
 */
router.post('/create', jwtAuth,vendorOnly,async (req, res) => {
  try {
      const existingVendor = await Vendors.findOne({ user: req.user.id });
      if (existingVendor) {
        return res.status(400).json({ message: "This vendor already has a shop." });
      }

      const vendor = new Vendors({
      user: req.user.id,
      ...req.body,
    });

    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get vendor profile
 */
router.get('/me', jwtAuth, vendorOnly, async (req, res) => {
  try {
    const vendor = await Vendors.findOne({ user: req.user.id });
    if (!vendor) return res.status(404).json({ error: "Vendor profile not found" });

    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update vendor profile
 */
router.put('/me', jwtAuth, vendorOnly, async (req, res) => {
  try {
    const vendor = await Vendors.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Add product (vendor only)
 */
router.post("/addProduct", jwtAuth, vendorOnly, async (req, res) => {
  try {
    const vendor = await Vendors.findOne({ user: req.user.id });

    const product = new Product({
      vendor: vendor._id,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      units: req.body.units,
      bestSeller: req.body.bestSeller,
      images: req.body.images || [], // 👈 URLs directly from frontend
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, msg: "Product added", product: savedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



/**
 * Get vendor products
 */
router.get('/products', jwtAuth, async (req, res) => {
  try {
    const vendor = await Vendors.findOne({ user: req.user.id });
    if (!vendor) return res.status(403).json({ error: "Vendor profile required" });

    const products = await Product.find({ vendor: vendor._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Public: Get all vendors
 */
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendors.find().populate();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Public: Get vendor products by vendorId
 */
router.get('/:vendorId/products', async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.params.vendorId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

