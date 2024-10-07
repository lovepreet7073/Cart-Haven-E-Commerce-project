import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Icon } from '@mui/material';
import { API_BASE_URL } from '../../../Config/apiConfig';
import UserModal from './UserModal';
import EditAddressModal from './EditAddressModal';
import { removeAddress } from '../../../Redux/Auth/Actions';
import { MdOutlineDeleteOutline } from "react-icons/md";
const UserProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null); // New state for selected address
    const { auth } = useSelector(store => store);
    const { order } = useSelector(store => store);
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleEditAddOpenModal = (address) => {
        setSelectedAddress(address); // Set the selected address for editing
        setOpenAddModal(true);
    }

    const handleEditAddCloseModal = () => {
        setOpenAddModal(false);
    }
    const handleDelete = async (addressId) => {
        console.log(addressId, "addressId")
        dispatch(removeAddress(addressId))
    }

    // useEffect(() => {
    //     dispatch(getOrdersByUserId()); // Fetch orders on component mount
    // }, [dispatch]);

    return (
        <div className="bg-white rounded shadow-xl w-full px-20 py-5 m-auto">
            <div className="h-[150px] border bg-neutral-100 w-full" />
            <div className='absolute right-[8%] top-[23%]'>
                <Button variant="contained" onClick={handleOpenModal}
                    sx={{
                        backgroundColor: "#38a3a5",
                        "&:hover": { backgroundColor: "#2b8b8c" },
                    }}>Edit Profile</Button>
            </div>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
                <div className="shadow-md w-[110px] h-[110px] rounded-full border-2 overflow-hidden -mt-14 border-[#38a3a5]">
                    {auth?.user?.profile_pic ? (
                        <img
                            src={`${API_BASE_URL}/images/${auth?.user?.profile_pic}`}
                            alt="Admin"
                            className="object-cover object-top w-28 h-28 rounded-full"
                        />
                    ) : (
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xu5deRsNTGJwV2qkcMN4-r_q2O3_mMYprrIQufUMrf12fOKYm4a0l1y0QKls_TQqgV0&usqp=CAU"
                            alt="Default Avatar"
                            className="object-cover object-top w-28 h-28 rounded-full"
                        />
                    )}
                </div>
                <div className="ml-2">
                    <h3 className="text-xl text-slate-900 relative font-bold leading-6">
                        {auth?.user?.firstName} {auth?.user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{auth?.user?.email}</p>
                </div>
                {auth?.user?.address?.length > 0 && (
                    <>
                        <h3 className="text-2xl font-bold leading-3 tracking-wider mt-3 text-neutral-600 mb-2">Addresses</h3>

                        {auth?.user?.address.map((item, index) => (
                            <div className='border border-neutral-150 mt-1 mb-1 p-4' key={index}>
                                <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                                    <Grid item xs={6}>
                                        <div className='flex'>
                                            <div className='ml-2 space-y-2'>
                                                <p className='mb2 font-semibold text-lg'>
                                                    {item.firstName} {item.lastName}
                                                </p>
                                                <p className='text-sm'>{item.streetAddress}, {item.city}</p>
                                                <p className='text-sm'>{item.zipCode}</p>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <div className='flex gap-3 justify-between'>
                                            <p>
                                                <span className="font-semibold">Phone:</span>{" "}
                                                <span className="font-normal">{item.mobile}</span>
                                                <p>{item?.state}</p>
                                            </p>

                                            <div className='flex gap-4 items-center'>
                                                <Button
                                                    variant='contained'
                                                    onClick={() => handleEditAddOpenModal(item)}
                                                    sx={{
                                                        backgroundColor: "#38a3a5",
                                                        p: 1,
                                                        width: 2,
                                                        "&:hover": { backgroundColor: "#2b8b8c" },
                                                    }}
                                                >
                                                    Edit
                                                </Button>

                                                <Icon sx={{ color: '#d91c07', cursor: "pointer" }} onClick={() => handleDelete(item._id)}>
                                                    <MdOutlineDeleteOutline size={27} />
                                                </Icon>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <UserModal handleClose={handleCloseModal} open={openModal} />
            <EditAddressModal handleClose={handleEditAddCloseModal} open={openAddModal} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} /> {/* Pass selected address here */}
        </div>
    )
}

export default UserProfile;
