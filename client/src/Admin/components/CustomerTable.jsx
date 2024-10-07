import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'; // Import necessary components from MUI
import { getAllUser } from '../../Redux/Auth/Actions';

const CustomerTable = () => {
    const dispatch = useDispatch();
 const {auth}  = useSelector(store=>store)

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);



    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {auth?.allusers?.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomerTable;
