
import { Box, Flex,Image } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom'; 
import Logo from "../asset/Logo Navbar.png"
import VendorInfo from './userInfo';


const links = [
    {text:"Create New Vendor",to:"/vendor/add"},
    {text:"All Vendors",to:"/vendors"}
]

const Navbar = () => {


 

  return (
    <Flex
     bg="#6575a4"
     color="white"
     p="1rem"
     justify="space-between"
  
    >
      <Box>
        <Image src={Logo} w="30px" />
      </Box>

     
    
      {

        links.map(({text,to})=><NavLink style={({isActive})=>isActive?{marginRight:"1rem",fontWeight:"bold",color:"red"}:{marginRight:"1rem",fontWeight:"bold"}} key={to} to={to}>{text}</NavLink>)
      }
   
    



      <Box>
           <VendorInfo/>
      </Box>
    </Flex>
  );
};

export default Navbar;
