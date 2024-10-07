import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../Redux/Order/Actions';
import { useNavigate } from 'react-router-dom';
import AddressCard from '../AddressCard/AddressCard';

const DeliveryAddressForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);
    const { order } = useSelector(store => store.order); // Destructure order from the Redux store
    const [selectedAddressId, setSelectedAddressId] = useState(null); // State for selected address ID
    const [formData, setFormData] = useState({}); // State for form data

    const handleAddressSelect = (id) => {
        setSelectedAddressId(id);
        const selectedAddress = auth.user.address.find(address => address._id === id);
        if (selectedAddress) {
            // Set form fields with selected address data
            setFormData({
                firstName: selectedAddress.firstName || '',
                lastName: selectedAddress.lastName || '',
                streetAddress: selectedAddress.streetAddress || '',
                city: selectedAddress.city || '',
                state: selectedAddress.state || '',
                zipCode: selectedAddress.zipCode || '',
                mobile: selectedAddress.mobile || '',
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Update form data on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const shipAddress = selectedAddressId ? { _id: selectedAddressId } : formData;
        dispatch(createOrder({ ...shipAddress, navigate }));
    };

    useEffect(() => {
        if (order && order._id) {
            navigate(`/checkout?step=2&order_id=${order._id}`);
        }
    }, [order, navigate]);

    return (
        <div>
            <Grid container spacing={4} justifyContent={auth?.user?.address?.length > 0 ? 'flex-start' : 'center'}>
                {auth?.user?.address?.length > 0 && (
                    <Grid xs={12} lg={5} className='h-[30.5rem] mt-7'>
                        <div className='p-5 py-7 cursor-pointer'>
                            {auth?.user?.address?.map((item) => (
                                <AddressCard
                                    key={item._id} // Ensure each address card has a unique key
                                    address={item}
                                    onSelect={handleAddressSelect} // Pass selection handler
                                    isSelected={selectedAddressId === item._id} // Check if this address is selected
                                    showRadio={true} // Show radio button in delivery address page
                                />
                            ))}
                        </div>
                    </Grid>
                )}
                
                {/* Form Section */}
                <Grid item xs={12} lg={auth?.user?.address?.length > 0 ? 7 : 12}>
                    <Box className={`border rounded-s-md shadow-md p-5 ${auth?.user?.address?.length === 0 && 'mx-auto max-w-2xl'}`}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='firstName'
                                        name='firstName'
                                        label='First Name'
                                        fullWidth
                                        autoComplete='given-name'
                                        value={formData.firstName || ''} // Set value based on formData
                                        onChange={handleInputChange} // Handle input change
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='lastName'
                                        name='lastName'
                                        label='Last Name'
                                        fullWidth
                                        autoComplete='family-name'
                                        value={formData.lastName || ''} // Set value based on formData
                                        onChange={handleInputChange} // Handle input change
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id='streetAddress'
                                        name='streetAddress'
                                        label='Street Address'
                                        fullWidth
                                        autoComplete='address-line1'
                                        multiline
                                        rows={4}
                                        value={formData.streetAddress || ''} // Set value based on formData
                                        onChange={handleInputChange} // Handle input change
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='city'
                                        name='city'
                                        label='City'
                                        fullWidth
                                        autoComplete='address-level2'
                                        value={formData.city || ''} // Set value based on formData
                                        onChange={handleInputChange} // Handle input change
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='state'
                                        name='state'
                                        label='State'
                                        fullWidth
                                        autoComplete='address-level1'
                                        value={formData.state || ''} // Set value based on formData
                                        onChange={handleInputChange} // Handle input change
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='zipCode'
                                        name='zipCode'
                                        label='Zip / Postal Code'
                                        fullWidth
                                        autoComplete='postal-code'
                                        value={formData.zipCode || ''} // Set value based on formData
                                        onChange={handleInputChange} // Handle input change
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='mobile'
                                        name='mobile'
                                        label='Phone Number'
                                        fullWidth
                                        autoComplete='tel'
                                        value={formData.mobile || ''} // Set value based on formData
                                        onChange={handleInputChange} // Handle input change
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        sx={{ mt: 1, bgcolor: "#38a3a5", py: 1.5 }}
                                        size='large'
                                        variant='contained'
                                        type='submit'
                                    >
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
    
};

export default DeliveryAddressForm;
