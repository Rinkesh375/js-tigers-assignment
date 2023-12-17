// Importing required modules and dependencies.
const express = require('express');
const { userRouter } = require("./server/routes/user.Routes"); // Importing user routes.
const vendorRoutes = require('./server/routes/vendorRoutes'); // Importing vendor routes.
const mongoose = require("mongoose"); // Importing mongoose for database interaction.
const cors = require('cors'); // Importing CORS middleware for handling cross-origin requests.
const app = express(); // Creating an instance of Express.

require('dotenv').config(); // Loading environment variables.

const PORT = 5000; // Port on which the server will run.

// Middleware setup
app.use(express.json()); // Parsing incoming JSON data.
app.use(cors()); // Adding CORS middleware to enable cross-origin requests.

// Default route to handle home page request.
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Home page' });
});

// Routing setup
app.use('/vendors', vendorRoutes); // Handling routes related to vendors.
app.use("/user", userRouter); // Handling routes related to users.

// Starting the server and connecting to MongoDB.
app.listen(PORT, async () => {
  try {
    // Connecting to MongoDB using the provided URL from environment variables.
    await mongoose.connect(process.env.MONGODB_URL);
   
    console.log(`Server is running at ${PORT}`);
  } catch (error) {
    // Handling connection errors.
    console.error('Error connecting to the database:', error);
  }
});
