const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vendor_shops", // Cloudinary folder
    allowedFormats: ["jpg", "jpeg", "png"], // v1 uses allowedFormats
  },
});


// const storage = multer.memoryStorage();/ // store files in memory before uploading to Cloudinary
const upload = multer({ storage });

module.exports = upload;
