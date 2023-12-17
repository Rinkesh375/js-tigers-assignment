import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios"
import { useToast } from "@chakra-ui/react";
import { useNavigate } from  "react-router-dom"
import { jwtDecode } from "jwt-decode";

// Retrieve environment variables
const apiUrl = process.env.REACT_APP_API_URL;
const clientId =  process.env.REACT_APP_CLIENT_ID;

/**
 * Component for rendering a Google Login button and handling authentication.
 */
const GoogleLoginButton = () => {
  const toast = useToast(); // Utilize Chakra-UI's toast for displaying messages
  const navigate = useNavigate(); // Access React Router's navigation functionality

  /**
   * Handles Google authentication and signs the user in.
   * @param {Object} data - User data obtained from Google authentication.
   */
  async function gAuthSignin(data) {
    try {
      // Send a POST request to the server for Google authentication
      const res = await axios.post(`${apiUrl}/user/gAuth`, data);

      // Upon successful authentication
      if (res.status === 200) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data); // Log the received data
        // Display a success message and navigate to the '/vendors' route
        toast({
          title: res.data.msg,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        navigate("/vendors");
      } else {
        // Display an error message if authentication fails
        toast({
          title: "Login Failed.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (error) {
      // Display an error message if an exception occurs during authentication
      toast({
        title: "Login Failed.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  }

  /**
   * Callback function invoked upon successful Google authentication.
   * @param {Object} res - Response object containing authentication details.
   */
  function successful(res) {
    // Decode JWT token and initiate the signin process
    gAuthSignin(jwtDecode(res.credential)); 
  }

  /**
   * Handles failure scenarios during Google authentication.
   */
  function onFailure() {
    // Display an error message for failed authentication attempts
    toast({
      title: "Login Failed.",
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <>
      {/* Google OAuth provider setup */}
      <GoogleOAuthProvider clientId={clientId}>
        <div>
          {/* Google Login button */}
          <GoogleLogin
            onSuccess={(res) => {
              // Call 'successful' function upon successful login
              successful(res);
            }}
            onError={onFailure} // Call 'onFailure' function on error
          />
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleLoginButton;
