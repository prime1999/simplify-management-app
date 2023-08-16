const asynchandler = require("express-async-handler");
const user = require("../Models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
const registerUser = asynchandler(async (req, res) => {
  // get user information form the request body
  const { name, email, password, pic } = req.body;
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
    pic,
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
      name: User.name,
      email: User.email,
      pic: User.pic,
      token: generateToken(User._id),
    });
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

// search user
const searchUsers = asynchandler(async (req, res) => {
  // get the keyword from the search query
  const keyword = req.query.search;
  // if there is no keyword, throw error message
  if (!keyword) {
    res.status(401);
    throw new Error("Invalid search");
  }
  // make a try-catch block
  try {
    // find users based on there name and email exceopt from the current user
    const users = await user
      .find({
        $and: [
          // check if the key word matches the name or email
          {
            $or: [
              // use a regex to make the keyword case insensitive
              { name: { $regex: keyword, $options: "i" } },
              { email: { $regex: keyword, $options: "i" } },
            ],
          },
          // check if the id of ther user is not equal to that of the current user
          { _id: { $ne: req.user._id } },
        ],
      })
      .select("-password") // Exclude the password field
      .exec();
    // send the users/user found to the frontend
    res.status(200);
    res.send(users);
  } catch (error) {
    // if there is an error in the try block, throw the error message
    res.status(400);
    throw new Error("User not found");
  }
});

const getUsers = asynchandler(async (req, res) => {
  // make try-catch block
  try {
    // find all usersin the users collection
    const users = await user.find();
    // if no users was found, then throw error message
    if (!users) {
      throw new Error("No Users Found");
    }
    // send the users found to the frontend
    res.status(200);
    res.json(users);
  } catch (error) {
    // if there is any error in the try block then throw the error message
    res.status(401);
    throw new Error(error.message);
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
  getUsers,
  getUser,
  searchUsers,
};
