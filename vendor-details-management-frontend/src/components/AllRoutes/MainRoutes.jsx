import React from 'react';
import {Routes,Route} from "react-router-dom"
import VendorList from '../Vendor/VendorList';
import VendorForm from '../Vendor/VendorForm';
import LoginPage from '../../Pages/LoginPage';
import PrivateRoute from './PrivateRoute';


const MainRoutes = () => {
   
  return (
   <>
    
       <Routes>
        <Route path='/' element={<LoginPage/>}  />
         <Route path="/vendors"  element={<PrivateRoute><VendorList/></PrivateRoute>} />
        <Route path="/vendor/add" element={<PrivateRoute><VendorForm/></PrivateRoute>} />
        <Route path="/vendor/edit/:id" element={<PrivateRoute><VendorForm/></PrivateRoute>} />
     </Routes>
   
   
   </>
 
  );
}

export default MainRoutes;
