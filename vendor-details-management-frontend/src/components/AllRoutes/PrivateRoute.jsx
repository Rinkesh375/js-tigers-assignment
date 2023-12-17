import React from 'react';
import LoginPage from '../../Pages/LoginPage';

// PrivateRoute Component: A component that controls access to routes based on user authentication
const PrivateRoute = ({ children }) => {
    // Checking if the user is logged in by retrieving user data from localStorage
    const isLogin = JSON.parse(localStorage.getItem("user"));

    // Conditional rendering:
    // If the user is logged in (user data exists in localStorage), render the children components
    // If the user is not logged in (no user data in localStorage), render the LoginPage component
    return isLogin ? children : <LoginPage />;
}

export default PrivateRoute;
