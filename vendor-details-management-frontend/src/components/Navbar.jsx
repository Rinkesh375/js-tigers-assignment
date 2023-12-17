import { Box, Flex, Image } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom'; 
import Logo from "../asset/Logo Navbar.png"
import VendorInfo from './userInfo';

// Array of navigation links with their respective text and paths
const links = [
    { text: "Create New Vendor", to: "/vendor/add" },
    { text: "All Vendors", to: "/vendors" }
]

const Navbar = () => {
  return (
    // Navbar layout using Chakra UI components
    <Flex
      bg="#6575a4"
      color="white"
      p="1rem"
      justify="space-between"
    >
      {/* Logo */}
      <Box>
        <Image src={Logo} w="30px" />
      </Box>

      {/* Navigation links */}
      {
        // Mapping through the links array to create NavLink components
        links.map(({ text, to }) => (
          <NavLink
            key={to}
            to={to}
            // Inline styles for active and inactive links
            style={({ isActive }) => isActive ? { marginRight: "1rem", fontWeight: "bold", color: "red" } : { marginRight: "1rem", fontWeight: "bold" }}
          >
            {text}
          </NavLink>
        ))
      }

      {/* Vendor information component */}
      <Box>
        <VendorInfo />
      </Box>
    </Flex>
  );
};

export default Navbar;
