const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  logUserIn,
  getUser,
  searchUsers,
  getUsers,
} = require("../Controllers/UserController");

const router = express.Router();

// register user
router.post("/", registerUser);
// log user in
router.post("/login", logUserIn);
// get user details
router.get("/me", protect, getUser);
// search user details
router.get("/", protect, searchUsers);
// get Users
router.get("/users", protect, getUsers);

module.exports = router;
