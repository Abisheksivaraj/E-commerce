const cartService = require("../Services/CartServices.js");

// const findUserCart = async (req, res) => {
//   try {
//     const user = await req.user;

//   //   const cart = await cartService.findUserCart(user._id);
//   //   console.log(cart);

//   //   return res.status(200).send(cart);
//   // } catch (error) {
//   //   console.error(error);
//   //   return res.status(500).send(error.message);
//   // }
// };

const findUserCart = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartService.findUserCart(user._id);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addItemCart = async (req, res) => {
  const user = req.user;
  try {
    const cartItem = await cartService.addCartItem(user._id, req.body);
    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// const addItemCart = async (req, res) => {
//   const userId = req.body.userId; // Pass userId in the request body for testing
//   try {
//     if (!userId) {
//       return res.status(400).send("User ID is required.");
//     }

//     const cartItem = await cartService.addCartItem(userId, req.body);
//     return res.status(200).send(cartItem);
//   } catch (error) {
//     console.error("Error in addItemCart:", error.message);
//     return res.status(500).send(error.message);
//   }
// };

module.exports = {
  addItemCart,
  findUserCart,
};
