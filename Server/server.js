const express = require("express");
const db = require('./db.js')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors({
  origin: true,         // reflect the request origin
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));


require('dotenv').config()
const port = process.env.PORT || "3000"


const userRoutes = require('./routes/UserRoutes.js')
const VendorRoutes = require('./routes/VendorRoutes.js')
const ProductRoutes = require('./routes/ProductRoutes.js')
const CartRoutes = require('./routes/CartRoutes.js')
const OrderRoutes = require('./routes/OrderRoutes.js')
const PaymentRoutes = require('./routes/PaymentRoutes.js')

app.use('/user',userRoutes)
app.use('/vendor',VendorRoutes)
app.use('/product',ProductRoutes)
app.use('/cart',CartRoutes)
app.use('/order',OrderRoutes)
app.use('/payment',PaymentRoutes)

app.get('/',(req,res)=>{
    res.send("API Working!!")
})
app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
    
})