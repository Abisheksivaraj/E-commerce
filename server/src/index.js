const express = require("express");
const cors = require("cors");

const app = express();

// Increase the JSON payload size limit to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
      origin: "https://casual-lit-tees.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// If you actually have static files on this server that need serving
// If not, you can remove this block
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
      if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
        res.setHeader("Content-Type", "image/jpeg");
      }
      if (path.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      }
    },
  })
);

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
const BannerRoute = require("./Routes/Banner");

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
app.use(BannerRoute);

module.exports = app;
