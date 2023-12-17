import React, { useState, useEffect } from 'react';
import {useParams,useNavigate} from "react-router-dom"
import LoadingSpinner from './LoadingSpinner';
import axios from "axios"
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
  useToast
} from '@chakra-ui/react';
import Navbar from '../Navbar';


const initialFormState = {
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: '',
  }
  const apiUrl = process.env.REACT_APP_API_URL;

const VendorForm = () => {
  const [vendorData, setVendorData] = useState(initialFormState);
  const [isLoading,setLoading] = useState(false);
  const vendorIdEdit = Object.values(useParams())
  const toast = useToast();
  const navigate  = useNavigate()


  

  const handleAddNewUser = async ()=>{

    try {
        const res = await axios.post(`${apiUrl}/vendors/`,vendorData);
        if(res.status === 201) {
            toast({ position: "top", title: 'New Vendor Added Successfully', status: 'success', duration: 2000, isClosable: true, })
        }
       
    } catch (error) {
        toast({ position: "top", title: 'Error Occured', status: 'error', duration: 4000, isClosable: true, description: "Please try after sometime" })
    }
}

const handleUpdateVendor = async()=>{
   try {
     const res = await axios.patch(`${apiUrl}/vendors/${vendorIdEdit}`,vendorData);
     if(res.status === 200){
      toast({ position: "top", title: 'Vendor Info Updated Successfully', status: 'success', duration: 2000, isClosable: true, });
      setTimeout(() => {
        navigate("/vendors")
      }, 4000);
     }
   } catch (error) {
    toast({ position: "top", title: 'Error Occured', status: 'error', duration: 4000, isClosable: true, description: "Please try after sometime" })
   }
}

const fetchVendorData = async(id)=>{
     try {
       setLoading(true)
      const res = await axios.get(`${apiUrl}/vendors/${id}`); 
      if(res.status === 200) {
         setVendorData(res.data)
         setLoading(false)
      }
     } catch (error) {
        console.log(error)
        setLoading(false)
     }
}





  

  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if(vendorIdEdit.length){
      handleUpdateVendor();
    }
    else {
      handleAddNewUser();
    }
  };

  useEffect(() => {
    vendorIdEdit.length && fetchVendorData(vendorIdEdit)
  }, []);

  return (

    <>
    <Navbar/>
    <Box maxWidth="80%" mx="auto" mt={6} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={4} textAlign="center">
        {vendorIdEdit.length ? 'Edit Vendor' : 'Add Vendor'}
      </Heading>

      {
        isLoading?<LoadingSpinner/>: <>
         <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
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
          <Button type="submit" colorScheme="teal" variant="solid" mt={4} >
            {vendorIdEdit.length ? 'Update Vendor' : 'Add Vendor'}
          </Button>
        </Stack>
      </form>
      <Text mt={4} textAlign="center" fontSize="sm" color="red">
        Note: Fields marked with * are required.
      </Text>
      </>
      }
      
     
    </Box>
    </>
  );
};

export default VendorForm;
