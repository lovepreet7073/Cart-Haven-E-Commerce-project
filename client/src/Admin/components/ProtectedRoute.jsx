import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../Redux/Auth/Actions';

const ProtectedRoute = ({ children, requiredRole }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchUser = async () => {
            if (jwt) {
                await dispatch(getUser(jwt)); // Ensure this action updates the state
            }
            setLoading(false); // Set loading to false after fetching user
        };
        fetchUser();
    }, [jwt, dispatch]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!jwt) {
        return <Navigate to="/" />;
    }

    if (requiredRole && auth?.user?.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
