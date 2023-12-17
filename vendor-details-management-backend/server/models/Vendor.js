// Importing the Mongoose library for MongoDB interaction.
const mongoose = require('mongoose');

// Defining the schema for the 'Vendor' collection in MongoDB.
const vendorSchema = new mongoose.Schema({
  // Field for the vendor's name, must be a string and is required.
  vendorName: { type: String, required: true },

  // Field for the vendor's bank account number, must be a string and is required.
  bankAccountNo: { type: String, required: true },

  // Field for the vendor's bank name, must be a string and is required.
  bankName: { type: String, required: true },

  // Field for the vendor's address line 1, must be a string and is required.
  addressLine1: { type: String, required: true },

  // Field for the vendor's address line 2, must be a string and is required.
  addressLine2: { type: String, required: true },

  // Field for the vendor's city, must be a string and is required.
  city: { type: String, required: true },

  // Field for the vendor's country, must be a string and is required.
  country: { type: String, required: true },

  // Field for the vendor's ZIP code, must be a string and is required.
  zipCode: { type: String, required: true },
});

// Creating a Mongoose model based on the vendorSchema for the 'Vendor' collection.
const Vendor = mongoose.model('Vendor', vendorSchema);

// Exporting the Vendor model to be used in other parts of the application.
module.exports = Vendor;
