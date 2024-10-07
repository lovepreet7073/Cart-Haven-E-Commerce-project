import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Make sure to import axios
import { API_BASE_URL } from '../../../Config/apiConfig';
import toast from "react-hot-toast";
import { getUser, removeAddress, updateAddress } from '../../../Redux/Auth/Actions';
import { UPADTE_ADDRESS_SUCCESS } from '../../../Redux/Auth/ActionType'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 2,
};

const EditAddressModal = ({ open, handleClose, selectedAddress }) => {
    console.log(selectedAddress, "selecetdAddress")
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const [Addressdata, setAddressdata] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        mobile: '',
    });

    // Use useEffect to initialize Addressdata when selectedAddress changes
    useEffect(() => {
        if (selectedAddress) {
            setAddressdata({
                firstName: selectedAddress.firstName || '',
                lastName: selectedAddress.lastName || '',
                streetAddress: selectedAddress.streetAddress || '',
                city: selectedAddress.city || '',
                state: selectedAddress.state || '',
                zipCode: selectedAddress.zipCode || '',
                mobile: selectedAddress.mobile || '',
            });
        }
    }, [selectedAddress]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addressId = selectedAddress._id;
            await dispatch(updateAddress(addressId, Addressdata));
            toast.success("Address updated successfully");
            handleClose();
        } catch (error) {
            toast.error("Error updating address");
        }
    };

  

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        dispatch(getUser(jwt))
    }, [auth.updatedAddress,auth.deleteaddress])



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container>
                        <div className='p-3'>
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
                                            onChange={handleChange}
                                            value={Addressdata.firstName} // Bind value to state
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id='lastName'
                                            name='lastName'
                                            label='Last Name'
                                            onChange={handleChange}
                                            fullWidth
                                            autoComplete='family-name'
                                            value={Addressdata.lastName} // Bind value to state
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
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                            value={Addressdata.streetAddress} // Bind value to state
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id='city'
                                            name='city'
                                            label='City'
                                            onChange={handleChange}
                                            fullWidth
                                            autoComplete='address-level2'
                                            value={Addressdata.city} // Bind value to state
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id='state'
                                            name='state'
                                            label='State'
                                            onChange={handleChange}
                                            fullWidth
                                            autoComplete='address-level1'
                                            value={Addressdata.state} // Bind value to state
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id='zipCode'
                                            name='zipCode'
                                            onChange={handleChange}
                                            label='Zip / Postal Code'
                                            fullWidth
                                            autoComplete='postal-code'
                                            value={Addressdata.zipCode} // Bind value to state
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id='mobile'
                                            name='mobile'
                                            onChange={handleChange}
                                            label='Phone Number'
                                            fullWidth
                                            autoComplete='tel'
                                            value={Addressdata.mobile} // Bind value to state
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                    <Button type="submit" variant="contained" sx={{
                                        backgroundColor: "#38a3a5",
                                        "&:hover": { backgroundColor: "#2b8b8c" },
                                        marginRight: 2
                                    }}>Save</Button>
                                    <Button variant="outlined" onClick={handleClose} sx={{
                                        borderColor: "#38a3a5",
                                        color: "#38a3a5",
                                        "&:hover": {
                                            borderColor: "#2b8b8c",
                                            backgroundColor: "#e0f7fa",
                                            color: "#2b8b8c",
                                        },
                                    }}>Cancel</Button>
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default EditAddressModal;
