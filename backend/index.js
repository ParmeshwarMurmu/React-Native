require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.post("/payment", (req, res)=>{
    console.log("Making Payment")
    res.status(200).json({res:"payment success"});
})
app.listen(process.env.PORT, () => {
  console.log(`BACKEND IS RUNNING ON PORT ${process.env.PORT}`);
});
