const User = require("../models/UserModals");
const bcrypt = require("bcrypt");
const jwtToken = require("../config/jwtToken");

const registerUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    // Check if the user already exists
    let userIsExist = await User.findOne({ email });
    if (userIsExist) {
      throw new Error(`User Already Exists: ${email}`);
    }

    // Hash the password
    password = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({ firstName, lastName, email, password });
    console.log("Created User:", user);

    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User Not Found:", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const userFindByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(`User Not Found: ${email}`);
    }

    return user;
  } catch (error) {
    console.error("Error finding user:", error.message);
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtToken.getUserIdFromToken(token);
    console.log("Resolved userId:", userId);

    const user = await findUserById(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }
    // console.log("user", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerUser,
  findUserById,
  userFindByEmail,
  getUserProfileByToken,
  getAllUsers,
};
