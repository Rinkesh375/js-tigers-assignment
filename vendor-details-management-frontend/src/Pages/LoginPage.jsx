import {useState} from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    useToast,
    useColorModeValue,
 
  } from "@chakra-ui/react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import GoogleLoginButton from '../components/Auth/GoogleLoginButton';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    
    const handleLogin = ()=>{
        //email & password login,Register functionallity not implemented because in the assignment it was told to implement google login functionallity 
        toast({ position: "top", title: 'Please try to login using google login option', status: 'error', duration: 5000, isClosable: true, })
    }
  return (
    <div>
    <Box>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign In
            </Heading>
          
          </Stack>
          <Box
            minW={{ base: "320px", md: "400px" }}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack></HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                
                  type={showPassword?"text":"password"}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword?"text":"password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button 
                      variant={"ghost"}
                      
                    >
                      {showPassword ? <ViewIcon  onClick={()=>setShowPassword(false)} /> : <ViewOffIcon onClick={()=>setShowPassword(true)} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
              
                  <Button
                 
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleLogin}
                  >
                    Sign In
                  </Button>
               
               
              </Stack>
              <Flex justify={"center"} pt={6}>
                <GoogleLoginButton/>
              </Flex>
             
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  </div> 

  );
}

export default LoginPage;
