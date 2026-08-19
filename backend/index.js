require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();
app.use(cors())
app.use((express.json()));

const razorpay = new Razorpay({
key_id : process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET
});


app.post("/create-order", async(req, res)=>{
    try {
      const { amount } = req.body;
      const options = {
        amount : amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: ` receipt_${Date.now()}`
      }
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      console.log("Order creation error:", error);
      res.status(500).json({error: "Failed to create order"})
    }
})
app.listen(process.env.PORT, () => {
  console.log(`BACKEND IS RUNNING ON PORT ${process.env.PORT}`);
});
