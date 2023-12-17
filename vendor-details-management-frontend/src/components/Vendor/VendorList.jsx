import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from "axios"
import Pagination from './Pagination';
import DeleteVendorConfimationModal from './DeleteVendorConfimationModal';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import LoadingSpinner from './LoadingSpinner';
const apiUrl = process.env.REACT_APP_API_URL;

const VendorList = () => {
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const [vendorsList, setVendorsList] = useState([]);
  const [loading,setLoading] = useState(false)
  const [deleteVendorID, setDeleteVendorID] = useState("");
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchVendorsData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${apiUrl}/vendors?page=${page}&limit=6`)
      setLoading(false)
      if (res.status === 200) {
        setVendorsList(res.data.vendors)
        setTotalPages(res.data.totalPages)
        

      }
    } catch (error) {
      console.log(error)
      setLoading(false)
     
    }
  }

  const handlePageUpdate = (value) => {
    setPage(value)

  }

  const handleDeleteVendor = async () => {
    try {
      
      const res = await axios.delete(`${apiUrl}/vendors/${deleteVendorID}`)
     
      if(res.status === 200){
            let tempVendorsArr = [...vendorsList];
            tempVendorsArr = tempVendorsArr.filter((vendor)=>vendor._id !== deleteVendorID);
            setVendorsList(tempVendorsArr);
            setDeleteVendorID("");
            onClose();
            toast({ position: "top", title: 'Vendor Deleted successfully', status: 'success', duration: 2000, isClosable: true, })
      }
    } catch (error) {
     
      toast({ position: "top", title: 'Error Occured', status: 'error', duration: 4000, isClosable: true, description: "Please try after sometime" })
      console.log(error);
    }
  }

  useEffect(() => {
    fetchVendorsData();
  }, [page]);

  return (
    <>
    <Navbar/>
      {
        loading?<LoadingSpinner/>: <Box maxWidth="100%" mx="auto" mt={6} p={6} borderWidth="1px" borderRadius="md">
        <Heading mb={4} textAlign="center">Vendor List</Heading>
        <Table variant="striped" colorScheme="gray" size={tableSize}>
          <Thead>
            <Tr>
              <Th>Vendor Name</Th>
              <Th>Bank Account No</Th>
              <Th>Bank Name</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vendorsList.map((vendor) => (
              <Tr key={vendor._id}>
                <Td>{vendor.vendorName}</Td>
                <Td>{vendor.bankAccountNo}</Td>
                <Td>{vendor.bankName}</Td>
                <Td>
                 <Link to={`/vendor/edit/${vendor._id}`}>
                 
                 <Tooltip label="Edit" hasArrow>
                    <Button
                      size={tableSize === 'sm' ? 'xs' : 'sm'}
                      colorScheme="teal"
                     

                      leftIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                 </Link>
                </Td>
                <Td>
                  <Tooltip label="Delete" hasArrow>
                    <IconButton
                      size={tableSize === 'sm' ? 'xs' : 'sm'}
                      colorScheme="red"
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        setDeleteVendorID(vendor._id);
                        onOpen();
                      }}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
         {
          vendorsList.length?<Pagination handlePageUpdate={handlePageUpdate} totalPages={totalPages} page={page} />:null
         }
      </Box>


      }
      <DeleteVendorConfimationModal handleDeleteVendor={handleDeleteVendor} isOpen={isOpen} onClose={onClose} />

    </>

  );
};

export default VendorList;
