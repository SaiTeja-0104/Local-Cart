const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    details: {
      name: String,
      email: String,
      address: String,
      phone: String,
      method: String, // Cash on Delivery / Online
    },
    vendorStatuses: [
      {
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
        status: {
          type: String,
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
      },
    ],
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
