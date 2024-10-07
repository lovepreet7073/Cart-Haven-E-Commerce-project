const jwtprovider = require('../config/jwtprovider');
const userService = require('../Services/userService');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).send({ error: "Token not found" });
        }

        const userId = jwtprovider.getUserIdByToken(token);
        // Await the Promise here to get the actual user object
        const user = await userService.findUserById(userId); // Ensure this function is async

        req.user = user;
      
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
    next();
};

const isAdmin = async (req, res, next) => {
    console.log(req.user, "user");
    try {
        if (req.user && req.user.role === 'ADMIN') { // Check if req.user is defined
            return next();
        } else {
            return res.status(403).send("Access denied");
        }
    } catch (error) {
        return res.status(500).send("Server error");
    }
};

module.exports = {
    authenticate,
    isAdmin
};
