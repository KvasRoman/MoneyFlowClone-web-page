import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/RegisterAccount';
import Layout from '@/common/Layout/Layout';
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
                        <Route path="/settings" element={<Dashboard />} />
                        <Route path="/ai-assistant" element={<Dashboard />} />
                        <Route path="/profile" element={<Dashboard />} />
                        {/* <Route path="/reports" element={<Reports />} />
                            <Route path="/settings" element={<Settings />} /> */}
                    </Route>
                </Route>

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
