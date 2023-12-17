import React from 'react';
import { Routes, Route } from "react-router-dom";
import VendorList from '../../Pages/VendorList';
import VendorForm from '../../Pages/VendorForm';
import LoginPage from '../../Pages/LoginPage';
import PrivateRoute from './PrivateRoute';

// MainRoutes Component: Contains the routing configuration for the main application
const MainRoutes = () => {
  return (
    <>
      {/* Define the routes using the `Routes` component from react-router-dom */}
      <Routes>
        {/* Route for the login page */}
        <Route path='/' element={<LoginPage />} />

        {/* Routes protected by PrivateRoute (require authentication) */}
        {/* VendorList route accessible only if the user is logged in */}
        <Route path="/vendors" element={<PrivateRoute><VendorList/></PrivateRoute>} />

        {/* VendorForm routes accessible only if the user is logged in */}
        {/* '/vendor/add' and '/vendor/edit/:id' are protected and require authentication */}
        <Route path="/vendor/add" element={<PrivateRoute><VendorForm/></PrivateRoute>} />
        <Route path="/vendor/edit/:id" element={<PrivateRoute><VendorForm/></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default MainRoutes;
