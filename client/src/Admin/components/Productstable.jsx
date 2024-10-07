import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from "@mui/material/Pagination";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../Redux/Product/Action';
import { Avatar, Button, Card, CardHeader } from '@mui/material';
import { toast } from 'react-hot-toast';
const Productstable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const { product } = useSelector(store => store)
    console.log(product, "PRODUCT_DASHBOAD")
    useEffect(() => {
        const data = {
            category: "",
            colors: [],
            sizes: [],
            maxPrice: 1000000,
            minPrice: 0,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: currentPage,
            pageSize: 6,
            stock: ""
        }
        dispatch(findProducts(data))
    }, [product.deletedProduct,currentPage])
    const handlePageChange = (event, value) => {
        setCurrentPage(value); // Update the current page
      };
    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId))
        .then(() => {
            toast.success("Product deleted successfully!");
        })
    };


    return (
        <div className='p-5'>
            <Card className='mt-2 '>
                <CardHeader title="All Products" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Category</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product?.products?.products?.map((item) => (
                                <TableRow
                                    key={item._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>
                                        <Avatar src={item.imageUrl}></Avatar>
                                    </TableCell>
                                    <TableCell align="left" scope='row'>{item.title}</TableCell>
                                    <TableCell align="left">{item?.category?.name}</TableCell>
                                    <TableCell align="left">{item.price}</TableCell>
                                    <TableCell align="left">{item.quantity}</TableCell>
                                    <TableCell align="left">
                                        <Button variant='outlined' onClick={() => handleProductDelete(item._id)}>
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
          count={product?.products?.totalPages} // Calculate total pages based on totalOrders
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
    )
}

export default Productstable