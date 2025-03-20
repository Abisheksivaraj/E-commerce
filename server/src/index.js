const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Be specific about the origin instead of "*"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome" });
});

const AuthRoutes = require("./Routes/Auth");
const UserRoutes = require("./Routes/User");
const ProductRoute = require("./Routes/Product");
const OrderRoute = require("./Routes/Order");
const ReviewRoute = require("./Routes/Review");
const RatingRoute = require("./Routes/Rating");
const Cart = require("./Routes/Cart");
const CartItem = require("./Routes/CartItem");
const AdminRoute = require("./Routes/AdminOrder");
const AdminProductRoute = require("./Routes/AdminProduct");

const PaymentRoute = require("./Routes/Payment");

app.use(Cart);
app.use(CartItem);
app.use(RatingRoute);
app.use(ReviewRoute);
app.use(AdminProductRoute);
app.use(OrderRoute);
app.use(AdminRoute);
app.use(ProductRoute);
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(PaymentRoute);

module.exports = app;
