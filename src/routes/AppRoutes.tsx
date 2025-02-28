import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/RegisterAccount';
import Layout from '@/common/Layout/Layout';
import WithUserRoute from './WithUserRoute';
import CreateUser from '@/pages/CreateUser/CreateUser';
import Dashboard from '@/pages/Dashboard/Dashboard';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes (Only accessible if authenticated) */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* <Route path="/reports" element={<Reports />} />
                            <Route path="/settings" element={<Settings />} /> */}
                    </Route>
                    <Route path="/finishUser" element={<CreateUser />} />
                </Route>

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
