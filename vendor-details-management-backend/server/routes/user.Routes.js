// Importing required modules and dependencies.
const express = require("express");
const { UserModal } = require("../models/UserModal"); // Importing the UserModal schema/model.
const jwt = require("jsonwebtoken"); // JWT token handling for authentication.
require("dotenv").config(); // Loading environment variables.
const bcrypt = require("bcrypt"); // Password hashing module.
const userRouter = express.Router(); // Creating an Express router for user-related routes.

// Route for Google Authentication.
userRouter.post("/gAuth", async (req, res) => {
  // Destructuring data from the request body.
  const { name: firstName, email, picture: image } = req.body;
  
  try {
    // Check if the user exists based on the provided email.
    const findUser = await UserModal.findOne({ email });

    let user;

    if (!findUser) {
      // If user doesn't exist, create a new user with Google data.
      user = new UserModal({ firstName, email, image });
      await user.save();
    } else {
      // If user exists, update the image for the user.
      user = await UserModal.findOneAndUpdate({ email }, { image });
    }

    // Create a JWT token for the user.
    const token = jwt.sign(
      {
        userID: user?._id || findUser?._id,
        userEmail: email,
        userName: firstName,
      },
      "Rinkesh" // Use a secure secret for signing the token.
    );

    // Send JSON response with token and user details.
    res.json({
      msg: "User Logged In.",
      already_registered: findUser ? "Old User" : "New User",
      user: user || findUser,
      token,
    });
  } catch (error) {
    // Handle any errors that occur during the process.
    res.status(400).json({ msg: error.message });
  }
});

// Route to fetch user details based on the token provided.
userRouter.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    // Verify the token and decode the information.
    const decoded = jwt.verify(token, "Rinkesh");

    // Find the user based on the decoded user ID.
    const findUser = await UserModal.findOne({ _id: decoded.userID });

    if (findUser) {
      // If user is found, send success message and user details.
      res.json({ msg: "success", user: findUser });
    } else {
      // If user is not found, prompt for re-login.
      res.json({ msg: "Something went wrong. Login again." });
    }
  } catch (error) {
    // Handle any errors that occur during the process.
    res.status(400).json({ msg: error.message });
  }
});

// Route for user signup.
userRouter.post("/signup", async (req, res) => {
  const { firstName, email, lastName, password } = req.body;

  try {
    // Check if user already exists based on the provided email.
    const findUser = await UserModal.findOne({ email });

    if (!findUser && !password) {
      // If user doesn't exist and no password provided, create user without a password.
      const user = new UserModal({ firstName, email, lastName, password });
      await user.save();

      // Send success message and user details.
      res.json({
        msg: "success",
        already_registered: findUser ? "Old User" : "New User",
        user: user || findUser,
      });
    } else if (!findUser) {
      // If user doesn't exist and password is provided, hash the password and create user.
      const hash = bcrypt.hashSync(password, 5);

      const user = new UserModal({
        firstName,
        email,
        lastName,
        password: hash,
      });
      await user.save();

      // Send success message and user details.
      res.json({
        msg: "success",
        already_registered: findUser ? "Old User" : "New User",
        user: user || findUser,
      });
    } else {
      // If user already exists, inform the user about the existing account.
      res.json({ msg: "User Already Exists." });
    }
  } catch (error) {
    // Handle any errors that occur during the process.
    res.status(400).json({ msg: error.message });
  }
});

// Route for user login.
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user based on the provided email.
    const findUser = await UserModal.findOne({ email });

    if (findUser && findUser.password != "") {
      // If user exists and has a password, compare provided password with hashed password.
      const passwordMatched = bcrypt.compareSync(password, findUser.password);

      if (passwordMatched) {
        // If passwords match, create a JWT token for the user.
        const token = jwt.sign(
          {
            userID: findUser._id,
            userEmail: email,
            userName: findUser.firstName,
          },
          process.env.SECRET_KEY // Use environment variable for secure token signing.
        );

        // Send success message, user details, and token.
        res.json({
          msg: "success",
          user: findUser,
          token,
        });
      } else {
        // If passwords don't match, inform the user about invalid credentials.
        res.json({ msg: "Invalid Credentials." });
      }
    } else if (findUser && findUser.password === "") {
      // If user exists but has no password, hash the provided password and update the user.
      const hash = bcrypt.hashSync(password, 5);

      const updateUser = await UserModal.findOneAndUpdate(
        { email },
        { password: hash }
      );

      // Create a JWT token for the user.
      const token = jwt.sign(
        {
          userID: findUser._id,
          userEmail: email,
          userName: findUser.firstName,
        },
        process.env.SECRET_KEY // Use environment variable for secure token signing.
      );

      // Send success message, user details, and token.
      res.json({
        msg: "success",
        user: findUser,
        token,
      });
    } else {
      // If user doesn't exist, prompt to sign up first.
      res.json({ msg: "User does not Exist. Signup first and try again." });
    }
  } catch (error) {
    // Handle any errors that occur during the process.
    res.status(400).json({ msg: error.message });
  }
});

// Exporting the userRouter to be used in other parts of the application.
module.exports = { userRouter };
