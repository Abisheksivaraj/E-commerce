const connectDb = require("./config/db");
const app = require("./index");
require("dotenv").config();
const PORT = 2288

app.listen(PORT,async()=>{
  await connectDb();
  console.log("Website is Running on:"+PORT);
  
})