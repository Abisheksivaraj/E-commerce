const userService = require("../Services/UserServices");
const jwtToken = require("../config/jwtToken");
const cartService = require("../Services/CartServices");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);

    const token = jwtToken.generateToken(user._id);
    await cartService.createCart(user);

    res.status(201).json({ token, message: "Registration Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Attempt:", { email, password });

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await userService.userFindByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwtToken.generateToken(user._id);

    console.log("Login Successful for User:", {
      id: user._id,
      email: user.email,
    });

    // Send response with token and success message
    return res.status(200).json({
      token,
      message: "Login Success",
      user: {
        id: user._id,
        email: user.email,
        name: user.name, // Add any additional user info you'd like to send
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports = { register, login };
