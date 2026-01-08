const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String, // Example: Grocery, Bakery, Electronics
    required: true,
  },
  banner: {
    type: String, // image URL
  },
  image: {
    type: String, //  DP image URL
  },
  loc: {
    type: String,
    required: true,
  },
  subloc:{
    type: String,
    required: true,
  },
  star:{
    type: String,
    default: "4.5",
  },
  description: String,
  map:String,
}, { timestamps: true });

const Vendors = mongoose.model('Vendor',vendorSchema)

module.exports =  Vendors
