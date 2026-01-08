const jwt = require("jsonwebtoken");
require('dotenv').config()
const Vendor = require('./models/VendorModel')

const jwtAuth = async (req, res, next) => {
  const authorize = req.headers.authorization;
  if (!authorize) {
    return res.status(401).json({ error: "Token not Found!" });
  }

  const token = authorize.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret_key = process.env.SECRET_KEY;
    const decode = jwt.verify(token, secret_key);

    // Normalize user object so both `id` and `_id` are available
    req.user = {
      ...decode,
      id: decode.id || decode._id,      
      _id: decode._id || decode.id,    
      role: decode.role,
    };

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token!" });
  }
};



const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1h'})
}

const vendorOnly = (req, res, next) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ error: "Access denied, vendor only" });
  }
  next();
};

module.exports = {jwtAuth,generateToken,vendorOnly}