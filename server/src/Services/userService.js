const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwtprovider = require("../config/jwtprovider")

const createUser = async (userData) => {
    try {
        // Proper destructuring
        const { firstName, lastName, email, password } = userData;

        // Check if the user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error(`User already exists`);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create the user with hashed password
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,  // Use hashed password
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error(error.message);
    }
};

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId)
        .populate("address")
        if (!user) {
            throw new Error("user not found with this id:", userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);

    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with this email" );
        }
        return user;
    } catch (error) {
        throw new Error(error.message);

    }
}


const getUserByToken = async (token) => {
    try {
        const userId = jwtprovider.getUserIdByToken(token);
        const user = await User.findById(userId).populate('address'); 
        if (!user) {
            throw new Error("user not found with is:", userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUser = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}





module.exports = { createUser, getUserByEmail, findUserById, getAllUser, getUserByToken };