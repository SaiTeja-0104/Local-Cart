const express = require("express");
const router = express.Router()
const Cart = require('../models/CartModel.js')
const {jwtAuth} = require('../jwt.js')


// ✅ Add item to cart
router.post("/add", jwtAuth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.json(cart.items); // ✅ return array of items only
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



// ✅ Get user cart
router.get("/", jwtAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart.items);
  } catch (error) {
    console.error("Error in /cart:", error);
    res.status(500).json({ error: "Server error while fetching cart" });
  }
});

// ✅ Remove item from cart
router.delete("/remove/:productId", jwtAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error("Error in /cart/remove:", error);
    res.status(500).json({ error: "Server error while removing from cart" });
  }
});

//Update item quantity
router.put("/update", jwtAuth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if(quantity==0){
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    }
    else{
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found in cart" });
      } 
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    await cart.save();

    res.json(cart.items); // ✅ return updated items array
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
