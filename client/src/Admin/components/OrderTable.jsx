import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader } from '@mui/material';
import { ConfirmOrder, deleteOrder, DeliverOrder, getOrders, ShipOrder } from '../../Redux/Admin/Order/Actions';
import Pagination from "@mui/material/Pagination";
const OrderTable = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector(store => store);
  const [currentPage, setCurrentPage] = useState(1)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentOrderId, setCurrentOrderId] = React.useState(null); // New state for current order ID
  const open = Boolean(anchorEl);
  const itemsPerPage =10;
  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrderId(orderId); // Set the current order ID
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentOrderId(null); // Reset current order ID
  };

  useEffect(() => {
    dispatch(getOrders(currentPage, itemsPerPage)); // Pass current page and items per page
  }, [currentPage, dispatch,adminOrder.confirmed,adminOrder.placed,adminOrder.delivered,adminOrder.shipped,adminOrder.deleted]);

  const handleshipOrder = () => {
    console.log('ShipOrder id', currentOrderId);
    dispatch(ShipOrder(currentOrderId));
    handleClose();
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page
  };

  const handleConfirmOrder = () => {
    console.log('confirm order id', currentOrderId);
    dispatch(ConfirmOrder(currentOrderId));
    handleClose();
  };

  const handleDeliverOrder = () => {
    console.log('DeliverOrder id', currentOrderId);
    dispatch(DeliverOrder(currentOrderId));
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  console.log(adminOrder, "adminOrder");

  return (
    <div className='p-5'>
      <Card className='mt-0'>
        <CardHeader title="Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
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
                  <TableCell align="left" scope='row'>
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
                  <TableCell align="left">
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event) => handleClick(event, order._id)} // Pass order ID here
                    >
                      Status
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleConfirmOrder}>Confirm Order</MenuItem>
                      <MenuItem onClick={handleshipOrder}>Ship Order</MenuItem>
                      <MenuItem onClick={handleDeliverOrder}>Deliver Order</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button variant='outlined' onClick={() => handleDeleteOrder(order._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      
      <div className="px-4 py-5 justify-center flex">
      <Pagination
          count={adminOrder?.orders?.totalPages} // Calculate total pages based on totalOrders
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#38a3a5",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#2e8d91",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default OrderTable;
