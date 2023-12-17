import React from 'react';
import { motion } from "framer-motion";
import { useNavigate} from 'react-router-dom';
import {
    Box,
    Flex,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Button,
    Wrap,
    Avatar,
    WrapItem,
    Center
} from "@chakra-ui/react";

const VendorInfo = () => {
    const vendorDetail = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/")

    }


    return (
        <Popover trigger="hover" >
            <Box
                cursor={"pointer"}
                mr="1rem"
                _hover={{
                    background: "#333",
                    color: "",
                    borderTopRadius: "5px",
                }}

            >
                <PopoverTrigger>
                    <Flex >
                        <Text fontSize={{ base: "md", lg: "large" }} mr={2}>
                            {vendorDetail?.user ? `${vendorDetail?.user.firstName} ${vendorDetail?.user.lastName}` : "User"}
                        </Text>

                        <Flex align={"center"}
                            borderRadius={50}
                            justify={"center"}

                            fontSize={{ base: "small", lg: "large" }}
                         
                            bg={"RGBA(0, 0, 0, 0.24)"}
                        >
                            <Wrap>
                                <WrapItem>
                                    <Avatar size='xs' name={vendorDetail?.user.firstName} src={vendorDetail?.user.image} />
                                </WrapItem>


                            </Wrap>
                        </Flex>
                    </Flex>
                </PopoverTrigger>
                <PopoverContent borderColor="#333" mr="1rem" bg={"#333"} minWidth="350px">

                    <Center>
                        <PopoverBody borderColor={"#333"} >
                            <Center>
                                <Wrap>
                                    <WrapItem>
                                        <Avatar size='xl' name={vendorDetail?.user.firstName} src={vendorDetail?.user?.image} />
                                    </WrapItem>


                                </Wrap>
                            </Center>



                            <Box textAlign={"center"}
                            
                                pb={2}
                                pt={2}
                                mb={"2px"}
                                mt={"2px"}
                            >
                                <motion.div >
                                    Hello,   {vendorDetail?.user ? `${vendorDetail?.user.firstName} ${vendorDetail?.user.lastName}` : "User"}
                                </motion.div>
                            </Box>
                            <Box>
                                <Button
                                    variant={"solid"}
                                    fontWeight={500}
                                    mb="1rem"
                                    w={"100%"}
                                    color="white"
                                    bg={"RGBA(255, 255, 255, 0.48)"}>
                                    <motion.div >
                                        {vendorDetail?.user?.email}
                                    </motion.div>
                                </Button>
                            </Box>


                            <Button

                                variant={"solid"}
                                fontWeight={500}
                                w={"100%"}
                                color="white"
                                bg={"RGBA(255, 255, 255, 0.48)"}
                                onClick={handleLogout}
                            >
                                <motion.div >
                                    Sign Out
                                </motion.div>
                            </Button>

                        </PopoverBody>
                    </Center>
                </PopoverContent>
            </Box>
        </Popover>
    );
}

export default VendorInfo;
