import React from 'react';
import LoginPage from '../../Pages/LoginPage';

const PrivateRoute = ({children}) => {
    const isLogin = JSON.parse(localStorage.getItem("user"))
     return isLogin?children:<LoginPage/>
}

export default PrivateRoute;
