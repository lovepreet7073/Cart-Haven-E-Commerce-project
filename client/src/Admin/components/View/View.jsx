import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader } from '@mui/material';
import { ConfirmOrder, deleteOrder, DeliverOrder, getOrders, ShipOrder } from '../../../Redux/Admin/Order/Actions';

const ViewOrdertable = () => {
    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store);
  


    useEffect(() => {
        dispatch(getOrders());
    }, [adminOrder.confirmed, adminOrder.delivered, adminOrder.shipped, adminOrder.deleted]);



    return (
        <div className=''>
            <Card className='mt-2'>
                <CardHeader title="Recent Orders" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Category</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Status</TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder?.orders?.orders?.map((order, index) => (
                                <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align='left'>
                                        <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                                            {order?.orderItems?.map((item, idx) => (
                                                <Avatar key={idx} src={item?.product?.imageUrl} alt={item?.product?.title} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell align="left" scope='row' className='text-ellipsis line-clamp-1'>
                                        {order?.orderItems?.map(item => item?.product?.title).join(", ")}
                                    </TableCell>
                                    <TableCell align="left">
                                        {order?.orderItems?.map(item => item?.product?.category?.name).join(", ")}
                                    </TableCell>
                                    <TableCell align="left">
                                        {order?.totalDiscountedPrice}
                                    </TableCell>
                                    <TableCell align="left">
                                        <span className={`
                      ${order.orderStatus === "CONFIRMED" ? "bg-[#43BE31]" : ""} 
                      ${order.orderStatus === "SHIPPED" ? "bg-[#487EB0]" : ""} 
                      ${order.orderStatus === "PENDING" ? "bg-[#586776]" : ""} 
                      ${order.orderStatus === "PLACED" ? "bg-[#A4B0BD]" : ""} 
                      ${order.orderStatus === "DELIVERED" ? "bg-[#FFD700]" : ""} 
                      text-white px-2 py-1 rounded-full
                    `}>
                                            {order.orderStatus}
                                        </span>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
}

export default ViewOrdertable;
