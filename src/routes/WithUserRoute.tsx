import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const WithUserRoute: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    let result = user ? <Outlet /> : <Navigate to="/finishUser" replace />;
    
    return result;
};

export default WithUserRoute;
