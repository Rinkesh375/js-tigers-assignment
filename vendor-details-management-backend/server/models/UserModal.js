// Importing the Mongoose library for MongoDB interaction.
const mongoose = require("mongoose");

// Defining the schema for the 'User' collection in MongoDB.
const userSchema = mongoose.Schema(
  {
    // Field for the user's first name, must be a string and is required.
    firstName: { type: String, required: true },

    // Field for the user's last name, defaults to an empty string if not provided.
    lastName: { type: String, default: "" },

    // Field for the user's email, must be a string and is required.
    email: { type: String, required: true },

    // Field for the user's image URL, defaults to an empty string if not provided.
    image: { type: String, default: "" },

    // Field for the user's password, defaults to an empty string if not provided.
    password: { type: String, default: "" },
  },
  // Excluding the '__v' version key from the MongoDB documents.
  { versionKey: false }
);

// Creating a Mongoose model based on the userSchema for the 'user' collection.
const UserModal = new mongoose.model("user", userSchema);

// Exporting the UserModal to be used in other parts of the application.
module.exports = { UserModal };
