const userService = require("../Services/userService");
const User = require('../models/userModel')
const Address = require('../models/addressModel')
const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }
    const user = await userService.getUserByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const profile_pic = req.file ? req.file.filename : undefined;
  try {
    // Fetch the user by email
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: `User not found with email: ${email}` });
    }

    // Update user details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.profile_pic = profile_pic || user.profile_pic
    // Save the updated user in the database
    const updatedUser = await user.save();

    const populatedUser = await User.findById(updatedUser._id).populate('address');

    return res
      .status(200)
      .send({ message: "User updated successfully", user: populatedUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const UpdateAddress = async (req, res) => {
  const { firstName, lastName, streetAddress, city, state, zipCode, mobile } = req.body;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, streetAddress, city, state, zipCode, mobile },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).send('Address not found');
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


const RemoveAddress = async (req, res) => {
  const { addressId } = req.params; // Extracting addressId from params
  const userId = req.user._id; // Assuming you are correctly setting req.user in the authenticate middleware

  console.log("Received request to remove address:", addressId);
  console.log("User ID from token:", userId);

  try {
      // Check user's current addresses
      const user = await User.findById(userId).populate('address');
      console.log("Current user addresses:", user.address); // Log user addresses to verify

      // Step 1: Remove address from user's addresses array
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { address: addressId } }, // Address ID to pull directly
          { new: true }
      );

      if (!updatedUser) {
          console.error("User not found");
          return res.status(404).json({ message: 'User not found' });
      }

      console.log("Updated user addresses:", updatedUser.address); // Log updated addresses

      // Step 2: Remove the standalone address from the Address model
      const address = await Address.findByIdAndDelete(addressId);
      if (!address) {
          console.error("Address not found");
          return res.status(404).json({ message: 'Address not found' });
      }

      res.json({ message: 'Address removed successfully', addresses: updatedUser.address });
  } catch (error) {
      console.error('Error in RemoveAddress:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAllUsers,
  getUserProfile,
  updateUser,
  UpdateAddress,
  RemoveAddress
};
