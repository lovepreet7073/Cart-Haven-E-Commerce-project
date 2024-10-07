import { useTheme } from '@mui/material/styles'; // Correct import for MUI theme
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Dashboard';
import CreateProductForm from './components/CreateProductForm';
import CustomerTable from './components/CustomerTable';
import OrderTable from './components/OrderTable';
import Productstable from './components/Productstable';
import AdminProfile from './components/AdminProfile';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../Redux/Auth/Actions';
import ProtectedRoute from '../Admin/components/ProtectedRoute'
const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <FilterNoneIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <GroupIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCartIcon /> },
    { name: "AddProduct", path: "/admin/product/create", icon: <AddBoxIcon /> },
];

const Admin = () => {
    const theme = useTheme(); // Ensure correct theme import
    const isLargescreen = useMediaQuery(theme.breakpoints.up("lg")); // Use the correct theme object
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();


    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt)); // Ensure this action updates the state
        } else {
            navigate('/');
        }
    }, [jwt, dispatch]);
    

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"

            }}
        >
            {/* {isLargescreen && <Toolbar />} */}

            <List>
                {menu.map((item, index) => (
                    <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List>
                <ListItem disablePadding onClick={() => navigate("/admin/profile")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    );

    return (
        <div className=''>
            <div className='flex h-[100vh]'>
                <CssBaseline />

                {/* Fixed Drawer */}
                <div className='w-[15%] h-full border-r border-r-gray-300 fixed shadow-lg shadow-gray-300'>
                    {drawer}
                </div>

                {/* Main Content */}
                <div className='ml-[15%] w-[85%] h-full overflow-auto'>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/product/create"
                            element={
                                <ProtectedRoute requiredRole="ADMIN"> {/* Example role check */}
                                    <CreateProductForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/customers"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <CustomerTable />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <OrderTable />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/products"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <Productstable />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <AdminProfile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );

}

export default Admin;
