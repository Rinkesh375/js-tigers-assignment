import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Vendor/LoadingSpinner';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  Grid,
  useToast,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

// Initial state for the vendor form fields
const initialFormState = {
  vendorName: '',
  bankAccountNo: '',
  bankName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  zipCode: '',
};

// API URL retrieved from environment variables
const apiUrl = process.env.REACT_APP_API_URL;

// VendorForm component handling vendor addition and update
const VendorForm = () => {
  // State variables
  const [vendorData, setVendorData] = useState(initialFormState); // Manages form data
  const [isLoading, setLoading] = useState(false); // Manages loading state
  const vendorIdEdit = Object.values(useParams()); // Retrieves vendor ID from URL params
  const toast = useToast(); // Toast notifications handler
  const navigate = useNavigate(); // Navigation handler

  // Function to handle adding a new vendor
  const handleAddNewUser = async () => {
    try {
      const res = await axios.post(`${apiUrl}/vendors/`, vendorData);
      if (res.status === 201) {
        // Display success toast if the vendor is added successfully
        toast({
          position: 'top',
          title: 'New Vendor Added Successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Display error toast if an error occurs during addition
      toast({
        position: 'top',
        title: 'Error Occurred',
        status: 'error',
        duration: 4000,
        isClosable: true,
        description: 'Please try after some time',
      });
    }
  };

  // Function to handle updating a vendor's information
  const handleUpdateVendor = async () => {
    try {
      const res = await axios.patch(`${apiUrl}/vendors/${vendorIdEdit}`, vendorData);
      if (res.status === 200) {
        // Display success toast if the vendor information is updated successfully
        toast({
          position: 'top',
          title: 'Vendor Info Updated Successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          // Navigate to the vendors page after a delay
          navigate('/vendors');
        }, 4000);
      }
    } catch (error) {
      // Display error toast if an error occurs during update
      toast({
        position: 'top',
        title: 'Error Occurred',
        status: 'error',
        duration: 4000,
        isClosable: true,
        description: 'Please try after some time',
      });
    }
  };

  // Function to fetch vendor data based on ID
  const fetchVendorData = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/vendors/${id}`);
      if (res.status === 200) {
        // Set fetched vendor data and stop loading state
        setVendorData(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Function to handle input changes in the form fields
  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if there is a vendor ID; if present, update the vendor, else add a new vendor
    if (vendorIdEdit.length) {
      handleUpdateVendor();
    } else {
      handleAddNewUser();
    }
  };

  // Effect hook to fetch vendor data when the component mounts or vendorIdEdit changes
  useEffect(() => {
    vendorIdEdit.length && fetchVendorData(vendorIdEdit);
  }, []);

  return (
    <>
      <Navbar />
      <Box maxWidth="80%" mx="auto" mt={6} p={6} borderWidth="1px" borderRadius="md">
        {/* Heading */}
        <Heading mb={4} textAlign="center">
          {vendorIdEdit.length ? 'Edit Vendor' : 'Add Vendor'}
        </Heading>

        {/* Display loading spinner while data is being fetched */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Vendor form */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {/* Grid for form fields */}
                
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            <FormControl isRequired>
              <FormLabel>Vendor Name</FormLabel>
              <Input
                type="text"
                name="vendorName"
                value={vendorData.vendorName}
                onChange={handleChange}
                placeholder="Enter vendor name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Bank Account No</FormLabel>
              <Input
                type="text"
                name="bankAccountNo"
                value={vendorData.bankAccountNo}
                onChange={handleChange}
                placeholder="Enter bank account number"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Bank Name</FormLabel>
              <Input
                type="text"
                name="bankName"
                value={vendorData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address Line 1</FormLabel>
              <Input
                type="text"
                name="addressLine1"
                value={vendorData.addressLine1}
                onChange={handleChange}
                placeholder="Enter address line 1"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address Line 2</FormLabel>
              <Input
                type="text"
                name="addressLine2"
                value={vendorData.addressLine2}
                onChange={handleChange}
                placeholder="Enter address line 2"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                name="city"
                value={vendorData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={vendorData.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Zip Code</FormLabel>
              <Input
                type="text"
                name="zipCode"
                value={vendorData.zipCode}
                onChange={handleChange}
                placeholder="Enter zip code"
              />
            </FormControl>
          </Grid>


                {/* Submit button */}
                <Button type="submit" colorScheme="teal" variant="solid" mt={4}>
                  {vendorIdEdit.length ? 'Update Vendor' : 'Add Vendor'}
                </Button>
              </Stack>
            </form>
            {/* Note */}
            <Text mt={4} textAlign="center" fontSize="sm" color="red">
              Note: Fields marked with * are required.
            </Text>
          </>
        )}
      </Box>
    </>
  );
};

export default VendorForm;
