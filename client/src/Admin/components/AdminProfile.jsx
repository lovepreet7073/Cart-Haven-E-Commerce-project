import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../Redux/Auth/Actions";
import { API_BASE_URL } from "../../Config/apiConfig";
import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField,

  Avatar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  console.log(auth, "auth")
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profile_pic: null,
    profile_pic_url: "", // State to hold the image URL for preview
  });

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State to control dialog visibility

  useEffect(() => {
    if (auth.user) {
      const { firstName, lastName, email, profile_pic } = auth.user;
      setAdminData({
        firstName,
        lastName,
        email,
        profile_pic: profile_pic,
        profile_pic_url: profile_pic ? `${API_BASE_URL}/images/${profile_pic}` : "", // Set initial profile image URL
      });
    }
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setAdminData((prevData) => ({
        ...prevData,
        profile_pic: file,
        profile_pic_url: fileURL, // Update the image URL for preview
      }));
    }
  };

  const handleSave = () => {
    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("firstName", adminData.firstName);
    formData.append("lastName", adminData.lastName);
    formData.append("email", adminData.email);

    if (adminData.profile_pic) {
      formData.append("profile_pic", adminData.profile_pic);
    }

    dispatch(updateUser(formData)).then(() => {
      toast.success("Profile updated successfully");
    });
  };

  const handleLogout = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Reusable TextField styling
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "blue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#38a3a5",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "0.875rem",
      padding: "0.5rem",
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="max-w-lg w-full rounded-lg shadow-lg bg-white p-4">
        <CardContent>
          {/* Admin Profile Header */}
          <div className="flex items-center justify-between">
            {auth?.user?.profile_pic || auth?.user?.user?.profile_pic || adminData?.profile_pic_url ? (
              <img
                src={adminData?.profile_pic_url || `${API_BASE_URL}/images/${auth?.user?.profile_pic}`}
                alt="Admin"
                className="object-cover object-top w-28 h-28 rounded-full"
              />
            ) : (
              <Avatar
                src=""
                sx={{ width: 130, height: 130 }}
                alt="Admin"
                className="mb-5"
              />
            )}
            <div className="">
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-image"
              />
              <label htmlFor="upload-image">
                <Button variant="outlined" component="span" title="Upload Image">
                  Upload Image
                </Button>
              </label>
            </div>
          </div>

          {/* Admin Profile Details */}
          <Grid container spacing={1} className="mt-5 p-3">
            <Grid item xs={6}>
              <Typography variant="body1" className="font-semibold">
                First Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="firstName"
                value={adminData.firstName}
                onChange={handleChange}
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className="font-semibold">
                Last Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="lastName"
                value={adminData.lastName}
                onChange={handleChange}
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className="font-semibold">
                Email:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="email"
                value={adminData.email}
                readOnly
                fullWidth
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 gap-2">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#38a3a5",
                "&:hover": { backgroundColor: "#2b8b8c" },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                "&:hover": {
                  backgroundColor: "#f44336",
                  color: "#fff",
                  borderColor: "#f44336",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminProfile;
