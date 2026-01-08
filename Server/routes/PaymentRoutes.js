const express = require("express")
const Stripe = require("stripe")
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 
const deliveryFee = 9;
const frontendUrl = "https://localcart-sclient.onrender.com"

// routes/payment.js
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { details, amount } = req.body;
    const totalAmt = parseInt(amount) * 100 + deliveryFee*100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Order Payment",
            },
            unit_amount: totalAmt,
          },
          quantity: 1,
        },
      ],
      // Pass session_id back in the URL
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/failed`,
      metadata: details,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/check-session", async (req, res) => {
  try {
    const { session_id } = req.query; // 👈 Comes from frontend
    if (!session_id) {
      return res.status(400).json({ success: false, message: "Session ID required" });
    }

    // ✅ Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      return res.json({
        success: true,
        session, // contains metadata
      });
    } else {
      return res.json({
        success: false,
        session,
      });
    }
  } catch (error) {
    console.error("Stripe check-session error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
