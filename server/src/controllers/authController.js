const userService = require('../Services/userService')
const jwtprovider = require('../config/jwtprovider')
const cartService = require('../Services/cartService')
const bcrypt = require('bcrypt')


const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtprovider.generateToken(user._id);
        await cartService.createCart(user);
        return res.status(200).send({ jwt, message: "Register Sucessfully" })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).send({ error: error.message })

    }
}


const login = async (req, res) => {
    const { password, email } = req.body;
    try {

        const user = await userService.getUserByEmail(email);
        // if (!user) {
        //     return res.status(404).send({ message: "User not found with email" });
        // }

        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ error: "Invalid Password" });
        }

        // Generate JWT token with user ID and role
        const jwt = jwtprovider.generateToken(user._id, user.role);

        // Logic for admin and normal users
        if (user.role === "ADMIN") {
            // Handle logic for admin login if needed (e.g., logging, auditing, etc.)
            return res.status(200).send({
                jwt,
                message: "Admin logged in successfully",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role, // Admin role
                },
            });
        } else {
            // Handle normal user login
            return res.status(200).send({
                jwt,
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role, // Normal user role
                },
            });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};



module.exports = { login, register }
