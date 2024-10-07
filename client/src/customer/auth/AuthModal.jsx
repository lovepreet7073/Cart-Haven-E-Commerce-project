import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Register from './Register';
import { useLocation } from 'react-router-dom';
import Login from './login';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: "none",
  p: 5,
  // Responsive width adjustment
  width: 500, // Default width for larger screens
  '@media (max-width: 600px)': {
    width: '90%', // Adjust width to 90% of the viewport for small screens
    p: 3, // Adjust padding for smaller screens
  },
};

const AuthModal = ({ open, handleClose }) => {
  const location = useLocation();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === '/login' ? <Login /> : <Register />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
