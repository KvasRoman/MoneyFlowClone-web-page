import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    
    let result = isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
    
    return result;
};

export default ProtectedRoute;
