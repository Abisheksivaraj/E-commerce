const path = require("path");
const connectDb = require("./config/db");
const app = require("./index");
require("dotenv").config({ path: "./server/.env" });

const PORT = process.env.PORT; // or any other available port

app.listen(PORT, async () => {
  await connectDb();
  console.log("Website is Running on:" + PORT);
});
