import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Avatar, Modal } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { API_BASE_URL } from '../../../Config/apiConfig';
import { updateUser } from '../../../Redux/Auth/Actions';
import { toast } from 'react-hot-toast'; // Assuming you are using toast for notifications

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 4,
};

const UserModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profile_pic: null,
        profile_pic_url: '',
    });

    useEffect(() => {
        if (auth.user) {
            const { firstName, lastName, email, profile_pic } = auth.user;
            setUserData({
                firstName,
                lastName,
                email,
                profile_pic: null, // We set this as null for uploading a new picture
                profile_pic_url: profile_pic ? `${API_BASE_URL}/images/${profile_pic}` : '', // Set initial profile image URL
            });
        }
    }, [auth.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setUserData((prevData) => ({
                ...prevData,
                profile_pic: file, // Store the new file in state
                profile_pic_url: fileURL, // Show the preview
            }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Create FormData to handle file uploads
        const formData = new FormData();
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('email', userData.email);

        // Append profile picture if there is a new one
        if (userData.profile_pic) {
            formData.append('profile_pic', userData.profile_pic);
        }

        // Dispatch the action to update the user
        dispatch(updateUser(formData))
            .then(() => {
                toast.success('Profile updated successfully');
                handleClose(); // Close modal after save
            })
            .catch((error) => {
                toast.error('Failed to update profile');
            });
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSave}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div className="flex items-center justify-between">
                                    {userData.profile_pic_url ? (
                                        <img
                                            src={userData.profile_pic_url}
                                            alt="User"
                                            className="object-cover object-top w-28 h-28 rounded-full"
                                        />
                                    ) : (
                                        <Avatar
                                            sx={{ width: 130, height: 130 }}
                                            alt="User"
                                            className="mb-5"
                                        />
                                    )}
                                    <div className="">
                                        <input
                                            accept="image/*"
                                            type="file"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                            id="upload-image"
                                        />
                                        <label htmlFor="upload-image">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                
                                                sx={{
                                                    borderColor: "#38a3a5",
                                                    color: "#38a3a5",
                                                    "&:hover": {
                                                        borderColor: "#2b8b8c",
                                                        backgroundColor: "#e0f7fa", // Light background color on hover
                                                        color: "#2b8b8c",
                                                    },
                                                }}
                                            >
                                                Edit Image
                                            </Button>

                                        </label>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    value={userData.email}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        readOnly: true, // Make the email read-only
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        px: '2rem',
                                        bgcolor: '#38a3a5',
                                        py: '.7rem',
                                        mt: '1rem',
                                        '&:hover': {
                                            bgcolor: '#57b5b6',
                                        },
                                    }}
                                    className="w-full"
                                    size="large"
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default UserModal;
