const jwtToken = require("../config/jwtToken");

const userService = require("../Services/UserServices");

// const authenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

   
//     if (!token) {
//       return res.status(404).send({ error: "token not found..." });
//     }
//     const userId = jwtToken.getUserIdFromToken(token);
//     const user = userService.findUserById(userId);
//     req.user = user;
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
//   next();
// };


const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(404).send({ error: "Token not found" });
    }

    const userId = jwtToken.getUserIdFromToken(token);
    const user = await userService.findUserById(userId); 

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = authenticate;
