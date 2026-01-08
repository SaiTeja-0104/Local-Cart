const mongoose = require('mongoose')

const ProductModel = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  category: {
    type: String, // Grocery, Handmade, Electronics
    required: true,
  },
  bestSeller: {
    type: Boolean, 
    default: false,
  },
  images: {
    type: [String], // Defines an array of strings
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  units:{
    type: String, // kg, litre, pieces
    default: "pieces",
  }
}, { timestamps: true });

const Product = mongoose.model("Product",ProductModel)

module.exports =  Product