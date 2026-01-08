const express = require("express");
const router = express.Router()
const Product = require('../models/ProductModel.js')
const Cart = require('../models/CartModel.js')
const Order = require('../models/OrderModel.js')
const Vendor = require('../models/VendorModel.js')
const {jwtAuth,vendorOnly} = require('../jwt.js')

const deliveryFee = 9; 

router.post("/create", jwtAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Prepare products array for order
    const products = cart.items.map(item => ({
      product: item.product,
      quantity: item.quantity
    }));

    // Calculate total price
    const totalPrice =
      cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) +
      deliveryFee;

    // Initialize vendorStatuses for each vendor in the order
    const vendorStatuses = [...new Set(cart.items.map(item => item.product.vendor))].map(vendorId => ({
      vendor: vendorId, 
      status: "pending"
    }));

    const order = await Order.create({
      user: req.user.id,
      products,
      totalPrice,
      details: req.body.details,
      vendorStatuses
    });


    // Clear user's cart
    cart.items = [];
    await cart.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /order/my
router.get("/my", jwtAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product");

    const formattedOrders = orders.map(order => ({
      ...order.toObject(),
      vendorStatuses: order.vendorStatuses.map(vs => ({
        vendor: vs.vendor,
        status: vs.status,
      }))
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/vendor", jwtAuth, vendorOnly, async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user.id });
    console.log(vendor)
    const vendorId = vendor._id.toString();

    // Fetch orders where this vendor has products
    const orders = await Order.find({ "vendorStatuses.vendor": vendorId })
      .populate("products.product");

    const vendorOrders = orders.map(order => {
      const vendorStatusEntry = order.vendorStatuses.find(
        vs => vs.vendor.toString() === vendorId
      );

      // Only include products owned by this vendor
      const vendorProducts = order.products.filter(
        p => p.product.vendor.toString() === vendorId
      );

      return {
        _id: order._id,
        createdAt: order.createdAt,
        details: order.details,
        totalPrice: vendorProducts.reduce((sum, p) => sum + p.product.price * p.quantity, 0),
        products: vendorProducts,
        currentVendorStatus: vendorStatusEntry?.status || "pending",
      };
    }).filter(order => order.products.length > 0); // filter out orders with no products

    res.json(vendorOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});






const allowedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

router.put("/status/:orderId", jwtAuth, vendorOnly, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Find vendor linked to logged-in user
    const vendorDoc = await Vendor.findOne({ user: req.user.id });
    if (!vendorDoc) {
      return res.status(403).json({ error: "Vendor profile not found" });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Match vendorStatuses by vendor _id
    const vendorStatus = order.vendorStatuses.find(
      (vs) => vs.vendor.toString() === vendorDoc._id.toString()
    );

    if (!vendorStatus) {
      return res.status(403).json({ error: "You are not part of this order" });
    }

    // Update vendor-specific status
    vendorStatus.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router