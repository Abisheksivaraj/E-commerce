const CartItems = require("../models/CartItemModals");
const userService = require("./UserServices");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await CartItems.findById(cartItemId).populate("product");

    if (!item) {
      throw new Error(`CartItem not found with ID: ${cartItemId}`);
    }

    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error(`User not found with ID: ${userId}`);
    }

    if (user._id.toString() === userId.toString()) {
      if (
        !item.product ||
        typeof item.product.price !== "number" ||
        typeof item.product.discountedPrice !== "number"
      ) {
        throw new Error("Product details are invalid or missing.");
      }

      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("You are not the owner of this item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
    return await CartItems.findByIdAndDelete(cartItemId);
  }
  throw new Error("you cant remove another user item");
}

// async function findCartItemById(cartItemId) {
//   const cartItem = await CartItems.findById(cartItemId).populate("product");
//   if (cartItem) {
//     return cartItem;
//   } else {
//     throw new Error(`cartItem not found with this id: ${cartItemId}`);
//   }
// }

async function findCartItemById(cartItemId) {
  const cartItem = await CartItems.findById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not found with this id:", cartItemId);
  }
}

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
