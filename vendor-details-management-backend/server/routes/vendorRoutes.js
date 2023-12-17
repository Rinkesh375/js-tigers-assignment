// Importing required modules and dependencies.
const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor'); // Importing the Vendor model/schema.

// Route to get all vendors with pagination.
router.get('/', async (req, res) => {
  try {
    // Extracting page and limit parameters from query or using default values.
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validating the limit parameter.
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ message: 'Invalid limit parameter' });
    }

    // Get the total count of documents in the Vendor collection.
    const totalDocsCount = await Vendor.countDocuments();

    const totalPages = Math.ceil(totalDocsCount / limit);

    // Checking if the requested page exceeds the total pages available.
    if (page > totalPages) {
      return res.status(400).json({ message: 'Page number exceeds total pages' });
    }

    const skip = (page - 1) * limit;

    // Fetch vendors based on pagination parameters.
    const vendors = await Vendor.find()
      .skip(skip)
      .limit(limit);

    // Send response with fetched vendors and total pages.
    res.json({ vendors, totalPages });
  } catch (error) {
    // Handling server errors.
    res.status(500).json({ message: error.message });
  }
});

// Route to get a specific vendor by ID.
router.get('/:id', getVendor, (req, res) => {
  res.json(res.vendor);
});

// Route to create a new vendor.
router.post('/', async (req, res) => {
  const vendor = new Vendor(req.body);

  try {
    // Save the newly created vendor.
    const newVendor = await vendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    // Handling validation errors or other issues during creation.
    res.status(400).json({ message: error.message });
  }
});

// Route to update a vendor by ID.
router.patch('/:id', getVendor, async (req, res) => {
  // Update vendor fields if provided in the request body.
  if (req.body.vendorName != null) {
    res.vendor.vendorName = req.body.vendorName;
  }
  // Similarly update other fields as needed.

  try {
    // Save the updated vendor.
    const updatedVendor = await res.vendor.save();
    res.json(updatedVendor);
  } catch (error) {
    // Handling validation errors or other issues during update.
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a vendor by ID.
router.delete('/:id', async (req, res) => {
  const vendorId = req.params.id;

  try {
    // Find and delete the vendor by its ID.
    const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ message: 'Vendor deleted' });
  } catch (error) {
    // Handling server errors or issues during deletion.
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get vendor by ID and attach it to response.
async function getVendor(req, res, next) {
  let vendor;
  try {
    // Find the vendor by its ID from the database.
    vendor = await Vendor.findById(req.params.id);
    if (vendor == null) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    // Handling server errors during vendor retrieval.
    return res.status(500).json({ message: error.message });
  }

  // Attach the found vendor to the response object.
  res.vendor = vendor;
  next();
}

// Exporting the router to be used in other parts of the application.
module.exports = router;
