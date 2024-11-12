import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './admin/Home.jsx';
import Alta from './admin/Alta.jsx';
import AdminNab from './admin/AdminNav.jsx';
import UpdatePassword from './admin/UpdatePassword.jsx';
import UpdateUser from './admin/UpdateUser.jsx';
import CourseApproval from './admin/adminComponents/CourseApproval.jsx';
import CategoriesManager from './admin/adminComponents/CategoriesManager.jsx'

const Administrador = () => {
    return (
        <div className="flex">
            <AdminNab />
            <div className="flex-1 pl-20 pt-16 relative">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="alta" element={<Alta />} />
                    <Route path="CourseApproval" element={<CourseApproval />} />
                    <Route path="CategoriesManager" element={<CategoriesManager />} />
                    <Route path="UpdatePassword" element={<UpdatePassword />} />
                    <Route path="UpdateUser" element={<UpdateUser />} />
                    <Route path="alta/:id" element={<Alta />} />
                </Routes>
            </div>
        </div>
    );
};

export default Administrador;