const Cart = require("../models/CartModals");
const Product = require("../models/ProductModals");
const CartItems = require("../models/CartItemModals");

async function createCart(user) {
  try {
    const cart = new Cart({ user  });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(user) {
  try {
    let cart = await Cart.findOne({ user: user });
    const cartItems = await CartItems.find({ cart: cart._id }).populate(
      "product"
    );
    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    // Calculate totals
    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    // Update cart totals
    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discountedPrice = totalPrice - totalDiscountedPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);
    console.log(product);

    const isPresent = await CartItems.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItems({
        cart: cart._id,
        product: product._id,
        userId,
        quantity: 1,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      cart.save;
      return createdCartItem;
    }

    return isPresent;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createCart,
  findUserCart,
  addCartItem,
};
