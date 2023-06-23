const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const user = require("../Models/UserModels");

const protect = asynchandler(async (req, res, next) => {
  // initialize the token
  let token;
  // check to see if the token is sent
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from the authorization field
      token = req.headers.authorization.split(" ")[1];
      // verify if the token is valid and get the user's id from it
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      // assign the user details into the rer.user
      req.user = await user.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      // throw an error of 401 (not authorized) if there is an error
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  // throw error of 401 if there is no token
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect };
