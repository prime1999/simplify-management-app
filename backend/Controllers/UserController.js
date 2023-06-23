const asynchandler = require("express-async-handler");
const user = require("../Models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
const registerUser = asynchandler(async (req, res) => {
  // get user information form the request body
  const { name, email, password } = req.body;
  // check if any of the fields are empty
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please fill in all fields");
  }
  // check if user already exist
  const userExist = await user.findOne({ email });

  // Throw an error if user already exist
  if (userExist) {
    res.status(404);
    throw new Error("User already exist");
  }
  //generate a salt
  const salt = await bcrypt.genSalt(10);
  //hash password
  const hashedpassword = await bcrypt.hash(password, salt);

  //create user
  const User = await user.create({
    name,
    email,
    password: hashedpassword,
  });

  // send user details to the client with the token
  if (User) {
    // turn the user from a Mongoose document to a plain javascript object so as the toObject() can work on it
    const userObject = User.toObject();
    // getting the properties of the userObject except from the password and storing them into the userLogin constant
    const { password, ...userLogIn } = userObject;
    // adding the user token to the user details
    userLogIn.token = generateToken(userLogIn._id);
    // send the userLogin to the frontend
    res.status(201).json(userLogIn);
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

// log userin
const logUserIn = asynchandler(async (req, res) => {
  // get details used to log in by the user
  const { email, password } = req.body;
  // check if any of the fields are empty
  if (!email || !password) {
    res.status(404);
    throw new Error("Please fill in all fields");
  }

  // get user from the users collection in the database
  const User = await user.findOne({ email });

  // if user then check if the password is correct
  if (User && (await bcrypt.compare(password, User.password))) {
    res.status(200).json({
      id: User._id,
      email: User.email,
      token: generateToken(User._id),
    });
  } else {
    re.status(401);
    throw new Error("Not Authorized");
  }
});

// get user details
const getUser = asynchandler(async (req, res) => {
  // turn the user from a Mongoose document to a plain javascript object so as the toObject() can work on it
  const userObject = req.user.toObject();
  // getting the properties of the userObject except from the password and storing them into the userLogin constant
  const { password, ...userLogIn } = userObject;
  // send the user details back to the frontend
  res.status(200).json(userLogIn);
});

const generateToken = (_id) => {
  // generate a token using the user id (the _id argument) and the secret then set the token expiring date
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};

module.exports = {
  registerUser,
  logUserIn,
  getUser,
};
