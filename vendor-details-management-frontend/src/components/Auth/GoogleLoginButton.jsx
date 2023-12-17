import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios"
import { useToast } from "@chakra-ui/react";
import {useNavigate} from  "react-router-dom"
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;
const clientId =  process.env.REACT_APP_CLIENT_ID;


const GoogleLoginButton = () => {
  const toast = useToast();
  const navigate = useNavigate()



  async function gAuthSignin(data) {
     try {
      const res = await axios.post(`${apiUrl}/user/gAuth`, data);
      if(res.status === 200){
        localStorage.setItem("user",JSON.stringify(res.data));
        console.log(res.data)
        toast({ title: res.data.msg,status: "success",duration: 4000, isClosable: true,position: "top",});
        navigate("/vendors");
      }
      else{
        toast({ title: "Login Failed.",status: "error",duration: 4000,isClosable: true,position: "top"});
      }
     } catch (error) {
      toast({ title: "Login Failed.",status: "error",duration: 4000,isClosable: true,position: "top",});
     }

      
  }
  function successful(res) {
    gAuthSignin(jwtDecode(res.credential)); 
  }

  function onFailure() {
    toast({ title: "Login Failed.",status: "error",duration: 4000,isClosable: true,position: "top",});
  }

  return (
    <>

      <GoogleOAuthProvider clientId={clientId}>
      <div>
      <GoogleLogin
        onSuccess={(res) => {
          successful(res);
        }}
        onError={onFailure}
      />
    </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleLoginButton;
