const userService = require("../Services/UserServices");

const getUserProfile = async (req, res) => {
  const jwt = req.headers.authorization?.split(" ")[1];
  console.log("Extracted JWT:", jwt);

  if (!jwt) {
    return res.status(404).send({ error: "Token not found" });
  }

  try {
    
    const user = await userService.getUserProfileByToken(jwt);
    console.log("user abi",user);
    
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUsers };
