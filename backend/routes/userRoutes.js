const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  logUserIn,
  getUser,
} = require("../Controllers/UserController");

const router = express.Router();

// register user
router.post("/", registerUser);
// log user in
router.post("/login", logUserIn);
// get user details
router.get("/me", protect, getUser);

module.exports = router;
